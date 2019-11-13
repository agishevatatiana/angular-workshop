import { Component, OnInit } from '@angular/core';
import {SearchService} from '../core/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchText: string;
  constructor(private searchService: SearchService) { }

  searchTextInput(): void {
    this.searchService.setSearchText(this.searchText);
  }

  clean(): void {
    this.searchText = '';
    this.searchTextInput();
  }

  ngOnInit() {
  }

}
