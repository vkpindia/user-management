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

  constructor(private _http: HttpClient) { }

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

  /**
   * @description Method for getting user from server
   * @author Virendra Pandey
   * @date 2020-05-17
   * @returns {Observable<any>}
   * @memberof UserService
   */
  public getUsers(): Observable<any> {
    return this._http.get(this.apiUrl, this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  /**
   * @description Method for getting unique record by ID
   * @author Virendra Pandey
   * @date 2020-05-17
   * @param {number} userID
   * @returns {Observable<any>}
   * @memberof UserService
   */
  public getUserByID(userID: number): Observable<any> {
    // http://localhost:3000/data/1024
    const url = `${this.apiUrl}/${userID}`;
    return this._http.get(url, this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  /**
   * @description Method for posting/sending data to server
   * @author Virendra Pandey
   * @date 2020-05-17
   * @param {*} userRecord
   * @returns {Observable<any>}
   * @memberof UserService
   */
  public postUser(userRecord: any): Observable<any> {
    return this._http.post(this.apiUrl, userRecord, this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  /**
   * @description Method for updating data to server
   * @author Virendra Pandey
   * @date 2020-05-17
   * @param {*} userRecord
   * @returns {Observable<any>}
   * @memberof UserService
   */
  public updateUser(userID: number, userRecord: any): Observable<any> {
    const url = `${this.apiUrl}/${userID}`;
    return this._http.put(url, userRecord , this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  /**
   * @description Method for deleting user record
   * @author Virendra Pandey
   * @date 2020-05-17
   * @param {*} userRecord
   * @returns {Observable<any>}
   * @memberof UserService
   */
  public deleteUser(userID: number): Observable<any> {
    // http://localhost:3000/data/1024
    const url = `${this.apiUrl}/${userID}`;
    return this._http.delete(url, this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }


}
