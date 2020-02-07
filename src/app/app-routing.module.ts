import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'companies',
    pathMatch: 'full'
  },
  {
    path: 'companies',
    loadChildren: () =>
      import('./views/company/company.module').then(m => m.CompanyModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
