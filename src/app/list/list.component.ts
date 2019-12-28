import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListService } from '../core/services/list.service';
import { trackById } from '../utils';

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
  lastCurrentListTitle: string;
  trackById = trackById;
  colsNumber = 23;
  maxLength = 250;

  constructor(
    private listService: ListService
  ) {
    this.addOpen = false;
  }

  showRows(listTitle: string): number {
    return Math.ceil(listTitle.length / this.colsNumber);
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

  saveOldTitle(listTitle: string): void {
    this.lastCurrentListTitle = listTitle;
  }

  updateListTitle(element: any, listTitle: string, listId: string): void {
    if (listTitle && listId) {
      element.value = listTitle.trim();
      this.listService.updateList(listTitle, listId);
    } else {
      element.value = this.lastCurrentListTitle;
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
