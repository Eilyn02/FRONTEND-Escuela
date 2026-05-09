/**
 * Contratos TypeScript alineados con los schemas del backend FastAPI
 * del proyecto Escuela.
 */

/*
   Autenticación
*/

export interface LoginRequest {
  correo: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

/* 
   Usuarios
*/

export interface UsuarioRead {
  id_usuario: number;
  nombre: string;
  correo: string;
  rol: string;
  activo: boolean;
}

/* 
   Profesores
*/

export interface ProfesorRead {
  id_profesor: number;
  nombre: string;
  apellido: string;
  correo: string;
  especialidad: string;
  telefono: string | null;
}

export interface ProfesorCreate {
  nombre: string;
  apellido: string;
  correo: string;
  especialidad: string;
  telefono?: string | null;
}

export interface ProfesorUpdate {
  nombre?: string;
  apellido?: string;
  correo?: string;
  especialidad?: string;
  telefono?: string | null;
}

/* 
   Estudiantes
 */

export interface EstudianteRead {
  id_estudiante: number;
  nombre: string;
  apellido: string;
  correo: string;
  id_grado: number;
}

export interface EstudianteCreate {
  nombre: string;
  apellido: string;
  correo: string;
  id_grado: number;
}

export interface EstudianteUpdate {
  nombre?: string;
  apellido?: string;
  correo?: string;
  id_grado?: number;
}

/* 
   Grados
 */

export interface GradoRead {
  id_grado: number;
  nombre: string;
}

export interface GradoCreate {
  nombre: string;
}

export interface GradoUpdate {
  nombre?: string;
}

/* 
   Materias
 */

export interface MateriaRead {
  id_materia: number;
  nombre: string;
  id_profesor: number;
}

export interface MateriaCreate {
  nombre: string;
  id_profesor: number;
}

export interface MateriaUpdate {
  nombre?: string;
  id_profesor?: number;
}

/* 
   Notas
 */

export interface NotaRead {
  id_nota: number;
  clasificacion: number;
  id_estudiante: number;
  id_profesor: number;
  id_materia: number;
  id_periodo: number;
}

export interface NotaCreate {
  clasificacion: number;
  id_estudiante: number;
  id_profesor: number;
  id_materia: number;
  id_periodo: number;
}

export interface NotaUpdate {
  clasificacion?: number;
  id_estudiante?: number;
  id_profesor?: number;
  id_materia?: number;
  id_periodo?: number;
}

/* 
   Periodos
 */

export interface PeriodoRead {
  id_periodo: number;
  nombre: string;
  fecha_inicio: string;
  fecha_fin: string;
}

export interface PeriodoCreate {
  nombre: string;
  fecha_inicio: string;
  fecha_fin: string;
}

export interface PeriodoUpdate {
  nombre?: string;
  fecha_inicio?: string;
  fecha_fin?: string;
}