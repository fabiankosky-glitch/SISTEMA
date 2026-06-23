import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-reportes',
  template: `<h2>Sección de Reportes</h2>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportesComponent { }
