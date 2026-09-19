import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DeliveryOptions } from '../../shared/models/deliveryOptions';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { BasketService } from '../../basket/basket.service';
import { Router } from '@angular/router';
import { CheckoutComponent } from '../checkout.component';

@Component({
  selector: 'app-shipment',
  imports: [CommonModule, FormsModule],
  templateUrl: './shipment.component.html',
  styleUrl: './shipment.component.scss',
})
export class ShipmentComponent {
  deliveryOptions: DeliveryOptions[] = [
    {
      id: 1,
      name: 'Fedex',
      deliveryTime: '2 days',
      description: 'Fast delivery',
      price: 300,
    },
    {
      id: 2,
      name: 'DTDC',
      deliveryTime: '3 days',
      description: 'Reliable delivery',
      price: 200,
    },
    {
      id: 3,
      name: 'First Flight',
      deliveryTime: '4 days',
      description: 'Economical delivery',
      price: 150,
    },
    {
      id: 4,
      name: 'Normal',
      deliveryTime: '7 days',
      description: 'Standard delivery',
      price: 100,
    },
  ];
  selectedOption: number | undefined;
  shipmentForm: FormGroup;
  constructor(
    private basketService: BasketService,
    private formBuilder: FormBuilder,
    private router: Router,
    private checkoutComponent: CheckoutComponent,
  ) {
    this.shipmentForm = this.formBuilder.group({
      selectedOption: [this.selectedOption, Validators.required],
    });

    // initialize this selected option
    this.selectedOption = this.deliveryOptions[0].id;
    this.updateShipmentPrice();
  }

  updateShipmentPrice() {
    const selectedDeliveryOption = this.deliveryOptions.find(
      (option) => option.id === this.selectedOption,
    );
    if (selectedDeliveryOption) {
      this.basketService.updateShippingPrice(selectedDeliveryOption.price);
    }
  }
  goToNextStep() {
    // Navigate to review page
    this.router.navigate(['/checkout/review']);
    // set the current step to review
    this.checkoutComponent.setCurrentStep('review');
  }
}
