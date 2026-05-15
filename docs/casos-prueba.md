# Casos de prueba

## CP01 - Registrar incidencia con imagen

**Entrada:** tipo Bache, descripción, ubicación y archivo `.png` o `.jpg`.  
**Resultado esperado:** se crea la incidencia, se guarda el archivo y se muestra código de seguimiento.

## CP02 - Registrar incidencia con video

**Entrada:** tipo Alumbrado público, descripción, ubicación y archivo `.mp4`.  
**Resultado esperado:** se crea la incidencia con `mediaType: video`.

## CP03 - Registrar incidencia con audio

**Entrada:** tipo Emergencia, descripción, ubicación y archivo `.wav` o `.mp3`.  
**Resultado esperado:** se crea la incidencia con `mediaType: audio`.

## CP04 - Listar incidencias

**Entrada:** petición `GET /api/incidents`.  
**Resultado esperado:** el backend devuelve un arreglo de incidencias.

## CP05 - Ver detalle multimedia

**Entrada:** ingresar al detalle de una incidencia registrada.  
**Resultado esperado:** el frontend muestra imagen, reproductor de video o reproductor de audio según `mediaType`.

## CP06 - Actualizar estado a En revisión

**Entrada:** `PATCH /api/incidents/:id/status` con `status: En revisión`.  
**Resultado esperado:** la incidencia cambia de estado y MongoDB refleja el cambio.

## CP07 - Actualizar estado a Atendido

**Entrada:** `PATCH /api/incidents/:id/status` con `status: Atendido`.  
**Resultado esperado:** la incidencia cambia a `Atendido`.