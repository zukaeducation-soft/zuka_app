# Geometría Vectorial y Analítica: estructura del curso y mundo 1 con escenas

Pedido del 2026-11-27: «estructura y crea el curso de geometría vectorial y analítica basado en los pdf adjuntos» (cronogramas de
parciales y quices 2020-1, libro *Geometría Vectorial y Analítica. Una introducción al Álgebra Lineal*, resumen, notas, clases 1–22,
parciales 2005–2017 y talleres 1–12). Reemplaza la parte de ejercicios de la spec `2026-11-11-geometria-vectorial-design.md`; la
estructura de aquella se conserva.

## Lo que ya había

El curso `geo` (`js/courses/geometria.js`, color `#60a5fa`, figura y paleta en `js/art.js` y `COURSE_PALETTES`, seis láminas en
`js/worlds.js`) existía desde el 2026-11-11 con 23 lecciones y escenas de respaldo, en el orden del cronograma. Sus ejercicios son del
estándar viejo: cinco juegos de p5 (`fila-a-fila`, `afina-sistema`, `combina-vectores`, `flecha-vector`, `conica-viva`) repetidos en
casi todas las lecciones, `num` que `sin-escribir.js` cambia por `arma-la-cuenta`, ningún juego en movimiento y ninguna evaluación. En
Supabase ya está sin publicar (`cursos.publicado = false`). No hay resúmenes de este curso en `docs/resumenes/tex/` (los borradores
`sistemas.tex`, `determinantes.tex`, `productos.tex` sin commit son de Álgebra Lineal y quedan sin tocar).

**Decisión**: se reestructura el curso existente, no se duplica. Se conservan los 23 ids `geo-N` (el progreso de quien ya entró no
se pierde y las filas de `lecciones` en Supabase siguen valiendo) y los seis mundos del cronograma. Cada lección se rehace con el
modelo del curso de Geometría Euclidiana: explicación interactiva Explora, siete u ocho ejercicios con escena (`XG.figura`,
`XG.rotula`, `XG.tiros`, …) **todos con un juego distinto en todo el curso**, el último en movimiento, la zona de examen
(`completa-solucion`, `caza-error`, `opcion-examen`) y una evaluación por mundo. Mientras un mundo no esté rehecho, sus lecciones
siguen con los ejercicios viejos (el curso está en borrador).

## Estructura (orden del cronograma 2020-1; cortes = parciales y quices)

| Mundo (`world`, nombre del mapa) | Semanas · corte | Lecciones |
|---|---|---|
| `sistemas` Álgebra Matricial | 1–4 · Parcial 1, Quiz 1 | `geo-1` Sistemas 2×2 y 3×3 y su geometría · `geo-2` El conjunto Rⁿ y el álgebra matricial · `geo-3` Transpuesta, sistemas m×n y tipos de solución · `geo-4` Matrices invertibles y matrices elementales |
| `determinantes` Inversión y Determinante | 5–8 · Parcial 2, Quiz 2 | `geo-5` Gauss-Jordan para la inversa · `geo-6` La función determinante · `geo-7` El determinante con matrices elementales · `geo-8` Determinante e inversa |
| `vectores` Geometría Vectorial | 8–10 · Parcial 3, Quiz 3 | `geo-9` Vectores libres y sus operaciones · `geo-10` Vectores en la geometría euclidiana · `geo-11` Vectores geométricos y vectores coordenados · `geo-12` La recta · `geo-13` Lugares geométricos e intersecciones |
| `productos` Productos Vectoriales | 10–12 · Parcial 3 | `geo-14` Producto escalar · `geo-15` Proyección ortogonal · `geo-16` Producto escalar y geometría analítica · `geo-17` Producto vectorial · `geo-18` Producto vectorial y geometría analítica |
| `mecanica` Fuerza, Trabajo y Momento | 13–15 · Parcial 4, Quiz 4 | `geo-19` Fuerzas coplanarias y concurrentes · `geo-20` Cinemática · `geo-21` Trabajo y momento de una fuerza |
| `conicas` Secciones Cónicas | 16–17 · Parcial 4 | `geo-22` La circunferencia y la parábola · `geo-23` La elipse y la hipérbola |

El libro y los talleres traen además transformaciones lineales del plano, movimientos euclidianos, valores propios y superficies
cuádricas; el cronograma 2020-1 no los incluye y quedan fuera (posible mundo extra si se pide).

## Arquitectura

- `js/courses/geometria.js` sigue siendo el curso: unidades, títulos y escenas de respaldo de las 23 lecciones.
- `js/courses/vectorial-base.js` (después de `euclidiana-base.js`): `GVA_TEMARIO` (los seis mundos y sus ids), `GVA_LEC` (lecciones
  rehechas: `{ scenes, ex, items }`), `GVA_HECHOS` y el ayudante `GVA` (los de `ICF`: `x`, `sol`, `err`, `opc`, `guion`, más
  `leccion(id, scenes, ex, items)`; `items` = `[[nota de repaso, ejercicio], …]`, tres por lección).
- `js/courses/vectorial-geo-N.js`: una lección rehecha por archivo (antes de `data.js`).
- `js/courses/vectorial.js` (después de `data.js`, antes de `sin-escribir.js`): pone en `COURSE_GEO` lo de `GVA_LEC` y, cuando todas
  las lecciones de un mundo están rehechas, le arma su evaluación (`exam-geo-<mundo>`, 1.5 min por pregunta) y lo anota en `GVA_HECHOS`.
- Juegos nuevos en `js/games/gva-escena-N.js` (uno por lección; sin lienzo ni colores propios); su guía, en `GUIDE_GVA` de `js/guia.js`.
- Explicaciones en `js/explora-gva-N.js` (`xpLec('geo-N', …)`).
- Migración `supabase/migrations/20261127000001_curso_geometria_vectorial.sql`: el curso sigue en borrador.
- Guía para escribir una lección: `2026-11-27-geometria-vectorial-guia-lecciones.md`.

## Pruebas

`tests/geometria-vectorial.test.js`: temario igual al cronograma y a `COURSE_GEO`; cada lección rehecha con explicación, 10 u 11
ejercicios (7 u 8 con escena + zona de examen), ningún juego repetido en el curso entre lecciones rehechas, el último de escena en
movimiento (`tiros`), pistas y explicaciones, nada que nombre la fuente; evaluación con tres preguntas por lección (una A–D, juegos
distintos, datos distintos a los de la lección), claves A–D repartidas; calidad de las escenas (las mismas exigencias del curso
euclidiano); archivos registrados y que vienen con la app. `tests/contenido-geometria.test.js` sigue probando el curso viejo.

## Estado

- Hecho (2026-11-27): estructura completa (6 mundos, 23 lecciones con escenas de respaldo); mundo 1 `sistemas` rehecho entero
  (`geo-1` a `geo-4`) con explicaciones, ejercicios con escena y su evaluación.
- Pendiente: mundos 2 a 6 (`geo-5` a `geo-23`) con el mismo estándar; videos; resúmenes en PDF; gimnasio; voz.
