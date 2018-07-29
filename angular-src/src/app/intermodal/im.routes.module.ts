import {NgModule} from '@angular/core';
import {IntermodalRoutesRoutingModule, routedComponents} from './im.routes-routing.module';
import {EnumService} from '../services/enum.service';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material';
import {AppDateAdapter} from '../services/date.utils/date.adapter';
import {APP_DATE_FORMATS} from '../services/date.utils/date.format';
import {GeoScopeService} from '../services/geoscope.service';
import {IntermodalSearchService} from './services/im.search.service';
import {SharedModule} from '../shared/shared.module';
import {CountryService} from '../services/country.service';

@NgModule({

  declarations: [routedComponents],

  imports: [SharedModule, IntermodalRoutesRoutingModule],

  providers: [CountryService, GeoScopeService, IntermodalSearchService, EnumService,
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class IntermodalRoutesModule {
}
