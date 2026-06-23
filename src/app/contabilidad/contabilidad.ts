import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-contabilidad',
  template: `<h2>Sección de Contabilidad</h2>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContabilidadComponent { }
