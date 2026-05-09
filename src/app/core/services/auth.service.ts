import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { environment } from '../../../environments/environment';

export interface LoginRequest {
  correo: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface UsuarioActual {
  id_usuario: number;
  nombre: string;
  correo: string;
  rol: string;
  activo: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly base = `${environment.apiUrl}/auth`;
  private readonly tokenKey = 'access_token';
  private readonly roleKey = 'user_role';

  constructor(private readonly http: HttpClient) {}

  login(data: LoginRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.base}/login`, data).pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, response.access_token);
        localStorage.setItem(this.roleKey, 'admin');
      }),
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  me(): Observable<UsuarioActual> {
    return this.http.get<UsuarioActual>(`${this.base}/me`);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
  }
}