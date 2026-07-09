import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { CarritoService } from '../../services/carrito';
import { TemaService } from '../../services/tema';
import { AuthService } from '../../services/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, AsyncPipe, NgIf],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit {
  private carritoService = inject(CarritoService);
  private temaService = inject(TemaService);
  private authService = inject(AuthService);

  cantidadCarrito$!: Observable<number>;
  temaOscuro$!: Observable<boolean>;
  autenticado$!: Observable<boolean>;
  menuAbierto = false;

  ngOnInit(): void {
    this.cantidadCarrito$ = this.carritoService.cantidad$;
    this.temaOscuro$ = this.temaService.temaOscuro$;
    this.autenticado$ = this.authService.autenticado$;
  }

  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  toggleTema(): void {
    this.temaService.toggleTema();
  }

  logout(): void {
    this.authService.logout();
    this.menuAbierto = false;
  }
}
