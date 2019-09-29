import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  error: any;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  async logIn(): Promise<void> {
    const response = await this.auth.login(this.email, this.password);
    if (response.error) {
      this.error = response;
      return;
    }
    const token = response && response.data && response.data.token;
    if (!token) {
      this.error = {
        error: true,
        statusText: 'Token is empty'
      };
      return;
    }
    localStorage.setItem('token', token);
    this.router.navigate(['/dashboard']);
    return;
  }

  ngOnInit() {
  }

}
