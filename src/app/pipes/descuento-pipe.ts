import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'descuento' })
export class DescuentoPipe implements PipeTransform {
  transform(precio: number, porcentaje: number = 0): number {
    if (!precio || porcentaje <= 0) return precio;
    return Math.round(precio * (1 - porcentaje / 100));
  }
}
