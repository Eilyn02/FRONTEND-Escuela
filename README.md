Aplicación web desarrollada en Angular para consumir la API REST del proyecto Escuela. El frontend permite iniciar sesión contra el backend FastAPI, navegar por rutas protegidas y consultar información real de entidades del dominio escolar.

## Descripción del proyecto

Este repositorio contiene únicamente el código del cliente web del proyecto Escuela. La aplicación se conecta con el backend desarrollado en FastAPI, SQLAlchemy y PostgreSQL.

El frontend incluye:

- Inicio de sesión contra el endpoint de autenticación del backend.
- Manejo de token JWT en el cliente.
- Protección de rutas mediante guard.
- Interceptor HTTP para enviar el token en las peticiones.
- Navegación por módulos del sistema escolar.
- Consulta real de profesores desde la API.
- Consulta real de estudiantes desde la API.
- Pantallas base para grados, materias, notas y periodos.

## Tecnologías utilizadas

- Angular
- TypeScript
- Angular Material
- RxJS
- HTML
- SCSS

## Requisitos previos

Antes de ejecutar el proyecto se debe tener instalado:

- Node.js
- npm
- Angular CLI

Para verificar la instalación:

bash
node --version
npm --version
ng version


Si Angular CLI no está instalado, se puede instalar con:

bash
npm install -g @angular/cli


## Instalación del proyecto

Clonar el repositorio del frontend y entrar a la carpeta del proyecto:

bash
cd FRONTEND-Escuela


Instalar las dependencias:

bash
npm install


## Configuración de la URL del backend

La URL base de la API se configura en el archivo:

text
src/environments/environment.ts


Configuración usada para desarrollo local:

ts
export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:8000',
};


Para que el frontend funcione correctamente, el backend debe estar ejecutándose en:

text
http://127.0.0.1:8000


También se debe tener CORS configurado en el backend para permitir peticiones desde:

text
http://localhost:4200
http://127.0.0.1:4200


## Ejecución del frontend

Para iniciar la aplicación Angular:

bash
ng serve


Luego abrir en el navegador:

text
http://localhost:4200


## Ejecución del backend

Antes de usar el frontend, se debe iniciar el backend desde el repositorio correspondiente:

bash
uvicorn src.app:app --reload


La documentación Swagger del backend queda disponible en:

text
http://127.0.0.1:8000/docs


## Autenticación

El frontend realiza login contra el endpoint de autenticación del backend:

text
POST /auth/login


Después de un inicio de sesión exitoso, se guarda el token JWT en Local Storage con la clave:

text
access_token


También se guarda un rol inicial para demostración:

text
user_role = admin


Las rutas internas del sistema están protegidas mediante un guard. Si no existe un token, el usuario es redirigido al login.

## Interceptor JWT

El proyecto incluye un interceptor HTTP ubicado en:

text
src/app/core/interceptors/auth.interceptor.ts


Este interceptor agrega automáticamente el token JWT a las peticiones HTTP mediante el header:

text
Authorization: Bearer <token>


Esto permite que las peticiones del frontend se realicen como usuario autenticado.

## Rutas principales

La aplicación cuenta con las siguientes rutas principales:

text
/login
/app/profesores
/app/estudiantes
/app/grados
/app/materias
/app/notas
/app/periodos


La ruta /app redirige por defecto a:

text
/app/profesores


## Funcionalidades implementadas

### Login

- Formulario de inicio de sesión.
- Consumo del endpoint /auth/login.
- Almacenamiento del token JWT.
- Redirección al panel después de autenticarse.
- Cierre de sesión.

### Profesores

- Consulta real de profesores desde la API.
- Visualización de datos en tabla.
- Botón para actualizar la información.
- Envío del token JWT en la petición.

### Estudiantes

- Consulta real de estudiantes desde la API.
- Visualización de datos en tabla.
- Botón para actualizar la información.
- Envío del token JWT en la petición.

### Módulos visuales base

También se dejaron creadas pantallas base para:

- Grados
- Materias
- Notas
- Periodos

Estas pantallas quedan preparadas para futuras integraciones con la API.

## Estructura general del proyecto

text
src/
  app/
    core/
      interceptors/
        auth.interceptor.ts
      services/
        auth.service.ts
        profesor.service.ts
        estudiante.service.ts
      audit-user.guard.ts
    features/
      login/
      shell/
      profesores/
      estudiantes/
      grados/
      materias/
      notas/
      periodos/
    models/
      api.models.ts
  environments/
    environment.ts
    environment.prod.ts


## Pruebas manuales recomendadas

1. Iniciar el backend.
2. Iniciar el frontend.
3. Entrar a http://localhost:4200/login.
4. Iniciar sesión con el usuario administrador creado en el backend.
5. Verificar en Local Storage que existan:

text
access_token
user_role = admin


6. Entrar al módulo de Profesores y verificar que carguen datos reales.
7. Entrar al módulo de Estudiantes y verificar que carguen datos reales.
8. En DevTools, pestaña Network, revisar que las peticiones incluyan:

text
Authorization: Bearer <token>


9. Cerrar sesión y verificar que las rutas protegidas redirijan al login.

## Video

Enlace al video explicativo:

https://youtu.be/y-eVzgWRpUI


En el video se debe evidenciar:

- Arranque del backend.
- Arranque del frontend.
- Login contra la API.
- Token JWT guardado en Local Storage.
- Uso del header Authorization Bearer en peticiones.
- Consulta de profesores desde la API.
- Consulta de estudiantes desde la API.
- Configuración CORS en el backend.

## Integrantes

- Luis Miguel Cardona
- Eilyn Alvarino

## Estado de la entrega

El frontend queda integrado con el backend para autenticación JWT y consulta de entidades reales del sistema escolar. Se cumple la separación de repositorios entre frontend y backend, y el proyecto queda preparado para la grabación del video explicativo y la entrega final.