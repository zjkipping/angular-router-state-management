import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CompanyContainerRoutingModule } from './company-container-routing.module';
import { CompanyViewComponent } from './company-view/company-view.component';
import { CompanyContainerComponent } from './company-container.component';

@NgModule({
  declarations: [CompanyViewComponent, CompanyContainerComponent],
  imports: [CommonModule, CompanyContainerRoutingModule, ReactiveFormsModule]
})
export class CompanyContainerModule {}
