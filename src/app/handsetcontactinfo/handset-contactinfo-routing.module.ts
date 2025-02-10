import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HandsetcontactinfoComponent } from './handset-contactinfo.component';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  {
    path: '',
    component: HandsetcontactinfoComponent,
  },
];

@NgModule ({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class HandsetcontactinfoRoutingModule {}
