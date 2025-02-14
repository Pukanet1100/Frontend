import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../services/address.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  addressForm: FormGroup;

  constructor(private fb: FormBuilder, private addressService: AddressService) {
    this.addressForm = this.fb.group({
      houseNumber: ['', Validators.required],
      villageNumber: [''],
      village: [''],
      building: [''],
      floor: [''],
      alley: [''],
      road: [''],
      subDistrict: ['', Validators.required],
      district: ['', Validators.required],
      province: ['', Validators.required],
      postalCode: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/)]],
      tel: ['', [
        Validators.required, 
        Validators.pattern(/^[0-9]{10}$/)]],
    });
  }

  ngOnInit() {
    this.addressService.getAddressData().subscribe((data) => {
      this.addressData = data;
      this.provinces = [...new Set(data.map(item => item.province))];
    });
  }

  onProvinceChange() {
    const province = this.addressForm.get('province')?.value;
    this.amphoes = [...new Set(this.addressData.filter(item => item.province === province).map(item => item.amphoe))];
    this.addressForm.patchValue({ district: '', subDistrict: '', postalCode: '' });
  }

  onAmphoeChange() {
    const { province, district } = this.addressForm.value;
    this.districts = [...new Set(this.addressData.filter(item => item.province === province && item.amphoe === district).map(item => item.district))];
    this.addressForm.patchValue({ subDistrict: '', postalCode: '' });
  }

  onDistrictChange() {
    const { province, district, subDistrict } = this.addressForm.value;
    const selected = this.addressData.find(item => item.province === province && item.amphoe === district && item.district === subDistrict);
    this.addressForm.patchValue({ postalCode: selected ? selected.zipcode.toString() : '' });
  }

  saveAddress() {
    if (this.addressForm.invalid) {
      this.isPopupVisible = true;
      return;
    }
    this.isSuccessPopupVisible = false;
    this.addressService.addAddress(this.addressForm.value).subscribe(
      () => {
        this.isSuccessPopupVisible = true;
        document.documentElement.style.overflow = 'hidden';
        this.addressForm.reset();
      },
    );
  }

  isInvalid(field: string): boolean {
    return !!(this.addressForm.get(field)?.invalid && (this.addressForm.get(field)?.touched || this.addressForm.get(field)?.dirty));
  }


  closeSuccessPopup() {
    this.isSuccessPopupVisible = false;
    document.body.style.overflow = 'auto';
  }
}