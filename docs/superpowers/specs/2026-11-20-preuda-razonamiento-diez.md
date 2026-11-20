# Razonamiento lógico: diez ejercicios distintos por lección, contexto de examen y conceptos animados (2026-11-20)

Pedido del usuario: revisar todas las lecciones, las evaluaciones y los retos del gimnasio del componente Razonamiento
lógico del Preuniversitario. Hoy cada lección tiene 7 juegos y cada juego repite de 2 a 17 rondas («tedioso y aburrido»).
Quiere **unos diez ejercicios por lección, todos distintos**, sin repeticiones dentro de un ejercicio, que cubran el
concepto en sus variantes y que usen **contextos del examen de admisión** (los reales y los simulacros). En el gimnasio,
cuando el estudiante se atasca en un paso, debe poder **recordar el concepto con una animación corta** hecha en la app
(anime.js). Todo profesional, intuitivo y con la estética de la app.

## Diagnóstico (antes)

57 lecciones, 402 ejercicios, 1 039 rondas (2.6 por ejercicio; `contraejemplo` llegaba a 17, `salta-signos` a 12).
`vuela-precios` y `rompe-cambios` cerraban 38 de las 57 lecciones. El gimnasio tenía 19 retos en 6 de los 16 mundos.
Evaluaciones de 4 a 12 preguntas, ninguna en el formato real.

## Estándar nuevo de una lección (lo exige `tests/preuda-diez.test.js` en los mundos de `PU_DIEZ`)

- **10 ejercicios** (se aceptan de 9 a 11), **cada uno con un juego distinto**.
- **Una sola ronda por ejercicio.** Los juegos de movimiento (arcade) llevan una ronda con 3 preguntas como máximo: sin
  eso no hay juego.
- Los enunciados salen de situaciones del examen (tiendas, torneos, encuestas, recorridos, tanques…), no de cuentas sueltas.
- **Orden**: seis juegos gráficos del concepto, de lo simple a lo combinado; el séptimo es el juego en movimiento; y los
  tres últimos son la **zona de examen**, con tres formatos nuevos (`js/games/examen-kit.js`, HTML, estilo `css/examen.css`):
  1. `completa-solucion`: el problema y su solución escrita con huecos; se arrastran las fichas a los huecos (también
     sirve tocar ficha y hueco). Sobran fichas, que son los errores típicos. Enseña el procedimiento.
  2. `caza-error`: el problema y una solución con **un paso equivocado**; se toca el paso y se le arrastra encima la
     corrección. Enseña a revisar.
  3. `opcion-examen`: la pregunta en el formato real, con opciones A–D. Va de última: «así sale».
  Los tres llevan el rótulo «Como en el examen». Los problemas salen de los simulacros (`docs/simulacros/src`) y de los
  exámenes reales, con otros números cuando el problema ya sale en el video de la lección (la prueba de los videos lo vigila).
- Cada ejercicio con pista que orienta sin dar la respuesta y explicación.

## Evaluación del mundo

Por lección: dos juegos gráficos distintos de una ronda y una `opcion-examen`. Ningún juego repetido dentro de la
evaluación salvo `opcion-examen`.

## Gimnasio

- Cada mundo del componente tiene al menos un reto guiado (antes, 6 de 16).
- Cada paso puede llevar `concept: '<id>'`. En el paso sale el botón **«Recordar el concepto»** junto al entrenador;
  tras el primer fallo el botón late. Abre una tarjeta con una **animación corta** (6 a 12 s) y dos renglones de texto.
- Motor `js/conceptos.js`: `CONCEPTOS[id] = { title, scene, beats: [texto…] }`. La escena es SVG y se arma con datos;
  cada tiempo (`beat`) muestra una parte del dibujo y su rótulo. Tipos: `barra` (partes de un todo, fracción de lo que
  queda, porcentajes), `recta` (saltos), `venn`, `arbol` (ramas que se multiplican), `tabla` (casillas que se encienden),
  `ciclo` (rueda de residuos y patrones), `figura` (polígonos y trazos) y `pasos` (renglones de fórmula). Anima con
  anime.js (ya está en `js/vendor`); con «reducir movimiento» o sin anime muestra el cuadro final. Botón «Repetir».
  No se añade three.js al PWA.
- `tests/conceptos.test.js`: todo `concept` de un reto existe, cada concepto tiene título, escena válida y un texto por tiempo.

## Estado

Se hace por mundos; `PU_DIEZ` (en `preuda-razonamiento-juegos.js`) lista los terminados.
