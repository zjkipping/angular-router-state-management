import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { projectRouteParamKey } from '@constants/route-params';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectFormComponent } from './project-form/project-form.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent
  },
  {
    path: 'new',
    component: ProjectFormComponent
  },
  {
    path: `:${projectRouteParamKey}`,
    loadChildren: () =>
      import('./project-container/project-container.module').then(
        m => m.ProjectContainerModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}
