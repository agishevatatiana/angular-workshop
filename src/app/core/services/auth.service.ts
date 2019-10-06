import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { APIUrl } from '../constants';
import { NotificationsService } from './notifications.service';
import { AuthData, User } from '../models';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private notifications: NotificationsService
  ) {}

  login(email: string, password: string): Promise<AuthData> {
    return this.http.post(`${APIUrl}/auth/signin`, {email, password}).pipe(
      catchError(this.notifications.handleError('post', 'login'))
    ).toPromise();
  }

  register(email: string, password: string, name: string): Promise<AuthData> {
    const body = {
      email,
      password,
      name
    };
    return this.http.post(`${APIUrl}/auth/signup`, body).pipe(
      catchError(this.notifications.handleError('post', 'register'))
    ).toPromise();
  }

  setStorageData(response: AuthData): void {
    localStorage.setItem('token', response.data.token);
  }

  clearStorageData(): void {
    localStorage.removeItem('token');
  }

  getCurrentUser(): Promise<User> {
    return this.http.get(`${APIUrl}/current/${this.getAuthorizationToken}`).pipe(
      catchError(this.notifications.handleError('get', 'get current user')),
      map((authData: AuthData) => authData.data.user)
    ).toPromise();
  }

  get getAuthorizationToken(): string {
    return localStorage.getItem('token') || '';
  }

  get loggedIn(): boolean {
    return !!this.getAuthorizationToken;
  }
}
