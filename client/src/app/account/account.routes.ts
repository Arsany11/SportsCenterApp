import {Routes} from '@angular/router';

export const AccountRoutes: Routes = [
    {
        path: 'login',
        loadComponent: ()=> // lazy-loaded
            import('./login/login.component').then(m => m.LoginComponent), data: { breadcrumb: 'Login' }
    },
    {
        path: 'register',
        loadComponent: ()=>
            import('./register/register.component').then(m => m.RegisterComponent), data: { breadcrumb: 'Register' }
    }
]