# Interfaz compacta en computador (2026-11-25)

Pedido: que la app se vea al 100 % como se ve hoy con el navegador al 80 %; la landing no cambia. En el celular tampoco (la letra quedaría
muy pequeña).

- `zoom` en `body` (final de `css/styles.css`): 0.8 desde 1200 px de ancho y 0.88 entre 1000 y 1199. Solo si el navegador mide bien con
  zoom (`currentCSSZoom`); si no, se ve como antes. También en `/admin`.
- `#boot`, `#landing` (y la entrada sobre ella) y `.tour` llevan el zoom contrario.
- En CSS, la pantalla se mide con `--dvh` y `--dvw`. En JS, lo que sale de `clientX` o `getBoundingClientRect` se divide por `zk()` antes
  de escribirse en px; las escalas por proporción (`* W / r.width`) ya sirven.
- Lienzos de p5: `mountSketch` da a p5 el tamaño del lienzo en pantalla, para que el ratón caiga donde se ve.
