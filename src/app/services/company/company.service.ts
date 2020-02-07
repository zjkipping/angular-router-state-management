import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  map,
  shareReplay,
  switchMap,
  distinctUntilChanged
} from 'rxjs/operators';

import { RouterStateService } from '@services/router-state/router-state.service';
import { companyRouteParamKey } from '@constants/route-params';
import { Company } from '@types';

import { fetchCompanyList, fetchCompanyDetails } from './company.mock';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  companies: Observable<Company[]>;
  selectedCompanyReferenceId: Observable<string | null>;
  selectedCompany: Observable<Company | null>;

  constructor(routerState: RouterStateService) {
    this.companies = fetchCompanyList();
    this.selectedCompanyReferenceId = routerState.routeParamsMap.pipe(
      map(params => params.get(companyRouteParamKey)),
      distinctUntilChanged()
    );
    this.selectedCompany = this.selectedCompanyReferenceId.pipe(
      switchMap(refId => (refId ? fetchCompanyDetails(refId) : of(null))),
      shareReplay(1)
    );
  }

  async createCompany(val: Omit<Company, 'referenceId'>) {
    // real functionality mocked out...
  }

  async updateCompany(company: Company) {
    // real functionality mocked out...
  }

  async deleteCompany(refId: string) {
    // real functionality mocked out...
  }
}
