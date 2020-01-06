import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { companyRouteParamKey } from '@constants/route-params';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyFormComponent } from './company-form/company-form.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyListComponent
  },
  {
    path: 'new',
    component: CompanyFormComponent
  },
  {
    path: `:${companyRouteParamKey}`,
    loadChildren: () =>
      import('./company-container/company-container.module').then(
        m => m.CompanyContainerModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule {}
