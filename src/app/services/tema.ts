import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TemaService {
  private readonly STORAGE_KEY = 'techstore_tema';
  private _oscuro = new BehaviorSubject<boolean>(this.cargarTema());

  temaOscuro$: Observable<boolean> = this._oscuro.asObservable();

  private cargarTema(): boolean {
    return localStorage.getItem(this.STORAGE_KEY) !== 'claro';
  }

  inicializar(): void {
    this.aplicar(this._oscuro.value);
  }

  toggleTema(): void {
    const nuevo = !this._oscuro.value;
    this._oscuro.next(nuevo);
    localStorage.setItem(this.STORAGE_KEY, nuevo ? 'oscuro' : 'claro');
    this.aplicar(nuevo);
  }

  private aplicar(oscuro: boolean): void {
    document.documentElement.classList.toggle('tema-claro', !oscuro);
  }
}
