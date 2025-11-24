import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './services/auth-service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authorizeInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = localStorage.getItem('access_token');


  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {

        return authService.refreshToken().pipe(
          switchMap((tokens) => {
            if (tokens) {
              authService.storeTokens(tokens);

              const newReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${tokens.accessToken}`
                }
              });
              return next(newReq);
            }
            return throwError(() => error);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
