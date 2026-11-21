# Evaluación del curso Preuniversitario UdeA con estudiantes simulados (2026-11-20)

Pedido del usuario: simular un estudiante con deficiencias que estudia todos los mundos, presenta un examen parecido al de
admisión y, si el puntaje es malo, corregir ejercicios y juegos como revisor independiente; repetir hasta un puntaje alto.

## Método

- Un examinador (agente) escribió tres exámenes originales de 60 preguntas (30 de razonamiento, 30 de lectura sobre dos
  textos): `examen-A.md`, `examen-B.md`, `examen-C.md`, con claves en `claves/`.
- Dos estudiantes simulados (agentes) por ronda, uno por componente, estudian el contenido del curso (`js/courses/preuda-*`) y
  responden con una regla estricta: solo pueden resolver una pregunta si citan la lección y el ejercicio que enseñan el
  método. Dejan `respuestas/rondaN-*.json` (respuesta, cobertura, lección, qué faltó) y notas.
- `python -X utf8 docs/evaluacion-curso/calificar.py <forma> <ronda>` califica contra la clave.
- Dos revisores (agentes) corrigen los vacíos concretos, con pruebas, sin ver las claves ni los exámenes siguientes.

## Resultados

| Ronda | Examen | Razonamiento | Lectura | Total | Cobertura parcial |
|---|---|---|---|---|---|
| 1 | A | 29/30 | 29/30 | 58/60 (97 %) | 10 |
| 2 | B | 29/30 | 30/30 | 59/60 (98 %) | 10 |

## Cómo leer el puntaje

No predice el puntaje de un estudiante real. Está inflado por dos razones: el estudiante es un modelo que no puede
desaprender, y los exámenes se parecen demasiado al curso (en la ronda 2, 12 de 30 preguntas de razonamiento eran casi
iguales a un problema del curso). Lo útil fueron los defectos encontrados, no el número.

## Lo corregido

- Ronda 1 (commit `909490e`): conteo por casos con el 0, dados que se vuelcan, dos ciclos a la vez, fórmulas usadas sin
  enseñarse (rombo, sector, pendientes perpendiculares, sin reposición); en lectura, verbos de función, concesión sin «pero»,
  ironía sutil, presupuestos sin palabra pista, dos textos con un tercero, más preguntas A–D y la opción correcta ya no es
  casi siempre la más larga.
- Ronda 2: error de la evaluación de `pu-es-4` (cortes tras doblar: depende de la esquina), afirmación falsa en `pu-ar-4`
  (color dado), potencias y raíces de decimales, «al menos uno» con tres intentos, cantidad → ángulo; en lectura, hechos y
  opiniones sin palabra pista, conectores de rectificación, adverbios de actitud, prefijos que engañan, un texto que explica
  al otro, EXCEPTO con intrusa de otro párrafo.

## Pendiente

- Rediseños grandes: 24 lecciones de razonamiento sin video; `vuela-precios` (20 lecciones) y `rompe-cambios` (17) como
  juego en movimiento; `mapa-del-texto` en 25 lecciones de lectura y `donde-buscar` en 16.
- El examen C no se ha usado. Antes de usarlo conviene que un examinador que NO lea el curso reemplace las preguntas que
  calcan problemas del curso (lista de calcos del examen B en el informe del revisor de razonamiento: P4, P8, P9, P10, P14,
  P20, P22, P23, P26, P27, P28, P30).
- Nada de esto se probó en el navegador: solo con `node --test tests/` (1992 pruebas en verde).
