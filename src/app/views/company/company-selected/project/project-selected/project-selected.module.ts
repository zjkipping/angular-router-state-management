import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProjectSelectedRoutingModule } from './project-selected-routing.module';
import { ProjectViewComponent } from './project-view/project-view.component';

@NgModule({
  declarations: [ProjectViewComponent],
  imports: [CommonModule, ProjectSelectedRoutingModule, ReactiveFormsModule],
})
export class ProjectSelectedModule {}
