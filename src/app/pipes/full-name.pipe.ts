import { Pipe, PipeTransform } from '@angular/core';
import { Alumno } from '../models/alumno';

@Pipe({
  name: 'fullName',
  standalone: true
})
export class FullNamePipe implements PipeTransform {
  transform(alumno: Alumno): string {
    return `${alumno.nombre} ${alumno.apellido}`;
  }
}
