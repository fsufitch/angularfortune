import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export interface FortuneEntry {
  id: number;
  body: string;
  offensive: boolean;
  custom: boolean;
}

@Injectable()
export class FortuneService {
  private getRandomFortuneUrl = 'get_random_fortune';
  private fortuneUrl = 'fortune';

  constructor(private http: Http) {
  }

  getRandomFortune(cleanHumor:boolean=false): Observable<FortuneEntry> {
    let url = this.getRandomFortuneUrl;
    if (cleanHumor) {
      url += "/clean";
    }
    console.log(url);
    let data = this.http.get(url).map(this.extractFortune).catch(this.handleError);
    return data;
  }

  getFortune(id: number): Observable<FortuneEntry> {
    let url = this.fortuneUrl + '/' + id;
    let data = this.http.get(url).map(this.extractFortune).catch(this.handleError);
    return data;
  }

  updateFortune(id: number, entry: FortuneEntry): Observable<any> {
    let url = this.fortuneUrl + '/' + id;
    let body = JSON.stringify({
      "body": entry.body,
      "offensive": entry.offensive,
    });
    console.log(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let data = this.http.post(url, body, options).catch(this.handleError);
    return data;
  }

  private extractFortune(res: Response) {
    console.log("Extracting...");
    console.log(res.json());
    return res.json() || {};
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
