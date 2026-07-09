import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Orden } from '../models/orden';

@Injectable({ providedIn: 'root' })
export class HistorialService {
  private readonly STORAGE_KEY = 'techstore_historial';
  private _ordenes = new BehaviorSubject<Orden[]>(this.cargarHistorial());

  ordenes$: Observable<Orden[]> = this._ordenes.asObservable();

  private cargarHistorial(): Orden[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  agregarOrden(orden: Orden): void {
    const ordenes = [orden, ...this._ordenes.value];
    this._ordenes.next(ordenes);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(ordenes));
  }
}
