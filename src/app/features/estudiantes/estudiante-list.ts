import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';

import { EstudianteService } from '../../core/services/estudiante.service';
import { EstudianteRead } from '../../models/api.models';

@Component({
  selector: 'app-estudiante-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTableModule,
  ],
  templateUrl: './estudiante-list.html',
  styleUrl: './estudiante-list.scss',
})
export class EstudianteListComponent {
  private readonly estudianteService = inject(EstudianteService);
  private readonly snack = inject(MatSnackBar);

  // Columnas que se mostrarán en la tabla.
  readonly displayedColumns = [
    'id_estudiante',
    'nombre',
    'apellido',
    'correo',
    'id_grado',
  ];

  // Estado local de la pantalla.
  readonly estudiantes = signal<EstudianteRead[]>([]);
  readonly loading = signal(false);

  constructor() {
    this.cargarEstudiantes();
  }

  /**
   * Consulta los estudiantes desde el backend FastAPI.
   */
  cargarEstudiantes(): void {
    this.loading.set(true);

    this.estudianteService.list().subscribe({
      next: (data) => {
        this.estudiantes.set(data);
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

    return 'No se pudieron cargar los estudiantes.';
  }
}