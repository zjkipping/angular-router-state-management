import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';

import { ProjectService, Project } from '@services/project/project.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  selectedProject: Project | null;
  projectForm: FormGroup;

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder
  ) {}

  async ngOnInit() {
    this.selectedProject = await this.projectService.selectedProject
      .pipe(take(1))
      .toPromise();

    this.projectForm = this.fb.group({
      name: this.fb.control(
        this.selectedProject.name || '',
        Validators.required
      )
    });
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
