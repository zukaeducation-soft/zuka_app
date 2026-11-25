# Menú a la izquierda y panel de administración (2026-11-24)

El usuario pidió mejorar la vista del administrador y que el menú vaya a la izquierda en todas las vistas (estudiante y
administrador) para aprovechar la pantalla.

- **App, desde 1000 px** (`css/escritorio.css`): `--side` es el ancho del menú (244 px; 96 px, con iconos y nombre debajo, hasta
  1239 px). El `#topbar` es el riel (logo arriba; racha y XP abajo) y el `#tabbar` son las secciones. El contenido llega hasta
  1520 px. Las lecciones siguen a pantalla completa. Quien administra ve «Administrar» en el riel y, en Tú, atajos a cada sección.
- **Panel** (`admin/`): el mismo menú, en grupos (Personas, Ventas, Contenido) con iconos y los pendientes; abajo, «Ver la app»,
  el correo y Salir. Inicio es un tablero: lo que hay por atender, seis cifras, estudio por día, lo que vence, cursos y ventas.
  En Estudiantes el estado son fichas con su cuenta y cada persona lleva sus iniciales. En el celular el menú va arriba, de lado.
- El panel no cambia de permisos ni de datos: las mismas funciones `admin` y `tienda_admin`.
