import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
}
