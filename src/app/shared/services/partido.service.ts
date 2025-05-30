import { Injectable, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError, interval, Subscription, switchMap } from 'rxjs';
import { Partido } from '../models/Partido.model';

@Injectable({
  providedIn: 'root'
})
export class PartidoService implements OnDestroy {

  private REST_API_PARTIDOS = environment.REST_API_PARTIDOS;
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  private PartidosSubject: BehaviorSubject<Partido[]> = new BehaviorSubject<Partido[]>([]);
  public Partidos$: Observable<Partido[]> = this.PartidosSubject.asObservable();

  private refreshSub: Subscription;

  constructor(private http: HttpClient) {
    this.loadPartidos(); // Carga inicial
    this.refreshSub = interval(5000)
      .pipe(switchMap(() => this.http.get<Partido[]>(this.REST_API_PARTIDOS, { headers: this.httpHeaders })))
      .subscribe({
        next: (partidos) => this.PartidosSubject.next(partidos),
        error: (err) => console.error('Error al recargar partidos:', err)
      });
  }

  private loadPartidos(): void {
    this.http.get<Partido[]>(this.REST_API_PARTIDOS, { headers: this.httpHeaders }).subscribe({
      next: (partidos) => this.PartidosSubject.next(partidos),
      error: (err) => console.error('Error al cargar partidos:', err)
    });
  }

  getPartidos(): Observable<Partido[]> {
    return this.http.get<Partido[]>(this.REST_API_PARTIDOS).pipe(
      catchError(this.handleError)
    );
  }

  editPartido(id: string, partido: Partial<Partido>): Observable<Partido> {
    return this.http.patch<Partido>(`${this.REST_API_PARTIDOS}/${id}/`, partido, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    );
  }


  ngOnDestroy(): void {
    this.refreshSub?.unsubscribe();
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
