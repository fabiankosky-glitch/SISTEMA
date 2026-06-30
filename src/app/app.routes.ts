
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
      {
        path: 'libros-y-reportes',
        children: [
          { path: '', redirectTo: 'libro-de-turno', pathMatch: 'full' },
          { path: 'libro-de-turno', loadComponent: () => import('./libros-y-reportes/libro-de-turno/libro-de-turno').then(m => m.LibroDeTurnoComponent) },
          { path: 'libro-correcto', loadComponent: () => import('./libros-y-reportes/libro-correcto/libro-correcto').then(m => m.LibroCorrectoComponent) },
          { path: 'minuta-de-enfermeria', loadComponent: () => import('./libros-y-reportes/minuta-de-enfermeria/minuta-de-enfermeria').then(m => m.MinutaDeEnfermeriaComponent) },
          { path: 'libro-de-ingresos', loadComponent: () => import('./libros-y-reportes/libro-de-ingresos/libro-de-ingresos').then(m => m.LibroDeIngresosComponent) },
          { path: 'reportes', loadComponent: () => import('./reportes/reportes').then(m => m.ReportesComponent) }
        ]
      },
      { path: 'recursos', loadComponent: () => import('./recursos/recursos').then(m => m.RecursosComponent) },
    ]
  },
];
