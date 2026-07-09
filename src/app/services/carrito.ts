import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from '../models/producto';
import { ItemCarrito } from '../models/carrito-item';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private readonly STORAGE_KEY = 'techstore_carrito';
  private _items = new BehaviorSubject<ItemCarrito[]>(this.cargarDesdeStorage());

  items$: Observable<ItemCarrito[]> = this._items.asObservable();
  total$: Observable<number> = this._items.pipe(
    map(items => items.reduce((sum, i) => sum + i.producto.precio * i.cantidad, 0))
  );
  cantidad$: Observable<number> = this._items.pipe(
    map(items => items.reduce((sum, i) => sum + i.cantidad, 0))
  );

  private cargarDesdeStorage(): ItemCarrito[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private persistir(items: ItemCarrito[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }

  agregar(producto: Producto): void {
    const items = [...this._items.value];
    const idx = items.findIndex(i => i.producto.id === producto.id);
    if (idx >= 0) {
      items[idx] = { ...items[idx], cantidad: items[idx].cantidad + 1 };
    } else {
      items.push({ producto, cantidad: 1 });
    }
    this._items.next(items);
    this.persistir(items);
  }

  eliminar(id: string): void {
    const items = this._items.value.filter(i => i.producto.id !== id);
    this._items.next(items);
    this.persistir(items);
  }

  actualizarCantidad(id: string, cantidad: number): void {
    if (cantidad <= 0) { this.eliminar(id); return; }
    const items = this._items.value.map(i =>
      i.producto.id === id ? { ...i, cantidad } : i
    );
    this._items.next(items);
    this.persistir(items);
  }

  vaciar(): void {
    this._items.next([]);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  obtenerItems(): ItemCarrito[] {
    return this._items.value;
  }

  calcularSubtotal(): number {
    return this._items.value.reduce((sum, i) => sum + i.producto.precio * i.cantidad, 0);
  }
}
