import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { BoardsService } from '../core/services/boards.service';
import { Board, User } from '../core/models';
import { SearchService } from '../core/services/search.service';
import { UserService } from '../core/services/user.service';

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
    private searchService: SearchService,
    private userService: UserService
  ) {}

  backToDashboard(event: MouseEvent): void {
    event.preventDefault();
    this.location.back();
  }

  changeBoardName(): void {
    this.boardsService.updateBoardTitle(this.boardId, this.boardTitle);
  }

  getInitials(user: User): string {
    const words = user.name.split(' ');
    return words.reduce((res, name) => {
      res += name.slice(0, 1);
      return res;
    }, '');
  }

  showUserInfo(user: User): void {
    this.userService.openUserInfoDialog(this.boardId, user).then(() => {
      this.getBoard();
    });
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
