import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgFor, NgIf, DecimalPipe } from '@angular/common';
import { CarritoService } from '../../services/carrito';
import { ItemCarrito } from '../../models/carrito-item';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-carrito',
  imports: [RouterLink, AsyncPipe, NgFor, NgIf, DecimalPipe],
  templateUrl: './carrito.html',
  styleUrl: './carrito.scss'
})
export class Carrito {
  private carritoService = inject(CarritoService);

  items$: Observable<ItemCarrito[]> = this.carritoService.items$;
  subtotal$: Observable<number> = this.carritoService.total$;

  itbis(sub: number): number { return sub * 0.18; }
  total(sub: number):   number { return sub * 1.18; }

  cambiarCantidad(id: string, evento: Event): void {
    const val = +(evento.target as HTMLInputElement).value;
    this.carritoService.actualizarCantidad(id, val);
  }

  eliminar(id: string): void {
    this.carritoService.eliminar(id);
  }

  vaciar(): void {
    if (confirm('¿Vaciar el carrito?')) this.carritoService.vaciar();
  }

  trackById(_: number, item: ItemCarrito): string {
    return item.producto.id;
  }
}
