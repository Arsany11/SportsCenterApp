import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './store/product-details/product-details.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, data:{breadcrumb: 'Home'} },
    { path: 'not-found', component: NotFoundComponent },
    { path: 'server-error', component: ServerErrorComponent },
    { path: 'store/:id', component: ProductDetailsComponent,data: {breadcrumb:{alias: 'ProductName'}} },
    {
    path: 'store',
    loadComponent: () =>
        import('./store/store.component').then((m) => m.StoreComponent),
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
