import { Injectable } from '@angular/core';
import {
  ParamMap,
  Router,
  NavigationEnd,
  ActivatedRouteSnapshot,
  convertToParamMap,
  ActivatedRoute,
} from '@angular/router';
import { Observable, defer, of, merge } from 'rxjs';
import { map, filter, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RouterStateService {
  routeParamsMap: Observable<ParamMap>;
  queryParamsMap: Observable<ParamMap>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.routeParamsMap = merge(
      defer(() =>
        of(findAllRouteParams(this.router.routerState.snapshot.root))
      ),
      router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => findAllRouteParams(this.router.routerState.snapshot.root))
      )
    ).pipe(
      map((params) => convertToParamMap(params)),
      shareReplay(1)
    );

    this.queryParamsMap = this.activatedRoute.queryParamMap;
  }
}

function findAllRouteParams(
  state: ActivatedRouteSnapshot,
  routeParams: Record<string, string> = {}
) {
  const updatedParams = {
    ...routeParams,
    ...state.params,
  };

  if (state.firstChild) {
    return findAllRouteParams(state.firstChild, updatedParams);
  } else {
    return updatedParams;
  }
}
