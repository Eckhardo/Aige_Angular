import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchIntermodalComponent} from './im.search/search-intermodal.component';
import {ResultIntermodalComponent} from './im.result/result-intermodal.component';

export const intermodalRoutes: Routes = [
  {path: 'searchIntermodal', component: SearchIntermodalComponent}
];
export const routedComponents = [SearchIntermodalComponent, ResultIntermodalComponent];

@NgModule({
    imports: [
      RouterModule.forChild(intermodalRoutes)
    ],
    exports: [RouterModule]

  }
)

export class IntermodalRoutesRoutingModule {
}
