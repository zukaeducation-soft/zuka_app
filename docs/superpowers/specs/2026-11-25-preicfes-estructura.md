# Preicfes · estructura completa y estándar nuevo

Pedido del usuario (2026-11-25): con los marcos de referencia, infografías, niveles de desempeño, cuadernillos (2019 a 2026) y libros,
estructurar todo el Preicfes (componentes, mundos y lecciones) y empezar las explicaciones, los ejercicios y el gimnasio de cada
componente, con el estilo del Preuniversitario UdeA. Completa la spec `2026-11-20-curso-preicfes`; donde no coincidan, vale esta.

Los cuadernillos y marcos son del Icfes y prohíben reproducir o transformar sus preguntas en material con fines de lucro: **todo texto,
caso, dato y pregunta es original**; de ahí solo salen los temas, las competencias y el peso de cada uno.

## De dónde sale el orden

| Prueba | Reparto oficial aproximado | Consecuencia en el temario |
|---|---|---|
| Matemáticas (50) | interpretar 34 %, formular 43 %, argumentar 23 %; álgebra y cálculo 35–40 %, estadística 35–40 %, geometría 20–35 % | primero datos, proporciones, azar; «Validar procedimientos» sube; entran conjuntos, notación científica, sucesiones, percentiles, correlación, homotecias, coordenadas polares y 3D, funciones trigonométricas y logarítmicas |
| Lectura Crítica (41) | tres afirmaciones; textos continuos, discontinuos, mixtos y múltiples; literarios e informativos | ocho mundos; voces, poemas, textos mixtos y visión del mundo |
| Sociales (50) | interpretar perspectivas 40 %, reflexivo y sistémico 36 %, pensamiento social 30 %  | perspectivas, fuentes y problemas con muchas dimensiones antes que historia; organismos de control, reforma constitucional y modelos |
| Ciencias (58) | indagación 40 %, uso 30 %, explicación 30 %; biológico, físico y químico 30 % cada uno, CTS 10 % | se alternan biología, física y química; entran gravedad, calor, átomo, enlaces, gases, estequiometría, homeostasis |
| Inglés (55) | siete partes, Pre A1 a B1 | **Parte 1 = palabras y definiciones; Parte 2 = avisos** (antes estaban cruzadas); un mundo por parte |

El temario vive en `js/courses/preicfes-temario.js` (`PI_TEMARIO`): 51 mundos. Los que no tienen archivo salen en la app debajo del mapa
de su componente, en «En preparación» (`COURSE_PREICFES.soon`, `soonHTML` en `js/app.js`); no se abren ni cuentan en el avance.
Al escribir un mundo basta su archivo `preicfes-<área>-<mundo>.js` (título y lecciones iguales al temario: lo exige la prueba), su lámina
y su etiqueta en `index.html`.

## Estándar de una lección

1. **Explicación interactiva** en `js/explora-icf-<área>.js` (`xpLec`): tres ideas, cada una con explicación y «tu turno», y un problema
   al final. Textos y números propios, distintos de los ejercicios. Escenas `hoja` (texto), `dibujo` y `fichas`.
2. **Ocho ejercicios dibujados distintos** con los juegos del Preuniversitario: en Lectura, Sociales e Inglés sobre el texto de la
   lección (`hoja-kit.js`); en Matemáticas, los de `graficas-escena.js` y hermanos. El primero muestra el texto.
3. Matemáticas y Ciencias cierran con la **zona de examen** (completar la solución, cazar el error, pregunta A–D); en Ciencias son seis
   dibujados y tres de zona de examen, con al menos uno de gráficas.
4. Inglés: enunciados y fichas en inglés sencillo; avisos, explicación y pistas en español cuando ayudan.
5. **Evaluación del mundo** como antes (otro texto con `pregunta-examen`, o juegos y A–D).
6. **Gimnasio** (`js/gimnasio-icf.js`): un reto de Fuerza y uno de Élite por mundo, con texto o números nuevos.

Ayudantes nuevos en `ICF`: `x` (ejercicio), `F`/`T`/`P` (fichas, tarjetas, líneas como `[texto, va, aviso]`) y `S` (subrayar o tachar).
`p.ayuda` cambia la instrucción de un juego de hoja.

## Estado

Hecho con el estándar: el primer mundo de los cinco componentes (11 lecciones, 11 explicaciones, 99 ejercicios, 10 retos, 5
evaluaciones). Pendientes: los otros 46 mundos del temario, en su orden; videos y voz; y la **revisión docente** antes de publicar
(sigue en borrador). Los seis cuadernillos escaneados de 2024 y 2025 y los libros 1.1, 2 y 5 son imágenes: no se leyeron en esta vuelta.
