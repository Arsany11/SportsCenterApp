import { Routes } from '@angular/router';
import { BasketComponent } from './basket.component';

export const basketRoutes: Routes = [
    {
        path: '',
        component: BasketComponent, // eager loading.
    },
];
