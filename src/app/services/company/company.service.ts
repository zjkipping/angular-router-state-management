import {
  HttpClient,
  HttpParams,
  HttpParamsOptions,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, merge, Observable, of } from 'rxjs';
import {
  map,
  shareReplay,
  switchMap,
  distinctUntilChanged,
  first,
  delay,
} from 'rxjs/operators';

import { RouterStateService } from '@services/router-state/router-state.service';
import {
  companyRouteParamKey,
  companySearchQueryParamKey,
} from '@constants/route-params';
import { Company } from '@types';

const apiUrl = '/api/companies';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  companySearchQuery: Observable<string | null>;
  companies: Observable<Company[] | null>;
  selectedCompanyId: Observable<number | null>;
  selectedCompany: Observable<Company | null>;

  private fetchCompanies = new BehaviorSubject<void>(null);
  private fetchSelectedCompany = new BehaviorSubject<void>(null);

  constructor(private http: HttpClient, routerState: RouterStateService) {
    this.companySearchQuery = routerState.queryParamsMap.pipe(
      map((queryParams) => queryParams.get(companySearchQueryParamKey))
    );

    this.companies = combineLatest([
      this.companySearchQuery,
      this.fetchCompanies,
    ]).pipe(
      switchMap(([query]) =>
        merge(of(null), this.getCompanies(query).pipe(delay(500)))
      ),
      shareReplay(1)
    );

    this.selectedCompanyId = routerState.routeParamsMap.pipe(
      map((params) => Number(params.get(companyRouteParamKey))),
      distinctUntilChanged()
    );

    this.selectedCompany = combineLatest([
      this.selectedCompanyId,
      this.fetchSelectedCompany,
    ]).pipe(
      switchMap(([id]) =>
        id ? merge(of(null), this.getCompany(id).pipe(delay(500))) : of(null)
      ),
      shareReplay(1)
    );
  }

  private getCompanies(query: string) {
    const options: HttpParamsOptions = {
      fromObject: query
        ? {
            name_like: query,
          }
        : {},
    };
    const params = new HttpParams(options);
    return this.http.get<Company[]>(apiUrl, { params });
  }

  private getCompany(id: number) {
    return this.http.get<Company>(`${apiUrl}/${id}`);
  }

  async createCompany(companyDetails: Omit<Company, 'id'>) {
    await this.http.post(apiUrl, companyDetails).pipe(first()).toPromise();
    this.fetchCompanies.next();
  }

  async updateCompany(company: Company) {
    await this.http
      .put(`${apiUrl}/${company.id}`, company)
      .pipe(first())
      .toPromise();
    this.fetchCompanies.next();
    this.fetchSelectedCompany.next();
  }

  async deleteSelectedCompany() {
    const id = await this.selectedCompanyId.pipe(first()).toPromise();
    await this.http.delete(`${apiUrl}/${id}`).pipe(first()).toPromise();
    this.fetchCompanies.next();
  }
}
