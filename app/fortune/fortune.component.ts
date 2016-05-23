import {Component, provide} from '@angular/core';
import {FortuneService} from './fortune.service';

@Component({
  selector: 'fortune',
  templateUrl: 'app/fortune/fortune.component.html',
  providers: [provide(FortuneService, {useClass: FortuneService})]
})
export class FortuneComponent {
  title: string = 'Your fortune';
  fortune: string;
  offensive: boolean;
  cleanHumor: boolean = false;

  constructor(private fortuneService: FortuneService) {}

  ngOnInit() {
    this.updateFortune();
  }

  updateFortune() {
    this.fortuneService.getFortune(this.cleanHumor)
      .subscribe(data => {
        this.fortune = data.body;
        this.offensive = data.offensive;
      });
  }
}
