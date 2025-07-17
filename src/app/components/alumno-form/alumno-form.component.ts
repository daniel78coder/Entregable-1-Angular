import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Alumno } from '../../models/alumno';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { BigHeaderDirective } from '../../directives/big-header.directive';
import { AlumnoService } from '../../services/alumno.services';

@Component({
  selector: 'app-alumno-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    BigHeaderDirective,
  ],
  templateUrl: './alumno-form.component.html',
  styleUrl: './alumno-form.component.css',
})
export class AlumnoFormComponent {
  alumnoForm: FormGroup;
  isEdit = false;
  alumnoId: number | null = null;
  private alumnoService = inject(AlumnoService);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.alumnoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(15), Validators.max(99)]],
      email: ['', [Validators.required, Validators.email]],
      curso: ['', Validators.required],
    });

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEdit = true;
        this.alumnoId = +params['id'];
        const alumno = this.alumnoService.getAlumno(this.alumnoId);
        if (alumno) {
          this.alumnoForm.patchValue(alumno);
        }
      }
    });
  }

  guardarAlumno(): void {
    if (this.alumnoForm.valid) {
      const alumno: Alumno = {
        id: this.alumnoId || 0,
        ...this.alumnoForm.value,
      };

      if (this.isEdit) {
        this.alumnoService.actualizarAlumno(alumno);
      } else {
        this.alumnoService.agregarAlumno(alumno);
      }

      this.router.navigate(['/alumnos']);
    }
  }
}
