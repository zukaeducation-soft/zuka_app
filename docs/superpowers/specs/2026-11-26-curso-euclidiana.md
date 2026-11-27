# Curso de Geometría Euclidiana

Fecha: 2026-11-26. Pedido del usuario: «crea el curso de geometría euclidiana usando el libro de referencia y el estilo que
usamos ya en la app». Libro: *Geometría Euclidiana*, José Rodolfo Londoño Santamaría (Ude@, 2.ª ed., 2006; 8 capítulos,
30 módulos), `Documents/Biblioteca/Matemáticas/euclideana/Geometria_Euclidiana_jose_rodolfo.pdf`.

## Intención

Un curso nuevo de la carrera (Semestre 1, junto a Álgebra, Trigonometría, Cálculo y Geometría Vectorial) que sigue el orden y
los temas del libro, hecho con el estándar vigente de la app: cada lección abre con una **explicación interactiva Explora**
(no hay video todavía), sigue con **ejercicios dibujados con escena** y termina en la **zona de examen**; cada mundo cierra
con su **evaluación**. El contenido es original: del libro se toman el temario, el orden, las definiciones y los teoremas
(que son de dominio común), no sus ejercicios ni sus textos.

## Metas

- Curso `euc` «Geometría Euclidiana», color turquesa `#2dd4bf`, después de `geo` en `COURSES`, en **borrador** hasta la
  revisión docente (fila en `supabase/migrations/20261126000003_curso_euclidiana.sql`, sin publicar).
- Ocho mundos, uno por capítulo del libro, y 26 lecciones (tabla de abajo). Ids `euc-<mundo>-<n>`.
- Por lección: explicación Explora (`js/explora-euc-<n>.js`, con `xpLec`, `xpMira`, `xpHaz`; cada capítulo abre con una
  `muestra`, sigue «Tu turno» y el problema va al final), **siete u ocho ejercicios con escena, todos con un juego distinto**
  (el último de ellos en movimiento cuando el tema lo permite) y la zona de examen (`completa-solucion`, `caza-error`,
  `opcion-examen`): 10 u 11 en total. Pista y explicación en todos. Nada de escribir, opción múltiple fuera de la zona de
  examen, ni juegos «aburridos».
- Por mundo: evaluación (`exam-<mundo>`) con tres preguntas por lección, lámina técnica en `js/worlds.js` y entrada en el
  temario (`EUC_TEMARIO`); lo que no esté hecho sale en el mapa como «En preparación» (`soon`).
- Demostrar es parte del curso (el libro lo pide): las demostraciones se trabajan completando la tabla afirmación–razón
  (`completa-solucion`), cazando el paso sin justificar (`caza-error`) y marcando hipótesis, tesis y contraejemplos sobre la
  figura.

## Fuera de alcance

Videos (se harán por mundos, en el formato «showreel», cuando el usuario los pida), resúmenes en PDF, gimnasio, voz de las
explicaciones y libro impreso. Sólidos y geometría analítica (no están en el libro).

## Lo que haría fracasar el curso

Ejercicios que solo pidan una cuenta sin figura; un mismo juego repetido en la lección; reflejos o reloj; figuras con datos
imposibles (un triángulo que no cierra, un ángulo inscrito que no es la mitad del arco); enunciados copiados del libro.

## Enfoques considerados

1. **Como Geometría Vectorial** (escenas `sc`, ejercicios p5 y `num`). Es el formato viejo: el usuario ya pidió no añadir
   `num`, y los cursos nuevos van con Explora. Descartado.
2. **Juegos nuevos por lección** (como la revisión de Álgebra, ~185 juegos). Lo mejor a largo plazo, pero son semanas de
   trabajo y el catálogo de geometría ya es grande.
3. **Molde del Preicfes** (elegido): ayudantes `x`, `sol`, `err`, `opc`, `leccion`, `mundo`; se reutilizan los juegos con
   escena de geometría del Preuniversitario y del Preicfes (catálogo en `catalogo-juegos-geometria.md`) con datos nuevos, y
   solo se escriben juegos nuevos donde el libro pide algo que no existe (circunferencia, congruencia, construcciones):
   `js/games/euc-escena-<n>.js` (uno por mundo). Da un curso completo y coherente con lo último que se hizo, y deja los juegos propios como
   mejora por mundos.

## Temario

| # | Mundo (`world`) | Capítulo del libro | Lecciones |
|---|---|---|---|
| 1 | `euc-demostrar` Lógica de la Demostración | 1 (módulos 1–6) | 1 Hipótesis, tesis y razones · 2 Demostración directa e indirecta · 3 Condicionales y contraejemplos |
| 2 | `euc-elementos` Puntos, Rectas y Ángulos | 2 (7–10) | 1 Puntos, rectas y segmentos · 2 Ángulos y su medida · 3 Polígonos |
| 3 | `euc-triangulo` Triángulos Congruentes | 3 (11–13) | 1 El triángulo y sus elementos · 2 Criterios L-A-L, A-L-A y L-L-L · 3 Desigualdades en el triángulo · 4 L-A-A y triángulos rectángulos |
| 4 | `euc-cuadrilateros` Paralelas y Cuadriláteros | 4 (14–17) | 1 Paralelas y perpendiculares · 2 Ángulos entre paralelas y en polígonos · 3 Paralelogramos y trapecios · 4 Rectas y puntos notables |
| 5 | `euc-circunferencia` La Circunferencia | 5 (18–19) | 1 Cuerdas, tangentes y posiciones relativas · 2 Ángulo central e inscrito · 3 Ángulos interiores, exteriores y semiinscritos |
| 6 | `euc-metricas` Semejanza y Métricas | 6 (20–23) | 1 Segmentos proporcionales y Tales · 2 Semejanza de triángulos · 3 Pitágoras y el triángulo rectángulo · 4 Potencia de un punto y polígonos regulares |
| 7 | `euc-areas` Áreas de Figuras Planas | 7 (24–26) | 1 Áreas básicas · 2 Relaciones entre áreas · 3 Áreas sombreadas |
| 8 | `euc-construcciones` Regla y Compás | 8 (27–30) | 1 Construcciones elementales · 2 Lugares geométricos y construcción de triángulos |

## Archivos

- `js/courses/euclidiana-base.js` (después de `preicfes-base.js`): `EUC_MUNDOS`, `EUC_HECHOS`, `EUC_TEMARIO`, `EUC` (los
  ayudantes de `ICF` con su propio `mundo`, que anota en `EUC_HECHOS`).
- `js/courses/euclidiana-<mundo>.js`: un archivo por mundo, `EUC_MUNDOS.push(EUC.mundo(…))`.
- `js/courses/euclidiana.js` (después de `data.js`): arma `COURSE_EUC` y lo pone tras `geo`.
- `js/explora-euc-<n>.js`: explicaciones del mundo n.
- Registro: `index.html` (plantilla `fuentes`), `js/worlds.js`, `js/art.js` (figura y paleta), `js/games/kit.js`
  (`COURSE_PALETTES.euc`), listas de cursos de la portada y las instituciones, `tools/sync-lecciones.js`, `VERSION`, paquetes.
- Pruebas: `tests/euclidiana.test.js` (registro, temario, estándar por lección de los mundos de `EUC_HECHOS`, evaluación,
  que cada ejercicio con escena nazca sin resolver y su solución califique bien).

## Saberes previos

Pitágoras se demuestra en el mundo 6 (como en el libro), pero se usa como cuenta desde los mundos 4 y 5 (rombo, cuerda y
distancia al centro, segmento tangente): es saber del colegio y la app lo enseña en Trigonometría y en el Preuniversitario. Las
explicaciones que lo usan lo nombran («por Pitágoras») y lo hacen paso a paso. Lo mismo vale para la aritmética de fracciones y
radicales.

## Decisiones del constructor (mías)

Id `euc` y turquesa (los demás colores ya están tomados); fondo de juegos del curso con su propia paleta (no plano); nombres de
mundo sobrios; las lecciones 1 del curso es gratis como en los demás (`catalogo`); el curso no se añade a `CURSOS_LISTOS`.

## Estado

Ver al final de `tests/euclidiana.test.js` y `EUC_HECHOS`.
