import { Component } from '@angular/core';
import { AddressService } from '../../services/address.service';

@Component({
  selector: 'app-address-detail',
  standalone: false,
  templateUrl: './address-detail.component.html',
  styleUrl: './address-detail.component.css'
})
export class AddressDetailComponent {
  addresses: any[] = [];

  constructor(private addressService: AddressService) {}

  ngOnInit() {
    this.addressService.addresses$.subscribe(data => {
      this.addresses = data;
    }
  )}
}