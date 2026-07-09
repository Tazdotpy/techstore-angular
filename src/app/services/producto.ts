import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Producto } from '../models/producto';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private http = inject(HttpClient);
  private readonly URL = '/productos.json';

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.URL).pipe(
      tap(lista => console.log(`ProductoService: ${lista.length} productos cargados`)),
      catchError(err => {
        console.error('Error al cargar productos:', err);
        return of([]);
      })
    );
  }

  obtenerProducto(id: string): Observable<Producto | undefined> {
    return this.obtenerProductos().pipe(
      map(lista => lista.find(p => p.id === id))
    );
  }

  buscarProductos(termino: string): Observable<Producto[]> {
    const t = termino.toLowerCase().trim();
    return this.obtenerProductos().pipe(
      map(lista => lista.filter(p =>
        p.nombre.toLowerCase().includes(t) ||
        p.descripcion.toLowerCase().includes(t) ||
        p.categoria.toLowerCase().includes(t) ||
        p.marca.toLowerCase().includes(t)
      ))
    );
  }

  filtrarPorCategoria(categoria: string): Observable<Producto[]> {
    return this.obtenerProductos().pipe(
      map(lista => categoria === 'todos' ? lista : lista.filter(p => p.categoria === categoria))
    );
  }
}
