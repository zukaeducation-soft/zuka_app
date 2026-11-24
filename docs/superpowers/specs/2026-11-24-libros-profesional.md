# Libros con estilo profesional y la ruta de la app (2026-11-24)

Pedido: analizar cómo funciona ahora el Preuniversitario con las primeras lecciones de razonamiento («ese será el enfoque»), diseñar
los libros con un estilo profesional y usar en ellos el logo nuevo.

## Análisis de las primeras lecciones (`pu-cm-1` a `pu-cm-4`)

1. **La lección es una ruta corta**: 5 pasos con nombre, uno por idea; el último siempre es «Ahora sí, un problema».
2. **Cada paso tiene dos tiempos**: primero una explicación que corre sola (una escena, frases de un renglón, una comparación
   cotidiana) y enseguida «Tu turno» con **la misma escena**. La idea se revela al cumplir la meta y entra al andamio.
3. **Una sola escena por lección** hace de lenguaje: la recta (enteros), la barra (fracciones), las cien casillas (porcentajes), los
   puntos y el cuadrado (potencias). La fórmula es lo que la escena ya mostró.
4. **Los ejercicios evalúan la idea**: se construye algo que cumpla una condición, la escena no avisa mientras se responde y al
   comprobar ejecuta la respuesta. Lo que sobra son los errores típicos. Al final, la zona de examen.
5. **El problema va al final** y se resuelve con lo construido. Sin reloj ni vidas en la explicación.

Lo que los libros tenían distinto: abrían con un bloque de teoría de corrido, los ejercicios llegaban páginas después, pedían
resultados y mandaban a «ver el video» y a juegos que ya no están.

## Cómo pasa a los libros

| En la app | En el libro |
|---|---|
| capítulos de `EXPLORA[id].caps` | **ruta** al abrir la lección (`\rutade`, las 57 de razonamiento) |
| andamio de ideas | **Lo que construiste**, con casillas, antes del taller (`\andamiode`); reemplaza la bitácora |
| explicación + «Tu turno» con la misma escena | `\capitulo{…}` + `\turno{…}{respuesta}`; mundo 1 completo |
| ejercicios que construyen | `\armar{\arma{…}{…}{respuesta y error que descubre}}`; mundo 1 completo |
| «Ahora sí, un problema» | el reto, con «Así se usó el concepto» |

`arte/desde_app.js` (lo corre `build.sh`) escribe `tex/explora-rl.tex` desde `js/explora-pu-*.js` y `tex/zuka-logo.tex` desde
`tools/marca.js`: si cambia la app, el libro se pone al día al compilar. Los capítulos por pasos del mundo 1 salieron de
`arte/mundo1.txt` con `arte/pro.py` (ya aplicado). **Pendiente: los mundos 2 a 16 con `\capitulo`, `\turno` y `\armar`**; hoy
llevan la ruta, el andamio y el diseño, con su texto de antes. Lectura (libros 3 y 4) no tiene Explora: solo cambia el diseño.

## Diseño (`tex/zuka-pro.tex`, última capa)

Tinta azul (`zolive` = `#173F73`, `zink` = `#0B1424`), un acento (lima) y naranja `zfire` solo para lo negativo o la trampa. Rótulo con
barra fina en vez de iconos redondos; ejemplos con línea arriba, sin caja; solo la regla y el problema llevan marco. Número grande
de lección, apertura de mundo clara con el arte a la derecha, logo en portada, pie y contraportada, sin fondos oscuros. El
enunciado no se separa de su cuadrícula ni el problema se parte. Páginas: 151, 139, 115 y 91. Portadas de la tienda:
`brand/libros/N.webp`. Los libros del lector de la tienda hay que volver a subirlos en el panel.
