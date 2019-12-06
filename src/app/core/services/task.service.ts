import { Injectable } from '@angular/core';
import {APIUrl} from '../constants';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {NotificationsService} from './notifications.service';

@Injectable()
export class TaskService {

  constructor(
    private http: HttpClient,
    private notifications: NotificationsService
  ) { }

  createTask(task: string, listId: string): Promise<any> {
    return this.http.post(`${APIUrl}/tasks/${listId}`, { task: task.trim() } ).pipe(
      catchError(this.notifications.handleError('post', 'create task')),
    ).toPromise();
  }

  updateTask(task: string, taskId: string): Promise<any> {
    return this.http.put(`${APIUrl}/tasks/${taskId}`, { task: task.trim() } ).pipe(
      catchError(this.notifications.handleError('put', 'update task')),
    ).toPromise();
  }

  removeTask(taskId: string): Promise<void> {
    return this.http.delete(`${APIUrl}/tasks/${taskId}`).pipe(
      catchError(this.notifications.handleError('delete', 'remove task')),
    ).toPromise();
  }
}
