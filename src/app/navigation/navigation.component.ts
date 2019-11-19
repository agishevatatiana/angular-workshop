import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { tabs } from '../constants';
import { AuthService } from '../core/services/auth.service';
import { User } from '../core/models';
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
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.auth.loggedIn) {
          this.getCurrentUser();
        }
      });
  }
}
