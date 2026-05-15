# Arquitectura del sistema

## Descripción general

Urbanet Mini es una aplicación web para el registro y gestión de incidencias municipales. El sistema está dividido en frontend, backend y base de datos.

```txt
React + TypeScript
  ↓
API REST Express + TypeScript
  ↓
Controller → Service → Repository
  ↓
MongoDB
```

## Frontend

El frontend está desarrollado con React y TypeScript. Sus responsabilidades son:

- Mostrar formulario de registro de incidencia.
- Enviar datos y archivo multimedia al backend mediante `multipart/form-data`.
- Mostrar panel municipal.
- Mostrar detalle de incidencia.
- Renderizar imagen, video o audio según el tipo de evidencia.
- Consumir el endpoint de actualización de estado.

## Backend

El backend está desarrollado con Node.js, Express y TypeScript. Sus responsabilidades son:

- Exponer API REST.
- Recibir archivos con Multer.
- Guardar archivos en `uploads/incidents/`.
- Validar datos del caso de uso.
- Guardar y consultar incidencias en MongoDB.
- Aplicar Repository Pattern.

## Base de datos

Se utiliza MongoDB local. La base se llama `urbanet_mini` y contiene la colección `incidents`.

## Almacenamiento multimedia

Los archivos no se guardan directamente dentro de MongoDB. El archivo se almacena localmente en:

```txt
backend/uploads/incidents/
```

MongoDB guarda:

```txt
mediaUrl
mediaType
mediaOriginalName
```

## Patrón de diseño aplicado

Se aplica el patrón **Repository Pattern**.

```txt
IncidentController → IncidentService → IncidentRepository → MongoDB
```

El controlador recibe la petición HTTP, el servicio contiene la lógica del caso de uso y el repositorio se encarga del acceso a datos.
