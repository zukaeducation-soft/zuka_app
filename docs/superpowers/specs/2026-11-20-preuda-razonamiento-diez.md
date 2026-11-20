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

## Estado (2026-11-20)

Hechos los 16 mundos (`PU_DIEZ`): 57 lecciones, 573 ejercicios de una ronda (antes 402 ejercicios y 1 039 rondas), 177 preguntas
de evaluación (57 de ellas en formato real) y 30 retos de gimnasio en razonamiento (11 nuevos: `gym-transporte`, `gym-jardin`,
`gym-podio`, `gym-cubo`, `gym-potencias`, `gym-mensaje`, `gym-ciclistas`, `gym-testigos`, `gym-operador`, `gym-noticias`,
`gym-faros`), con 35 conceptos animados y 40 pasos que llevan concepto.

Cómo quedó escrito:

- Cada `preuda-r-<mundo>.js` conserva arriba su `setLesson` de antes y lleva al final un bloque con `diezLesson` (deja una ronda de
  cada juego, con enunciado y explicación nuevos, y añade la zona de examen) y `addExam` (una `opcion-examen` por lección). El mundo 1
  está escrito entero con `setLesson`. Los ayudantes están en `preuda-razonamiento-juegos.js`.
- Retos y conceptos nuevos: `js/gimnasio-razonamiento.js`. `GYM_CONCEPT_DE` les pone concepto a los pasos de los retos que ya existían.
- Probado en el navegador: los 750 ejercicios (lecciones y evaluaciones) se montan sin error; el arrastre de fichas, la corrección
  del paso y la tarjeta del concepto, en celular y en los dos temas.
- De paso se arregló `rejilla-razon`, que nunca cargaba (llamaba `G.lay`), y con una sola ronda ya no se dibuja la pestaña «1».

Pendiente: las escenas de respaldo de las lecciones y los videos no cambian. Comprensión lectora no se tocó.
