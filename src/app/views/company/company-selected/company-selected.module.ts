import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CompanyViewComponent } from './company-view/company-view.component';
import { CompanySelectedRoutingModule } from './company-selected-routing.module';

@NgModule({
  declarations: [CompanyViewComponent],
  imports: [CommonModule, CompanySelectedRoutingModule, ReactiveFormsModule]
})
export class CompanySelectedModule {}
