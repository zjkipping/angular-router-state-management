import { Injectable } from '@angular/core';
import {
  ParamMap,
  Router,
  NavigationEnd,
  ActivatedRouteSnapshot,
  convertToParamMap
} from '@angular/router';
import { Observable, defer, of, merge } from 'rxjs';
import { map, filter, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouterStateService {
  routeParamsMap: Observable<ParamMap>;

  constructor(private router: Router) {
    this.routeParamsMap = merge(
      defer(() => of(this.getRouteParamSnapshot())),
      router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.getRouteParamSnapshot())
      )
    ).pipe(
      map(params => convertToParamMap(params)),
      shareReplay(1)
    );
  }

  getRouteParamSnapshot() {
    return findAllRouteParams(this.router.routerState.snapshot.root);
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
