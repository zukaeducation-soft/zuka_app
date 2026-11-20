# Pantalla completa en el celular (2026-11-19)

Pedido del usuario, con una captura de Brilliant: la app debe cubrir el celular de arriba abajo en los dos temas, sin el
nombre «Zuka» ni las vidas arriba, y con la racha y la experiencia más grandes.

- **Bordes**: en el celular (menos de 520 px) `html`, `body`, `#overlay` y `#auth` usan `--bg`, el mismo fondo de la app.
  Antes se veía `--outer` (gris azulado en claro, casi negro en oscuro) alrededor de la app: en la franja de la barra de
  navegación de Android (Chrome dibuja debajo con `viewport-fit=cover`) y en las lecciones. La barra de estado ya toma
  `theme-color` = `--bg` de cada tema (`applyTheme`). La barra de arriba y el menú usan `env(safe-area-inset-*)`.
- **Barra de arriba**: solo la racha (abre Actividad) y la experiencia, más grandes (letra 17 px, icono 24 px), una a cada
  lado en una franja baja pegada al borde. Sin marca ni vidas: las vidas siguen dentro de la lección.
- Escritorio no cambia (el marco de 480 px con el fondo exterior).

Pruebas: `tests/pantalla-completa.test.js`.
