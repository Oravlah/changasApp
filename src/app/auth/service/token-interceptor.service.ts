import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private authService: AuthService, private http: HttpClient) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getToken();
    console.log('Access token en interceptor:', accessToken);
    let authReq = req;

    if (accessToken) {
      authReq = this.addTokenHeader(req, accessToken);
    }

    return next.handle(authReq).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Token expirado o inválido
          return this.handle401Error(authReq, next);
        }
        return throwError(() => error);
      })
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });
  }


  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        // Aquí haces la petición para refrescar el token usando la URL del environment
        return this.http.post<any>(environment.REST_API_AUTH_REFRESH, { refresh: refreshToken }).pipe(
          switchMap((response) => {
            this.isRefreshing = false;
            localStorage.setItem('access_token', response.access);
            this.refreshTokenSubject.next(response.access);
            // Reintenta la petición original con el nuevo token
            return next.handle(this.addTokenHeader(request, response.access));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.authService.logout(); // Token refresh inválido, forzar logout
            return throwError(() => err);
          })
        );
      } else {
        // No hay refresh token, forzar logout
        this.authService.logout();
        return throwError(() => new Error('No refresh token available'));
      }
    }

    // Si ya está refrescando, espera a que termine para continuar
    return this.refreshTokenSubject.pipe(
      filter(token => token != null),
      take(1),
      switchMap(token => next.handle(this.addTokenHeader(request, token!)))
    );
  }
}
