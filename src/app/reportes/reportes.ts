import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.html',
  imports: [RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportesComponent { }
