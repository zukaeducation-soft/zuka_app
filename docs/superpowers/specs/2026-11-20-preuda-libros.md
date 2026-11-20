# Preuniversitario UdeA: cuatro libros de estudio que acompañan a Zuka

Fecha: 2026-11-20. Pedido del usuario: libros propios (cuatro, compactos, en vez de ocho) para el Preuniversitario, dos de
razonamiento lógico y dos de comprensión lectora, con contenido original, tipografía profesional, portadas, talleres y una
estructura innovadora, que profundicen más que el material de referencia y que funcionen en sinergia con la app.

## De dónde sale el contenido

- Los 8 libros de referencia y la hoja de respuestas que subió el usuario se quedaron en su computador (la sesión pasó a la nube y
  el equipo no está conectado). Se trabaja con lo que está en el repositorio, que ya recoge ese material: el temario del curso
  (`js/courses/preuda-razonamiento.js`, `preuda-lectura.js`: 16 + 12 mundos), el análisis de los exámenes reales
  (`2026-11-19-preuda-estrategia-examen.md`) y los diez simulacros originales con sus respuestas (`docs/simulacros/src`).
- Todo es original: problemas con otros números y otros contextos, textos de lectura escritos para el libro. Nada se copia de
  los libros de referencia ni de los simulacros (los simulacros se reservan para aplicar en papel).

## La sinergia: tres capas

La estrategia del curso propone tres capas por tema: **entender**, **resolver a mano** y **rendir**. La app ya cubre la primera
(videos y juegos que construyen la idea, sin opción múltiple). Los libros son las otras dos:

- **Resolver a mano**: ejemplos resueltos con el formato real (A–D) y, en cada uno, por qué atrae cada opción equivocada.
- **Rendir**: talleres por niveles, un simulacro por libro y una plantilla de cuaderno de errores.

Cada capítulo = un mundo de la app, con el mismo nombre y orden. La ficha «En Zuka» del capítulo dice qué lecciones jugar antes
(entender) y qué hacer después (repaso en el gimnasio, evaluación del mundo).

## Los cuatro libros

| Libro | Título | Capítulos (mundos de la app) | Color |
|---|---|---|---|
| 1 | Razonamiento lógico I · Números, medida y planteamiento | Cálculo mental, Aritmética y promedios, Ecuaciones y planteamiento, Proporcionalidad y porcentajes, Teoría de números, Operadores definidos, Tablas y gráficas, Geometría | lima |
| 2 | Razonamiento lógico II · Condiciones, conteo y patrones | Acertijos de orden y asignación, Lógica proposicional, Conjuntos, Conteo y combinatoria, Probabilidad, Secuencias y patrones, Codificación, Razonamiento espacial | hielo |
| 3 | Comprensión lectora I · Leer lo que el texto dice | Estrategias de lectura, Tipos de texto y géneros, Información explícita, Vocabulario en contexto, Referencia y cohesión, Conectores y función de partes | coral |
| 4 | Comprensión lectora II · Leer lo que el texto quiere decir | Inferencia, Lenguaje figurado, Aplicación y analogía, Fuentes y voces, Argumentación, intención y tono, Lectura de dos textos | violeta |

## Estructura de un capítulo de razonamiento

1. **Apertura**: número grande, título, «En Zuka» (mundo y lecciones) y **el reto**: un problema con formato de examen que el
   capítulo resuelve al final.
2. **La idea**: intuición primero (con un dibujo), fórmula después.
3. **Herramientas**: los métodos del tema, cada uno con un ejemplo corto.
4. **Ejemplos resueltos** (3 o 4) con formato real: planteamiento, desarrollo y «Las otras opciones», que explica por qué atrae cada
   distractor.
5. **Trampas del examen**: los errores que el examen premia con una opción.
6. **El reto, resuelto**.
7. **Taller** en tres niveles: Calentamiento (4), Como en el examen (8) y Desafío (2), con bloques de contexto.
8. **Llévate esto**: lista de lo que hay que tener a mano.

## Estructura de un capítulo de lectura

1. Apertura con «En Zuka» y la pregunta que guía el capítulo.
2. **La idea** y **las herramientas** (qué pregunta el examen de este tipo y cómo se responde volviendo al párrafo).
3. **Un texto original** de 450 a 650 palabras en párrafos numerados, como en el examen.
4. **Lectura guiada**: tres o cuatro preguntas resueltas sobre ese texto, con la evidencia citada y las otras opciones.
5. **Trampas**.
6. **Taller**: un segundo texto original con 10 preguntas A–D del tipo del capítulo y algunas de repaso.
7. **Llévate esto**.

## Al final de cada libro

- **Simulacro** (30 preguntas en razonamiento; dos textos y 25 preguntas en lectura) con hoja de respuestas.
- **Solucionario**: todas las respuestas del libro con su explicación.
- **Plan de 8 semanas** con la app y **cuaderno de errores** para fotocopiar.

## Forma

- 17 × 24 cm, a dos caras, Palatino (newpx) para el texto y Fira Sans para títulos y rótulos; color de acento por libro sobre el azul
  noche de la marca. Pestañas de color en el borde exterior que marcan el capítulo (se encuentra el capítulo con el pulgar).
- Portada y contraportada dibujadas con TikZ: una red de nodos (el lenguaje de la interfaz «red» de la app) con el motivo de cada
  libro.
- Fuente LaTeX en `docs/libros/` (`zuka-libro.cls`, `libroN.tex`, capítulos en `cap/`); `sh docs/libros/build.sh [N]` deja
  `docs/libros/pdf/libroN.pdf`. Los PDF no van a GitHub (archivos pesados, `.gitignore`).
- Pruebas: `tests/libros.test.js` (cada libro tiene sus capítulos en el orden de la app, cada pregunta A–D tiene su respuesta en el
  solucionario, cada texto de lectura está en el rango de palabras).
