import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export interface Project {
  referenceId: string;
  name: string;
}

export const projectList: Project[] = [
  {
    referenceId: 'ghjghj3123',
    name: 'Project 1'
  },
  {
    referenceId: '90dfg89dfg',
    name: 'Project 2'
  },
  {
    referenceId: '898asdzxca',
    name: 'Project 3'
  }
];

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private selectedProjectReferenceId = new BehaviorSubject(null);

  selectedProject: Observable<Project | null>;

  constructor() {
    this.selectedProject = this.selectedProjectReferenceId.pipe(
      map(refId => {
        if (refId) {
          return projectList.find(c => c.referenceId === refId);
        } else {
          return null;
        }
      }),
      shareReplay(1)
    );
  }

  setSelectedProject(referenceId: string) {
    this.selectedProjectReferenceId.next(referenceId);
  }

  clearSelectedProject() {
    this.selectedProjectReferenceId.next(null);
  }
}
