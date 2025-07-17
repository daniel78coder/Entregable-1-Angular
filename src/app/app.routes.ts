import { Routes } from '@angular/router';
import { AlumnoListaComponent } from './components/alumno-lista/alumno-lista.component';
import { AlumnoFormComponent } from './components/alumno-form/alumno-form.component';

export const routes: Routes = [
  { path: 'alumnos', component: AlumnoListaComponent },
  { path: 'alumnos/nuevo', component: AlumnoFormComponent },
  { path: 'alumnos/editar/:id', component: AlumnoFormComponent },
  { path: '', redirectTo: '/alumnos', pathMatch: 'full' }
];
