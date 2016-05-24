import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'pager',
  templateUrl: 'app/pager/pager.component.html',
  styleUrls: ['app/pager/pager.component.css'],
})
export class PagerComponent {
  @Input('numPages') numPages: number;
  @Input('currentPage') currentPage: number;
  @Output('pageChanged') pageChanged = new EventEmitter();

  private getPages() {
    let pages = [];

    for(let i=0; i<this.numPages; i++) {
      pages.push( {
        "pagenum": i,
        "display": "" + (i+1),
      });
    }
    return pages;
  }

  private triggerPageChange(page: number) {
    console.log(page);
    //this.currentPage = page;
    this.pageChanged.emit({'page': page});
  }

  private prevPage() {
    if (this.currentPage > 0) {
      this.triggerPageChange(this.currentPage - 1);
    }
  }

  private nextPage() {
    if (this.currentPage < this.numPages - 1) {
      this.triggerPageChange(this.currentPage + 1);
    }
  }
}
