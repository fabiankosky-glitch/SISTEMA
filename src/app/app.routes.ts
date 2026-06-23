import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { DashboardComponent } from './dashboard/dashboard';
import { ContabilidadComponent } from './contabilidad/contabilidad';
import { RecursosHumanosComponent } from './recursos-humanos/recursos-humanos';
import { InventarioComponent } from './inventario/inventario';
import { ReportesComponent } from './reportes/reportes';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'contabilidad', component: ContabilidadComponent },
      { path: 'recursos-humanos', component: RecursosHumanosComponent },
      { path: 'inventario', component: InventarioComponent },
      { path: 'reportes', component: ReportesComponent },
    ],
  },
];
