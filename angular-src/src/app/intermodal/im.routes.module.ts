import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {AppMaterialModule} from '../app-material.module';

import {SearchIntermodalComponent} from './im.search/search-intermodal.component';
import {ResultIntermodalComponent} from './im.result/result-intermodal.component';
import {IntermodalRoutesRoutingModule} from './im.routes-routing.module';
import {EnumService} from '../services/enum.service';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material';
import {AppDateAdapter} from '../services/date.utils/date.adapter';
import {APP_DATE_FORMATS} from '../services/date.utils/date.format';
import {GeoScopeService} from '../services/geoscope.service';
import {IntermodalSearchService} from './services/im.search.service';

@NgModule({

  imports: [
    CommonModule,
    AppMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    IntermodalRoutesRoutingModule
  ],
  declarations: [SearchIntermodalComponent, ResultIntermodalComponent],

  providers: [GeoScopeService, IntermodalSearchService, EnumService,

    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    },

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]

})
export class IntermodalRoutesModule {
}
