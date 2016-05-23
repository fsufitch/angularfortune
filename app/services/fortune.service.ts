import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export interface FortuneEntry {
  body: string;
  offensive: boolean;
  custom: boolean;
}

@Injectable()
export class FortuneService {
  private fortunes: String[];
  private getFortuneUrl = 'get_fortune';

  constructor(private http: Http) {
    this.fortunes = new Array<String>();

  }

  getFortune(cleanHumor:boolean=false): Observable<FortuneEntry> {
    let url = this.getFortuneUrl;
    if (cleanHumor) {
      url += "/clean";
    }

    let data = this.http.get(url).map(this.extractFortune);
    return data;
  }

  private extractFortune(res: Response) {
    return res.json() || {};
  }
}
