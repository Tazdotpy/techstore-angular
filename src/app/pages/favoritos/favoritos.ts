import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FavoritosService } from '../../services/favoritos';
import { ProductCard } from '../../components/product-card/product-card';
import { Producto } from '../../models/producto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favoritos',
  imports: [RouterLink, AsyncPipe, NgFor, NgIf, ProductCard],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.scss'
})
export class Favoritos {
  private favoritosService = inject(FavoritosService);

  favoritos$: Observable<Producto[]> = this.favoritosService.favoritos$;

  trackById(_: number, p: Producto): string { return p.id; }
}
