import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { HistorialService } from '../../services/historial';
import { Orden } from '../../models/orden';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-historial',
  imports: [RouterLink, AsyncPipe, DatePipe, DecimalPipe, NgFor, NgIf],
  templateUrl: './historial.html',
  styleUrl: './historial.scss'
})
export class Historial {
  private historialService = inject(HistorialService);

  ordenes$: Observable<Orden[]> = this.historialService.ordenes$;

  trackById(_: number, o: Orden): string { return o.id; }
}
