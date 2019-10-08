import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { tabs } from '../constants';
import { AuthService } from '../core/services/auth.service';
import { mockUser, User } from '../core/models';
import { BoardsService } from '../core/services/boards.service';
import {CreateNewDataComponent} from '../shared/dialog/create-new-data/create-new-data.component';
import {take} from 'rxjs/operators';

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
    private dialog: MatDialog
  ) {}
  user: Promise<User>;
  // user: User;

  logout(): void {
    this.auth.clearStorageData();
    this.router.navigate(['/login']);
  }

  createBoard(): void {
    this.dialog.open(CreateNewDataComponent, {
      width: '250px',
      data: {title: ''}
    }).afterClosed()
      .pipe(take(1))
      .subscribe((title: string) => {
        if (!title) {
          return;
        }
        this.boardsService.createBoard(title);
      });
  }

  ngOnInit() {
    this.user = this.auth.getCurrentUser();
    // this.user = mockUser;
  }

}
