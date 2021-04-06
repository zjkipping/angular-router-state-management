import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProjectFormComponent } from './project-form.component';

@NgModule({
  declarations: [ProjectFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProjectFormComponent,
      },
    ]),
  ],
})
export class ProjectFormModule {}
