import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private dataUrl = 'assets/data/raw_database.json';
  private addressesSubject = new BehaviorSubject<any[]>(this.loadAddressesFromLocalStorage());
  addresses$ = this.addressesSubject.asObservable();

  constructor(private http: HttpClient) {}

  addAddress(address: any) {
    const currentAddresses = this.addressesSubject.getValue();
    const updatedAddresses = [...currentAddresses, address];

    this.addressesSubject.next(updatedAddresses);
    this.saveAddressesToLocalStorage(updatedAddresses);
  }

  getAddressData(): Observable<any[]> {
    return this.http.get<any[]>(this.dataUrl);
  }

  private saveAddressesToLocalStorage(addresses: any[]) {
    localStorage.setItem('addresses', JSON.stringify(addresses));
  }

  private loadAddressesFromLocalStorage(): any[] {
    const savedAddresses = localStorage.getItem('addresses');
    return savedAddresses ? JSON.parse(savedAddresses) : [];
  }
}
