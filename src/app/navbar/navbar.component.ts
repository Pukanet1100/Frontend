import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  headername: string = 'รายการสินค้า';

  constructor(
    private router: Router,
    private addressService: AddressService
  ) { }

  ngOnInit() {
    this.router.events.subscribe(() => {
      const currentUrl = this.router.url;

      if (currentUrl.includes('handsetcontactinfo')) {
        this.headername = 'รายละเอียดสินค้า';
      } else {
        this.headername = 'รายการสินค้า';
      }
    });
  }

  goHome() {
    this.addressService.clearAddresses();
    this.router.navigate(['/main-menu']).then(() => {
      window.location.reload();
    });
  }
}
