# Personaje de Zuka (2026-11-20)

El usuario pasó la imagen 2D de su personaje (un cerebro coral con antifaz morado, ojos menta, brazos y piernas que caminan;
también versiones 3D en coral, azul y morado) y pidió ubicarlo donde haga falta, sobre todo en el gimnasio y en los
mensajes, sin que estorbe.

- **Dibujo**: `js/mascota.js`, `mascotSVG(pose, clase)`, SVG redibujado de la imagen 2D (nítido en cualquier tamaño, sin
  archivos pesados). Poses: `think` (dedo en la sien, la de la imagen), `cheer` (brazos arriba) y `sad`. Colores en
  variables con el coral por defecto (`--mb`, `--mg`, `--mi`, `--me`) para teñirlo si se quiere (las versiones de color).
  Brazos y piernas con el borde lila del original (filtro), así se ven en tema oscuro.
- **Dónde va** (siempre a un lado o en una pantalla de mensaje, nunca sobre un ejercicio):
  - Inicio: junto a «¿Qué aprendemos hoy?», 72 px.
  - Mis cursos vacío: invita a elegir un curso.
  - Gimnasio: es el entrenador (avatar de cada paso de un reto) y explica cuando un nivel aún no tiene retos.
  - Final de una lección y de un reto: celebra (`cheer`, reemplaza al cerebro encendido).
  - Sin vidas: `sad`.
  - Recorrido de bienvenida: en el saludo y el cierre.
- **Movimiento**: el dedo da un toque en la sien cada pocos segundos y al celebrar salta dos veces; nada con
  «reducir movimiento».

Pruebas: `tests/personaje.test.js`.
