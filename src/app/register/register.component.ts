import { Component, Input, OnInit } from '@angular/core';

import { AuthService } from '../core/services/auth.service';
import {log} from "util";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Input() title: string;
  email: string;
  password: string;
  name: string;

  constructor(private auth: AuthService) { }

  async register() {
    console.log('q: ', this.email, this.password, this.name);
    const resp = await this.auth.register(this.email, this.password, this.name);
    console.log('resp: ', resp);
    return;
  }

  ngOnInit() {
  }

}
