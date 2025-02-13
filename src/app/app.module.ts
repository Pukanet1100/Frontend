import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarModule } from './navbar/navbar.module';
import { MainMenuModule } from './main-menu/main-menu.module';
import { HandsetcontactinfoModule } from './handsetcontactinfo/handset-contactinfo.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    NavbarModule,
    MainMenuModule,
    HandsetcontactinfoModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
