# Estudiante de un colegio (2026-11-25)

Pedido: a los estudiantes de un colegio solo les aparecen Inicio, Mis cursos y Tú; no pueden comprar.

- `instManda` (js/instituciones.js) decide: contrato vigente y nada comprado por su cuenta (curso vigente u horas). También los gestores.
- `body.de-colegio` esconde Tutorías, Tienda y todo botón de compra, renovación, asesoría o código (css/acceso.css). Además `go`, `openTienda`,
  `openComprar` y `openCanje` lo impiden, y el candado de un curso dice que lo pida a su docente.
- Inicio muestra solo los cursos de su institución. El recorrido se salta el paso de tutorías.
- Si el contrato termina o se pausa, deja de ser estudiante del colegio en la app y puede comprar como cualquiera.
