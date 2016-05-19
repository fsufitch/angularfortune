import {Component} from '@angular/core';
import {Router, Routes, ROUTER_DIRECTIVES} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';
import {FortuneComponent} from './fortune.component';
import {ManageFortunesComponent} from './manage/manage.component';

@Component({
  selector: 'app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS],
})
@Routes([
  {path: "/show", component: FortuneComponent},
  {path: "/add", component: ManageFortunesComponent},
])
export class AppComponent{
  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.navigate(['/show']);
  }
}
