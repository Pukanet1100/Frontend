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

  constructor(private apiService: ApiService) {}

  onSearch(): void {
    if (this.selectedHandset.trim()) {
      this.apiService.searchHandset(this.selectedHandset).subscribe((data) => {
        this.handsets = data;
        this.showDropdown = this.handsets.length > 0;
      });
    } else {
      this.handsets = [];
      this.showDropdown = false;
    }
  }

  selectHandset(handset: any): void {
    this.selectedHandset = handset.commercialName;
    this.showDropdown = false;
  }
}
