import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {AppMaterialModule} from '../app-material.module';

import {SearchRoutesComponent} from './missing-routes.search.component/search-routes.component';
import {RoutesRoutingModule} from './missing-routes.routing.module';

import {EnumService} from '../services/enum.service';
import {MissingRoutesResultComponent} from './missing-routes.result.component/masterdata-routes.component';
import {RoutesSearchService} from './services/routes.search.service';

import {CdkTableModule} from '@angular/cdk/table';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatLineModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatOptionModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({

  imports: [
    CommonModule,
    AppMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RoutesRoutingModule],

  declarations: [MissingRoutesResultComponent, SearchRoutesComponent],





  providers: [RoutesSearchService, EnumService],

})
export class MissingRoutingsModule {
}
