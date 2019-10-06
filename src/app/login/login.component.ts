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

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  async logIn(): Promise<void> {
    const response = await this.auth.login(this.email, this.password);
    const token = response && response.data && response.data.token;
    if (response.error || !token) {
      return;
    }
    localStorage.setItem('token', token);
    this.router.navigate(['/dashboard']);
    return;
  }

  reset(): void {
    this.email = '';
    this.password = '';
  }

  ngOnInit() {
  }

}
