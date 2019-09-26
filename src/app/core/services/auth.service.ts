import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { APIUrl } from '../constants';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Promise<any> {
    return this.http.post(`${APIUrl}/auth/signin`, {email, password}, this.httpOptions).pipe(
      catchError(this.handleError('post', null))
    ).toPromise();
  }

  register(name: string, email: string, password: string): Promise<any> {
    const data = {
      email,
      password,
      name
    };
    return this.http.post(`${APIUrl}/auth/signup`, data, this.httpOptions).pipe(
      catchError(this.handleError('post', null))
    ).toPromise();
  }

  private handleError(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {
      result = {
        status: error.status,
        statusText: error.statusText
      };
      console.log('result: ', result);
      return of(result);
    };
  }
}
