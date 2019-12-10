import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { NotificationsService } from './notifications.service';
import { Board, User } from '../models';
import { APIUrl } from '../constants';
import { CreateNewDataComponent } from '../../shared/dialog/create-new-data/create-new-data.component';

@Injectable()
export class BoardsService {
  private boardsSubject$ = new Subject();

  constructor(
    private http: HttpClient,
    private notifications: NotificationsService,
    private dialog: MatDialog
  ) { }

  getBoardsSubj(): Observable<any> {
    return this.boardsSubject$.asObservable();
  }

  getBoards(currentUserId: string): Observable<void> {
    return this.http.get(`${APIUrl}/boards`).pipe(
      catchError(this.notifications.handleError('get', 'get boards')),
      map((httpBoards) => httpBoards.data.boards),
      map((boardsResp: Board[]) => {
        const boards = boardsResp
          .filter((board: Board) => !!board.users.find((user: User) => (user._id === currentUserId)));
        this.boardsSubject$.next(boards);
      })
    );
  }

  getBoardById(boardId: string): Promise<Board> {
    return this.http.get(`${APIUrl}/boards/${boardId}`).pipe(
      catchError(this.notifications.handleError('get', 'get board')),
      map((boardResp) => boardResp.data)
    ).toPromise();
  }

  updateBoardTitle(boardId: string, title: string): Promise<Board> {
    return this.http.put(`${APIUrl}/boards/${boardId}`, { title: title.trim() } ).pipe(
      catchError(this.notifications.handleError('get', 'get boards')),
    ).toPromise();
  }

  createBoard(title: string, currentUserId: string): Promise<any> {
    return this.http.post(`${APIUrl}/boards`, { title: title.trim() } ).pipe(
      catchError(this.notifications.handleError('post', 'create board')),
      mergeMap((resp: any) => {
        const boardId = resp.data && resp.data.board && resp.data.board._id;
        return this.http.patch(`${APIUrl}/boards/${boardId}`, { userId: currentUserId } )
          .pipe(
            catchError(this.notifications.handleError('patch', 'create board with user'))
          );
      })
    ).toPromise();
  }

  removeBoard(boardId: string): Promise<void> {
    return this.http.delete(`${APIUrl}/boards/${boardId}`).pipe(
      catchError(this.notifications.handleError('delete', 'remove board')),
    ).toPromise();
  }

  openCreateBoardDialog(currentUserId: string): Promise<any> {
    return this.dialog.open(CreateNewDataComponent, {
      width: '250px',
      data: {
        type: 'text',
        title: '',
        placeholder: 'Add Board Title',
        send: 'Create Board'
      }
    }).afterClosed()
      .pipe(
        take(1),
        map((title: string) => {
          if (!title) {
            return;
          }
          return this.createBoard(title, currentUserId);
        })
      ).toPromise();
  }
}
