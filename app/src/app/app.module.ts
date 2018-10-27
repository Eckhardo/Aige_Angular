import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule, routedComponents} from './app-routing.module';

import {AppComponent} from './app.component';
import {NgModule} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {IntermodalRoutesModule} from './intermodal/im.routes.module';
import {EnumService} from './services/enum.service';
import {MissingRoutingsModule} from './missingRoutes/missing-routes.module';
import {NewRoutingEngineModule} from './newRoutingEngine/new-routing-engine.module';
import {SharedModule} from './shared/shared.module';


@NgModule({
  declarations: [routedComponents],
  imports: [


    BrowserAnimationsModule,
    SharedModule,
    MissingRoutingsModule,
    IntermodalRoutesModule,
    NewRoutingEngineModule,
    AppRoutingModule

  ],
  providers: [EnumService,
    {provide: APP_BASE_HREF, useValue: window['_app_base'] || '/'}],

  bootstrap: [AppComponent]
})
export class AppModule {
}
