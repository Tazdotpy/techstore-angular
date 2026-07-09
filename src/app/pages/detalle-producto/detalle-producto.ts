import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, NgIf, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault, NgClass, UpperCasePipe, DecimalPipe } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProductoService } from '../../services/producto';
import { CarritoService } from '../../services/carrito';
import { FavoritosService } from '../../services/favoritos';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-detalle-producto',
  imports: [RouterLink, AsyncPipe, NgIf, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault, NgClass, UpperCasePipe, DecimalPipe],
  templateUrl: './detalle-producto.html',
  styleUrl: './detalle-producto.scss'
})
export class DetalleProducto implements OnInit {
  private route = inject(ActivatedRoute);
  private productoService = inject(ProductoService);
  private carritoService = inject(CarritoService);
  private favoritosService = inject(FavoritosService);

  producto$!: Observable<Producto | undefined>;
  esFavorito = false;
  agregado = false;
  cantidad = 1;
  estrellas = [1, 2, 3, 4, 5];

  ngOnInit(): void {
    this.producto$ = this.route.params.pipe(
      switchMap(params => this.productoService.obtenerProducto(params['id']))
    );
    this.producto$.subscribe(p => {
      if (p) this.esFavorito = this.favoritosService.esFavorito(p.id);
    });
  }

  agregarAlCarrito(producto: Producto): void {
    for (let i = 0; i < this.cantidad; i++) {
      this.carritoService.agregar(producto);
    }
    this.agregado = true;
    setTimeout(() => (this.agregado = false), 2000);
  }

  toggleFavorito(producto: Producto): void {
    this.favoritosService.toggleFavorito(producto);
    this.esFavorito = !this.esFavorito;
  }

  cambiarCantidad(delta: number): void {
    this.cantidad = Math.max(1, this.cantidad + delta);
  }
}
