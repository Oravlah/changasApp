import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private REST_API_USERS = environment.REST_API_USERS;
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public users$: Observable<User[]> = this.usersSubject.asObservable();


  constructor(private http: HttpClient) {
    this.getUserInfo();
   }

  getUserInfo(): Observable<User> {
    return this.http.get<User>(this.REST_API_USERS).pipe(
      catchError((error) => {
        console.error('Error al obtener el usuario actual:', error);
        console.error('Error al obtener usuario actual:', error);
        return throwError(() => error);
      })
    );
  }

  updateUser(id: string, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.REST_API_USERS}/${id}`, user, { headers: this.httpHeaders }).pipe(
      catchError((error) => {
        console.error('Error al actualizar el usuario:', error);
        return throwError(() => error);
      })
    );
  }


}
