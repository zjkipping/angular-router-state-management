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
  tap,
  first,
  delay,
} from 'rxjs/operators';

import { CompanyService } from '@services/company/company.service';
import { RouterStateService } from '@services/router-state/router-state.service';
import {
  projectRouteParamKey,
  projectSearchQueryParamKey,
} from '@constants/route-params';
import { Project } from '@types';

const apiUrl = '/api/projects';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  projectSearchQuery: Observable<string | null>;
  projects: Observable<Project[] | null>;
  selectedProjectId: Observable<number | null>;
  selectedProject: Observable<Project | null>;

  private fetchProjects = new BehaviorSubject<void>(null);
  private fetchSelectedProject = new BehaviorSubject<void>(null);

  constructor(
    private http: HttpClient,
    routerState: RouterStateService,
    companyService: CompanyService
  ) {
    this.projectSearchQuery = routerState.queryParamsMap.pipe(
      map((queryParams) => queryParams.get(projectSearchQueryParamKey))
    );

    this.projects = combineLatest([
      companyService.selectedCompanyId,
      this.projectSearchQuery,
      this.fetchProjects,
    ]).pipe(
      tap(() => console.log('fetching projects')),
      switchMap(([companyId, query]) =>
        merge(
          of(null),
          this.getProjectsForCompany(companyId, query).pipe(delay(500))
        )
      ),
      shareReplay(1)
    );

    this.selectedProjectId = routerState.routeParamsMap.pipe(
      map((params) => Number(params.get(projectRouteParamKey))),
      distinctUntilChanged()
    );

    this.selectedProject = combineLatest([
      this.selectedProjectId,
      this.fetchSelectedProject,
    ]).pipe(
      switchMap(([id]) =>
        id ? merge(of(null), this.getProject(id).pipe(delay(500))) : of(null)
      ),
      shareReplay(1)
    );
  }

  private getProjectsForCompany(companyId: number, query: string) {
    const options: HttpParamsOptions = {
      fromObject: {
        companyId: companyId.toString(),
        ...(query ? { name_like: query } : {}),
      },
    };
    const params = new HttpParams(options);
    return this.http.get<Project[]>(apiUrl, { params });
  }

  private getProject(id: number) {
    return this.http.get<Project>(`${apiUrl}/${id}`);
  }

  async createProject(projectDetails: Omit<Project, 'id'>) {
    await this.http.post(apiUrl, projectDetails).pipe(first()).toPromise();
    this.fetchProjects.next();
  }

  async updateProject(project: Project) {
    await this.http
      .put(`${apiUrl}/${project.id}`, project)
      .pipe(first())
      .toPromise();
    this.fetchSelectedProject.next();
    this.fetchProjects.next();
  }

  async deleteSelectedProject() {
    const id = await this.selectedProjectId.pipe(first()).toPromise();
    await this.http.delete(`${apiUrl}/${id}`).pipe(first()).toPromise();
    this.fetchProjects.next();
  }
}
