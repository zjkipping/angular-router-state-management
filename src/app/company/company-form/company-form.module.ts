import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { CompanyFormComponent } from './company-form.component';

@NgModule({
  declarations: [CompanyFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CompanyFormComponent
      }
    ])
  ]
})
export class CompanyFormModule {}
