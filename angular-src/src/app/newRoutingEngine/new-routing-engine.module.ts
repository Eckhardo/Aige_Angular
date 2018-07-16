import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {AppMaterialModule} from '../app-material.module';

import {NewRoutingEngineComponent} from './nre.search.component/nre-search.component';
import {RoutesRoutingModule} from './new-routing-engine.routes.module';

import {EnumService} from '../services/enum.service';
import {NewRoutingeEngineResultComponent} from './nre.result.component/nre-result.component';
import {NewRoutesSearchService} from './services/new-routing-engine.search.service';

@NgModule({

  declarations: [NewRoutingeEngineResultComponent, NewRoutingEngineComponent],

  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RoutesRoutingModule,
    AppMaterialModule
  ],

  providers: [NewRoutesSearchService, EnumService],

})
export class NewRoutingEngineModule {
}
