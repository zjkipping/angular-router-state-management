import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export interface Company {
  referenceId: string;
  name: string;
}

export const companyList: Company[] = [
  { referenceId: '123abc', name: 'Company 1' },
  { referenceId: '456def', name: 'Company 2' },
  { referenceId: '678ghi', name: 'Company 3' },
  { referenceId: '901jkl', name: 'Company 4' }
];

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private selectedCompanyReferenceId = new BehaviorSubject(null);
  selectedCompany: Observable<Company | null>;

  constructor() {
    this.selectedCompany = this.selectedCompanyReferenceId.pipe(
      map(refId => {
        if (refId) {
          return companyList.find(c => c.referenceId === refId);
        } else {
          return null;
        }
      }),
      shareReplay(1)
    );
  }

  setSelectedCompany(referenceId: string) {
    this.selectedCompanyReferenceId.next(referenceId);
  }

  clearSelectedCompany() {
    this.selectedCompanyReferenceId.next(null);
  }
}
