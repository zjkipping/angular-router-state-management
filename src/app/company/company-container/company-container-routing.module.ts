import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyContainerComponent } from './company-container.component';
import { CompanyViewComponent } from './company-view/company-view.component';
import { CompanyFormComponent } from '../company-form/company-form.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyContainerComponent,
    children: [
      {
        path: '',
        component: CompanyViewComponent
      },
      {
        path: 'edit',
        component: CompanyFormComponent
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('./project/project.module').then(m => m.ProjectModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyContainerRoutingModule {}
