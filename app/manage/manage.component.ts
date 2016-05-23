import {Component} from '@angular/core';
import {RouteSegment} from '@angular/router';
import {FortuneDetailsComponent} from './details/details.component';
import {FortuneBrowseComponent} from './browse/browse.component';

@Component({
  selector: 'manageFortunes',
  templateUrl: 'app/manage/manage.component.html',
  directives: [FortuneDetailsComponent, FortuneBrowseComponent],
})
export class ManageFortunesComponent{
  fortuneId: number;

  constructor() {}

  routerOnActivate(segment: RouteSegment) {
    let id = +segment.getParam("fortuneId");
    this.fortuneId = id;
    console.log("Manage says id is: " + id);
    }
}
