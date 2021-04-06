export interface Company {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  companyId: string;
  name: string;
}
