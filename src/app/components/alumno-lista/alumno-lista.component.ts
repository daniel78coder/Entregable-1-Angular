import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../models/alumno';
import { FullNamePipe } from '../../pipes/full-name.pipe';
import { BigHeaderDirective } from '../../directives/big-header.directive';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlumnoService } from '../../services/alumno.services';

@Component({
  selector: 'app-alumno-lista',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    FullNamePipe,
    BigHeaderDirective
  ],
  templateUrl: './alumno-lista.component.html',
  styleUrl: './alumno-lista.component.css'
})
export class AlumnoListaComponent implements OnInit {
  alumnos: Alumno[] = [];
  displayedColumns: string[] = ['id', 'nombreCompleto', 'edad', 'email', 'curso', 'acciones'];

  constructor(private alumnoService: AlumnoService) {}

  ngOnInit(): void {
    this.alumnos = this.alumnoService.getAlumnos();
  }

  eliminarAlumno(id: number): void {
    this.alumnoService.eliminarAlumno(id);
    this.alumnos = this.alumnoService.getAlumnos(); 
  }
}
