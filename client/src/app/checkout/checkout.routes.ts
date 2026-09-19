import { Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { canActivate } from '../core/guards/auth.guard';
import { AddressComponent } from './address/address.component';
import { ShipmentComponent } from './shipment/shipment.component';
import { ReviewComponent } from './review/review.component';

export const routes: Routes = [
    {
        path: '',
        component: CheckoutComponent,
        canActivate: [canActivate],
        children: [
            { path: 'address', component: AddressComponent },
            { path: 'shipment', component: ShipmentComponent },
            { path: 'review', component: ReviewComponent },
            { path: '', redirectTo: 'address', pathMatch: 'full' }
        ]
    },
];
