import { of } from 'rxjs';

import { Company } from '@types';

const companyListMockData: Company[] = [
  { referenceId: '123abc', name: 'Company 1' },
  { referenceId: '456def', name: 'Company 2' },
  { referenceId: '678ghi', name: 'Company 3' },
  { referenceId: '901jkl', name: 'Company 4' }
];

export function fetchCompanyList() {
  return of(companyListMockData);
}

export function fetchCompanyDetails(referenceId: string | null) {
  console.log('fetching company: ', referenceId);
  if (referenceId) {
    return of(companyListMockData.find(c => c.referenceId === referenceId));
  } else {
    return of(null);
  }
}
