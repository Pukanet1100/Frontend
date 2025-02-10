import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SelectedProductService {
  private productKey = 'selectedProduct';

  constructor() {}

  setSelectedProduct(product: any): void {
    localStorage.setItem(this.productKey, JSON.stringify(product));
  }

  getSelectedProduct(): any {
    const product = localStorage.getItem(this.productKey);
    return product ? JSON.parse(product) : null;
  }

  clearSelectedProduct(): void {
    localStorage.removeItem(this.productKey);
  }
}
