import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppMaterialModule} from './app-material.module';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {NgModule} from '@angular/core';

import {HomeComponent} from './home/home/home.component';
import {ChangeDetectorPipe} from './pipes/change-detector-pipe';
import {HttpClientModule} from '@angular/common/http';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {IntermodalRoutesModule} from './intermodal/im.routes.module';
import {EnumService} from './services/enum.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MissingRoutingsModule} from './missingRoutes/missing-routes.module';
import {NewRoutingEngineModule} from './newRoutingEngine/new-routing-engine.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChangeDetectorPipe,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    HttpClientModule,
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
