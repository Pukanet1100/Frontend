import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private dataUrl = 'assets/data/raw_database.json';
  private addressesSubject = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}
  addresses$ = this.addressesSubject.asObservable();

  addAddress(address: any) {
    const currentAddresses = this.addressesSubject.getValue();
    this.addressesSubject.next([...currentAddresses, address]);
  }
  
  getAddressData(): Observable<any[]> {
    return this.http.get<any[]>(this.dataUrl);
  }
}
