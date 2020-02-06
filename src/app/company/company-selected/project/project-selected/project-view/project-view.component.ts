import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ProjectService } from '@services/project/project.service';
import { CompanyService } from '@services/company/company.service';
import { Company, Project } from '@types';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent {
  project: Observable<Project>;
  company: Observable<Company>;

  constructor(projectService: ProjectService, companyService: CompanyService) {
    this.project = projectService.selectedProject;
    this.company = companyService.selectedCompany;
  }
}
