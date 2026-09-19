import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError } from '@angular/material/input';
import { CheckoutComponent } from '../checkout.component';
import { Address } from '../../shared/models/address';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  imports: [CommonModule, MatError , ReactiveFormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent {
  addressForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private checkoutComponent: CheckoutComponent
  ){
    this.addressForm =  this.formBuilder.group({
      Fname: ['',Validators.required],
      Lname: ['',Validators.required],
      Street: ['',Validators.required],
      City: ['',Validators.required],
      State: ['',Validators.required],
      ZipCode: ['',[Validators.required, Validators.pattern(/^\d{6}$/)]],
    })
  }
  onSubmit(){
    if(this.addressForm.valid){
      const addressData : Address = this.addressForm.value;
      console.log('Submited address :', addressData);
    }
  }
  goToNextStep(){
    if(this.addressForm.valid){
      // Navigate to shipment page
      this.router.navigate(['/checkout/shipment']);
      // set the current step to shipment
      this.checkoutComponent.setCurrentStep('shipment');
    }
  }
}
