import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HandsetcontactinfoComponent } from './handset-contactinfo.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarModule } from "../navbar/navbar.module";
import { AddressDetailComponent } from './address-detail/address-detail.component';
import { AddressAddComponent } from './address-add/address-add.component';

@NgModule({
  declarations: [HandsetcontactinfoComponent, AddressDetailComponent, AddressAddComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    NavbarModule
],
})
export class HandsetcontactinfoModule {}
