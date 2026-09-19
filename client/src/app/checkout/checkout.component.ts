import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddressComponent } from './address/address.component';
import { ShipmentComponent } from './shipment/shipment.component';
import { ReviewComponent } from './review/review.component';
import { OrderSummaryComponent } from '../shared/components/order-summary/order-summary.component';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, AddressComponent, ShipmentComponent, ReviewComponent, OrderSummaryComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  currentStep: 'address' | 'shipment' | 'review' = 'address';
  setCurrentStep(step : 'address' | 'shipment' | 'review') {
    this.currentStep = step;
  }
}
