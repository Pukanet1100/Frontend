import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HandsetModelListComponent } from './handset-model-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [HandsetModelListComponent],
  imports: [
    CommonModule, 
    RouterModule,
    FormsModule,
  ],
  exports: [HandsetModelListComponent]
})
export class HandsetModelListModule { }
