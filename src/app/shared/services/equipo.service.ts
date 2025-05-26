import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { Equipo } from '../models/Equipo.model';


@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  private REST_API_EQUIPOS = environment.REST_API_EQUIPOS;
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  private EquiposSubject: BehaviorSubject<Equipo[]> = new BehaviorSubject<Equipo[]>([]);
  public Equipos$: Observable<Equipo[]> = this.EquiposSubject.asObservable();

  constructor(private http: HttpClient) { }

  getEquipos(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.REST_API_EQUIPOS).pipe(
      catchError((error) => {
        console.error('Error al obtener los equipos:', error);
        return throwError(() => error);
      })
    )
  }

}
