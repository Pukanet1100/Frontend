import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrlbrands = 'http://localhost:3000/brands';
  private apiUrlhandset = 'http://localhost:3000/handset';

  constructor(private http: HttpClient) { }

  getBrands(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlbrands);
  }

  getHandset(brand: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlhandset}?brand=${brand}`);
  }

  searchHandset(searchTerm: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlhandset}?commercialName_like=${searchTerm}`);
  }
}