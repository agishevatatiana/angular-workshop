import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { APIUrl } from '../constants';
import { NotificationsService } from './notifications.service';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private notifications: NotificationsService) {}

  login(email: string, password: string): Promise<any> {
    return this.http.post(`${APIUrl}/auth/signin`, {email, password}).pipe(
      catchError(this.notifications.handleError('post', 'login'))
    ).toPromise();
  }

  register(email: string, password: string, name: string): Promise<any> {
    const body = {
      email,
      password,
      name
    };
    return this.http.post(`${APIUrl}/auth/signup`, body).pipe(
      catchError(this.notifications.handleError('post', 'register'))
    ).toPromise();
  }

  get getAuthorizationToken() {
    return localStorage.getItem('token') || '';
  }

  loggedIn() {
    return !!this.getAuthorizationToken;
  }
}
