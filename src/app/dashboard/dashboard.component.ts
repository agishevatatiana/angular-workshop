import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { BoardsService } from '../core/services/boards.service';
import { Board } from '../core/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private boards: Observable<Board[]>;
  constructor(
    private router: Router,
    private boardsService: BoardsService
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

  ngOnInit() {

  }

}
