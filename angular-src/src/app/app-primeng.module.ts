import {NgModule} from '@angular/core';

import {DataTableModule, InputTextModule, RadioButtonModule, SharedModule} from 'primeng/primeng';

@NgModule({
  imports: [RadioButtonModule, InputTextModule, DataTableModule, SharedModule],
  exports: [RadioButtonModule, InputTextModule, DataTableModule, SharedModule],
})

export class AppPrimengModule {
}
