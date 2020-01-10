import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyFormComponent } from './company-form/company-form.component';

@NgModule({
  declarations: [CompanyListComponent, CompanyFormComponent],
  imports: [CommonModule, CompanyRoutingModule, ReactiveFormsModule]
})
export class CompanyModule {}
