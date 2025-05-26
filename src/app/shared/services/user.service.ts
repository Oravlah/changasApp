import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { User } from '../models/User.model';
import { AuthService } from 'src/app/auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private REST_API_USERS = environment.REST_API_USERS;
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public users$: Observable<User[]> = this.usersSubject.asObservable();


  constructor(private http: HttpClient, private authService: AuthService) {}

  updateUserPartial(changes: Partial<User>): Observable<User> {
    const token = this.authService.getToken();
    if (!token) {
      return throwError(() => new Error('No se encontró token de autenticación'));
    }

    const headers = this.httpHeaders.set('Authorization', `Bearer ${token}`);

    return this.http.patch<User>(this.REST_API_USERS, changes, { headers }).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

}
