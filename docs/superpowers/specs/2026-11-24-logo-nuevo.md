# Logo nuevo: el cerebro de un trazo (2026-11-24)

Pedido: «ahora quiero que el logo de la app sea este (adjunto); úsalo para los libros y para el logo de la app». El adjunto es un
cerebro de un solo trazo con dos destellos y la palabra ZUKA, monocromo (blanco sobre azul noche `#060d1a` o al revés).

- **Fuente única**: `tools/marca.js` guarda los contornos calcados de la imagen (`BRAIN_D`, `RAYS_D`, `WORD_D`, en 1254 × 1254) y
  genera `js/marca.js`, `brand/*.svg`, la entrada de `index.html` y, con `--png`, `icons/*.png` y `brand/logo-vertical-*.png`.
- **App**: `brainSVG()` (sin variantes), `brainTile(cls)`, `logoHTML()`; toman el color del texto, así sirven en los dos temas.
  `zukaWord()` (barra de escritorio, cuenta, clave, presentación) es ahora `logoHTML()`.
- **Iconos**: cerebro blanco sobre `#060d1a`, sin la palabra (el celular escribe el nombre debajo); el enmascarable, en la zona segura.
- **Entrada**: cerebro, destellos, ZUKA y «potencia tu mente» (2.7 s). El personaje (`js/mascota.js`) sigue dentro de la app, pero ya
  no es ni el icono ni la entrada.
- Pruebas: `tests/interfaz-red.test.js`, `tests/escritorio.test.js`.
