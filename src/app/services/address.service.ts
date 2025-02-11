import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = 'http://localhost:3000/addresses'; 
  private dataUrl = 'assets/data/raw_database.json';
  private addressesSubject = new BehaviorSubject<any[]>(this.loadAddressesFromLocalStorage());
  addresses$ = this.addressesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadAddresses();
  }

  private loadAddresses() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.addressesSubject.next(data);
    });
  }

  addAddress(address: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, address).pipe(
      tap(() => {
        this.loadAddresses();
      }),
      catchError((error) => {
        console.error('Error adding address:', error);
        return of(null);
      })
    );
  }

  getAddressData(): Observable<any[]> {
    return this.http.get<any[]>(this.dataUrl);
  }

  private loadAddressesFromLocalStorage(): any[] {
    const savedAddresses = localStorage.getItem('addresses');
    return savedAddresses ? JSON.parse(savedAddresses) : [];
  }
}
