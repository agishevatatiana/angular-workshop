import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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

  constructor(
    private taskService: TaskService
  ) {
    this.addOpen = false;
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

  close(event: MouseEvent): void {
    event.stopPropagation();
    this.addOpen = false;
  }

  remove(event, taskId: string): void {
    event.stopPropagation();
    this.taskService.removeTask(taskId).then(() => this.getBoard.emit());
  }

  ngOnInit() {
    console.log(this.tasks);
  }

}
