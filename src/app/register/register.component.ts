import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  name: string;
  error: any;

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  async register(): Promise<void> {
    const response = await this.auth.register(this.email, this.password, this.name);
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
