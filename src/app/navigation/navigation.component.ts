import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { tabs } from '../constants';
import { AuthService } from '../core/services/auth.service';
import { mockUser, User } from '../core/models';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  tabs = tabs;
  constructor(
    private router: Router,
    private auth: AuthService
  ) {}
  // user: Promise<User>;
  user: User;

  logout(): void {
    this.auth.clearStorageData();
    this.router.navigate(['/login']);
  }

  createBoard() {
    // TODO: modal window with form
  }

  ngOnInit() {
    // this.user = this.auth.getCurrentUser();
    this.user = mockUser;
  }

}
