import {Injectable} from '@angular/core';
import {Http, Response, Headers, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class FortuneSearchService {
  private searchUrl = 'search';
  public currentSearch = '';
  public currentPage = 0;

  constructor(private http: Http) {

  }

  setSearch(query: string, page: number=0) {
    this.currentSearch = query;
    this.currentPage = page;
  }

  search() {
    let url = this.searchUrl;
    let params = new URLSearchParams();
    params.set('query', this.currentSearch);
    params.set('page', "" + this.currentPage);
    let data = this.http.get(url, {'search': params}).map(this.extractData).catch(this.handleError);
    return data;
  }

  private extractData(res: Response) {
    let data = res.json();
    return res.json() || {};
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : `Server error`;
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
