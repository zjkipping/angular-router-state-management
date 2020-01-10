import { Component } from '@angular/core';

import { Company, CompanyService } from '@services/company/company.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent {
  companies: Observable<Company[]>;

  constructor(companyService: CompanyService) {
    this.companies = companyService.companies;
  }
}
