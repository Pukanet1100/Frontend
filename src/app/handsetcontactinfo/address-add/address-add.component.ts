import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../services/address.service';

@Component({
  selector: 'app-address-add',
  standalone: false,
  
  templateUrl: './address-add.component.html',
  styleUrls: ['./address-add.component.css']
})
export class AddressAddComponent implements OnInit {
  isPopupVisible: boolean = false;
  addressData: any[] = [];
  provinces: string[] = [];
  amphoes: string[] = [];
  districts: string[] = [];
  
  address = {
    houseNumber: '',
    villageNumber: '',
    subDistrict: '',
    district: '',
    province: '',
    postalCode: ''
  };

  constructor(private addressService: AddressService) {}

  ngOnInit(): void {
    this.addressService.getAddressData().subscribe((data) => {
      this.addressData = data;
      this.provinces = [...new Set(data.map(item => item.province))];
    });
  }

  onProvinceChange(): void {
    this.amphoes = [...new Set(this.addressData
      .filter(item => item.province === this.address.province)
      .map(item => item.amphoe)
    )];
    this.address.district = '';
    this.address.subDistrict = '';
    this.address.postalCode = '';
  }

  onAmphoeChange(): void {
    this.districts = [...new Set(this.addressData
      .filter(item => item.province === this.address.province && item.amphoe === this.address.district)
      .map(item => item.district)
    )];
    this.address.subDistrict = '';
    this.address.postalCode = '';
  }

  onDistrictChange(): void {
    const selected = this.addressData.find(item =>
      item.province === this.address.province &&
      item.amphoe === this.address.district &&
      item.district === this.address.subDistrict
    );
    this.address.postalCode = selected ? selected.zipcode.toString() : '';
  }

  saveAddress() {
    if (this.address.houseNumber.trim() === '' || 
        this.address.province.trim() === '' ||
        this.address.district.trim() === '' ||
        this.address.subDistrict.trim() === '' ||
        this.address.postalCode.trim() === '') {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    this.isPopupVisible = true;
    this.addressService.addAddress({ ...this.address });
  }

  closePopup() {
    this.isPopupVisible = false;
  }
}
