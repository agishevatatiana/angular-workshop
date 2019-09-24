import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { APIUrl } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { 

  }

  login(email: string, pass: string): Promise<any> {
    return this.http.post(APIUrl, {email, pass}).toPromise();
  }
}
