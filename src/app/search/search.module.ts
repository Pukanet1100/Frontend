import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [SearchComponent],
  imports: [
        CommonModule, 
        RouterModule,
        FormsModule,
  ],
  exports: [SearchComponent]
})
export class SearchModule { }
