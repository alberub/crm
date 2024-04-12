import { Routes } from '@angular/router';
import { HomePagesComponent } from './modules/home/pages/home-pages/home-pages.component';
import { AuthPagesComponent } from './modules/auth/pages/auth-pages/auth-pages.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminPagesComponent } from './modules/admin/pages/admin-pages/admin-pages.component';
import { GestionesComponent } from './modules/gestiones/pages/gestiones/gestiones.component';
import { AdminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: AuthPagesComponent
    },
    {
        path: '',
        canActivate: [AuthGuard],
        component: HomePagesComponent,
        children: [
            {
                path: '',
                component: GestionesComponent 
            },
            {
                path: 'admin',
                canActivate: [AdminGuard],
                component: AdminPagesComponent
            }
        ]
    }
];
