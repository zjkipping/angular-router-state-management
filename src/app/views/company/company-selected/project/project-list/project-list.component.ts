import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ProjectService } from '@services/project/project.service';
import { Project } from '@types';

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
