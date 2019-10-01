import { Component, OnInit } from '@angular/core';

import { tabs } from '../constants';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  tabs = tabs;
  constructor(
    private auth: AuthService
  ) {}
  isLoggedIn = this.auth.loggedIn();

  ngOnInit() {
  }

}
