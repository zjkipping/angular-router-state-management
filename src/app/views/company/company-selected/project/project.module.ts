import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';

@NgModule({
  declarations: [ProjectListComponent],
  imports: [CommonModule, ProjectRoutingModule, ReactiveFormsModule],
})
export class ProjectModule {}
