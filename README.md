# Sonrisa Dental

Dashboard para la gestión de citas, seguimientos y confirmaciones de asistencia de un consultorio dental.

## Estado actual

Esta versión es un prototipo funcional de interfaz y flujo operativo. Incluye:

- Dashboard diario del consultorio.
- Cola de acciones para confirmar citas del día siguiente.
- Estados visuales de seguimiento y progreso de tratamientos.
- Acciones de confirmación y registro de gestión desde las tarjetas.
- Identidad visual de Sonrisa Dental.
- Diseño responsive para escritorio y pantallas pequeñas.

## Importante: alcance actual

La aplicación **todavía no está conectada a servicios externos ni debe considerarse lista para producción**. Las acciones actuales actualizan el estado visual de la interfaz, pero no envían mensajes reales ni guardan información en un servidor.

Aún falta implementar:

- Persistencia real de pacientes, citas y seguimientos en una base de datos.
- Autenticación y permisos para asistentes y administradores.
- Sincronización bidireccional con Google Calendar.
- Envío real de recordatorios por WhatsApp mediante Twilio.
- Envío real de correos electrónicos.
- Automatización de recordatorios, reintentos y reglas de seguimiento.
- Registro auditable de respuestas, confirmaciones y cancelaciones.
- Manejo de consentimiento y protección de datos de pacientes.

## Próxima fase recomendada

1. Conectar una base de datos y definir el modelo de pacientes, tratamientos, citas y seguimientos.
2. Añadir autenticación para el personal del consultorio.
3. Vincular Google Calendar como calendario compartido.
4. Configurar Twilio para WhatsApp y un proveedor de correo.
5. Crear tareas programadas para recordatorios y seguimiento de pacientes.
6. Añadir logs, validaciones, manejo de errores y pruebas antes de producción.

## Desarrollo

La interfaz está construida con Next.js, React y Tailwind CSS. Las credenciales y conexiones de terceros deben configurarse mediante las variables e integraciones del proyecto, nunca dentro del código fuente.
