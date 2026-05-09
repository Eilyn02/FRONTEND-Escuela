import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ProfesorService } from '../../core/services/profesor.service';
import { ProfesorRead } from '../../models/api.models';

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
  ];

  // Estado local de la pantalla.
  readonly profesores = signal<ProfesorRead[]>([]);
  readonly loading = signal(false);

  constructor() {
    this.cargarProfesores();
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

    return 'No se pudieron cargar los profesores.';
  }
}