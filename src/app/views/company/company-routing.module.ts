import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { companyRouteParamKey } from '@constants/route-params';
import { CompanyListComponent } from './company-list/company-list.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyListComponent,
  },
  {
    path: 'new',
    loadChildren: () =>
      import('./company-form/company-form.module').then(
        (m) => m.CompanyFormModule
      ),
  },
  {
    path: `:${companyRouteParamKey}`,
    loadChildren: () =>
      import('./company-selected/company-selected.module').then(
        (m) => m.CompanySelectedModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}
