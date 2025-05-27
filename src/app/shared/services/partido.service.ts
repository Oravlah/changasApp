import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { Partido } from '../models/Partido.model';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {

  private REST_API_PARTIDOS = environment.REST_API_PARTIDOS;
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  private PartidosSubject: BehaviorSubject<Partido[]> = new BehaviorSubject<Partido[]>([]);
  public Partidos$: Observable<Partido[]> = this.PartidosSubject.asObservable();


  constructor(private http: HttpClient) { }

  getPartidos(): Observable<Partido[]> {
    return this.http.get<Partido[]>(this.REST_API_PARTIDOS).pipe(
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
