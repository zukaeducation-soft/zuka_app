# Comprensión lectora · explicación interactiva y ejercicios sobre el texto

Pedido del 2026-11-24: las lecciones y los ejercicios de Comprensión lectora pasan al mismo lenguaje de Razonamiento
lógico (Explora). Son 12 mundos y 33 lecciones; se hace por mundos. **Modelo: mundo 1, «Estrategias de lectura».**

## Idea

**El texto es la escena.** Nada de leer arriba y arrastrar tarjetas abajo: se subraya, se tacha, se anota al margen, se
tira un hilo hasta la oración que prueba algo, se llena un hueco de la propia oración. Al comprobar, la hoja responde:
revisa cada marca, se levanta la cortina, se encienden las palabras que lo prueban, el resumen se encoge.

- Sin reloj ni reflejos. Sin opción múltiple (`pregunta-examen` sigue solo en las evaluaciones).
- Cada ejercicio evalúa algo que la explicación enseñó; el error típico se puede responder y tiene su aviso (`mira`).
- El texto de la lección (los de `preuda-l-<mundo>.js`) no cambia; la explicación usa textos cortos propios.
- Ocho ejercicios por lección, ningún juego repetido dentro de ella, una sola ronda.

## Piezas

- `js/games/hoja-kit.js` (`HOJA`): la hoja (`HOJA.hoja`), y cuatro armazones sobre `XG.juego`: `HOJA.toca` (subrayar,
  tachar), `HOJA.zonas` (fichas que van al margen o a huecos del texto), `HOJA.hilos` (tirar un hilo hasta el texto) y
  `HOJA.ordena` (mover tiras).
- `js/games/lectura-escena.js`: los juegos del mundo 1.
- `js/explora-lectura.js`: escena `hoja` de las explicaciones (momentos `luz`, `tacha`, `nota`, `tapa`) y sus
  prácticas (`modo: 'toca' | 'tacha' | 'margen'`).
- `PU_LEC_EXPLORA` (preuda-lectura-juegos.js): mundos con este estándar; los demás conservan 7 juegos LEC.

## Estado

Hechos: mundo 1 (`pu-el-1` a `pu-el-3`) y mundo 2 (`pu-tt-1` a `pu-tt-3`, juegos en `js/games/lectura-tipos-escena.js` y
armazón nuevo `HOJA.pinta`, marcadores de colores). Faltan los mundos 3 a 12.
