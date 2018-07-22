import {NgModule} from '@angular/core';
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
  MatSpinner,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule

} from '@angular/material';
const modules = [
  CdkTableModule, MatTableModule, MatSortModule, MatPaginatorModule,
  MatGridListModule, MatAutocompleteModule, MatDialogModule, MatLineModule, MatListModule,
  MatDatepickerModule, MatNativeDateModule, MatMenuModule, MatButtonModule, MatCheckboxModule,
  MatInputModule, MatRadioModule, MatSelectModule, MatOptionModule, MatToolbarModule, MatIconModule,
  MatCardModule, MatProgressSpinnerModule, MatFormFieldModule
];
@NgModule({
  imports:[...modules],
  exports:[...modules]
 })

export class AppMaterialModule {
}
