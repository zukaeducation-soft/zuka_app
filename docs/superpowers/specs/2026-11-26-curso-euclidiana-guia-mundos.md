# Geometría Euclidiana: cómo se escribe un mundo

Guía de trabajo para quien escribe un mundo del curso `euc` (spec `2026-11-26-curso-euclidiana.md`). Léela entera antes de empezar.

## Qué se entrega (solo estos tres archivos; no se toca ningún otro)

| Archivo | Contenido |
|---|---|
| `js/games/euc-escena-<n>.js` | los juegos nuevos del mundo n (IIFE; armazones `XG.figura`, `XG.rotula`, `XG.tiros`, `XG.frases`, `XG.renglones`, `XG.cuenta`, `XG.mueve`) |
| `js/courses/euclidiana-<mundo>.js` | las lecciones y la evaluación: `EUC_MUNDOS.push((() => { const { leccion, mundo, x, sol, err, opc, guion } = EUC; … return mundo('euc-<mundo>', [l1, l2, …], items); })());` |
| `js/explora-euc-<n>.js` | la explicación interactiva de cada lección (`xpLec`, `xpMira`, `xpHaz`), dentro de un bloque `{ … }` |

Ya están registrados en `index.html` (hoy solo tienen un comentario). **No** se editan `index.html`, `js/guia.js`, `js/worlds.js`,
`tests/`, `sw.js`, ni `js/paquetes/`; **no** se corre `tools/empaquetar.js`; **no** se hace commit ni push. Otros agentes escriben los
demás mundos en esta misma carpeta al mismo tiempo: si una prueba falla por un archivo `euc`/`euclidiana` que no es tuyo (por ejemplo
un `SyntaxError` en otro mundo), espera un momento y vuelve a correrla; solo te importan los fallos que nombran tu mundo.

Los títulos de las lecciones son exactamente los de `EUC_TEMARIO` (`js/courses/euclidiana-base.js`); ids `euc-<mundo>-1`, `-2`, …
`mundo(world, lessons, items)` toma el título del temario.

## Modelos que hay que leer primero

- `js/courses/preicfes-ma-forma.js` (lecciones + evaluación con los ayudantes) y `js/courses/preicfes-base.js`.
- `js/games/geo-escena-1.js` y `js/games/figura-kit.js` (cómo se programa un juego con cada armazón); `js/games/forma-escena.js`,
  `js/games/trig-escena.js` (`XG.mueve`, `XG.cuenta`), `js/games/proposiciones-escena.js` y `conteo-escena.js` (`XG.frases`,
  `XG.renglones`, `XG.cuenta`, `XG.ascensor`).
- `js/explora-pu-ge-1.js` y `js/explora-icf-ma-5.js` (explicaciones) y la cabecera de `js/explora-escenas.js` (escenas `dibujo`,
  `fichas`, `rejilla`; piezas `XPK`: `t, l, r, c, p, pl, at, arc, sec, ang, ar, f, cota`).
- `docs/superpowers/specs/catalogo-juegos-geometria.md`: catálogo exacto de los juegos de geometría que ya existen, con sus `params`,
  restricciones y trampas. **Reutiliza con datos nuevos todo lo que sirva** (ángulos, paralelas, triángulos, Pitágoras, semejanza,
  áreas, círculo) y programa juegos nuevos solo para lo que no existe.
- Clases de dibujo (`css/explora.css`): rellenos `fa` (acento), `fg`, `ff`, `fo`, `fk`, `fn`; líneas `la`, `lg`, `lf`, `lo`, `lm`, `ls`,
  `lr`, con `gr` (gruesa) y `d` (punteada); textos `ta`, `tg`, `tf`, `tm`, `s` (pequeño). Nada de colores propios ni de lienzo/p5.

## El libro

*Geometría Euclidiana* de J. R. Londoño (Ude@). Texto extraído:
`C:\Users\USERAC~1\AppData\Local\Temp\claude\7393d0fefbabb825\4264550b-e475-4346-ad43-c9cbffed6fc3\scratchpad\libro.txt` (marcas
`=====PAGE n=====`; la página impresa es la del PDF + 8, y cada módulo abre con «Contenidos del módulo») y la lista de teoremas y
postulados en `…\scratchpad\teoremas.txt`. Del libro se toman **el orden, los temas, las definiciones, los nombres y los teoremas**
de los módulos de tu capítulo (usa su vocabulario: «congruente», «L-A-L», «colaterales», «semiinscrito», «paralela media»…).
**No se copian sus ejercicios, ejemplos ni frases**: todo enunciado, número y contexto es propio. Nada en la app nombra el libro, el
autor, «módulo», «capítulo» ni de dónde sale un problema (la prueba lo rechaza).

## Estándar de cada lección (lo exige `tests/euclidiana.test.js`)

1. **Escenas de respaldo**: `guion([título, texto], …)` con 4 o 5 ideas de la lección.
2. **Siete u ocho ejercicios con escena** (`x(juego, enunciado, params, explicación, pista)`), **todos con un juego distinto** dentro
   de la lección (un juego puede repetirse en otra lección con otros datos, pero prefiere variedad), y enseguida la **zona de
   examen** en este orden: `sol(…)`, `err(…)`, `opc(…)`. Total: 10 u 11.
   - Deben ser `xp` (con escena). Nada de escribir, nada de opción múltiple fuera de `opc`, nada de reloj ni reflejos.
   - El último de los de escena es **en movimiento** (un `XG.tiros`: `lanza-…`, `sube-distancia`, o uno nuevo) cuando el tema da para
     una respuesta numérica; si no, otro de arrastrar.
   - Evalúan la **idea** (armar o mover algo hasta que cumpla una condición), con toda condición dicha en el enunciado. La escena no
     dice el resultado mientras se responde (`f = 0`); al comprobar (`f → 1`) lo revela. Cada error típico debe poder responderse y
     tener su aviso (`aviso`, `mira`, `trampas`, `e`).
   - En las figuras: pocas posiciones valen (≤ 20 % de las alcanzables, lo normal es una), la solución cae justo en la rejilla de la
     manija, es distinta del inicio, y `ok` compara con `===` o con tolerancia explícita. La manija queda dentro del lienzo (340 de
     ancho, x entre 8 y 332) en todo su recorrido y `de(en(v))` devuelve el mismo valor. Alto entre 120 y 300.
   - Pista (> 40 letras) que orienta sin dar la respuesta; explicación (> 40 letras) con la cuenta o la razón. TeX entre `$…$` con
     barra doble en las cadenas JS; dentro de la escena y de las fichas, texto plano con Unicode (`°`, `√`, `π`, `≅`, `∥`, `⊥`, `∠`, `△`).
   - Demostrar es parte del curso: `sol` puede ser una demostración afirmación–razón con huecos (la ficha es la razón: «L-A-L»,
     «opuestos por el vértice», «alternos internos»…), `err` un paso sin justificar o mal justificado, y entre los de escena caben
     «toca las hipótesis», «pon la razón de cada paso» (`XG.renglones`), «toca los pares que son congruentes por L-A-L» (`XG.frases`).
3. **Explicación Explora** `xpLec('euc-<mundo>-k', [[capítulo, xpMira(…), xpHaz(…)], …, ['Ahora sí, un problema', xpHaz(…)]], idea)`:
   3 o 4 capítulos que **abren con `xpMira`** (5 o 6 momentos; cada frase ≤ 170 letras, lenguaje llano, intuición antes que la
   fórmula) y siguen con al menos un `xpHaz` («Tu turno»), y al final el capítulo `'Ahora sí, un problema'` con un `xpHaz` de
   contexto. Los ejemplos de la explicación **no** son los de los ejercicios. Lo que un ejercicio evalúa tiene que estar explicado.
   Corre también `node --test tests/explora-estructura.test.js tests/explora-escenas.test.js`.
4. **Evaluación del mundo** (`items` de `mundo`): exactamente **3 por lección**: `[idLección, 'nota de repaso (> 15 letras)', ejercicio]`,
   una de las tres es `opc(…)` y las otras dos son juegos con escena **distintos entre sí** y con **datos distintos** a los de la lección
   (no valen `sol` ni `err`). Las claves A–D del mundo, repartidas (ninguna letra con más del 40 %).

## Cómo comprobar

```
node --check js/games/euc-escena-<n>.js && node --check js/courses/euclidiana-<mundo>.js && node --check js/explora-euc-<n>.js
node --test tests/euclidiana.test.js
node --test tests/explora-estructura.test.js tests/explora-escenas.test.js tests/guia.test.js tests/tex-lienzo.test.js
```

En `tests/euclidiana.test.js` solo deben quedar fallos que no nombren tu mundo (hoy falla «viene con la app», que se arregla al
empaquetar, y los que causen otros mundos a medias). Además, **revisa la matemática a mano y con un guion**: escribe en tu carpeta
temporal un `.js` que cargue los juegos como lo hace la prueba (`require('./tests/load')`, `loadScripts`) y compruebe, para cada
ejercicio tuyo, que la solución es la que dice la explicación y que los datos son posibles (triángulos que cierran, ángulos
inscritos que valen la mitad del arco, áreas exactas). Dibuja en un HTML suelto dos o tres escenas (`GAMES[j].dib(solve(p), XPK, p, 1)`
dentro de `<svg viewBox="0 0 340 alto">` con `css/styles.css` y `css/explora.css`) solo si necesitas ver algo; no abras el navegador
de la app.

Los nombres de los juegos nuevos son globales: en minúsculas con guiones, descriptivos y propios de tu tema; antes de registrar uno
comprueba que no existe (`grep -rn "'nombre'" js/games`).

## Al terminar

Responde con: lista de juegos nuevos (nombre y qué hace, una línea), juegos reutilizados, resultado de las pruebas, y cualquier
cosa que no pudiste cumplir o que la prueba pide y te parece equivocada (no cambies la prueba: dilo).
