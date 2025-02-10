import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HandsetBrandmodelsComponent } from './handset-brandmodels.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [HandsetBrandmodelsComponent],
  imports: [
    CommonModule, 
    RouterModule,
    FormsModule,
  ],
  exports: [HandsetBrandmodelsComponent]
})
export class HandsetBrandmodelsModule { }
