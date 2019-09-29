import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { APIUrl } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Promise<any> {
    return this.http.post(`${APIUrl}/auth/signin`, {email, password}, this.httpOptions).pipe(
      catchError(this.handleError('post', null))
    ).toPromise();
  }

  register(email: string, password: string, name: string): Promise<any> {
    const body = {
      email,
      password,
      name
    };
    return this.http.post(`${APIUrl}/auth/signup`, body, this.httpOptions).pipe(
      tap((data) => {
        console.log(data);
      }),
      catchError(this.handleError('post', null))
    ).toPromise();
  }

  get getAuthorizationToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {
    return !!this.getAuthorizationToken;
  }

  private handleError(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {
      result = {
        error: true,
        status: error.status,
        statusText: error.statusText
      };
      return of(result);
    };
  }
}
