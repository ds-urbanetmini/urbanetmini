# Requisitos de software

## Requisitos funcionales

**RF01. Registrar incidencia**  
El sistema debe permitir registrar una incidencia municipal con tipo, descripción, ubicación y datos de contacto del ciudadano.

**RF02. Adjuntar evidencia multimedia**  
El sistema debe permitir adjuntar una imagen, video o audio al registrar la incidencia.

**RF03. Almacenar evidencia**  
El backend debe guardar el archivo multimedia en una carpeta local y almacenar en MongoDB la ruta del archivo y su tipo.

**RF04. Listar incidencias**  
El sistema debe permitir visualizar las incidencias registradas en un panel municipal.

**RF05. Ver detalle de incidencia**  
El sistema debe permitir abrir el detalle de una incidencia y visualizar su evidencia multimedia.

**RF06. Actualizar estado**  
El sistema debe permitir cambiar el estado de una incidencia a Pendiente, En revisión o Atendido.

## Requisitos no funcionales

**RNF01. Ejecución local**  
El sistema debe poder ejecutarse localmente usando Node.js y MongoDB.

**RNF02. API REST**  
El backend debe exponer servicios REST para registrar, consultar y actualizar incidencias.

**RNF03. Separación de responsabilidades**  
El backend debe separar controlador, servicio y repositorio mediante Repository Pattern.

**RNF04. Mantenibilidad**  
El código debe organizarse en carpetas claras para frontend, backend, documentación y pruebas.

**RNF05. Versionamiento**  
El proyecto debe subirse a GitHub y relacionarse con tareas Jira mediante claves URBM.
