import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('techstore_token');

  const reqModificado = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(reqModificado).pipe(
    catchError(error => {
      console.error(`Error HTTP ${error.status}:`, error.message);
      return throwError(() => error);
    })
  );
};
