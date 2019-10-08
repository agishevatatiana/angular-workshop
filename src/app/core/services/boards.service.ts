import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { NotificationsService } from './notifications.service';
import { Board, mockBoard, mockBoards } from '../models';
import { APIUrl } from '../constants';

@Injectable()
export class BoardsService {

  constructor(
    private http: HttpClient,
    private notifications: NotificationsService
  ) { }

  getBoards(): Observable<Board[]> {
    return this.http.get(`${APIUrl}/boards`).pipe(
      catchError(this.notifications.handleError('get', 'get boards')),
      map((httpBoards) => httpBoards.data.boards)
    );

    // return of(mockBoards);
  }

  updateBoardTitle(boardId: string, title: string): Promise<Board> {
    return this.http.put(`${APIUrl}/boards/${boardId}`, { title } ).pipe(
      catchError(this.notifications.handleError('get', 'get boards')),
    ).toPromise();
  }

  createBoard(title: string): Promise<any> {
    return this.http.post(`${APIUrl}/boards`, { title } ).pipe(
      catchError(this.notifications.handleError('post', 'create board')),
    ).toPromise();
  }
}
