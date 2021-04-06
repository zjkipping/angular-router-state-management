import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Company } from '@types';
import { RouterStateService } from '@services/router-state/router-state.service';
import { CompanyService } from '@services/company/company.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-view',
  templateUrl: './company-view.component.html',
  styleUrls: ['./company-view.component.scss'],
})
export class CompanyViewComponent {
  company$: Observable<Company>;

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.company$ = companyService.selectedCompany;
  }

  async deleteCompany() {
    await this.companyService.deleteSelectedCompany();
    await this.router.navigate(['../'], {
      relativeTo: this.activatedRoute,
    });
  }
}
