import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { Screens, tabs } from '../constants';
import { AuthService } from '../core/services/auth.service';
import { User } from '../core/models';
import { BoardsService } from '../core/services/boards.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  tabs = tabs;
  addTitle: string;
  screens = Screens;
  user: User;

  private mode: string;
  private boardId: string;

  constructor(
    private router: Router,
    private auth: AuthService,
    private boardsService: BoardsService,
    private userService: UserService
  ) {}

  logout(): void {
    this.auth.clearStorageData();
    this.router.navigate(['/login']);
  }

  openDialogOnScreen() {
    switch (this.mode) {
      case Screens.Dashboard: this.createBoard(); break;
      case Screens.Board: this.inviteUser(); break;
      default: this.createBoard(); break;
    }
  }

  ngOnInit() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;
        if (this.auth.loggedIn && url) {

          // page dashboard
          if (url.includes(Screens.Dashboard)) {
            this.getCurrentUser();
            this.setMode('Create Board', Screens.Dashboard);
          }

          // page board
          if (url.includes(Screens.Board)) {
            this.getCurrentUser();
            this.setMode('Invite To Board', Screens.Board);
            const urlArr = url.split('/');
            this.boardId = urlArr[urlArr.length - 1];
          }
        }
      });
  }

  private async getCurrentUser(): Promise<User> {
    this.user = await this.auth.getCurrentUser();
    return;
  }

  private setMode(title: string, screen: string): void {
    this.addTitle = title;
    this.mode = screen;
  }

  private createBoard(): void {
    this.boardsService.openCreateBoardDialog(this.user._id).then(() => {
      this.boardsService.getBoards(this.user._id).toPromise();
    });
  }

  private inviteUser(): void {
    this.userService.openInviteUserDialog(this.boardId);
  }
}
