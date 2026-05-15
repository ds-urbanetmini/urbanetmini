# Endpoints API

Base URL:

```txt
http://localhost:3000/api
```

## Health check

```txt
GET /health
```

Respuesta esperada:

```json
{
  "message": "API Urbanet Mini funcionando"
}
```

---

## Registrar incidencia

```txt
POST /incidents
```

Tipo de envío:

```txt
multipart/form-data
```

Campos:

```txt
type: Bache | Alumbrado público | Basura acumulada | Seguridad ciudadana | Emergencia
description: string
location: string
citizenName: string opcional
phone: string opcional
media: file
```

Respuesta esperada:

```json
{
  "message": "Incidencia registrada correctamente",
  "data": {
    "code": "INC-0001",
    "status": "Pendiente",
    "mediaType": "image"
  }
}
```

---

## Listar incidencias

```txt
GET /incidents
```

Devuelve todas las incidencias registradas.

---

## Ver detalle

```txt
GET /incidents/:id
```

Devuelve una incidencia por ID.

---

## Actualizar estado

```txt
PATCH /incidents/:id/status
```

Body JSON:

```json
{
  "status": "En revisión"
}
```

Estados permitidos:

```txt
Pendiente
En revisión
Atendido
```

Respuesta esperada:

```json
{
  "message": "Estado actualizado correctamente",
  "data": {
    "status": "En revisión"
  }
}
```
