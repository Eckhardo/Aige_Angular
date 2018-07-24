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
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [CdkTableModule, MatTableModule, MatSortModule, MatPaginatorModule, MatGridListModule, MatAutocompleteModule, MatDialogModule, MatLineModule, MatListModule, MatDatepickerModule, MatNativeDateModule, MatMenuModule, MatButtonModule, MatCheckboxModule, MatInputModule, MatRadioModule, MatSelectModule, MatOptionModule, MatToolbarModule, MatIconModule, MatCardModule, MatProgressSpinnerModule, MatFormFieldModule],
  exports: [CdkTableModule, MatTableModule, MatSortModule, MatPaginatorModule, MatGridListModule, MatAutocompleteModule, MatDialogModule, MatLineModule, MatListModule, MatDatepickerModule, MatNativeDateModule, MatMenuModule, MatButtonModule, MatCheckboxModule, MatInputModule, MatRadioModule, MatSelectModule, MatOptionModule, MatToolbarModule, MatIconModule, MatCardModule, MatProgressSpinnerModule, MatFormFieldModule]
})

export class AppMaterialModule {
}
