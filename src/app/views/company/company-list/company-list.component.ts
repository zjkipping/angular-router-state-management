import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { CompanyService } from '@services/company/company.service';
import { Company } from '@types';
import { FormControl } from '@angular/forms';
import { RouterStateService } from '@services/router-state/router-state.service';
import { first, takeUntil } from 'rxjs/operators';
import { companySearchQueryParamKey } from '@constants/route-params';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
})
export class CompanyListComponent implements OnInit, OnDestroy {
  companies$: Observable<Company[]>;
  companySearchControl = new FormControl('');
  destroy = new Subject();

  constructor(
    private routerState: RouterStateService,
    private router: Router,
    companyService: CompanyService
  ) {
    this.companies$ = companyService.companies;

    this.companySearchControl.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe((value) =>
        this.router.navigate([], {
          queryParams: { [companySearchQueryParamKey]: value || null },
        })
      );
  }

  async ngOnInit() {
    const queryParams = await this.routerState.queryParamsMap
      .pipe(first())
      .toPromise();

    this.companySearchControl.patchValue(
      queryParams.get(companySearchQueryParamKey)
    );
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
