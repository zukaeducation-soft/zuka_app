# Icono y animación de entrada con el personaje (2026-11-20)

Pedido del usuario: cambiar el icono de la app por el nuevo personaje (el cerebro con antifaz) y hacer una animación al
cargar la app en la que el personaje dice «Zuka potencia tu mente».

- **Icono**: `node tools/marca.js --png` dibuja `icons/*.png` con el personaje en la pose de la imagen (`think`) sobre el
  fondo oscuro de la app (#07080f, con un brillo morado suave), casi hasta el borde (margen de 1.5 %; 12 % en el enmascarable). El enmascarable de Android lo deja dentro de la zona
  segura (círculo del 80 %). El cerebro de malla sigue en `js/marca.js` y `brand/` (logo de cuenta y panel).
- **Entrada**: `introBlock()` de `tools/marca.js` escribe en la portada `#boot` el personaje (`cheer`) y un globo:
  «Zuka» en coral y «potencia tu mente» palabra por palabra. El personaje aparece con un rebote (0.1 s), el globo
  a los 0.6 s, las palabras desde 1.05 s cada 0.3 s y al final salta dos veces. La app espera `INTRO_MS` (3.1 s); un
  toque la salta. Sigue saliendo una vez por sesión y no con «reducir movimiento». Su filtro de borde usa el id
  `m-ol-intro` para no chocar con el de los demás personajes.
- Estilos en `css/styles.css` (bloque «Animación de entrada»). Pruebas: `tests/interfaz-red.test.js`.
