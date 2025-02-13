import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-product-search',
  standalone: false,
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.css'
})
export class ProductSearchComponent {
  @Input() selectedHandset: any;
  @Output() productSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
  isSelected: boolean = false; 
  selectedColorIndex: number | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedHandset'] && this.selectedHandset) {
      this.selectedColorIndex = null;
      this.isSelected = false;
      this.productSelected.emit(false);
    }
  }

  toggleSelect() {
    this.isSelected = !this.isSelected;
    this.productSelected.emit(this.isSelected);
  }

  selectColor(index: number) {
    this.selectedColorIndex = index;
  }

  onImageError(event: any) {
    event.target.src = 'assets/icon/image.png';
  }

  getPrice() {
    return this.selectedHandset?.detail?.[this.selectedColorIndex || 0]?.priceInclVat || '-';
  }
}
