# Dentro de un curso, en computador (2026-11-24)

El usuario mostró el Preuniversitario por dentro (columna de 820 px con vacío a los lados) y pidió aprovechar el espacio
en todos los cursos. Solo desde 1000 px; en el celular sigue la red de nodos. Contenido hasta 1360 px, como Inicio.

- **Portada del curso y componente**: a la izquierda (`cv-side`, fija al bajar) la portada y la tarjeta para seguir.
- **Componentes**: dos tarjetas con los mundos que trae cada una. **Mundos**: rejilla de tarjetas con la lámina completa.
- **Un mundo** (`cv-world`): lámina, resumen y mundo siguiente a la izquierda; lecciones en filas a dos columnas, con si
  es explicación interactiva o video y cuántos ejercicios tiene. Toda la tarjeta se toca (`::before` del botón).
- El HTML es el mismo del celular: `cv-side` y `cv-main` allí son `display: contents` y lo nuevo lleva `dk`.
- Pruebas: `tests/escritorio.test.js`.
