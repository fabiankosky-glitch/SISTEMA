
import { Routes } from '@angular/router';
import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LoginComponent } from './login/login';
import { DashboardComponent } from './dashboard/dashboard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard']);

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToDashboard }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      { path: '', redirectTo: 'contabilidad', pathMatch: 'full' },
      { path: 'contabilidad', loadComponent: () => import('./contabilidad/contabilidad').then(m => m.ContabilidadComponent) },
      { path: 'inventario', loadComponent: () => import('./inventario/inventario').then(m => m.InventarioComponent) },
      { path: 'reportes', loadComponent: () => import('./reportes/reportes').then(m => m.ReportesComponent) },
      { path: 'recursos-humanos', loadComponent: () => import('./recursos-humanos/recursos-humanos').then(m => m.RecursosHumanosComponent) },
    ]
  },
];
