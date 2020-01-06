import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Project, ProjectService } from '@services/project/project.service';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent {
  project: Observable<Project>;

  constructor(projectService: ProjectService) {
    this.project = projectService.selectedProject;
  }
}
