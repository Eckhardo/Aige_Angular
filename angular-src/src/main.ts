import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
// hammer.js is needed by some material components
import 'hammerjs';
import {ConfigService} from './app/services/config.service';

ConfigService.set('api', 'http://localhost:3000');
ConfigService.set('glassfish', 'http://localhost:8080/RoutingREST/resources');
ConfigService.set('tomcat', 'http://localhost:8080/nre');

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
