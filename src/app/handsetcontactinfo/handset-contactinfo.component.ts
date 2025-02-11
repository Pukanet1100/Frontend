import { Component, OnInit } from '@angular/core';
import { SelectedProductService } from '../services/select-product.service';

@Component({
  selector: 'app-handsetcontactinfo',
  standalone: false,
  templateUrl: './handset-contactinfo.component.html',
  styleUrl: './handset-contactinfo.component.css'
})
export class HandsetcontactinfoComponent implements OnInit {
  selectedProduct: any = null;
  selectedColor: string = '';
  selectedComponent: string = 'add';

  constructor(private selectedProductService: SelectedProductService) {}

  ngOnInit() {
    this.selectedProduct = this.selectedProductService.getSelectedProduct();
    this.selectedColor = localStorage.getItem('selectedColor') || 'silver';
  }

  selectColor(color: string) {
    this.selectedColor = color;
    localStorage.setItem('selectedColor', color);
  }

  selectProduct(product: any): void {
    this.selectedProductService.setSelectedProduct(product);
    this.selectedProduct = product;
  }
  
  selectComponent(component: string) {
    this.selectedComponent = component;
  }

  onImageError(event: any) {
    event.target.src = '../../assets/icon/image.png';
  }
}
