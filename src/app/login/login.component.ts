import { Component, OnInit, Input } from '@angular/core';

import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() title: string;
  email: string;
  password: string;

  constructor(private auth: AuthService) {}

  async logIn(): Promise<void> {
    const resp = await this.auth.login(this.email, this.password);
    console.log('resp: ', resp);
    return;
  }

  ngOnInit() {
    console.log(this.title);
  }

}
