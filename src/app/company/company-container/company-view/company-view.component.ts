import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { CompanyService, Company } from '@services/company/company.service';

@Component({
  selector: 'app-company-view',
  templateUrl: './company-view.component.html',
  styleUrls: ['./company-view.component.scss']
})
export class CompanyViewComponent {
  company: Observable<Company>;

  constructor(companyService: CompanyService) {
    this.company = companyService.selectedCompany;
  }
}
