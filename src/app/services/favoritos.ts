import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from '../models/producto';

@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private readonly STORAGE_KEY = 'techstore_favoritos';
  private _favoritos = new BehaviorSubject<Producto[]>(this.cargarFavoritos());

  favoritos$: Observable<Producto[]> = this._favoritos.asObservable();
  cantidad$: Observable<number> = this._favoritos.pipe(map(favs => favs.length));

  private cargarFavoritos(): Producto[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private guardar(favoritos: Producto[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favoritos));
  }

  toggleFavorito(producto: Producto): void {
    const actuales = this._favoritos.value;
    const idx = actuales.findIndex(f => f.id === producto.id);
    const nuevos = idx >= 0
      ? actuales.filter(f => f.id !== producto.id)
      : [...actuales, producto];
    this._favoritos.next(nuevos);
    this.guardar(nuevos);
  }

  esFavorito(id: string): boolean {
    return this._favoritos.value.some(f => f.id === id);
  }
}
