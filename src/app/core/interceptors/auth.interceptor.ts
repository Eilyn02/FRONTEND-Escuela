import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Interceptor HTTP para agregar el token JWT a las peticiones.
 * Si existe un token en localStorage, lo envía en el header Authorization.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token');

  // Si no hay token, la petición continúa normal.
  if (!token) {
    return next(req);
  }

  // Clonamos la petición y agregamos el header Authorization.
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq);
};