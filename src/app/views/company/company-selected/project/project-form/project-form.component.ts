import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';

import { ProjectService } from '@services/project/project.service';
import { Project } from '@types';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  selectedProject: Project | null;
  projectForm: FormGroup;

  constructor(private projectService: ProjectService, fb: FormBuilder) {
    this.projectForm = fb.group({
      name: fb.control('', Validators.required)
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
          ...this.projectForm.value
        });
      } else {
        await this.projectService.createProject(this.projectForm.value);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
