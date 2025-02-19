import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Output() handsetSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() searchCleared: EventEmitter<void> = new EventEmitter<void>();

  selectedHandset: string = '';
  handsets: any[] = [];
  showDropdown: boolean = false;
  searchTimeout: any;

  constructor(private apiService: ApiService) {}

  onSearch() {
    clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      if (this.selectedHandset.trim()) {
        this.apiService.searchHandset(this.selectedHandset).subscribe((data) => {
          const query = this.selectedHandset.trim().toLowerCase();
          this.handsets = data.filter((handset: any) =>
            handset.commercialName.toLowerCase().includes(query)
          );

          this.showDropdown = this.handsets.length > 0;
        });
      } else {
        this.handsets = [];
        this.showDropdown = false;
        this.searchCleared.emit();
      }
    }, 800);
  }

  selectHandset(handset: any) {
    this.selectedHandset = handset.commercialName;
    this.showDropdown = false;
    this.handsetSelected.emit(handset);
  }
}
