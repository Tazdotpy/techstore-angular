import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass, NgIf, NgFor, DecimalPipe, UpperCasePipe } from '@angular/common';
import { Producto } from '../../models/producto';
import { CarritoService } from '../../services/carrito';
import { FavoritosService } from '../../services/favoritos';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, NgClass, NgIf, NgFor, DecimalPipe, UpperCasePipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard implements OnInit {
  // @Input y @Output para comunicación entre componentes (rubric §6)
  @Input() producto!: Producto;
  @Output() agregado = new EventEmitter<Producto>();
  @Output() favoritoToggled = new EventEmitter<Producto>();

  private carritoService = inject(CarritoService);
  private favoritosService = inject(FavoritosService);

  esFavorito = false;
  agregandose = false;
  estrellas = [1, 2, 3, 4, 5];

  ngOnInit(): void {
    this.esFavorito = this.favoritosService.esFavorito(this.producto.id);
  }

  agregarAlCarrito(): void {
    this.carritoService.agregar(this.producto);
    this.agregado.emit(this.producto);
    this.agregandose = true;
    setTimeout(() => (this.agregandose = false), 1200);
  }

  toggleFavorito(): void {
    this.favoritosService.toggleFavorito(this.producto);
    this.esFavorito = !this.esFavorito;
    this.favoritoToggled.emit(this.producto);
  }

  tieneDescuento(): boolean {
    return this.producto.precioOriginal !== null && this.producto.precioOriginal > this.producto.precio;
  }

  calcularDescuentoPct(): number {
    if (!this.tieneDescuento()) return 0;
    return Math.round((1 - this.producto.precio / this.producto.precioOriginal!) * 100);
  }
}
