import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {AppMaterialModule} from '../app-material.module';

import {NewRoutingEngineComponent} from './nre.search.component/nre-search.component';
import {RoutesRoutingModule} from './new-routing-engine.routes.module';

import {EnumService} from '../services/enum.service';
import {NewRoutingeEngineResultComponent} from './nre.result.component/nre-result.component';
import {NewRoutesSearchService} from './services/new-routing-engine.search.service';
import {NO_ERRORS_SCHEMA} from "@angular/compiler/src/core";

@NgModule({

  imports: [
    CommonModule,
    AppMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RoutesRoutingModule
  ],

  declarations: [NewRoutingeEngineResultComponent, NewRoutingEngineComponent],


  providers: [NewRoutesSearchService, EnumService]


})
export class NewRoutingEngineModule {
}
