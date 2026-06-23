import { Routes } from '@angular/router';
import { redirectLoggedInTo, canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { LoginComponent } from './login/login';
import { DashboardComponent } from './dashboard/dashboard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard']);

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectLoggedInToDashboard),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    ...canActivate(redirectUnauthorizedToLogin),
    children: [
      { path: '', redirectTo: 'contabilidad', pathMatch: 'full' },
      { path: 'contabilidad', loadComponent: () => import('./contabilidad/contabilidad').then(m => m.ContabilidadComponent) },
      { path: 'inventario', loadComponent: () => import('./inventario/inventario').then(m => m.InventarioComponent) },
      { path: 'reportes', loadComponent: () => import('./reportes/reportes').then(m => m.ReportesComponent) },
      { path: 'recursos', loadComponent: () => import('./recursos/recursos').then(m => m.RecursosComponent) },
    ]
  },
];
