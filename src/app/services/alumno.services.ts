import { Injectable } from '@angular/core';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private alumnos: Alumno[] = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', edad: 20, email: 'juan@example.com', curso: 'Angular' },
    { id: 2, nombre: 'María', apellido: 'Gómez', edad: 22, email: 'maria@example.com', curso: 'React' },
    { id: 3, nombre: 'Carlos', apellido: 'López', edad: 21, email: 'carlos@example.com', curso: 'Vue' }
  ];

  // Método para generar el próximo ID disponible
  private getNextId(): number {
    if (this.alumnos.length === 0) return 1;
    const maxId = Math.max(...this.alumnos.map(alumno => alumno.id));
    return maxId + 1;
  }

  getAlumnos(): Alumno[] {
    return this.alumnos;
  }

  getAlumno(id: number): Alumno | undefined {
    return this.alumnos.find(a => a.id === id);
  }

  agregarAlumno(alumno: Alumno): void {
    // Asignamos el nuevo ID secuencial
    alumno.id = this.getNextId();
    this.alumnos.push(alumno);
  }

  actualizarAlumno(alumno: Alumno): void {
    const index = this.alumnos.findIndex(a => a.id === alumno.id);
    if (index !== -1) {
      this.alumnos[index] = alumno;
    }
  }

  eliminarAlumno(id: number): void {
    this.alumnos = this.alumnos.filter(a => a.id !== id);
  }
}
