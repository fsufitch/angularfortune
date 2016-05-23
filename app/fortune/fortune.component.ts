import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FortuneService, FortuneEntry} from '../services/fortune.service';

@Component({
  selector: 'fortune',
  templateUrl: 'app/fortune/fortune.component.html',
})
export class FortuneComponent {
  title: string = 'Your fortune';
  fortune: FortuneEntry;
  cleanHumor: boolean = false;

  constructor(private fortuneService: FortuneService,
              private router: Router) {
                this.fortune = null;
  }

  ngOnInit() {
    this.updateFortune();
  }

  updateFortune() {
    this.fortuneService.getRandomFortune(this.cleanHumor)
      .subscribe(data => {
        this.fortune = data;
      });
  }
}
