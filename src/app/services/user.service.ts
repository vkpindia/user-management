import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public apiUrl: string = 'http://localhost:3000/data';

  /**
   * @description Setting headers for http requests
   * @memberof UserService
   */
  httpOptions = {
    headers: new HttpHeaders({ 'content-type': 'application/json' })
  };

  constructor() { }

  /**
   * @description Method to getting error if occured
   * @author Virendra Pandey
   * @date 2020-05-17
   * @private
   * @param {HttpErrorResponse} error
   * @returns {Observable<string>}
   * @memberof UserService
   */
  private handleError(error: HttpErrorResponse): Observable<string> {
    if (error.error instanceof ErrorEvent) {
      // A client side or network error occured. Hndle it accordingly.
      console.error('An eror occured:', error.error.message);
    } else {
      // Backend returned an unsuccessfull response code.
      // The response body may contain clues as to what went wrong
      console.error(`Backend returned code ${error.status} body was: ${error.error}`);
    }

    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  /**
   * @description Method for extracting response data
   * @author Virendra Pandey
   * @date 2020-05-17
   * @private
   * @param {Response} res
   * @returns {(Array<any> | {})}
   * @memberof UserService
   */
  private extractData(res: Response): Array<any> | {} {
    const body = res;
    return body || {};
  }

}
