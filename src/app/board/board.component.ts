import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { take } from 'rxjs/operators';

import { BoardsService } from '../core/services/boards.service';
import { Board } from '../core/models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  boardTitle: string;
  private boardId: string;
  private board: Board;
  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private boardsService: BoardsService
  ) {}

  backToDashboard(): void {
    this.location.back();
  }

  changeBoardName(): void {
    this.boardsService.updateBoardTitle(this.boardId, this.boardTitle);
  }

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(take(1))
      .subscribe((paramsMap: ParamMap) => {
        this.boardId = paramsMap.get('boardId');
        this.getBoard();
      });
  }

  private async getBoard(): Promise<void> {
    this.board = await this.boardsService.getBoardById(this.boardId);
    this.boardTitle = this.board.title;
    return;
  }

}
