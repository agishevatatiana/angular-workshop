import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { tabs } from '../constants';
import { AuthService } from '../core/services/auth.service';
import { mockUser, User } from '../core/models';
import { BoardsService } from '../core/services/boards.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  tabs = tabs;
  constructor(
    private router: Router,
    private auth: AuthService,
    private boardsService: BoardsService,
  ) {}
  user: User;
  // user: User;

  logout(): void {
    this.auth.clearStorageData();
    this.router.navigate(['/login']);
  }

  createBoard(): void {
    this.boardsService.openCreateBoardDialog(this.user._id).then(() => {
      this.boardsService.getBoards(this.user._id).toPromise();
    });
  }

  async getCurrentUser(): Promise<User> {
    this.user = await this.auth.getCurrentUser();
    return;
  }

  ngOnInit() {
    this.getCurrentUser();
    // this.user = mockUser;
  }



}
