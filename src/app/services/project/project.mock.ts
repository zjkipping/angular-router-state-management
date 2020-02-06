import { of } from 'rxjs';

import { Project } from '@types';

const projectListMockData: Project[] = [
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

export function fetchProjectList() {
  return of(projectListMockData);
}

export function fetchProjectDetails(referenceId: string | null) {
  if (referenceId) {
    return of(projectListMockData.find(c => c.referenceId === referenceId));
  } else {
    return of(null);
  }
}
