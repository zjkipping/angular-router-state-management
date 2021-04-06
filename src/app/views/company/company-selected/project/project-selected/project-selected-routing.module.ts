import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectViewComponent } from './project-view/project-view.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectViewComponent,
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('../project-form/project-form.module').then(
        (m) => m.ProjectFormModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectSelectedRoutingModule {}
