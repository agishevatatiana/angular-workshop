import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { trackById } from '../utils';
import { TaskService } from '../core/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  @Input() tasks: any;
  @Input() listId: string;
  @Output() getBoard = new EventEmitter();
  trackById = trackById;
  addOpen: boolean;
  taskTitle: string;
  lastCurrentTaskTitle: string;
  colsNumber = 15;
  maxLength = 250;

  constructor(
    private taskService: TaskService
  ) {
    this.addOpen = false;
  }

  showRows(taskTitle: string): number {
    return Math.ceil(taskTitle.length / this.colsNumber);
  }

  addTask(): void {
    if (this.listId && this.taskTitle) {
      this.taskService.createTask(this.taskTitle, this.listId).then(() => {
        this.getBoard.emit();
        this.taskTitle = '';
        this.addOpen = false;
      });
    }
  }

  saveOldTitle(listTitle: string): void {
    this.lastCurrentTaskTitle = listTitle;
  }

  updateTask(element: any, task: string, taskId: string): void {
    if (task && taskId) {
      element.value = task.trim();
      this.taskService.updateTask(task, taskId);
    } else {
      element.value = this.lastCurrentTaskTitle;
    }
  }

  close(event: MouseEvent): void {
    event.stopPropagation();
    this.addOpen = false;
  }

  remove(event, taskId: string): void {
    event.stopPropagation();
    this.taskService.removeTask(taskId).then(() => this.getBoard.emit());
  }

  ngOnInit() {}
}
