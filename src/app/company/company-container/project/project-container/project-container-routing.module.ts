import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectViewComponent } from './project-view/project-view.component';
import { ProjectContainerComponent } from './project-container.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectContainerComponent,
    children: [
      {
        path: '',
        component: ProjectViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectContainerRoutingModule {}
