import { Injectable } from '@angular/core';
import {
  ParamMap,
  convertToParamMap,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationActions {
  routeParams: Observable<ParamMap>;

  constructor(actions: Actions) {
    this.routeParams = actions.pipe(
      // if you need to resolve a route based on a http request downstream of this observable
      // you will need to use routerNavigationAction

      ofType(routerNavigatedAction),
      map(action => action.payload.routerState.root),
      map(route => findAllRouteParams(route)),
      map(params => convertToParamMap(params))
    );
  }
}

function findAllRouteParams(
  state: ActivatedRouteSnapshot,
  routeParams: Record<string, string> = {}
) {
  const updatedParams = {
    ...routeParams,
    ...state.params
  };

  if (state.firstChild) {
    return findAllRouteParams(state.firstChild, updatedParams);
  } else {
    return updatedParams;
  }
}
