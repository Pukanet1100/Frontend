import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-product-search',
  standalone: false,
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.css'
})
export class ProductSearchComponent {
  @Input() selectedHandset: any;
  isSelected = false;
  selectedColorIndex: number | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedHandset'] && this.selectedHandset) {
      if (Array.isArray(this.selectedHandset)) {
        console.log('selectedHandset is an array:', this.selectedHandset);
      }
    }
  }

  toggleSelect() {
    this.isSelected = !this.isSelected;
  }

  onImageError(event: any) {
    event.target.src = 'assets/icon/image.png';
  }

  getPrice() {
    return this.selectedHandset?.detail?.[0]?.priceInclVat || '-';
  }
}
