import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyFormComponent } from './company-form/company-form.component';

@NgModule({
  declarations: [CompanyListComponent, CompanyFormComponent],
  imports: [CommonModule, CompanyRoutingModule]
})
export class CompanyModule {}
