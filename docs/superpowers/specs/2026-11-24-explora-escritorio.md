# Explicaciones y ejercicios en computador (2026-11-24)

Pedido: que las lecciones se vean más profesionales en un computador (antes, la pantalla de celular estirada). Desde 1000 px:

- **Explicación**: riel a la izquierda con curso, lección, capítulos (círculo con avance; se toca uno ya alcanzado para volver) y «Lo que
  llevas construido»; a la derecha un panel con la frase centrada, la escena grande, la cuenta, la frase del momento, la idea y los botones a
  su tamaño. Se esconden los segmentos y el botón de ideas (los reemplaza el riel); «Prefiero ver el video» va al pie del riel.
- **Escena**: su ancho sale del alto de la ventana y de la proporción del dibujo (`exploraAncho`), sin deformarse (el arrastre usa el ancho).
- **Ejercicios**: enunciado a la izquierda, escena grande a la derecha; el aviso de acierto o error ocupa la columna del enunciado, así la
  escena que ejecuta la respuesta no queda tapada. La zona de examen usa letra de computador.
- En el celular y la tableta nada cambia.

Código: final de `js/escritorio.js` (`exploraCapitulos`, `exploraAncho`, `exploraRiel`), final de `css/escritorio.css`; `chrome()` de
`js/explora.js` llama a `exploraRiel`. Pruebas en `tests/escritorio.test.js`.
