import { ItemCarrito } from './carrito-item';

export interface Cliente {
  nombre: string;
  email: string;
  direccion: string;
  telefono: string;
  tarjeta: string;
}

export interface Orden {
  id: string;
  fecha: Date;
  cliente: Cliente;
  items: ItemCarrito[];
  subtotal: number;
  itbis: number;
  total: number;
}
