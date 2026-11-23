# Libros impresos de Zuka Preuniversitario UdeA (2026-11-20)

Pedido del usuario: libros propios de Zuka para el preuniversitario, con portada, **4 libros** más compactos que los 8 de
referencia (Instruimos, «Preuniversitario. Razonamiento lógico y competencia lectora», 8 tomos de 180 páginas): dos de
Razonamiento lógico y dos de Comprensión lectora, que cubran todos los temas de las referencias con **contenido original**,
tipografía profesional, talleres, estructura novedosa y que vayan de la mano con el curso de la app (profundizando más que
ella en conceptos y ejemplos).

## Reparto (sigue los mundos del curso `preuda`)

| Libro | Título | Mundos de la app |
|---|---|---|
| 1 | Razonamiento lógico I · **Número y forma** | Cálculo mental, Aritmética y promedios, Operadores definidos, Proporcionalidad y porcentajes, Ecuaciones y planteamiento, Teoría de números, Geometría |
| 2 | Razonamiento lógico II · **Orden, lógica y azar** | Acertijos de orden, Lógica proposicional, Conjuntos, Conteo, Probabilidad, Secuencias, Codificación, Razonamiento espacial, Tablas y gráficas |
| 3 | Comprensión lectora I · **Leer lo que dice** | Estrategias, Tipos de texto, Información explícita, Vocabulario en contexto, Referencia y cohesión, Conectores y función de partes |
| 4 | Comprensión lectora II · **Leer lo que quiere decir** | Inferencia, Aplicación y analogía, Fuentes y voces, Argumentación, Lenguaje figurado, Lectura de dos textos |

Cada capítulo es un mundo y cada sección una lección con el mismo id que en la app (`pu-cm-1`…), para que el libro y
la app se lean juntos.

## Estructura de una lección (la novedad)

1. **Franja «En la app»**: mundo, lección y qué hacer en Zuka (ver el video, jugar los diez ejercicios).
2. **El reto**: un problema de examen que abre la lección y se resuelve al final (como los videos de la app).
3. **La idea**: intuición primero, con dibujo cuando ayuda.
4. **La regla**: recuadro con lo que hay que saber.
5. **Ejemplos resueltos** paso a paso, distintos de los de la app y de los de las referencias.
6. **Trampa** (el error típico) y **Atajo** (cómo se gana tiempo sin calculadora).
7. **Taller** en tres pisos: *Calienta* (directo), *Entrena* (problemas) y *Como en el examen* (A–D).
8. **Reto resuelto** y casilla de bitácora (video · juegos · taller).

Al final de cada mundo, **Evaluación del mundo** (10–12 preguntas A–D). Al final del libro: **claves** con solución breve,
plan de estudio de ocho semanas que combina libro y app, y tabla de símbolos.

En lectura, cada lección trae un **texto original** (350–600 palabras, párrafos numerados), la técnica explicada con el
texto en la mano, ejemplos de pregunta comentados (por qué la buena es buena y por qué cada distractor falla) y taller.

## Diseño

- LaTeX (`pdflatex`): plantilla `docs/libros/zuka-libro.sty`; texto y matemáticas en Palatino (newpx), títulos en Fira
  Sans; tamaño carta reducido 17 × 24 cm, márgenes de libro con nota al margen.
- Color de la marca del curso: lima `#a3e635` en rellenos y un verde oliva oscuro `#3f6212` para letra (la lima no se lee
  sobre blanco). Tinta azul noche `#0b1020`.
- Portada: fondo negro azulado de la interfaz «red» (`#07080f`), una red de nodos y aristas finas (el camino de la app)
  que en cada tomo dibuja su motivo (cuadrícula numérica, árbol lógico, líneas de texto, dos textos que se cruzan), marca
  ZUKA, «Preuniversitario UdeA» y el número de tomo.
- `sh docs/libros/build.sh [1 2 3 4]` deja `docs/libros/pdf/Zuka_Preuniversitario_Libro_N.pdf`. Los PDF no van al
  repositorio (archivos pesados); se entregan en `Downloads/Zuka_Libros_Preuniversitario`.

## Rediseño del mismo día (segundo pedido del usuario)

El usuario pidió libros **más profesionales y atractivos, sin fondos negros**, con analogías, lenguaje sencillo, muchos
ejemplos y **las formas en que cada concepto se evalúa en el examen**; carátulas con objetos matemáticos hermosos en
razonamiento y motivos de lectura en comprensión. No hace falta seguir la estructura de la app.

- **Todo en claro**: papel `#FAFAF4`, tinta azul, verde oliva y lima; nada de `znight` como relleno.
- **Arte de portada generado por código** (`docs/libros/arte/portadas.py`, numpy + PIL, 300 ppp; deja
  `tex/arte/portadaN.jpg`, que no va al repositorio): 1 conjunto de Julia (c = −0.7269 + 0.1889i), 2 atractor de
  Clifford, 3 libro abierto del que suben letras, 4 árbol de letras con raíces bajo un renglón. Las aperturas de mundo
  muestran un recorte distinto del arte de su libro.
- **La analogía** de cada lección (`analogias-rl.tex`, `analogias-cl.tex`: `nalogiade{id}{título}{texto}`) sale sola
  después del reto. **Así lo preguntan en el examen** (`examen-rl.tex`, `examen-cl.tex`: `\examende{id}{orma{…}{…}}`)
  sale sola antes del taller: 3 o 4 formas de pregunta por lección, con mini ejemplo.
- Páginas: 153, 135, 105 y 89. Pendiente: revisión independiente de todas las claves (el subagente falló por red) y
  ampliar los ejemplos resueltos de cada lección.

## Figuras (mismo día)

Todas las ilustraciones salen de dos kits que carga la plantilla: `tex/zuka-figuras.tex` (39 figuras redibujadas) y
`tex/zuka-figuras2.tex` (34 nuevas, sobre todo de lectura). En los capítulos se usan con `figura{nombre}{pie}` (con barra
invertida delante); el pie se numera por mundo. Estilo: fichas con relieve y sombra suave, tarjetas blancas para fórmulas y
rótulos, letra Fira. Los parches `arte/poner_figuras*.py` y `arte/patch_sty.py` ya se aplicaron: quedan como registro.

## Revisión independiente y más ejemplos (mismo día)

Tres subagentes (opus) revisaron todo: 571 ejercicios de razonamiento, 261 preguntas de lectura y los 180 ejemplos nuevos.
Se aplicaron 59 correcciones (parches `arte/correcciones_revision.py` y `arte/correcciones_ejemplos.py`, ya aplicados).
«Más ejemplos resueltos»: dos por lección en `tex/ejemplos-rl.tex` y `tex/ejemplos-cl.tex`; salen solos antes de «Así lo
preguntan en el examen». Páginas: 169, 157, 121 y 101.

## Formato de los resúmenes y aprender haciendo (2026-11-23)

Pedido del usuario: que los libros tengan el diseño de los resúmenes de `docs/resumenes` (menos margen) y que el enfoque
sea aprender haciendo. Capa final `tex/zuka-hacer.tex` (se carga al final de `zuka-libro.sty`):
- A4, 11 pt, márgenes de 2 cm, sin columna lateral («En la app» pasa bajo el título de la lección); encabezado y pie como
  los resúmenes; píldora «Lección k.n» como «Nivel 1-1»; apertura de mundo con franja verde y el arte del libro.
- «Inténtalo primero» (el reto, con renglón para la respuesta y casillas de seguridad); línea de tijera antes de cada
  solución; «Ahora tú» (los ejemplos extra se resuelven en el libro, con cuadrícula en razonamiento y renglones en lectura;
  las soluciones van a las claves); «Tu mapa del texto» después de cada lectura de lección (no en evaluaciones ni
  simulacros); preguntas comentadas con las opciones primero, la respuesta del estudiante y el análisis bajo la tijera;
  marcador de aciertos en cada taller.
- Páginas: 139, 133, 113 y 91. Parche `arte/patch_formato.py` ya aplicado; `arte/ver_paginas.py` hace hojas de contacto.

## Primero el concepto, después el reto (2026-11-23)

Pedido del usuario: explicar primero los conceptos y después hacer los retos, mostrando cómo se usó el concepto. Orden de
cada lección: analogía (sale sola al abrir la lección) → idea → regla → ejemplos → trampa y atajo → «Ponlo en práctica» (el
reto, con renglón para la respuesta) → «Así se usó el concepto» (la solución, bajo una línea de tijera) → «Ahora tú» → «Así
lo preguntan en el examen» → taller. El parche `arte/reto_despues.py` (ya aplicado) movió el reto y su solución en las 90
lecciones; el reto de `pu-el-1` se cambió por la prelectura de un texto nuevo, porque el de antes era un fragmento de la
misma crónica de la lección. Páginas: 143, 137, 115 y 91.
