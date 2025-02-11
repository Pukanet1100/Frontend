import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { SelectedProductService } from '../services/select-product.service';

@Component({
  selector: 'app-handset-product',
  standalone: false,
  templateUrl: './handset-product.component.html',
  styleUrl: './handset-product.component.css'
})
export class HandsetProductComponent implements OnChanges {
  @Input() handsets: any = null;
  @Output() productSelected = new EventEmitter<boolean>();
  selectedHandset: any = null;

  constructor(private selectedProductService: SelectedProductService) { }

  ngOnChanges(): void {
    if (this.handsets) {
      if (!Array.isArray(this.handsets)) {
        this.handsets = [this.handsets];
      }

      this.handsets.forEach((handset: any) => {
        handset.variants.forEach((variant: any) => {
          if (Array.isArray(variant.detail) && variant.detail.length > 0) {
            variant.colors = variant.detail.map((item: any) => ({
              code: `#${item.colorCode}`
            }));
          } else {
            variant.colors = [];
          }
        });
      });
    }
  }

  selectHandset(handset: any) {
    this.selectedHandset = handset;
    this.selectedProductService.setSelectedProduct(handset);
    this.productSelected.emit(true);
  }

  onImageError(event: any) {
    event.target.src = '../../assets/icon/image.png';
  }
}
