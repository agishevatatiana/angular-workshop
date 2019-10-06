import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { take } from 'rxjs/operators';

import { BoardsService } from '../core/services/boards.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  boardTitle: string;
  private boardId: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private boardsService: BoardsService
  ) {}

  changeBoardName(): void {
    this.boardsService.updateBoardTitle(this.boardId, this.boardTitle);
  }

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(take(1))
      .subscribe((paramsMap: ParamMap) => {
        this.boardId = paramsMap.get('boardId');
      });
  }

}
