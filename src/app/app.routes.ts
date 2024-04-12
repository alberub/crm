import { Routes } from '@angular/router';
import { HomePagesComponent } from './modules/home/pages/home-pages/home-pages.component';
import { AuthPagesComponent } from './modules/auth/pages/auth-pages/auth-pages.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: AuthPagesComponent
    },
    {
        path: '',
        canActivate: [AuthGuard],
        component: HomePagesComponent
    }
];
