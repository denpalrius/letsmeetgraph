import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class BaseService {
  constructor() {}

  catchError(error: any, snackBar: any): Observable<never> {
    console.log(error);
    // if (snackBar && error && error.message) {
    //   snackBar.open(error.message, 'Ok', {
    //     duration: 3000,
    //   });
    // }
    return throwError(error);
  }
}
