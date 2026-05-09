import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  EstudianteCreate,
  EstudianteRead,
  EstudianteUpdate,
} from '../../models/api.models';

/**
 * Servicio encargado de consumir los endpoints de estudiantes
 */
@Injectable({
  providedIn: 'root',
})
export class EstudianteService {
  private readonly base = `${environment.apiUrl}/estudiantes`;

  constructor(private readonly http: HttpClient) {}

  /**
   * Obtiene el listado de estudiantes desde la API.
   */
  list(): Observable<EstudianteRead[]> {
    const params = new HttpParams()
      .set('skip', 0)
      .set('limit', 500);

    return this.http.get<EstudianteRead[]>(`${this.base}/`, { params });
  }

  /**
   * Obtiene un estudiante por su identificador.
   */
  get(id: number): Observable<EstudianteRead> {
    return this.http.get<EstudianteRead>(`${this.base}/${id}`);
  }

  /**
   * Crea un nuevo estudiante.
   */
  create(body: EstudianteCreate): Observable<EstudianteRead> {
    return this.http.post<EstudianteRead>(`${this.base}/`, body);
  }

  /**
   * Actualiza un estudiante existente.
   */
  update(id: number, body: EstudianteUpdate): Observable<EstudianteRead> {
    return this.http.put<EstudianteRead>(`${this.base}/${id}`, body);
  }

  /**
   * Elimina un estudiante.
   */
  delete(id: number): Observable<void> {
    return this.http
      .delete(`${this.base}/${id}`, { observe: 'response' })
      .pipe(map(() => undefined));
  }
}