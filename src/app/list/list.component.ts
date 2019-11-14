import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Board} from '../core/models';
import {ListService} from '../core/services/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() lists: any;
  @Input() boardId: string;
  @Output() getBoard = new EventEmitter();
  addOpen: boolean;
  listTitle: string;

  constructor(
    private listService: ListService
  ) {
    this.addOpen = false;
  }

  trackById(index: number, item: Board): string {
    return item._id;
  }

  addList(): void {
    if (this.boardId && this.listTitle) {
      this.listService.createList(this.listTitle, this.boardId).then(() => {
        this.getBoard.emit();
        this.listTitle = '';
        this.addOpen = false;
      });
    }
  }

  close(event: MouseEvent): void {
    event.stopPropagation();
    this.addOpen = false;
  }

  remove(event, listId: string): void {
    event.stopPropagation();
    this.listService.removeList(listId).then(() => this.getBoard.emit());
  }

  ngOnInit() {
  }

}
