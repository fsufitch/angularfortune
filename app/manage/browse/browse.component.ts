import {Component, Inject, provide} from '@angular/core';
import {Control} from '@angular/common';
import {FortuneEntry, FortuneService} from '../../services/fortune.service';
import {FortuneSearchService} from '../../services/search.service';
import {PagerComponent} from '../../pager/pager.component';
import {Router, RouteSegment} from '@angular/router';

import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'fortuneBrowse',
  templateUrl: 'app/manage/browse/browse.component.html',
  styleUrls: ['app/manage/browse/browse.component.css'],
  directives: [PagerComponent],
})
export class FortuneBrowseComponent {
  searchQuery: string;
  searchQueryControl: Control;

  resultPages: number;
  currentPage: number;
  searchResults: FortuneEntry[];

  constructor(private fortuneSearchService: FortuneSearchService,
              private router: Router) {
    this.searchQuery = "";
    this.searchQueryControl = new Control();
    this.searchResults = [];
  }

  ngOnInit() {
    this.searchQuery = this.fortuneSearchService.currentSearch
    this.currentPage = this.fortuneSearchService.currentPage
    this.fortuneSearchService.search().subscribe(data => {
      this.resultPages = data.pages;
      this.currentPage = data.page;
      this.searchResults = data.results;
    })

    this.searchQueryControl.valueChanges.debounceTime(1000).subscribe(
      (newValue) => {
        this.newSearch(newValue);
      })
  }

  newSearch(searchQuery: string) {
    this.searchQuery = searchQuery;
    this.currentPage = 0;
    this.updateSearch();
  }

  updateSearch() {
    this.fortuneSearchService.currentSearch = this.searchQuery;
    this.fortuneSearchService.currentPage = this.currentPage;

    this.fortuneSearchService.search().subscribe(data => {
      this.resultPages = data.pages;
      this.currentPage = data.page;
      this.searchResults = data.results;
    })
  }

  pageChanged(event) {
    console.log("new page is " + event.page);
    this.currentPage = event.page;
    this.updateSearch();
  }
}
