import { Component } from '@angular/core';

import { companyList } from '@services/company/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent {
  companies = companyList;
}
