# Portada: cada sección cabe en la pantalla (2026-11-28)

Pedido del usuario: al tocar una sección del menú (Programas, Instituciones…) los elementos no cabían en la pantalla y había
que desplazarse para verlos. Quiere que todo quede ajustado al tamaño de la pantalla, sin desplazarse, y responsivo. A mitad
del trabajo pidió además **quitar** «Ahora prueba tú» (las tres demos: la rueda, el cuadrado y la palanca) y la sección «Lo que
vas a aprender» (los mapas de cursos).

## Qué se quitó

- Las demos de «Cómo se aprende» (`pz-prueba`, `pz-demos`) y sus funciones vivas (`pzRuedaViva`, `pzAreaViva`, `pzPalancaViva`).
- La sección `#pz-cursos` con sus pestañas.
- Lo que llevaba ahí: «Ver más» de cada curso pasa a «Probar gratis» (abre la prueba); los cursos de Fundamentación preguntan
  por WhatsApp; las cartas del carrusel van a la tarjeta de Fundamentación; el pie lleva cada programa a Programas; Asesorías se
  queda con su botón de WhatsApp.

## Cómo cabe cada sección

Capa «encaje» al final de `css/presentacion.css`:

- `--pz-alto` = alto de la ventana menos la barra (64 px en celular, 76 px desde 1000 px). Títulos, imágenes, mapas y celulares
  se miden con el alto (`vh`) además del ancho; menos aire arriba de cada sección y `scroll-padding-top` igual a la barra.
- **Programas**: una fila que se desliza (tres tarjetas en computador, dos en tableta, una en celular), con flechas junto al título
  (`pzCarriles` en `js/presentacion.js`; se apagan en los extremos y se esconden si todo cabe). Ir a una tarjeta corre la fila.
- **Quiénes somos**: más compacto; en celular las tres tarjetas y las fichas se deslizan.
- **Instituciones**: la calculadora y el portal más compactos; en celular van uno al lado del otro y se deslizan.
- **Carrusel**: cabe con sus pestañas; en pantallas bajas el mazo de Fundamentación no sale y la figura de dispositivos se achica.
- Pasos extra para pantallas bajas: computador ≤ 720 px de alto y celular ≤ 860 px de alto.

Medido con `tests/robot-portada-encaja.js` (en la página: `__encaja()` da lo que sobra por sección; negativo = no cabe). Todas
caben en 1920 × 960, 1440 × 820, 1366 × 768, 1280 × 650, 1100 × 680, 768 × 1024, 375 × 812 y 390 × 664, sin desbordar a lo ancho.

Pruebas: `tests/portada-encaja.test.js` y `tests/presentacion.test.js`.
