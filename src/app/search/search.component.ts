import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  selectedHandset: string = '';
  handsets: any[] = [];
  showDropdown: boolean = false;
  searchTimeout: any;

  constructor(private apiService: ApiService) {}

  onSearch(): void {
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
      }
    }, 800);
  }
  
  selectHandset(handset: any): void {
    this.selectedHandset = handset.commercialName;
    this.showDropdown = false;
  }
}