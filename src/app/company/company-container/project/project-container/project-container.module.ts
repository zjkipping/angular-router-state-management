import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectContainerRoutingModule } from './project-container-routing.module';
import { ProjectViewComponent } from './project-view/project-view.component';
import { ProjectContainerComponent } from './project-container.component';

@NgModule({
  declarations: [ProjectViewComponent, ProjectContainerComponent],
  imports: [CommonModule, ProjectContainerRoutingModule]
})
export class ProjectContainerModule {}
