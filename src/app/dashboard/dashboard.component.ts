import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { BoardsService } from '../core/services/boards.service';
import { Board } from '../core/models';
import { SearchService } from '../core/services/search.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  searchText: Observable<string>;
  private boards: Observable<Board[]>;
  private currentUserId: string;
  constructor(
    private router: Router,
    private boardsService: BoardsService,
    private searchService: SearchService
  ) {
    router.events.pipe(
      filter((event) => event instanceof ActivationEnd),
      map((event: ActivationEnd) => event.snapshot && event.snapshot.params)
    ).subscribe((params) => {
      if (!params.userId) {
        return;
      }
      this.currentUserId = params.userId;
      this.boardsService.getBoards(this.currentUserId).toPromise();
      this.boards = this.boardsService.getBoardsSubj();
      this.searchText = this.searchService.getSearchText();
    });
  }

  trackById(index: number, item: Board): string {
    return item._id;
  }

  createBoard(currentUserId: string): void {
    this.boardsService.openCreateBoardDialog(currentUserId).then(() => {
      this.boardsService.getBoards(this.currentUserId).toPromise();
    });
  }

  remove(event: MouseEvent, boardId: string): void {
    event.stopPropagation();
    this.boardsService.removeBoard(boardId).then(() => {
      this.boardsService.getBoards(this.currentUserId).toPromise();
    });
  }

  ngOnInit() {

  }

}
