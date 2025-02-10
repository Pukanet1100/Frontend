import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MainMenuComponent } from './main-menu.component';
import { NavbarModule } from '../navbar/navbar.module';
import { HandsetModelListModule } from '../handset-model-list/handset-model-list.module';
import { HandsetBrandmodelsModule } from '../handset-brandmodels/handset-brandmodels.module';
import { SearchModule } from '../search/search.module';
import { HandsetProductModule } from '../handset-product/handset-product.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MainMenuComponent],
  imports: [
    RouterModule.forRoot([]),
    BrowserModule,
    FormsModule,
    NavbarModule,
    HandsetModelListModule,
    HandsetBrandmodelsModule,
    HandsetProductModule,
    SearchModule,
    
  ],
})
export class MainMenuModule {}
