import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main-menu',
  },
  {
    path: 'main-menu',
    loadChildren: () =>
      import('./main-menu/main-menu-routing.module').then((m) => m.MainMenuRoutingModule),
  },
  {
    path: 'handsetcontactinfo',
    loadChildren: () =>
      import('./handsetcontactinfo/handset-contactinfo-routing.module').then((m) => m.HandsetcontactinfoRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
