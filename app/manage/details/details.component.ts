import {Component, Input} from '@angular/core';
import {FortuneEntry, FortuneService} from '../../services/fortune.service';
import {Router, RouteSegment} from '@angular/router';

@Component({
  selector: 'fortuneDetails',
  templateUrl: 'app/manage/details/details.component.html',
})
export class FortuneDetailsComponent{
  @Input('id') fortuneId: number;
  fortune: FortuneEntry;
  editing: boolean;

  constructor(
    private fortuneService: FortuneService,
    private router: Router) {
      this.fortune = null;
      this.editing = false;
    }

  ngOnChanges(segment: RouteSegment) {
    let id = this.fortuneId;
    console.log("Details says id is: " + id);
    if (!id) {
      this.fortune = null;
      return;
    }
    console.log("getting fortune...");

    this.fortuneService.getFortune(id).subscribe(entry => {console.log(entry); this.fortune = entry});
  }

  saveChanges() {
    if (!this.editing) return;
    this.fortuneService.updateFortune(this.fortuneId, this.fortune).subscribe();
    this.editing = false;
  }
}
