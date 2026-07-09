import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ProductoService } from '../../services/producto';
import { ProductCard } from '../../components/product-card/product-card';
import { Producto } from '../../models/producto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface CatCard {
  id: string;
  nombre: string;
  icono: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, AsyncPipe, NgFor, NgIf, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  private productoService = inject(ProductoService);

  destacados$!: Observable<Producto[]>;

  categorias: CatCard[] = [
    { id: 'laptops',     nombre: 'Laptops',      icono: '💻' },
    { id: 'smartphones', nombre: 'Smartphones',  icono: '📱' },
    { id: 'gaming',      nombre: 'Gaming',       icono: '🎮' },
    { id: 'audio',       nombre: 'Audio',        icono: '🎧' },
    { id: 'tablets',     nombre: 'Tablets',      icono: '📟' },
    { id: 'accesorios',  nombre: 'Accesorios',   icono: '🔌' },
  ];

  ngOnInit(): void {
    this.destacados$ = this.productoService.obtenerProductos().pipe(
      map(lista => lista.slice(0, 6))
    );
  }

  trackById(_: number, p: Producto): string {
    return p.id;
  }
}
