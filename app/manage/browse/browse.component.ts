import {Component, Inject, provide} from '@angular/core';
import {Control} from '@angular/common';
import {FortuneEntry, FortuneService} from '../../services/fortune.service';
import {FortuneSearchService} from '../../services/search.service';
import {Router, RouteSegment} from '@angular/router';

import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'fortuneBrowse',
  templateUrl: 'app/manage/browse/browse.component.html',
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
    this.searchQueryControl.valueChanges.debounceTime(1000).subscribe(
      (newValue) => {
        this.updateSearch(newValue);
      })
  }

  updateSearch(searchQuery: string) {
    this.searchQuery = searchQuery;
    console.log("searching: " + searchQuery);
    console.log(this.fortuneSearchService);
    console.log(this.searchQueryControl);
    console.log(this);
    this.fortuneSearchService.search(searchQuery).subscribe(data => {
      this.resultPages = data.pages;
      this.currentPage = data.page;
      this.searchResults = data.results;
    })
  }

}
