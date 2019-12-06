import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { NotificationsService } from './notifications.service';
import { APIUrl } from '../constants';


@Injectable()
export class ListService {

  constructor(
    private http: HttpClient,
    private notifications: NotificationsService
  ) { }

  createList(title: string, boardId: string): Promise<any> {
    return this.http.post(`${APIUrl}/columns/${boardId}`, { title: title.trim() } ).pipe(
      catchError(this.notifications.handleError('post', 'create list')),
    ).toPromise();
  }

  updateList(title: string, listId: string): Promise<any> {
    return this.http.put(`${APIUrl}/columns/${listId}`, { title: title.trim() } ).pipe(
      catchError(this.notifications.handleError('put', 'update list title')),
    ).toPromise();
  }

  removeList(listId: string): Promise<void> {
    return this.http.delete(`${APIUrl}/columns/${listId}`).pipe(
      catchError(this.notifications.handleError('delete', 'remove list')),
    ).toPromise();
  }

}
