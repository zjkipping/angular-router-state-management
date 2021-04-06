import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyViewComponent } from './company-view/company-view.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyViewComponent,
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('../company-form/company-form.module').then(
        (m) => m.CompanyFormModule
      ),
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./project/project.module').then((m) => m.ProjectModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanySelectedRoutingModule {}
