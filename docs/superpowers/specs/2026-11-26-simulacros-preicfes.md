# Simulacros del Preicfes que presenta el estudiante

Pedido del usuario (2026-11-26): «Construye los simulacros del Preicfes».

- Aparte de los simulacros que asigna el docente (`js/simulacros.js`, banco tomado de los cursos), el estudiante tiene sus propios
  simulacros en la pantalla del curso Preicfes, debajo de los componentes (`simIcfHTML` en `renderComponents`).
- Cada simulacro tiene las cinco pruebas, de **24 preguntas A–D nuevas** (no repiten las de los cursos ni las del banco): Lectura
  con cuatro textos de 180 palabras o más (literario, argumentativo, filosófico y discontinuo con tabla), Matemáticas, Sociales,
  Ciencias e Inglés (avisos, vocabulario, diálogos, gramática en un texto con huecos, mensaje corto y texto largo).
- Cada prueba se presenta aparte, con reloj de 48 minutos que sigue aunque se salga (`S.simIcfCurso`), y se revisa con la respuesta
  explicada y los mundos para repasar. Se guarda el mejor y el último intento en `S.simIcf[id][prueba]`.
- Puntaje por prueba de 0 a 100 (aciertos sobre 24) y global de 0 a 500 cuando están las cinco: `5 · (3·(LC + MA + SC + CN) + IN) / 13`.
- Mismo acceso que las evaluaciones del curso (`planMotivo` de la primera evaluación).
- Archivos: motor `js/simulacros-icf.js`; datos `js/simulacro-icf-N.js` con `PI_SIMULACROS.push(…)` y los ayudantes `simP`, `simT`.
  Pruebas `tests/simulacros-icf.test.js` (claves de 3 a 9 por letra en cada prueba, explicaciones, textos, nada sobre el origen).

Estado: Simulacro 1. Pendiente: los simulacros 2 y siguientes.
