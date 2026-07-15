import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 0:
          console.error('Unable to connect to the server.');
          break;
        case 400:
          toastr.error('400 error happened');
          console.error('Bad Request');
          break;

        case 401:
          toastr.error('401 error happened');
          console.error('Unauthorized');
          // router.navigateByUrl('/login'); //untilimplement JWT authentication
          break;

        case 403:
          toastr.error('403 error happened');
          console.error('Access denied');
          break;

        case 404:
          toastr.error('404 error happened');
          router.navigateByUrl('/not-found');
          break;

        case 500:
          toastr.error('500 error happened');
          router.navigateByUrl('/server-error');
          break;

        default:
          console.error(error);
          break;
      }

      return throwError(() => error);
    }),
  );
};
