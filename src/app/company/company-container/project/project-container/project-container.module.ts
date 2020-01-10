import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProjectContainerRoutingModule } from './project-container-routing.module';
import { ProjectViewComponent } from './project-view/project-view.component';
import { ProjectContainerComponent } from './project-container.component';

@NgModule({
  declarations: [ProjectViewComponent, ProjectContainerComponent],
  imports: [CommonModule, ProjectContainerRoutingModule, ReactiveFormsModule]
})
export class ProjectContainerModule {}
