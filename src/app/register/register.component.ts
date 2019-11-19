import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/services/auth.service';
import { mockResponse } from '../core/models';

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
    this.name = '';
  }

  ngOnInit() {
  }

}
