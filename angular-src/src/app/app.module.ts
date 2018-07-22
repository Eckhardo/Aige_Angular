import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './app-material.module';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {HomeComponent} from './home/home/home.component';
import {ChangeDetectorPipe} from './pipes/change-detector-pipe';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {IntermodalRoutesModule} from './intermodal/im.routes.module';
import {EnumService} from './services/enum.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MissingRoutingsModule} from './missingRoutes/missing-routes.module';
import {NewRoutingEngineModule} from './newRoutingEngine/new-routing-engine.module';
import {RouterModule} from '@angular/router';


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
    RouterModule,
    AppRoutingModule,
    MissingRoutingsModule,
    IntermodalRoutesModule,
    NewRoutingEngineModule


  ],
  providers: [EnumService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule {
}
