import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CompanyFormComponent } from './company-form.component';

@NgModule({
  declarations: [CompanyFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CompanyFormComponent,
      },
    ]),
  ],
})
export class CompanyFormModule {}
