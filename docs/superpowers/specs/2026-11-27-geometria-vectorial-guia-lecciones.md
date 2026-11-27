# Geometría Vectorial y Analítica: cómo se escribe una lección

Guía de trabajo para quien rehace una lección del curso `geo` (spec `2026-11-27-curso-geometria-vectorial.md`). Léela entera antes de
empezar. Es la misma forma de trabajo del curso de Geometría Euclidiana (`2026-11-26-curso-euclidiana-guia-mundos.md`), por lección.

## Qué se entrega (solo estos tres archivos; no se toca ningún otro)

| Archivo | Contenido |
|---|---|
| `js/games/gva-escena-N.js` | los juegos nuevos de la lección `geo-N` (IIFE; armazones `XG.figura`, `XG.rotula`, `XG.tiros`, `XG.marca`, `XG.frases`, `XG.renglones`, `XG.cuenta`, `XG.mueve`) |
| `js/courses/vectorial-geo-N.js` | la lección y sus preguntas de evaluación: `(() => { const { leccion, x, sol, err, opc, guion } = GVA; leccion('geo-N', guion(…), [ejercicios], [[nota, ejercicio], …]); })();` |
| `js/explora-gva-N.js` | la explicación interactiva (`xpLec('geo-N', …)`), dentro de un bloque `{ … }` |

Los tres ya están registrados en `index.html` (hoy solo tienen un comentario). **No** se editan `index.html`, `js/guia.js`,
`js/worlds.js`, `js/courses/geometria.js`, `tests/`, `sw.js` ni `js/paquetes/`; **no** se corre `tools/empaquetar.js`; **no** se hace
commit ni push. Otros agentes escriben las otras lecciones al mismo tiempo en esta carpeta: si una prueba falla por un archivo
`gva`/`vectorial` que no es tuyo, espera y vuelve a correrla; solo te importan los fallos que nombran tu lección o tus juegos.

El título de la lección es el de `js/courses/geometria.js` (no cambia). `leccion` reemplaza las escenas de respaldo y los
ejercicios viejos de esa lección (sus juegos de p5 `fila-a-fila`, `afina-sistema`, `combina-vectores`, `flecha-vector` y
`conica-viva` ya **no** se usan en las lecciones rehechas).

## Modelos que hay que leer primero

- `js/courses/euclidiana-demostrar.js` (lecciones + evaluación) y `js/courses/preicfes-base.js` (ayudantes `x`, `sol`, `err`, `opc`,
  `guion`); `js/courses/vectorial-base.js`.
- `js/games/figura-kit.js` (los armazones) y juegos hechos con ellos: `js/games/euc-escena-1.js`, `js/games/geo-escena-1.js`,
  `js/games/ecuaciones-escena.js` (sistemas con fichas y balanzas), `js/games/forma-escena.js`, `js/games/trig-escena.js`
  (`XG.mueve`, `XG.cuenta`), `js/games/proposiciones-escena.js` y `conteo-escena.js` (`XG.frases`, `XG.renglones`, `XG.cuenta`).
- `js/explora-euc-1.js` y `js/explora-pu-ec-3.js` (explicaciones; la segunda tiene un sistema 2×2 con la escena `dibujo`) y la
  cabecera de `js/explora-escenas.js` (escenas `dibujo`, `fichas`, `rejilla`; piezas `XPK`: `t, l, r, c, p, pl, at, arc, sec, ang,
  ar, f, cota`).
- Clases de dibujo (`css/explora.css`): rellenos `fa` (acento), `fg`, `ff`, `fo`, `fk`, `fn`; líneas `la`, `lg`, `lf`, `lo`, `lm`,
  `ls`, `lr`, con `gr` (gruesa) y `d` (punteada); textos `ta`, `tg`, `tf`, `tm`, `s` (pequeño). Nada de colores propios ni lienzo/p5.

## Material de los problemas

Texto extraído de los PDF en la carpeta temporal
`C:\Users\USERAC~1\AppData\Local\Temp\claude\7393d0fefbabb825\9aa1634c-da87-4a84-91d7-30caefb64409\scratchpad\gva\`:
`libro_sistemas2_det2.txt` (sistemas 2×2, determinantes 2×2), `libro_sistemas3_det3.txt` (sistemas 3×3, Gauss, Gauss-Jordan,
determinantes 3×3), `libro_matrices2_inversa.txt` y `libro_matrices3_inversa.txt` (matrices, producto, inversa), `Resumen_libro.txt`,
`Notas_de_clase_Geometría.txt`, `Clase_*.txt`, los parciales (`Primer_Parcial_*`, `parcial*`, `parcialsistemas_2006_1.txt`) y los
talleres (`Taller_*`). Del material se toman **los temas, las definiciones, los nombres y los tipos de problema** que se evalúan. **No
se copian sus ejercicios, ejemplos ni frases**: todo enunciado, número y contexto es propio (otros números, contextos de la vida:
tiendas, mezclas, redes de tráfico, recetas, horarios de máquinas, circuitos). Nada en la app nombra el libro, los autores, la
universidad, «parcial», «taller», «quiz» ni de dónde sale un problema (la prueba lo rechaza).

## Estándar de la lección (lo exige `tests/geometria-vectorial.test.js`)

1. **Escenas de respaldo**: `guion([título, texto], …)` con 4 o 5 ideas de la lección (intuición primero, fórmula después).
2. **Siete u ocho ejercicios con escena** (`x(juego, enunciado, params, explicación, pista)`), y enseguida la **zona de examen** en
   este orden: `sol(…)`, `err(…)`, `opc(…)`. Total: 10 u 11.
   - **Ningún juego se repite en el curso**: cada ejercicio con escena usa un juego nuevo, programado en tu `gva-escena-N.js`, con un
     nombre que no exista (`grep -rn "'nombre'" js/games` antes de registrarlo; minúsculas con guiones, descriptivo y propio de tu
     tema). No reutilices juegos de otros archivos en los ejercicios de la lección (sí en la evaluación, con datos nuevos).
   - Deben ser con escena (`xp`). Nada de escribir, nada de opción múltiple fuera de `opc`, nada de reloj ni reflejos. Prefiere
     **arrastrar** (`XG.figura`, `XG.rotula`) sobre tocar: un objeto que reacciona en vivo (rectas que giran, planos, columnas que se
     combinan, una matriz cuyas filas se mueven) y la cuenta se escribe sola.
   - El **último** de los de escena es **en movimiento**: un juego hecho con `XG.tiros` (se fija un valor y al soltar la escena lo
     lanza; tres tiros, un fallo perdonado).
   - Evalúan la **idea** (armar o mover algo hasta que cumpla una condición), con toda condición dicha en el enunciado. La escena no
     dice el resultado mientras se responde (`f = 0`); al comprobar (`f → 1`) lo revela. Cada error típico debe poder responderse y
     tener su aviso (`aviso`, `mira`, `trampas`, `e`).
   - En las figuras: pocas posiciones valen (≤ 25 % de las alcanzables, lo normal es una), la solución cae justo en la rejilla de la
     manija, es distinta del inicio, y `ok` compara con `===` o con tolerancia explícita. La manija queda dentro del lienzo (340 de
     ancho, x entre 8 y 332, y entre 4 y alto − 4) en todo su recorrido y `de(en(v))` devuelve el mismo valor. Alto entre 120 y 300.
   - Una matriz se dibuja con sus corchetes y entradas en `XPK.t`; una ecuación de la escena en texto plano Unicode (`x₁`, `−`, `·`,
     `ᵀ`, `⁻¹`, `→`, `≠`). En el enunciado, la pista y la explicación, TeX entre `$…$` con barra doble en las cadenas JS
     (`\\begin{pmatrix} … \\end{pmatrix}` funciona en el enunciado).
   - Pista (> 40 letras) que orienta sin dar la respuesta; explicación (> 40 letras) con la cuenta o la razón.
3. **Explicación Explora** `xpLec('geo-N', [[capítulo, xpMira(…), xpHaz(…)], …, ['Ahora sí, un problema', xpHaz(…)]], idea)`: 3 o 4
   capítulos que **abren con `xpMira`** (5 o 6 momentos; cada frase ≤ 170 letras, lenguaje llano, intuición antes que la fórmula) y
   siguen con al menos un `xpHaz` («Tu turno»), y al final el capítulo `'Ahora sí, un problema'` con un `xpHaz` de contexto (4 o 5
   capítulos en total). Los ejemplos de la explicación **no** son los de los ejercicios. Lo que un ejercicio evalúa tiene que estar
   explicado. Corre también `node --test tests/explora-estructura.test.js tests/explora-escenas.test.js`.
4. **Preguntas de evaluación** (último argumento de `leccion`): exactamente **3**: `[nota de repaso (> 15 letras), ejercicio]`; una
   es `opc(…)` y las otras dos son juegos con escena **distintos entre sí**, con **datos distintos** a los de la lección (pueden ser
   juegos de tu lección con otros datos). No valen `sol` ni `err`. En la zona de examen y la evaluación, las claves A–D repartidas
   (en tus dos `opc`, que no sean la misma letra).

## Cómo comprobar

```
node --check js/games/gva-escena-N.js && node --check js/courses/vectorial-geo-N.js && node --check js/explora-gva-N.js
node --test tests/geometria-vectorial.test.js
node --test tests/explora-estructura.test.js tests/explora-escenas.test.js tests/tex-lienzo.test.js
```

En `tests/geometria-vectorial.test.js` solo deben quedar fallos que no nombren tu lección (hoy falla «viene con la app», que se
arregla al empaquetar; «sin guía», que se arregla al añadir tus juegos a `js/guia.js` — lo hace quien integra; y los que causen las
otras lecciones a medias, como la evaluación del mundo, que exige las cuatro). Además, **revisa la matemática a mano y con un guion**:
escribe en tu carpeta temporal un `.js` que cargue los juegos como lo hace la prueba (`require('./tests/load')`, `loadScripts`) y
compruebe, para cada ejercicio tuyo, que la solución es la que dice la explicación y que los datos son posibles (sistemas que tienen
la solución anunciada, productos de matrices bien hechos, inversas exactas, operaciones de fila que llevan a donde se dice).

## Al terminar

Responde con: lista de juegos nuevos (nombre, armazón y qué hace, una línea), resultado de las pruebas, y cualquier cosa que no
pudiste cumplir o que la prueba pide y te parece equivocada (no cambies la prueba: dilo).
