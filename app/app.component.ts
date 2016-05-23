import {Component, provide} from '@angular/core';
import {Router, Routes, ROUTER_DIRECTIVES} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';
import {FortuneComponent} from './fortune/fortune.component';
import {FortuneService} from './services/fortune.service';
import {FortuneSearchService} from './services/search.service';
import {ManageFortunesComponent} from './manage/manage.component';

@Component({
  selector: 'app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS,
              provide(FortuneService, {useClass: FortuneService}),
              provide(FortuneSearchService, {useClass: FortuneSearchService})],
})
@Routes([
  {path: "/show", component: FortuneComponent},
  {path: "/manage/:fortuneId", component: ManageFortunesComponent},
  {path: "/manage", component: ManageFortunesComponent},
])
export class AppComponent{
  constructor(private router: Router) {
  }

}
