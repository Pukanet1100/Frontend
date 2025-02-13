import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductSearchComponent } from './product-search.component';



@NgModule({
  declarations: [ProductSearchComponent],
  imports: [
        CommonModule, 
        RouterModule,
        FormsModule,
  ],
  exports: [ProductSearchComponent]
})

export class ProductSearchModule {}