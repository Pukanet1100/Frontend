import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HandsetProductComponent } from './handset-product.component';



@NgModule({
  declarations: [HandsetProductComponent],
  imports: [
    CommonModule, 
    RouterModule,
    FormsModule,
  ],
  exports: [HandsetProductComponent]
})
export class HandsetProductModule {}