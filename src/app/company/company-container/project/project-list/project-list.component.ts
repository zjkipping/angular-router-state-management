import { Component } from '@angular/core';

import { Project, ProjectService } from '@services/project/project.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {
  projects: Observable<Project[]>;

  constructor(projectService: ProjectService) {
    this.projects = projectService.projects;
  }
}
