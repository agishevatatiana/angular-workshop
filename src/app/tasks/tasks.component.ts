import {Component, Input, OnInit} from '@angular/core';
import {trackById} from '../utils';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  @Input() tasks: any;
  trackById = trackById;
  addOpen: boolean;
  taskTitle: string;

  constructor() {
    this.addOpen = false;
  }

  addTask(): void {
    // if (this.boardId && this.listTitle) {
    //   this.listService.createList(this.listTitle, this.boardId).then(() => {
    //     this.getBoard.emit();
    //     this.listTitle = '';
    //     this.addOpen = false;
    //   });
    // }
  }

  close(event: MouseEvent): void {
    event.stopPropagation();
    this.addOpen = false;
  }

  ngOnInit() {
  }

}
