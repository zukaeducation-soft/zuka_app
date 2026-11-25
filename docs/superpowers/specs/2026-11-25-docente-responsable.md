# Docente responsable de cada componente del Preicfes (2026-11-25)

Pedido: el gestor crea códigos y asigna un docente responsable a cada componente; ese docente tiene su vista, sigue al grupo y a cada
estudiante, asigna simulacros y ve resultados de grupo e individuales.

## Quién hace qué

- **Gestor** (`#responsables`): por componente y grupo elige al responsable, o crea el docente y su código en un solo paso; imprime o copia el
  código con su mensaje. También puede todo lo del docente en cualquier componente («Preicfes»).
- **Docente responsable** (`#componente`): su componente y sus grupos. Grupo: avance, quién necesita atención (avisos del portal más notas
  bajas, caídas y faltas a simulacros), avance por mundo, lista y mapa estudiante × mundo, informe. Estudiante (`#alumno/id`): notas frente al
  promedio, aciertos por tema, lecciones, metas, observaciones (el estudiante no las ve), aviso personal e informe para la familia.
- **Simulacros** (`#simulacros`, `#nuevo`, `#simulacro/id`): se eligen temas y número de preguntas del banco (reparte entre temas y prefiere las
  que no se han usado), se cambian, se quitan o se escriben propias; grupos, fechas, minutos y cuándo ven resultados. Resultados por
  tema, pregunta (opción que más confundió), grupo y estudiante; refuerzo con un toque (meta con las lecciones falladas), otro intento,
  Excel, informe y cuadernillo en papel con clave.
- **Avisos** al grupo o a un estudiante. **Estudiante**: avisos y simulacros en Inicio (`js/simulacros.js`).

## Reglas

- La base decide todo: `docencia` (docentes y gestores) y `simulacro` (estudiante); migración `20261125000003`. Un responsable por componente y
  grupo; asignar le da el grupo al docente y quitarle el grupo lo deja sin el componente. Pruebas: `supabase/tests/docentes.test.sql` (84).
- Las preguntas se copian al simulacro al crearlo: cambiar la app no cambia un simulacro. El estudiante las recibe **sin la respuesta**;
  el tiempo y la nota los pone la base. Un intento; lo marcado se guarda solo y, si se acaba el tiempo, vale lo último guardado.
- Nota = porcentaje de aciertos. Nunca se presenta como puntaje del examen real.
- «Salió de la pantalla» es un dato para conversar, no una prueba.
- Banco: `tools/banco.js` → `instituciones/banco.json` (503 preguntas de los cursos, sin repetir; lo corre `tools/empaquetar.js`). Las del
  Preuniversitario amplían Matemáticas y Lectura. Como la app es pública, un estudiante que sepa mirar el código podría encontrar respuestas:
  para una nota que cuente, presentarlo en clase o usar preguntas propias.
- Sin la migración aplicada, el portal sigue como antes.
- Ejemplo: `/instituciones/portal/?demo` (gestor) y `?demo&rol=docente`.
