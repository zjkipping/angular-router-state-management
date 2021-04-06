import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyListComponent } from './company-list/company-list.component';

@NgModule({
  declarations: [CompanyListComponent],
  imports: [CommonModule, CompanyRoutingModule, ReactiveFormsModule],
})
export class CompanyModule {}
