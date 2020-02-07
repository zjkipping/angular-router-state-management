import { Injectable } from '@angular/core';
import { createAction, props } from '@ngrx/store';
import { Effect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import { companyRouteParamKey } from '@constants/route-params';
import { fetchCompanyDetails } from '@services/company/company.mock';
import { Company } from '@types';

import { NavigationActions } from './navigation-actions';

const setSelectedCompany = createAction(
  'SET_SELECTED_COMPANY',
  props<{ company: Company }>()
);

@Injectable()
export class AppEffects {
  constructor(private navigationActions: NavigationActions) {}

  @Effect()
  companySelect$ = this.navigationActions.routeParams.pipe(
    map(params => params.get(companyRouteParamKey)),
    switchMap(id => fetchCompanyDetails(id)),
    map(company => setSelectedCompany(company))
  );
}
