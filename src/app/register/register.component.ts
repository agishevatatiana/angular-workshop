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

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  async register(): Promise<void> {
    const response = await this.auth.register(this.email, this.password, this.name);
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
    this.name = '';
  }

  ngOnInit() {
  }

}
