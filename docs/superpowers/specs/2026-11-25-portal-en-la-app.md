# Portal dentro de la app (2026-11-25)

Pedido: el docente ve en la app solo los cursos y componentes de los que es responsable; portal y app comparten un solo menú (Portal junto a
Mis cursos; abajo en celular, a la izquierda en computador); diseño gráfico, interactivo y profesional.

- **Docente responsable en la app:** `inst_cursos` (migración `20261125000004`) le abre solo el Preicfes y `mi_institucion` dice su `equipo`.
  `portalRecorta` (`js/portal.js`) deja en el curso solo sus componentes (`c.entero` guarda el original) y así lo respetan todas las pantallas.
  Gestor: los cursos del contrato. Quien enseña no tiene orden ni vidas (`cuentaRol`).
- **Un solo menú:** pestaña `portal` en `#tabbar` (gestores y docentes). Abre un marco a pantalla completa, hijo de `<html>` (el `zoom` de
  computador está en `<body>` y el portal trae el suyo), con el menú de la app más las opciones del portal (`menu()` en
  `instituciones/portal/vivo.js`); `zukaIr` vuelve a la app sin recargar. En celular: Inicio, tres opciones y «Más», con todas. Entrar con
  código o abrir `/instituciones/portal/` lleva a la app (`/?portal`); `?demo` y `?i=` (Zuka) siguen aparte. CSP: `frame-src 'self'`.
- **Piezas:** cabecera con el dibujo y color del componente, «Tu salón de un vistazo» (avance × nota; flechas, resaltar por zona, ficha rápida),
  constelación de mundos, radar del estudiante frente a su grupo. Con «reducir movimiento», quieto.
- Pruebas: `tests/portal-app.test.js`, `supabase/tests/docentes.test.sql`.
