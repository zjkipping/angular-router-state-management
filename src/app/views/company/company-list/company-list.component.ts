import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { CompanyService } from '@services/company/company.service';
import { Company } from '@types';

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
