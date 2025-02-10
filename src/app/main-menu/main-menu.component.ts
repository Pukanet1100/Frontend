import { Component } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  standalone: false,

  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent {
  isSelected = false;
  handsets: any[] = [];
  constructor() { }

  selectedBrand: string = '';
  selectedHandset: any = null;

  onBrandSelected(brand: string) {
    this.selectedBrand = brand;
    this.selectedHandset = null;
  }

  onHandsetSelected(handset: any) {
    this.selectedHandset = handset;
  }
  isHandsetSelected(selected: boolean) {
    this.isSelected = selected;
  }
}
