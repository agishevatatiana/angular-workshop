import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

import { BoardsService } from '../core/services/boards.service';
import { User } from '../core/models';
import { SearchService } from '../core/services/search.service';
import { UserService } from '../core/services/user.service';
import { trackById } from '../utils';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  searchText: Observable<string>;
  boardId: string;
  trackById = trackById;
  board: Observable<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private boardsService: BoardsService,
    private searchService: SearchService,
    private userService: UserService
  ) {}

  openInviteDialog(): void {
    this.userService.openInviteUserDialog(this.boardId, this.boardsService.boardSubject());
  }

  backToDashboard(event: MouseEvent): void {
    event.preventDefault();
    this.location.back();
  }

  changeBoardName(boardTitle): void {
    this.boardsService.updateBoardTitle(this.boardId, boardTitle);
  }

  getInitials(user: User): string {
    const words = user.name.split(' ');
    return words.reduce((res, name) => {
      res += name.slice(0, 1);
      return res;
    }, '');
  }

  showUserInfo(user: User): void {
    this.userService.openUserInfoDialog(this.boardId, user, this.boardsService.boardSubject());
  }

  ngOnInit() {
    this.activatedRoute.paramMap
      .subscribe((paramsMap: ParamMap) => {
        this.boardId = paramsMap.get('boardId');
        this.getBoard();
        this.searchText = this.searchService.getSearchText();
      });
  }

  getBoard(): void {
    this.boardsService.getBoardById(this.boardId).toPromise();
    this.board = this.boardsService.getBoardSubj();
  }
}
