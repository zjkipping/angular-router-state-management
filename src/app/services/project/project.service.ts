import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export interface Project {
  referenceId: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectListData: Project[] = [
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
  private projectList = new BehaviorSubject(this.projectListData);
  private selectedProjectRefId = new BehaviorSubject(null);

  selectedProjectReferenceId: Observable<string | null>;
  selectedProject: Observable<Project | null>;
  projects: Observable<Project[]>;

  constructor() {
    this.selectedProjectReferenceId = this.selectedProjectRefId.asObservable();
    this.projects = this.projectList.asObservable();
    this.selectedProject = this.selectedProjectRefId.pipe(
      map(refId => {
        if (refId) {
          // would normally be a switchMap to make a call to get the individual project
          return this.projectListData.find(c => c.referenceId === refId);
        } else {
          return null;
        }
      }),
      shareReplay(1)
    );
  }

  setSelectedProject(referenceId: string) {
    this.selectedProjectRefId.next(referenceId);
  }

  clearSelectedProject() {
    this.selectedProjectRefId.next(null);
  }
}
