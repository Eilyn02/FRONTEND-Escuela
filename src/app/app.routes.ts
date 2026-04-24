import { Routes } from '@angular/router';

import { auditUserGuard } from './core/audit-user.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'app',
    canActivate: [auditUserGuard],
    loadComponent: () => import('./features/shell/main-layout').then((m) => m.MainLayoutComponent),
    children: [
  { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
  {
    path: 'usuarios',
    loadComponent: () =>
      import('./features/usuarios/usuario-list').then((m) => m.UsuarioListComponent),
  },
  {
    path: 'profesores',
    loadComponent: () =>
      import('./features/profesores/profesor-list').then((m) => m.ProfesorListComponent),
  },
  {
    path: 'estudiantes',
    loadComponent: () =>
      import('./features/estudiantes/estudiante-list').then((m) => m.EstudianteListComponent),
  },
  {
    path: 'grados',
    loadComponent: () =>
      import('./features/grados/grado-list').then((m) => m.GradoListComponent),
  },
  {
    path: 'materias',
    loadComponent: () =>
      import('./features/materias/materia-list').then((m) => m.MateriaListComponent),
  },
  {
    path: 'notas',
    loadComponent: () =>
      import('./features/notas/nota-list').then((m) => m.NotaListComponent),
  },
  {
    path: 'periodos',
    loadComponent: () =>
      import('./features/periodos/periodo-list').then((m) => m.PeriodoListComponent),
  },
],
  },
  { path: '**', redirectTo: 'login' },
];