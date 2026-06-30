import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-libro-correcto',
  templateUrl: './libro-correcto.html',
  styleUrls: ['./libro-correcto.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule] // Importa FormsModule
})
export class LibroCorrectoComponent {

  // --- SEÑALES DE ENTRADA: PLAN DE TRATAMIENTO ---
  pacienteCorrecto = signal('');
  medicamentoCorrecto = signal('');
  cantidadCorrecta = signal<number | null>(null);
  dosisAM = signal<number | null>(null);
  dosisPM1 = signal<number | null>(null);
  dosisPM2 = signal<number | null>(null);
  viaCorrecta = signal('');
  fechaInicio = signal<string>(''); // Formato YYYY-MM-DD

  // --- SEÑALES COMPUTADAS: PLAN DE TRATAMIENTO ---

  // Calcula la dosis total diaria sumando las dosis individuales.
  // Si alguna dosis no es un número válido, la trata como 0.
  dosisTotalDia = computed(() => {
    const am = this.dosisAM() ?? 0;
    const pm1 = this.dosisPM1() ?? 0;
    const pm2 = this.dosisPM2() ?? 0;
    const total = am + pm1 + pm2;
    return total > 0 ? total : null;
  });

  // Calcula la fecha final del tratamiento.
  fechaFinal = computed(() => {
    const inicio = this.fechaInicio();
    const cantidad = this.cantidadCorrecta();
    const dosisDiaria = this.dosisTotalDia();

    // Solo calcula si tenemos los tres valores necesarios.
    if (inicio && cantidad && dosisDiaria && dosisDiaria > 0) {
      const diasDeTratamiento = Math.floor(cantidad / dosisDiaria);
      const fechaInicioDate = new Date(inicio + 'T00:00:00'); // Ajuste de zona horaria
      fechaInicioDate.setDate(fechaInicioDate.getDate() + diasDeTratamiento);
      return fechaInicioDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    }
    return ''; // Devuelve vacío si no hay datos suficientes.
  });

  // --- SEÑALES DEL KARDEX (Vinculadas y de entrada) ---
  presentacion = signal('');
  componenteActivo = signal('');
  registroInvima = signal('');
  lote = signal('');
  fechaVencimiento = signal('');
  casaMatriz = signal('');
  presentacionEmpaque = signal('');
  firma = signal('');

  // --- SEÑALES COMPUTADAS: KARDEX ---

  // El proveedor es un valor fijo.
  proveedor = signal('FAMILIA');

  // El saldo se calcula restando la primera salida de la entrada inicial.
  saldo = computed(() => {
    const entrada = this.cantidadCorrecta();
    const salida = this.dosisTotalDia();
    if (entrada !== null && salida !== null) {
      return entrada - salida;
    }
    return null;
  });

   // Manejo de eventos para actualizar las señales desde el HTML.
  onInputChange(signal: any, event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.type === 'number' ? input.valueAsNumber : input.value;
    signal.set(value);
  }
  
  // Método para convertir strings de dosis a números.
  // Permite al usuario escribir '0.5' o '1/2'.
  onDosisChange(signal: any, event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.trim();
    
    try {
      // Evalúa de forma segura una fracción simple como '1/2'
      if (value.includes('/') && !value.match(/[^0-9.\/]/)) {
        const result = new Function('return ' + value)();
        signal.set(result);
      } else {
        // Convierte a número si es un decimal
        const numericValue = parseFloat(value);
        signal.set(isNaN(numericValue) ? null : numericValue);
      }
    } catch (e) {
      signal.set(null); // Si la evaluación falla, se establece como nulo
    }
  }
}
