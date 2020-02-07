import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { projectRouteParamKey } from '@constants/route-params';
import { ProjectListComponent } from './project-list/project-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent
  },
  {
    path: 'new',
    loadChildren: () =>
      import('./project-form/project-form.module').then(
        m => m.ProjectFormModule
      )
  },
  {
    path: `:${projectRouteParamKey}`,
    loadChildren: () =>
      import('./project-selected/project-selected.module').then(
        m => m.ProjectSelectedModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}
