# Inicio, Mis cursos, Tutorías y Tú en computador (2026-11-24)

El usuario mostró Inicio y Mis cursos en su pantalla (una columna angosta con mucho vacío) y pidió que las cuatro vistas
aprovechen el espacio. Solo desde 1000 px; en el celular no cambia nada. Reemplaza los 760 px centrados de la spec
`2026-11-20-escritorio`: el contenido llega hasta 1360 px, alineado con la barra de arriba, que ahora muestra racha y XP
en todas las pestañas menos Clips.

- **Inicio**: los cursos en rejilla y, a la derecha, la meta de hoy, «Tu semana» (días con actividad y racha) y la próxima
  asesoría o el próximo cupo.
- **Mis cursos**: tarjetas grandes en rejilla con el avance por componente (con su figura) o por mundos completos;
  «Explorar más cursos» arriba a la derecha. Sin «Sigue aprendiendo», que vive dentro de cada curso.
- **Tutorías**: las materias en rejilla; al lado, tus asesorías, los próximos días con cupo y cómo funciona.
- **Tú**: a la izquierda la persona y su cuenta; a la derecha las cuatro cifras, el mes en calendario, la meta y el avance
  por curso. **Ajustes** en tarjetas a dos columnas.

Los paneles nuevos (`dk…HTML` en `js/escritorio.js`, clase `dk`) se dibujan siempre y en el celular se esconden; los
contenedores `home-side`, `tu-side`, `pf-side` y `pf-main` allí son `display: contents`. Pruebas: `tests/escritorio.test.js`.
