import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { ProjectService } from '@services/project/project.service';
import { Project } from '@types';
import { projectSearchQueryParamKey } from '@constants/route-params';
import { FormControl } from '@angular/forms';
import { first, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { RouterStateService } from '@services/router-state/router-state.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit, OnDestroy {
  projects$: Observable<Project[]>;
  projectSearchControl = new FormControl('');
  destroy = new Subject();

  constructor(
    private router: Router,
    private routerState: RouterStateService,
    projectService: ProjectService
  ) {
    this.projects$ = projectService.projects;

    this.projectSearchControl.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe((value) =>
        this.router.navigate([], {
          queryParams: { [projectSearchQueryParamKey]: value || null },
        })
      );
  }

  async ngOnInit() {
    const queryParams = await this.routerState.queryParamsMap
      .pipe(first())
      .toPromise();

    this.projectSearchControl.patchValue(
      queryParams.get(projectSearchQueryParamKey)
    );
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
