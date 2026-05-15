# Casos de uso

## CU01 - Registrar incidencia

**Actor:** Ciudadano  
**Descripción:** El ciudadano registra una incidencia en la vía pública adjuntando evidencia multimedia.

### Flujo principal

1. El ciudadano ingresa al formulario de registro.
2. Selecciona el tipo de incidencia.
3. Escribe descripción y ubicación.
4. Ingresa nombre y teléfono, si corresponde.
5. Adjunta una imagen, video o audio.
6. Envía el formulario.
7. El backend guarda el archivo y la información en MongoDB.
8. El sistema muestra un código de seguimiento.

### Resultado esperado

La incidencia queda registrada con estado inicial `Pendiente`.

---

## CU02 - Consultar incidencias

**Actor:** Usuario municipal  
**Descripción:** El usuario municipal consulta las incidencias registradas.

### Flujo principal

1. El usuario entra al panel municipal.
2. El frontend solicita las incidencias al backend.
3. El sistema muestra código, tipo, ubicación, estado y fecha.
4. El usuario selecciona una incidencia para ver el detalle.

### Resultado esperado

El usuario municipal puede visualizar la lista y abrir el detalle de cada incidencia.

---

## CU03 - Actualizar estado de incidencia

**Actor:** Usuario municipal  
**Descripción:** El usuario municipal cambia el estado operativo de una incidencia.

### Flujo principal

1. El usuario abre el detalle de la incidencia.
2. Selecciona un nuevo estado.
3. Presiona el botón de actualización.
4. El frontend envía la actualización al backend.
5. MongoDB almacena el nuevo estado.
6. El sistema muestra confirmación.

### Estados permitidos

- Pendiente
- En revisión
- Atendido

### Resultado esperado

El estado de la incidencia queda actualizado en la base de datos.
