import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Project, ProjectService } from '@services/project/project.service';
import { CompanyService, Company } from '@services/company/company.service';

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
