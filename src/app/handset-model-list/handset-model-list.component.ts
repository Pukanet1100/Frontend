import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-handset-model-list',
  standalone: false,
  templateUrl: './handset-model-list.component.html',
  styleUrl: './handset-model-list.component.css'
})
export class HandsetModelListComponent implements OnChanges {
  @Input() selectedBrand: string = '';
  @Output() handsetSelected = new EventEmitter<any>();
  noHandsetsAvailable = false;
  handsets: any[] = [];
  filteredHandsets: any[] = [];
  selectedHandset: any = null;

  constructor(private apiService: ApiService) {}

  ngOnChanges() {
    if (this.selectedBrand) {
      this.apiService.getHandset(this.selectedBrand).subscribe((data: any[]) => {
        const handsetsByBrand = data.filter(item => item.brand === this.selectedBrand);
        
        const groupedHandsets = handsetsByBrand.reduce((group: any, item: any) => {
          const key = item.subGroupModel;
          if (!group[key]) {
            group[key] = { ...item, variants: [item] };
          } else {
            group[key].variants.push(item);
          }
          return group;
        }, {});

        this.handsets = Object.values(groupedHandsets);
        this.filteredHandsets = this.handsets;
        this.noHandsetsAvailable = this.handsets.length === 0;
      });
    }
  }

  filterModels(model: string) {
    if (model) {
      this.filteredHandsets = this.handsets.filter(item => item.subGroupModel.includes(model));
    } else {
      this.filteredHandsets = this.handsets;
    }
  }

  selectHandset(handset: any) {
    this.selectedHandset = handset;
    this.handsetSelected.emit(handset);
  }

  onNoHandsets(noHandsets: boolean) {
    this.noHandsetsAvailable = noHandsets;
  }
} 
