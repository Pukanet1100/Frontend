import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-handset-brandmodels',
  standalone: false,
  templateUrl: './handset-brandmodels.component.html',
  styleUrl: './handset-brandmodels.component.css',
})
export class HandsetBrandmodelsComponent implements OnInit {
  brands: any[] = [];
  selectedBrand: any = null;

  @Output() brandSelected = new EventEmitter<string>();

  constructor(private apiservice: ApiService) {}

  ngOnInit() {
    this.apiservice.getBrands().subscribe((data: any[]) => {
      this.brands = data;
    });
  }

  selectBrand(brand: any) {
    this.selectedBrand = this.selectedBrand === brand ? null : brand;
    this.brandSelected.emit(this.selectedBrand?.name || null);
  }
}
