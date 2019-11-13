import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SearchService {
  private searchTextSbj = new Subject<string>();
  constructor() { }

  setSearchText(text: string): void {
    this.searchTextSbj.next(text);
  }

  getSearchText(): Observable<string> {
    return this.searchTextSbj.asObservable();
  }
}
