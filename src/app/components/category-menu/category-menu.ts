import { Component, Output, EventEmitter } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';

interface Categoria {
  id: string;
  nombre: string;
  icono: string;
}

@Component({
  selector: 'app-category-menu',
  imports: [NgClass, NgFor],
  templateUrl: './category-menu.html',
  styleUrl: './category-menu.scss'
})
export class CategoryMenu {
  @Output() categoriaSeleccionada = new EventEmitter<string>();

  categoriaActual = 'todos';

  // *ngFor itera este array (rubric §4)
  categorias: Categoria[] = [
    { id: 'todos',              nombre: 'Todos',            icono: '🏷️' },
    { id: 'laptops',            nombre: 'Laptops',          icono: '💻' },
    { id: 'smartphones',        nombre: 'Smartphones',      icono: '📱' },
    { id: 'tablets',            nombre: 'Tablets',          icono: '📟' },
    { id: 'audio',              nombre: 'Audio',            icono: '🎧' },
    { id: 'gaming',             nombre: 'Gaming',           icono: '🎮' },
    { id: 'accesorios',         nombre: 'Accesorios',       icono: '🔌' },
    { id: 'monitores',          nombre: 'Monitores',        icono: '🖥️' },
    { id: 'componentes',        nombre: 'Componentes',      icono: '⚙️' },
    { id: 'wearables',          nombre: 'Wearables',        icono: '⌚' },
    { id: 'hogar-inteligente',  nombre: 'Hogar Inteligente',icono: '🏠' },
    { id: 'almacenamiento',     nombre: 'Almacenamiento',   icono: '💾' },
  ];

  seleccionar(id: string): void {
    this.categoriaActual = id;
    this.categoriaSeleccionada.emit(id);
  }
}
