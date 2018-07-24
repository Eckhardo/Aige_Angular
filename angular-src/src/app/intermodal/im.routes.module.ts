import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

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
import {CountryService} from '../services/country.service';

@NgModule({

  declarations: [SearchIntermodalComponent, ResultIntermodalComponent],

  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IntermodalRoutesRoutingModule,
    AppMaterialModule
  ],

  providers: [GeoScopeService, CountryService, IntermodalSearchService, EnumService,

    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]

})
export class IntermodalRoutesModule {
}
