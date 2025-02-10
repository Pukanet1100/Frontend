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
  errorMessages: string[] = [];
  
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
    this.errorMessages = [];
    if (this.address.houseNumber.trim() === '') {
      this.errorMessages.push('กรุณากรอกบ้านเลขที่');
    }
    if (this.address.province.trim() === '') {
      this.errorMessages.push('กรุณาเลือกจังหวัด');
    }
    if (this.address.district.trim() === '') {
      this.errorMessages.push('กรุณาเลือกเขต/อำเภอ');
    }
    if (this.address.subDistrict.trim() === '') {
      this.errorMessages.push('กรุณาเลือกแขวง/ตำบล');
    }
    if (this.address.postalCode.trim() === '') {
      this.errorMessages.push('กรุณากรอกรหัสไปรษณีย์');
    }

    if (this.errorMessages.length > 0) {
      this.isPopupVisible = true;
      return;
    }

    this.addressService.addAddress({ ...this.address });
  }

  closePopup() {
    this.isPopupVisible = false;
  }
}