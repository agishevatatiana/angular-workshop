import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, map, take} from 'rxjs/operators';

import { NotificationsService } from './notifications.service';
import { AuthData, User } from '../models';
import { APIUrl } from '../constants';
import {CreateNewDataComponent} from '../../shared/dialog/create-new-data/create-new-data.component';
import {MatDialog} from '@angular/material';
import {ShowDataComponent} from '../../shared/dialog/show-data/show-data.component';
import { Subject } from 'rxjs';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
    private notifications: NotificationsService,
    private dialog: MatDialog
  ) {}

  openInviteUserDialog(boardId: string, boardSubject: Subject<any>): Promise<any> {
    return this.dialog.open(CreateNewDataComponent, {
      width: '250px',
      data: {
        type: 'email',
        title: '',
        placeholder: 'Email address',
        send: 'Invite'
      }
    }).afterClosed()
      .pipe(
        take(1),
        map(async (email: string) => {
          if (!email) {
            return;
          }
          const inviteUser = await this.getUserByEmail(email);
          if (!inviteUser) {
            return this.notifications.handleError('get', 'get user by email');
          }
          const inviteUserId = inviteUser._id;
          return this.addRemoveUserOnBoard(boardId, inviteUserId, boardSubject);
        })
      ).toPromise();
  }

  openUserInfoDialog(boardId: string, user: User, boardSubject: Subject<any>): any {
    return this.dialog.open(ShowDataComponent, {
      width: '250px',
      data: {
        title: 'User Info',
        info: user,
        handleConfirm: (userId: string) => {
          if (userId && boardId) {
            return this.addRemoveUserOnBoard(boardId, userId, boardSubject);
          }
        }
      }
    }).afterClosed().toPromise();
  }

  private getUserByEmail(userEmail: string): Promise<User> {
    return this.http.get(`${APIUrl}/users/?email=${userEmail}`).pipe(
      catchError(this.notifications.handleError('get', 'get user by email')),
      map((userData: AuthData) => userData && userData.data && userData.data.user)
    ).toPromise();
  }

  private addRemoveUserOnBoard(boardId: string, userId: string, boardSubject: Subject<any>): Promise<any> {
    return this.http.patch(`${APIUrl}/boards/${boardId}`, { userId } )
      .pipe(
        catchError(this.notifications.handleError('patch', 'add user on board')),
        map(board => boardSubject.next(board.data))
      ).toPromise();
  }
}
