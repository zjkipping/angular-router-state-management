import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import { CompanyService } from '@services/company/company.service';
import { companyRouteParamKey } from '@constants/route-params';

@Component({
  selector: 'app-company-container',
  templateUrl: './company-container.component.html',
  styleUrls: ['./company-container.component.scss']
})
export class CompanyContainerComponent implements OnDestroy {
  destroy = new Subject();

  constructor(private companyService: CompanyService, route: ActivatedRoute) {
    route.paramMap
      .pipe(
        map(params => params.get(companyRouteParamKey)),
        takeUntil(this.destroy)
      )
      .subscribe(companyRefId =>
        this.companyService.setSelectedCompany(companyRefId)
      );
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
    this.companyService.clearSelectedCompany();
  }
}
