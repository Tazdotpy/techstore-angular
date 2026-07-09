export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  precioOriginal: number | null;
  categoria: string;
  marca: string;
  color: string;
  imagen: string;
  stock: number;
  calificacion: number;
  resenas: number;
  badge: string | null;
}
