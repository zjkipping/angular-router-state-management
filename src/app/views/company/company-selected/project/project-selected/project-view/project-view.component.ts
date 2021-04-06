import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Company, Project } from '@types';
import { ProjectService } from '@services/project/project.service';
import { CompanyService } from '@services/company/company.service';
import { RouterStateService } from '@services/router-state/router-state.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss'],
})
export class ProjectViewComponent {
  project$: Observable<Project>;
  company$: Observable<Company>;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    companyService: CompanyService
  ) {
    this.project$ = projectService.selectedProject;
    this.company$ = companyService.selectedCompany;
  }

  async deleteProject() {
    await this.projectService.deleteSelectedProject();
    await this.router.navigate(['../'], {
      relativeTo: this.activatedRoute,
    });
  }
}
