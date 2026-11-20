# Zuka en computador (2026-11-20)

El usuario pasó capturas de la versión web de Brilliant (inicio, temas, curso, lección, entrada) y pidió que en un
computador la app se vea como una web de escritorio, con los videos verticales cómodos: en el centro y cosas a los
lados, estético y profesional.

- **Desde 1000 px** (`ESCRITORIO_MIN`, `css/escritorio.css`); en el celular y la tableta no cambia nada.
- **Primera vez en el navegador**: la presentación (spec `2026-11-20-presentacion`). «Iniciar sesión» abre la entrada
  como ventana centrada sobre la presentación (atrás inerte, Escape, clic afuera o «Conocer Zuka» la cierran).
- **Barra de arriba**: logo (lleva al inicio), las secciones del menú inferior en fila (subrayada la actual) y, dentro
  de un curso, racha y XP a la derecha.
- **Contenido centrado**: Inicio, Mis cursos, Tutorías y Tú en 760 px; el curso y el gimnasio en 820 px.
- **Lección**: barra con la X, el avance centrado y las vidas; el ejercicio en un panel amplio con bordes redondeados,
  la columna del ejercicio en 640 px y «Comprobar» centrado; la retroalimentación sube como tarjeta.
- **Video vertical**: en el centro, alto de la pantalla y bordes redondeados, sobre un brillo del color del curso.
  A la izquierda, la lección (curso, mundo, título, parte y duración, teclas); a la derecha, «Tu recorrido» (videos y
  ejercicios hecho/ahora/después) y el botón para seguir (`leccionLados`, `js/escritorio.js`).
- **Clips**: el video vertical centrado bajo la barra, con sus botones al lado.
- **Hojas**: ventanas centradas.

Pruebas: `tests/escritorio.test.js`.

## Juegos en el portátil (revisión del Preuniversitario, 2026-11-20)

El usuario vio los juegos diminutos en el portátil y pidió revisar todos los del Preuniversitario (razonamiento y lectura).
Un robot abrió los ~990 ejercicios (lecciones y evaluaciones) a 1366×768 y midió lienzo, desbordes y letra:

- **Lienzo** (`mountSketch`): se dibuja con 380 px de ancho (`DESK_W`, el celular de diseño) y se agranda con CSS
  (`zoomScale`, hasta ×2, con más densidad de píxeles). A 1366×768 quedan entre ×1.05 y ×1.8 (mediana ×1.35).
- **Juego**: enunciado y ayudas en una columna a la izquierda, con «Comprobar» debajo; el juego a la derecha con todo el
  alto del panel.
- **Juegos HTML de examen** (`completa-solucion`, `caza-error`, `opcion-examen`): letra un 18 % más grande.
- **Lectura** (kit LEC): el texto en la columna izquierda con su propia barra de desplazamiento y la actividad a la
  derecha con la suya; se leen y se arrastran a la vez. Antes casi todos se salían del panel (hasta 1 400 px); ahora
  ninguno.
