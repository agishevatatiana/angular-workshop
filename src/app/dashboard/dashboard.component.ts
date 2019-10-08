import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import {filter, map, take, tap} from 'rxjs/operators';
import { Observable } from 'rxjs';

import { BoardsService } from '../core/services/boards.service';
import { Board } from '../core/models';
import {CreateNewDataComponent} from '../shared/dialog/create-new-data/create-new-data.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private boards: Observable<Board[]>;
  constructor(
    private router: Router,
    private boardsService: BoardsService,
    private dialog: MatDialog
  ) {
    router.events.pipe(
      filter((event) => event instanceof ActivationEnd),
      map((event: ActivationEnd) => event.snapshot && event.snapshot.params)
    ).subscribe((params) => {
      if (!params.userId) {
        return;
      }
      const userId = params.userId;
      this.boards = this.boardsService.getBoards().pipe(
        map((boards: Board[]) => {
          return boards
            .filter((board: Board) => board.users.includes(userId));
        })
      );
    });
  }

  trackById(index: number, item: Board): string {
    return item._id;
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

  }

}
