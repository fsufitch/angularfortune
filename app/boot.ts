import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from '@angular/common';
import {ROUTER_PROVIDERS} from '@angular/router';
import {AppComponent} from './app.component';
bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  provide(APP_BASE_HREF, {useValue: '/'}),
  provide(LocationStrategy, {useClass: HashLocationStrategy}),
]);
