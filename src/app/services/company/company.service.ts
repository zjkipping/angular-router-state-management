import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export interface Company {
  referenceId: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private companyListData: Company[] = [
    { referenceId: '123abc', name: 'Company 1' },
    { referenceId: '456def', name: 'Company 2' },
    { referenceId: '678ghi', name: 'Company 3' },
    { referenceId: '901jkl', name: 'Company 4' }
  ];
  private companyList = new BehaviorSubject<Company[]>(this.companyListData);
  private selectedCompanyRefId = new BehaviorSubject<string | null>(null);

  companies: Observable<Company[]>;
  selectedCompanyReferenceId: Observable<string | null>;
  selectedCompany: Observable<Company | null>;

  constructor() {
    this.companies = this.companyList.asObservable();
    this.selectedCompanyReferenceId = this.selectedCompanyRefId.asObservable();
    this.selectedCompany = this.selectedCompanyRefId.pipe(
      map(refId => {
        if (refId) {
          return this.companyListData.find(c => c.referenceId === refId);
        } else {
          return null;
        }
      }),
      shareReplay(1)
    );
  }

  setSelectedCompany(referenceId: string) {
    this.selectedCompanyRefId.next(referenceId);
  }

  clearSelectedCompany() {
    this.selectedCompanyRefId.next(null);
  }
}
