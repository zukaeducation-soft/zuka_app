# Portada viva (2026-11-24)

El usuario pidió que la página que ve quien entra por primera vez sea muy llamativa y profesional, con las skills de
diseño de Emil Kowalski (github.com/emilkowalski/skills: `emil-design-eng`, `choreograph`, `review-animations`). Reemplaza
el contenido de la spec `2026-11-20-presentacion`; cuándo sale y qué hacen los botones no cambia.

- **Tesis**: Zuka se juega, así que la portada es un ejercicio. Una rueda cuyo punto se arrastra dibuja la onda de la altura
  de lado a lado de la pantalla; reto: que la altura sea ½ (30° o 150°). Al acertar invita a crear la cuenta.
  Gira sola hasta que alguien la toca, espera 6 s después de soltarla, se detiene al acertar y no corre fuera de pantalla.
- **Cómo se aprende**: cuatro piezas, dos se juegan: el cuadrado de (a + b)² con el corte que se arrastra y la palanca
  2 × 3 = 3 × d; luego el gimnasio cerebral y las tutorías.
- **Cursos**: lista con figura y número de lecciones; el panel muestra los mundos con su lámina (hasta 12).
- **Quiénes somos** en una frase grande, preguntas frecuentes (instalar y explorar sin cuenta van ahí) y cierre.
- **Sin cifras, testimonios ni precios inventados**: todo sale de los datos de la app.
- **Movimiento**: titular primero, texto a los 90 ms, la onda se descubre con `clip-path`; salida `cubic-bezier(.23,1,.32,1)`;
  botones `scale(.97)` al tocar; `hover` solo con ratón; con «reducir movimiento» nada se mueve solo.
- **Teclado**: las tres piezas son `role="slider"` (flechas). Dos acentos: hielo (`--brand`) y coral (`--b`).

Pruebas: `tests/presentacion.test.js`.
