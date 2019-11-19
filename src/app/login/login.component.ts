import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/services/auth.service';
import { mockResponse } from '../core/models';

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
    // const response = mockResponse;
    if (response.error) {
      return;
    }
    this.router.navigate(['/dashboard', response.data.user._id]);
    return;
  }

  reset(): void {
    this.email = '';
    this.password = '';
  }

  ngOnInit() {
  }

}
