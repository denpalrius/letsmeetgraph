import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class BaseService {
  catchError(error: any, parameter: any): Observable<never> {
    console.log(error);
    return throwError(error);
  }
}
