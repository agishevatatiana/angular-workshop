import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { BoardsService } from '../core/services/boards.service';
import { Board } from '../core/models';
import { SearchService } from '../core/services/search.service';
import { ListService } from '../core/services/list.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  searchText: Observable<string>;
  boardTitle: string;
  boardId: string;
  private board: Board;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private boardsService: BoardsService,
    private searchService: SearchService
  ) {}

  backToDashboard(event: MouseEvent): void {
    event.preventDefault();
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
        this.searchText = this.searchService.getSearchText();
      });
  }

  private async getBoard(): Promise<void> {
    this.board = await this.boardsService.getBoardById(this.boardId);
    this.boardTitle = this.board.title;
    return;
  }
}
