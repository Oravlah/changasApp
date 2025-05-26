import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, throwError, catchError } from 'rxjs';
import { User } from 'src/app/shared/models/User.model';
import { RegisterResponse } from '../models/RegisterResponse.model';
import { LoginResponse } from '../models/LoginResponse.model';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isUserLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());

  public userInfo = new BehaviorSubject<any>(null);


  private REST_API_AUTH_REGISTER = environment.REST_API_AUTH_REGISTER;
  private REST_API_AUTH_LOGIN = environment.REST_API_AUTH_LOGIN;
  private REST_API_USERS = environment.REST_API_USERS;


  constructor(private httpClient: HttpClient, private router: Router) {
    this.monitorTokenChanges();
    this.loadUserInfo();
    setInterval(() => { this.loadUserInfo(); }, 5000);
  }

  private loadUserInfo(): void {
    const token = this.getToken();
    if (token && this.validateToken()) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.httpClient.get<User>(this.REST_API_USERS, { headers })
        .pipe(catchError(this.handleError))
        .subscribe(user => {
          this.userInfo.next(user);
        });
    } else {
      this.userInfo.next(null);
    }
  }

  register(user: Partial<User>): Observable<RegisterResponse> {
    return this.httpClient.post<RegisterResponse>(this.REST_API_AUTH_REGISTER, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  login(credentials: { email: string, password: string }): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.REST_API_AUTH_LOGIN, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
        this.isUserLogin.next(true);

        // Obtener y emitir la información del usuario
        this.getUserInfo().subscribe(user => {
          this.userInfo.next(user);
        });
      })
    );
  }


  getToken(): string | null {
    return localStorage.getItem('access_token');
  }


  hasToken(): boolean {
    return !!this.getToken();
  }

  isLoggedIn(): boolean {
    const loggedIn = this.hasToken();
    this.isUserLogin.next(loggedIn);
    return loggedIn;
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.isUserLogin.next(false);
  }

  validateToken(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      const expiry = decodedToken.exp;
      const isExpired = (Math.floor((new Date()).getTime() / 1000)) > expiry;

      if (isExpired) {
        this.logout();
      }

      return !isExpired;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  getUserInfo(): Observable<User> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<User>(this.REST_API_USERS, { headers });
  }


   private monitorTokenChanges() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'token') {
        const token = this.getToken();
        if (!token) {
          this.isUserLogin.next(false);
          this.userInfo.next(null);
          this.router.navigate(['/login']);
        }
      }
    });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}. Message: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
