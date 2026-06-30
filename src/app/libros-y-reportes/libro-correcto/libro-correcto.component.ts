import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-libro-correcto',
  templateUrl: './libro-correcto.html',
  styleUrls: ['./libro-correcto.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule]
})
export class LibroCorrectoComponent {

  // --- SEÑALES DE ENTRADA: PLAN DE TRATAMIENTO ---
  pacienteCorrecto = signal('');
  folio = signal('');
  medicamentoCorrecto = signal('');
  cantidadCorrecta = signal<number | null>(null);
  dosisAm = signal<number | null>(null);
  dosisPm1 = signal<number | null>(null);
  dosisPm2 = signal<number | null>(null);
  viaCorrecta = signal('');
  fechaInicio = signal<string>(''); // Formato YYYY-MM-DD

  // --- SEÑALES DEL KARDEX (Vinculadas y de entrada) ---
  presentacion = signal('');
  componenteActivo = signal('');
  registroInvima = signal('');
  lote = signal('');
  fechaVencimiento = signal('');
  casaMatriz = signal('');
  presentacionEmpaque = signal('');
  firma = signal('');
  proveedor = signal('FAMILIA');

  // --- SEÑALES COMPUTADAS ---

  dosisTotalDia = computed(() => {
    const am = this.dosisAm() ?? 0;
    const pm1 = this.dosisPm1() ?? 0;
    const pm2 = this.dosisPm2() ?? 0;
    const total = am + pm1 + pm2;
    return total > 0 ? total : null;
  });

  fechaFinal = computed(() => {
    const inicio = this.fechaInicio();
    const cantidad = this.cantidadCorrecta();
    const dosisDiaria = this.dosisTotalDia();

    if (inicio && cantidad && dosisDiaria && dosisDiaria > 0) {
      const diasDeTratamiento = Math.ceil(cantidad / dosisDiaria);
      const fechaInicioDate = new Date(inicio + 'T00:00:00');
      fechaInicioDate.setDate(fechaInicioDate.getDate() + (diasDeTratamiento - 1));
      return fechaInicioDate.toISOString().split('T')[0];
    }
    return '';
  });

  // Genera todas las filas para el Kardex expuestas para el template
  public rows = computed(() => {
    const rows: any[] = [];
    const inicioStr = this.fechaInicio();
    const cantidadInicial = this.cantidadCorrecta() || 0;
    const dosisDiaria = this.dosisTotalDia() || 0;
    
    if (!inicioStr || !cantidadInicial || !dosisDiaria) return rows;

    const medicamento = this.medicamentoCorrecto();
    const pres = this.presentacion();
    const compActivo = this.componenteActivo();
    const invima = this.registroInvima();
    const noLote = this.lote();
    const vcto = this.fechaVencimiento();
    const casa = this.casaMatriz();
    const prov = this.proveedor();
    const empaque = this.presentacionEmpaque() || 'SI';

    let saldoActual = cantidadInicial;
    const fechaActual = new Date(inicioStr + 'T00:00:00');
    let isFirstRow = true;

    while (saldoActual > 0) {
      const consumo = Math.min(saldoActual, dosisDiaria);
      const entradaEnEstaFila = isFirstRow ? cantidadInicial : (saldoActual);
      
      const prevSaldo = saldoActual;
      saldoActual -= consumo;

      rows.push({
        fecha: fechaActual.toISOString().split('T')[0],
        producto: medicamento,
        presentacion: pres,
        componente: compActivo,
        invima: invima,
        lote: noLote,
        vencimiento: vcto,
        casa: casa,
        proveedor: prov,
        entrada: entradaEnEstaFila.toString(),
        empaque: empaque,
        salida: consumo.toString(),
        saldo: saldoActual.toString(),
        firma: ''
      });

      isFirstRow = false;
      fechaActual.setDate(fechaActual.getDate() + 1);
    }
    return rows;
  });

  guardarRegistro() {
    console.log('Guardando registro...');
  }

  generarPDF() {
    const doc = new jsPDF('l', 'mm', 'letter');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    const paciente = this.pacienteCorrecto();
    const folioVal = this.folio();
    const inicioStr = this.fechaInicio();
    const dataRows = this.rows().map(row => [
      row.fecha,
      row.producto,
      row.presentacion,
      row.componente,
      row.invima,
      row.lote,
      row.vencimiento,
      row.casa,
      row.proveedor,
      row.entrada,
      row.empaque,
      row.salida,
      row.saldo,
      row.firma
    ]);

    if (!paciente || dataRows.length === 0) {
        alert('Por favor complete todos los datos antes de generar el PDF.');
        return;
    }

    (doc as any).autoTable({
        startY: 35,
        head: [['Fecha', 'Nombre del Producto', 'Unidad, Presentación, Concentración', 'Componente Activo', 'Registro Invima', 'No. de Lote', 'Fecha de Vencimiento', 'Casa Matriz o Fabricante', 'Proveedor', 'Entradas', 'Empaque/Etiquetas (SI/NO)', 'Salidas', 'Saldo', 'firma']],
        body: dataRows,
        theme: 'grid',
        styles: { fontSize: 8, cellPadding: 1.5, halign: 'center', valign: 'middle', textColor: 0 },
        headStyles: { fillColor: [255, 255, 255], textColor: 0, lineWidth: 0.1, fontStyle: 'bold', fontSize: 8 },
        margin: { top: 35, bottom: 25, left: 10, right: 10 },
        didDrawPage: (data: any) => {
            // Header box
            doc.setDrawColor(0);
            doc.setLineWidth(0.1);
            doc.rect(10, 10, pageWidth - 20, 25);
            
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.text('CENTRO DE REHABILITACION\nNUEVOS CAMINOS', 12, 18);
            
            doc.setFontSize(12);
            doc.text('REGISTRO CONTROL DE ENTRADA Y SALIDA DE MEDICAMENTOS', pageWidth / 2, 18, { align: 'center' });
            doc.setFontSize(10);
            doc.text(`${paciente.toUpperCase()} - FOLIO: ${folioVal}`, pageWidth / 2, 28, { align: 'center' });
            
            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            doc.text('Código:   RA-22', pageWidth - 12, 15, { align: 'right' });
            doc.text('Versión:   1', pageWidth - 12, 22, { align: 'right' });

            // Page Numbering
            const str = "Página " + doc.internal.getNumberOfPages();
            doc.setFontSize(8);
            doc.text(str, pageWidth - 12, 30, { align: 'right' });
        }
    });

    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.text(`Página ${i} de ${totalPages}`, pageWidth - 12, 30, { align: 'right' });
    }

    const finalY = (doc as any).lastAutoTable.finalY + 10;
    
    const drawFooter = (y: number) => {
        const boxW = (pageWidth - 20) / 3;
        doc.setDrawColor(0);
        doc.rect(10, y, boxW, 15);
        doc.setFontSize(8);
        doc.text('ELABORO:', 12, y + 4);
        doc.text('ENCARGADO ENFERMERIA', 12, y + 12);
        
        doc.rect(10 + boxW, y, boxW, 15);
        doc.text('REVISO: JHON SALAZAR', 12 + boxW, y + 4);
        doc.text('CARGO: DIRECTOR OPERATIVO', 12 + boxW, y + 12);
        
        doc.rect(10 + (boxW * 2), y, boxW, 15);
        doc.text('APROBO:', 12 + (boxW * 2), y + 4);
        doc.text('CARGO:', 12 + (boxW * 2), y + 12);
    };

    if (finalY + 20 > pageHeight - 10) {
        doc.addPage();
        drawFooter(35);
    } else {
        drawFooter(finalY);
    }

    doc.save(`KARDEX-${paciente.replace(/\s+/g, '_')}-${inicioStr}.pdf`);
  }
}