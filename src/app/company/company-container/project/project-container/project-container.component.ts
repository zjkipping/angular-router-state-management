import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import { ProjectService } from '@services/project/project.service';
import { projectRouteParamKey } from '@constants/route-params';

@Component({
  selector: 'app-project-container',
  templateUrl: './project-container.component.html',
  styleUrls: ['./project-container.component.scss']
})
export class ProjectContainerComponent implements OnDestroy {
  destroy = new Subject();

  constructor(private projectService: ProjectService, route: ActivatedRoute) {
    route.paramMap
      .pipe(
        map(params => params.get(projectRouteParamKey)),
        takeUntil(this.destroy)
      )
      .subscribe(projectRefId =>
        this.projectService.setSelectedProject(projectRefId)
      );
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
    this.projectService.clearSelectedProject();
  }
}
