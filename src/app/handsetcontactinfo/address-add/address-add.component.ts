import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../services/address.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-address-add',
  standalone: false,
  templateUrl: './address-add.component.html',
  styleUrl: './address-add.component.css'
})
export class AddressAddComponent implements OnInit {
  isPopupVisible: boolean = false;
  isSuccessPopupVisible: boolean = false;
  addressData: any[] = [];
  provinces: string[] = [];
  amphoes: string[] = [];
  districts: string[] = [];
  errorMessages: string[] = [];
  addressForm: FormGroup;

  address = {
    houseNumber: '',
    villageNumber: '',
    village: '',
    building: '',
    floor: '',
    alley: '',
    road: '',
    subDistrict: '',
    district: '',
    province: '',
    postalCode: '',
    email: '',
    tel: ''
  };

  constructor(private fb: FormBuilder, private addressService: AddressService) {
    this.addressForm = this.fb.group({
      houseNumber: [''],
      villageNumber: [''],
      village: [''],
      building: [''],
      floor: [''],
      alley: [''],
      road: [''],
      subDistrict: [''],
      district: [''],
      province: [''],
      postalCode: [''],
      email: [''],
      tel: ['']
    });
  }

  addAddress() {
    if (this.addressForm.valid) {
      this.addressService.addAddress(this.addressForm.value).subscribe(() => {
        this.addressForm.reset();
      });
    }
  }

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

  isFormInvalid(): boolean {
    return !this.address.houseNumber.trim() ||
      !this.address.province.trim() ||
      !this.address.district.trim() ||
      !this.address.subDistrict.trim() ||
      !this.address.postalCode.trim() ||
      !this.isTelValid() ||
      !this.isEmailValid();
  }

  isEmailValid(): boolean {
    return this.address.email.trim() === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.address.email);
  }

  isTelValid(): boolean {
    return this.address.tel.trim() !== '' && /^\d{10,}$/.test(this.address.tel);
  }

  saveAddress() {
    this.isPopupVisible = false;
    if (this.isFormInvalid()) {
      if (!this.address.houseNumber.trim()) {
        this.isPopupVisible = true;
      }
      if (!this.address.province.trim()) {
        this.isPopupVisible = true;
      }
      if (!this.address.district.trim()) {
        this.isPopupVisible = true;
      }
      if (!this.address.subDistrict.trim()) {
        this.isPopupVisible = true;
      }
      if (!this.address.postalCode.trim()) {
        this.isPopupVisible = true;
      }
      if (!this.isTelValid()) {
        this.isPopupVisible = true;
      }
      if (!this.isEmailValid()) {
        this.isPopupVisible = true;
      }
      return;
    }
  
    this.addressService.addAddress({ ...this.address }).subscribe(
      (response) => {
        console.log('บันทึกสำเร็จ:', response);
        this.isSuccessPopupVisible = true;
        document.documentElement.style.overflow = 'hidden';
      },
      (error) => {
        console.error('เกิดข้อผิดพลาด:', error);
      }
    );
  }

  closeSuccessPopup() {
    this.isSuccessPopupVisible = false;
    document.body.style.overflow = 'auto';
  }
}
