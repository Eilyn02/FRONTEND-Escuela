import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ProfesorService } from '../../core/services/profesor.service';
import { ProfesorRead } from '../../models/api.models';
import { ProfesorCreate } from '../../models/api.models';

@Component({
  selector: 'app-profesor-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSnackBarModule,
  ],
  templateUrl: './profesor-list.html',
  styleUrl: './profesor-list.scss',
})
export class ProfesorListComponent {
  private readonly profesorService = inject(ProfesorService);
  private readonly snack = inject(MatSnackBar);

  // Columnas que se van a mostrar en la tabla HTML.
  readonly displayedColumns = [
    'id_profesor',
    'nombre',
    'apellido',
    'correo',
    'especialidad',
    'telefono',
    'acciones',
  ];

  // Estado local de la pantalla.
  readonly profesores = signal<ProfesorRead[]>([]);
  readonly loading = signal(false);

  constructor() {
    this.cargarProfesores();
  }
  
  nuevoProfesor(): void {

    const nombre = prompt('Nombre');
    if (!nombre) return;

    const apellido = prompt('Apellido');
    if (!apellido) return;

    const correo = prompt('Correo');
    if (!correo) return;

    const especialidad = prompt('Especialidad');
    if (!especialidad) return;

    const telefono = prompt('Teléfono') ?? '';

    const body: ProfesorCreate = {
      nombre,
      apellido,
      correo,
      especialidad,
      telefono,
    };

    this.profesorService.create(body).subscribe({
      next: () => {
        this.snack.open(
          'Profesor creado correctamente',
          'Cerrar',
          { duration: 3000 }
        );

        this.cargarProfesores();
      },
      error: (err: HttpErrorResponse) => {
        this.snack.open(
          this.obtenerMensajeError(err),
          'Cerrar',
          { duration: 5000 }
        );
      },
    });
  }

  /**
   * Consulta los profesores desde el backend FastAPI.
   */
  cargarProfesores(): void {
    this.loading.set(true);

    this.profesorService.list().subscribe({
      next: (data) => {
        this.profesores.set(data);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        this.snack.open(this.obtenerMensajeError(err), 'Cerrar', {
          duration: 5000,
        });
      },
    });
  }

  /**
   * Convierte errores del backend en mensajes legibles para el usuario.
   */
  private obtenerMensajeError(err: HttpErrorResponse): string {

  const detail = err.error?.detail;

  if (typeof detail === 'string') {
    return detail;
  }

  if (Array.isArray(detail)) {
    return detail.map((item) => item.msg ?? JSON.stringify(item)).join('; ');
  }

  const message = err.error?.error?.message;

  if (typeof message === 'string') {
    return message;
  }

  return 'No se pudieron cargar los profesores.';
}

  editarProfesor(profesor: ProfesorRead): void {

    const nombre = prompt('Nombre', profesor.nombre);
    if (nombre === null) return;

    const apellido = prompt('Apellido', profesor.apellido);
    if (apellido === null) return;

    const correo = prompt('Correo', profesor.correo);
    if (correo === null) return;

    const especialidad = prompt(
      'Especialidad',
      profesor.especialidad
    );
    if (especialidad === null) return;

    const telefono = prompt(
      'Teléfono',
      profesor.telefono ?? ''
    );

    const body = {
      nombre,
      apellido,
      correo,
      especialidad,
      telefono,
    };

    this.profesorService
      .update(profesor.id_profesor, body)
      .subscribe({
        next: () => {
          this.snack.open(
            'Profesor actualizado correctamente',
            'Cerrar',
            { duration: 3000 }
          );

          this.cargarProfesores();
        },
        error: (err: HttpErrorResponse) => {
          this.snack.open(
            this.obtenerMensajeError(err),
            'Cerrar',
            { duration: 5000 }
          );
        },
      });
  }

  eliminarProfesor(profesor: ProfesorRead): void {
    const confirmar = confirm(
      `¿Desea eliminar al profesor ${profesor.nombre}?`
    );

    if (!confirmar) {
      return;
    }

    this.profesorService.delete(profesor.id_profesor).subscribe({
      next: () => {
        this.snack.open('Profesor eliminado correctamente', 'Cerrar', {
          duration: 3000,
        });

        this.cargarProfesores();
      },
      error: (err: HttpErrorResponse) => {
        this.snack.open(this.obtenerMensajeError(err), 'Cerrar', {
          duration: 5000,
        });
      },
    });
  }
}