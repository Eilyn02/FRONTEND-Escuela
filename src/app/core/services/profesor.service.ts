import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  ProfesorCreate,
  ProfesorRead,
  ProfesorUpdate,
} from '../../models/api.models';

/**
 * Servicio encargado de consumir los endpoints de profesores
 */
@Injectable({
  providedIn: 'root',
})
export class ProfesorService {
  private readonly base = `${environment.apiUrl}/profesores`;

  constructor(private readonly http: HttpClient) {}

  /**
   * Obtiene el listado de profesores desde la API.
   */
  list(): Observable<ProfesorRead[]> {
    const params = new HttpParams()
      .set('skip', 0)
      .set('limit', 500);

    return this.http.get<ProfesorRead[]>(`${this.base}/`, { params });
  }

  /**
   * Obtiene un profesor por su identificador.
   */
  get(id: number): Observable<ProfesorRead> {
    return this.http.get<ProfesorRead>(`${this.base}/${id}`);
  }

  /**
   * Crea un nuevo profesor.
   */
  create(body: ProfesorCreate): Observable<ProfesorRead> {
    return this.http.post<ProfesorRead>(`${this.base}/`, body);
  }

  /**
   * Actualiza un profesor existente.
   */
  update(id: number, body: ProfesorUpdate): Observable<ProfesorRead> {
    return this.http.put<ProfesorRead>(`${this.base}/${id}`, body);
  }

  /**
   * Elimina un profesor.
   */
  delete(id: number): Observable<void> {
    return this.http
      .delete(`${this.base}/${id}`, { observe: 'response' })
      .pipe(map(() => undefined));
  }
}