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
  colorOptions: any[] = [];
  selectedComponent: string = 'add';

  constructor(private selectedProductService: SelectedProductService) {}

  ngOnInit() {
    this.selectedProduct = this.selectedProductService.getSelectedProduct();
    
    if (this.selectedProduct) {
      this.colorOptions = this.selectedProduct.detail || [];
      this.selectedColor = localStorage.getItem('selectedColor') || this.colorOptions[0]?.colorName || '';
      this.updateImage();
    }
  }

  selectColor(colorName: string) {
    this.selectedColor = colorName;
    localStorage.setItem('selectedColor', colorName);
    this.updateImage();
  }

  updateImage() {
    if (this.selectedProduct) {
      const selectedDetail = this.colorOptions.find(color => color.colorName === this.selectedColor);
      this.selectedProduct.thumbnail = selectedDetail?.images[0]?.imageUrl || '../../assets/icon/image.png';
    }
  }

  selectComponent(component: string) {
    this.selectedComponent = component;
  }


  onImageError(event: any) {
    event.target.src = '../../assets/icon/image.png';
  }
}

