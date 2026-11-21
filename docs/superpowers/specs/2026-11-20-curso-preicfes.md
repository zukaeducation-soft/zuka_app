# Curso Preicfes (Saber 11)

Pedido del usuario (2026-11-20): «diseña el curso de preicfes (preparatorio para el examen Saber 11 en Colombia), te he adjuntado
exámenes reales de diferentes años, agrega este curso con sus diferentes componentes en la app». Material: seis cuadernillos reales
(2024-1, 2024-2 y 2025-2, sesiones 1 y 2) y los cuadernillos de preguntas Saber 11 de 2019, 2021, 2022 y «-11-1» de las cinco áreas
(`Documents/Material clases Escuela/…`). De ahí salen la estructura del examen, los temas que más se repiten y los problemas modelo.
**Los ejercicios se escriben con otros números y otros contextos; ningún texto ni pregunta se copia, y la app nunca dice de qué
examen o año sale un problema.**

## El examen, según los cuadernillos

| Área | Preguntas | Competencias | Componentes / contenidos | Formato |
|---|---|---|---|---|
| Matemáticas | 50 | Interpretación y representación · Formulación y ejecución · Argumentación | Estadística (tablas, gráficas, promedio, muestras) · Geometría (áreas, Pitágoras, transformaciones) · Álgebra y cálculo (funciones, ecuaciones, variación) · Finanzas | Situación + 4 opciones; muchas piden validar el procedimiento o la afirmación de alguien |
| Lectura Crítica | 41 | Identificar y entender contenidos locales · Comprender cómo se articulan las partes · Reflexionar y evaluar | Textos continuos (literarios, informativos, filosóficos) y discontinuos (tablas, infografías, cómics) | Un texto, varias preguntas |
| Sociales y Ciudadanas | 50 | Pensamiento social · Interpretación y análisis de perspectivas · Pensamiento reflexivo y sistémico | Constitución y Estado, participación, historia, geografía, economía, conflictos de intereses | Casos de ciudadanía, fragmentos, caricaturas |
| Ciencias Naturales | 58 | Uso comprensivo del conocimiento · Explicación de fenómenos · Indagación | Biológico, químico, físico y ciencia, tecnología y sociedad | Experimentos con tablas y gráficas; muchas preguntas de variables, controles y conclusiones |
| Inglés | 55 | Lectura y uso del idioma (A1 a B1) | Siete partes: avisos, palabras y definiciones, conversaciones, gramática con huecos, lectura corta, lectura larga, vocabulario con huecos | Formatos fijos por parte |

Temas que más se repiten: en Matemáticas, leer tablas y gráficas, porcentajes, promedios y muestras, probabilidad sencilla, áreas y
Pitágoras, funciones lineales y validar procedimientos; en Ciencias, variables y controles de un experimento y leer sus gráficas; en
Sociales, la Constitución (ramas del poder, derechos y mecanismos de protección) y los intereses de cada actor en un conflicto.

## Estructura en la app

- Curso `preicfes` («Preicfes Saber 11», nivel «Saber 11», icono «11», color fucsia `#e879f9`: el tono libre entre los ocho cursos;
  acento ámbar). Como el Preuniversitario, tiene **componentes** (`blocks`): al entrar se elige el componente (`renderComponents`) y
  luego se ven solo sus mundos (`openBlock`, `worldNo`). Cada componente abre su primera lección gratis (`blockStart`, `catalogo`).
- Archivos: `js/courses/preicfes-base.js` (ayudantes), un archivo por mundo `js/courses/preicfes-<área>-<mundo>.js` que hace
  `PI_MUNDOS.push(unidad)`, y `js/courses/preicfes.js` (después de `data.js`), que arma `COURSE_PREICFES` en el orden de los
  componentes y lo inserta en `COURSES` después del Preuniversitario. Así `data.js` no cambia y las pruebas que cargan listas fijas de
  archivos siguen igual.
- Ids: lecciones `icf-<área>-<mundo>-<n>`, mundos `icf-<área>-<mundo>`, evaluaciones `exam-<mundo>`.
- Nace en **borrador** (fila `publicado = false` en `supabase/migrations/20261120000001_curso_preicfes.sql`), como el
  Preuniversitario, hasta la revisión docente.
- Arte del curso (`js/art.js`): una hoja de respuestas con burbujas A–D y un «11». Paleta de juegos (`COURSE_PALETTES`): fondo
  neutro y plano (`FLAT_COURSES`) con el fucsia de acento, para que nada tape gráficas ni textos.

## Estándar de cada lección

Dos modelos, según el área:

1. **Matemáticas y Ciencias** (estándar de diez del Preuniversitario, spec `2026-11-20-preuda-razonamiento-diez`): 9 a 11 ejercicios,
   **todos con un juego distinto y de una sola ronda**, enunciados con contexto, el **juego en movimiento** justo antes de la zona de
   examen y, al final, la **zona de examen** (`completa-solucion`, `caza-error`, `opcion-examen`). En Ciencias la lección mezcla juegos
   del kit `LEC` sobre el texto del experimento (el examen de ciencias se lee) con juegos de lienzo (gráficas, relaciones,
   concentraciones).
2. **Lectura Crítica, Sociales e Inglés** (modelo de Comprensión lectora, spec `2026-11-19-preuda-lectura-textos`): un **texto original**
   por lección (Lectura y Sociales, 330 a 560 palabras en 4 a 7 párrafos; Inglés, 180 a 420 palabras) y 7 juegos distintos de
   arrastrar del kit `LEC` sobre ese texto, y **al final un juego en movimiento** (`rompe-cambios` o `vuela-precios`: tres opciones
   cortas por pregunta, tres preguntas, sobre el mismo texto). La evaluación del mundo usa **otro texto** con `pregunta-examen` (A–D).

Para todos: cada ejercicio con pista que orienta sin dar la respuesta y explicación; nada de opción múltiple como mecánica (salvo la
pregunta A–D de la zona de examen y de las evaluaciones); ningún juego repetido dentro de una lección; las respuestas A–D repartidas.
La evaluación de un mundo de diez lleva, por lección, dos juegos y una pregunta A–D; la de un mundo de lectura, dos o más preguntas
A–D por lección sobre un texto nuevo.

Cada lección trae escenas de respaldo (intuición primero, regla después, un ejemplo resuelto que no se repite en los ejercicios) hasta
que tenga video.

## Temario completo

### Componente 1 · Matemáticas (12 mundos)

| # | Mundo (id) | Lecciones | Estado |
|---|---|---|---|
| 1 | Datos y Gráficas (`icf-ma-datos`) | Leer tablas y gráficas · Promedio, mediana y moda · Muestras y conclusiones | **hecho** |
| 2 | Proporciones y Porcentajes (`icf-ma-proporcion`) | Razones y escalas · Porcentajes y cambios · Regla de tres directa e inversa | pendiente |
| 3 | Conteo y Probabilidad (`icf-ma-azar`) | Contar casos · Probabilidad simple · Probabilidad con tablas | pendiente |
| 4 | Perímetros, Áreas y Volúmenes (`icf-ma-medida`) | Perímetro y área · Figuras compuestas · Volumen y capacidad | pendiente |
| 5 | Triángulos y Semejanza (`icf-ma-forma`) | Ángulos y triángulos · Pitágoras · Semejanza y razones trigonométricas | pendiente |
| 6 | Transformaciones y Vistas (`icf-ma-espacio`) | Rotaciones y reflexiones · Vistas y desarrollos · Coordenadas | pendiente |
| 7 | Funciones Lineales (`icf-ma-lineal`) | Pendiente como razón de cambio · Ecuación de la recta · Comparar planes | pendiente |
| 8 | Cuadráticas y Exponenciales (`icf-ma-curvas`) | Trayectorias y máximos · Crecimiento y decaimiento · Leer la gráfica | pendiente |
| 9 | Ecuaciones en Contexto (`icf-ma-ecuaciones`) | Plantear ecuaciones · Sistemas · Desigualdades | pendiente |
| 10 | Dinero y Créditos (`icf-ma-finanzas`) | Interés simple y compuesto · Cuotas y modalidades de pago | pendiente |
| 11 | Dispersión y Comparación (`icf-ma-dispersion`) | Rango y desviación · Comparar grupos | pendiente |
| 12 | Validar Procedimientos (`icf-ma-argumenta`) | ¿Es correcto el razonamiento? · Contraejemplos | pendiente |

### Componente 2 · Lectura Crítica (8 mundos)

| # | Mundo (id) | Lecciones | Estado |
|---|---|---|---|
| 1 | Lo que Dice el Texto (`icf-lc-literal`) | Datos e ideas del texto · Palabras y referencias | **hecho** |
| 2 | Cómo se Arma un Texto (`icf-lc-estructura`) | Función de cada párrafo · Conectores y relaciones | pendiente |
| 3 | Tesis y Argumentos (`icf-lc-argumento`) | Tesis y razones · Fortalecer y debilitar | pendiente |
| 4 | Textos Literarios (`icf-lc-literario`) | Narrador y personajes · Figuras y sentido | pendiente |
| 5 | Textos Filosóficos (`icf-lc-filosofico`) | La pregunta del filósofo · Conceptos y ejemplos | pendiente |
| 6 | Infografías y Tablas (`icf-lc-discontinuo`) | Leer una infografía · Cómics y caricaturas | pendiente |
| 7 | Evaluar un Texto (`icf-lc-evalua`) | Supuestos e intención · Validez de una conclusión | pendiente |
| 8 | Comparar Textos (`icf-lc-comparar`) | Dos textos, un tema · Posturas que se cruzan | pendiente |

### Componente 3 · Sociales y Ciudadanas (8 mundos)

| # | Mundo (id) | Lecciones | Estado |
|---|---|---|---|
| 1 | Constitución y Estado (`icf-sc-constitucion`) | Estado social de derecho y ramas del poder · Derechos y mecanismos de protección | **hecho** |
| 2 | Participación Ciudadana (`icf-sc-participacion`) | Voto y mecanismos de participación · Organizaciones y protesta | pendiente |
| 3 | Perspectivas e Intereses (`icf-sc-perspectivas`) | Actores de un conflicto · Soluciones y efectos | pendiente |
| 4 | Fuentes y Contexto (`icf-sc-fuentes`) | Leer una fuente · Caricaturas y discursos | pendiente |
| 5 | Historia de Colombia (`icf-sc-historia`) | Siglo XIX · Siglo XX y conflicto | pendiente |
| 6 | Territorio y Ambiente (`icf-sc-geografia`) | Regiones y recursos · Ambiente y desarrollo | pendiente |
| 7 | Economía y Sociedad (`icf-sc-economia`) | Mercado, precios e impuestos · Globalización | pendiente |
| 8 | Problemas con Muchas Causas (`icf-sc-sistemico`) | Causas y consecuencias · Dimensiones de un problema | pendiente |

### Componente 4 · Ciencias Naturales (9 mundos)

| # | Mundo (id) | Lecciones | Estado |
|---|---|---|---|
| 1 | Indagación Científica (`icf-cn-indaga`) | Preguntas, variables y control · Datos y conclusiones | **hecho** |
| 2 | Célula y Organismos (`icf-cn-celula`) | Célula y transporte · Sistemas del cuerpo | pendiente |
| 3 | Herencia y Evolución (`icf-cn-herencia`) | Genes y cruces · Selección natural | pendiente |
| 4 | Ecosistemas y Energía (`icf-cn-ecosistemas`) | Cadenas tróficas · Ciclos de la materia | pendiente |
| 5 | Materia y Mezclas (`icf-cn-materia`) | Estados y propiedades · Mezclas y separación | pendiente |
| 6 | Reacciones y Soluciones (`icf-cn-reacciones`) | Reacciones y conservación · Concentración y pH | pendiente |
| 7 | Movimiento y Fuerzas (`icf-cn-movimiento`) | Velocidad y aceleración · Fuerzas y equilibrio | pendiente |
| 8 | Energía, Ondas y Electricidad (`icf-cn-energia`) | Conservación de la energía · Ondas y circuitos | pendiente |
| 9 | Ciencia, Tecnología y Sociedad (`icf-cn-cts`) | Usos de la ciencia · Decisiones con evidencia | pendiente |

### Componente 5 · Inglés (7 mundos)

| # | Mundo (id) | Lecciones | Estado |
|---|---|---|---|
| 1 | Avisos y Vocabulario (`icf-en-avisos`) | Signs and notices · Words and meanings | **hecho** |
| 2 | Conversaciones Cortas (`icf-en-dialogos`) | Everyday replies · Polite answers | pendiente |
| 3 | Gramática en Contexto (`icf-en-gramatica`) | Verbs and tenses · Small words that matter | pendiente |
| 4 | Textos Cortos (`icf-en-corto`) | Short messages · True, false or not said | pendiente |
| 5 | Textos Largos (`icf-en-largo`) | Main idea and details · Writer's purpose | pendiente |
| 6 | Vocabulario en Contexto (`icf-en-vocabulario`) | Word families · Choosing the right word | pendiente |
| 7 | Inferir y Opinar (`icf-en-inferencia`) | Reading between the lines · Opinions and facts | pendiente |

Total: 44 mundos y 97 lecciones. Este primer paso deja **el primer mundo de cada componente** (11 lecciones y 5 evaluaciones).

## Primer mundo de cada componente (hecho)

- **Datos y Gráficas**: barras con escala, tabla a gráfica, tramos que más cambian, variación porcentual, torta, cruz del porcentaje,
  grupos de distinto tamaño; nivelar el promedio, mediana, media/mediana/moda, dato que falta, promedio de grupos, nota ponderada;
  muestras con sesgo, eje que engaña, pintar porcentajes, barras que se solapan. Juegos en movimiento: `vuela-precios`,
  `rompe-cambios`, `tanque-porcentaje`.
- **Lo que Dice el Texto**: dos textos informativos originales (el agua que se pierde en los acueductos; la siesta y el sueño de los
  adolescentes) y uno de evaluación (los murales de un barrio).
- **Constitución y Estado**: dos casos originales (una vereda que pide su puente; la tutela de una estudiante) y uno de evaluación (un
  concejo que quiere cerrar un parque).
- **Indagación Científica**: dos experimentos originales (germinación de frijoles con distinta luz; un péndulo y un resorte) con sus
  tablas, y uno de evaluación (la sal y el punto de congelación).
- **Avisos y Vocabulario**: avisos de un colegio, un parque y un museo; un texto sobre un mercado campesino; evaluación con los avisos
  de una estación de bus.

## Pruebas

`tests/preicfes.test.js`: curso registrado (arte, paleta de juegos, mundos con lámina, archivos en `index.html` y `SHELL`, fila en
borrador), cinco componentes con su primer mundo y su evaluación, estándar de cada modelo (cantidad de ejercicios, juegos distintos,
una ronda, pista y explicación, movimiento, zona de examen), textos dentro del rango de palabras, citas de los juegos `LEC` que existen
en el párrafo, juegos de fichas que califican con su clave, respuestas A–D repartidas, y que ningún texto diga «ICFES», «Saber 11» o un
año de examen dentro de un enunciado.

## Pendiente

- Los mundos marcados «pendiente» en el temario (39 mundos, 86 lecciones), en ese orden de prioridad.
- Videos de las lecciones (hoy solo escenas de respaldo) y retos del gimnasio para el curso.
- Revisión docente antes de publicar el curso (`publicado = true` en la tabla `cursos`).
