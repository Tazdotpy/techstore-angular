import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ProductoService } from '../../services/producto';
import { ProductCard } from '../../components/product-card/product-card';
import { SearchBar } from '../../components/search-bar/search-bar';
import { CategoryMenu } from '../../components/category-menu/category-menu';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-productos',
  imports: [AsyncPipe, NgFor, NgIf, ProductCard, SearchBar, CategoryMenu],
  templateUrl: './productos.html',
  styleUrl: './productos.scss'
})
export class Productos implements OnInit {
  private productoService = inject(ProductoService);
  private route = inject(ActivatedRoute);

  private _busqueda$ = new BehaviorSubject<string>('');
  private _categoria$ = new BehaviorSubject<string>('todos');

  productos$!: Observable<Producto[]>;
  cargando = true;
  totalResultados = 0;

  ngOnInit(): void {
    // Leer queryParams desde el home (ej. ?categoria=gaming)
    this.route.queryParams.subscribe(params => {
      if (params['categoria']) {
        this._categoria$.next(params['categoria']);
      }
    });

    // combineLatest: reactive filter (RxJS §9 del rubric)
    this.productos$ = combineLatest([
      this.productoService.obtenerProductos(),
      this._busqueda$,
      this._categoria$
    ]).pipe(
      map(([lista, busqueda, categoria]) => {
        let resultado = lista;

        // filter (array method del rubric §5)
        if (categoria !== 'todos') {
          resultado = resultado.filter(p => p.categoria === categoria);
        }
        if (busqueda.trim()) {
          const t = busqueda.toLowerCase();
          resultado = resultado.filter(p =>
            p.nombre.toLowerCase().includes(t) ||
            p.marca.toLowerCase().includes(t) ||
            p.descripcion.toLowerCase().includes(t)
          );
        }
        return resultado;
      }),
      tap(lista => {
        this.totalResultados = lista.length;
        this.cargando = false;
      })
    );
  }

  onBusqueda(termino: string): void {
    this._busqueda$.next(termino);
  }

  onCategoria(categoria: string): void {
    this._categoria$.next(categoria);
  }

  trackById(_: number, p: Producto): string {
    return p.id;
  }
}
