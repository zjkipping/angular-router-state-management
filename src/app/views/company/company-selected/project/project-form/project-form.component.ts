import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';

import { Project } from '@types';
import { ProjectService } from '@services/project/project.service';
import { RouterStateService } from '@services/router-state/router-state.service';
import { CompanyService } from '@services/company/company.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  selectedProject: Project | null;
  projectForm: FormGroup;

  constructor(
    private projectService: ProjectService,
    private companyService: CompanyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    fb: FormBuilder
  ) {
    this.projectForm = fb.group({
      name: fb.control('', Validators.required),
    });
  }

  async ngOnInit() {
    this.selectedProject = await this.projectService.selectedProject
      .pipe(take(1))
      .toPromise();

    if (this.selectedProject) {
      this.projectForm.patchValue(this.selectedProject);
    }
  }

  async submitForm() {
    try {
      if (this.selectedProject) {
        await this.projectService.updateProject({
          ...this.selectedProject,
          ...this.projectForm.value,
        });
      } else {
        const companyId = await this.companyService.selectedCompanyId
          .pipe(take(1))
          .toPromise();
        await this.projectService.createProject({
          ...this.projectForm.value,
          companyId,
        });
      }
      await this.router.navigate(['../'], {
        relativeTo: this.activatedRoute,
      });
    } catch (error) {
      console.error(error);
    }
  }
}
