import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

interface Usuario {
  nombre: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);
  private readonly STORAGE_KEY = 'techstore_usuario';
  private _autenticado = new BehaviorSubject<boolean>(this.verificarSesion());

  autenticado$: Observable<boolean> = this._autenticado.asObservable();

  private verificarSesion(): boolean {
    return !!localStorage.getItem(this.STORAGE_KEY);
  }

  login(nombre: string, email: string): void {
    const usuario: Usuario = { nombre, email };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuario));
    this._autenticado.next(true);
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this._autenticado.next(false);
    this.router.navigate(['/']);
  }

  obtenerUsuario(): Usuario | null {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  estaAutenticado(): boolean {
    return this._autenticado.value;
  }
}
