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
  selectedBrand: string = '';
  selectedHandset: any = null;
  isSearchMode = false; 

  constructor() { }

  onBrandSelected(brand: string) {
    this.selectedBrand = brand;
    this.selectedHandset = null;
    this.isSearchMode = false; 
  }

  onHandsetSelected(handset: any, fromSearch: boolean = false) {
    this.selectedHandset = handset;
    this.isSearchMode = fromSearch;
  }
  
  isHandsetSelected(selected: boolean) {
    this.isSelected = selected;
  }

  onProductSelected(selected: boolean) {
    this.isSelected = selected;
  }

  onSearchCleared(): void {
    this.isSearchMode = false;
  }
}
