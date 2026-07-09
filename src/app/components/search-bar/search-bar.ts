import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule, NgIf],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss'
})
export class SearchBar implements OnDestroy {
  // Two-way binding con [(ngModel)] + @Output para emit al padre (rubric §3, §6)
  @Output() busqueda = new EventEmitter<string>();

  termino = '';
  private busquedaSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor() {
    this.busquedaSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(t => this.busqueda.emit(t));
  }

  onInput(): void {
    this.busquedaSubject.next(this.termino);
  }

  limpiar(): void {
    this.termino = '';
    this.busqueda.emit('');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
