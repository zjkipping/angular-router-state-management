import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  map,
  shareReplay,
  switchMap,
  distinctUntilChanged
} from 'rxjs/operators';

import { RouterStateService } from '@services/router-state/router-state.service';
import { projectRouteParamKey } from '@constants/route-params';
import { Project } from '@types';

import { fetchProjectList, fetchProjectDetails } from './project.mock';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects: Observable<Project[]>;
  selectedProjectReferenceId: Observable<string | null>;
  selectedProject: Observable<Project | null>;

  constructor(routerState: RouterStateService) {
    this.projects = fetchProjectList();
    this.selectedProjectReferenceId = routerState.routeParamsMap.pipe(
      map(params => params.get(projectRouteParamKey)),
      distinctUntilChanged()
    );
    this.selectedProject = this.selectedProjectReferenceId.pipe(
      switchMap(refId => (refId ? fetchProjectDetails(refId) : of(null))),
      shareReplay(1)
    );
  }

  async createProject(val: Omit<Project, 'referenceId'>) {
    // real functionality mocked out...
  }

  async updateProject(project: Project) {
    // real functionality mocked out...
  }

  async deleteProject(refId: string) {
    // real functionality mocked out...
  }
}
