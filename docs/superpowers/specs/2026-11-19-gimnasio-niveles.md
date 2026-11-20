# Gimnasio cerebral por niveles (2026-11-19)

Pedido del usuario: al tocar las pesas, el gimnasio debe ser más llamativo, mostrar con claridad el nivel de dificultad que le
toca al estudiante y tener los retos clasificados gráficamente por niveles, para que se sienta como un gimnasio cerebral.

## Decisiones

- **Las pesas abren la página del gimnasio** (ya no una hoja). `bindGymFab` guarda el mundo del nivel del estudiante en
  `gymFocus = { course, ui }` y va a `go('gym')`. La hoja `openGymSheet` desaparece: una sola interfaz.
- **Tres niveles, como zonas de un gimnasio** (`GYM_LEVELS`):
  1. **Calentamiento**: un circuito por mundo con tres ejercicios de juego de las lecciones que el estudiante ya hizo en
     ese mundo (`gymWarmup(c, ui, done, unlockAll, n)`). Sirve en **todos los cursos**, también los que aún no tienen
     retos. Cambia de ejercicios cada vez que se repite (`n` = veces superado). Se abre con una lección hecha del mundo.
  2. **Fuerza**: los retos guiados de `level: 2`.
  3. **Élite**: los retos guiados de `level: 3`.
  Cada nivel tiene su dibujo de discos (`gymPlates(n)`: una barra con 1, 2 o 3 discos por lado) y su color, tomado de la
  paleta del curso (`--g1`, `--g2`, `--g3`, los mismos de la pesa flotante).
- **Tu nivel** (`gymRecommend(c, ui, done, unlockAll, mine)`), con el mundo del estudiante y los anteriores de su componente:
  si el calentamiento de su mundo está abierto y sin hacer → nivel 1; si no, el primer reto de Fuerza abierto y sin
  superar → 2; si no, el primero de Élite → 3; si todo está superado, el calentamiento de su mundo para mantenerse.
  Devuelve `{ level, item }`.
- **Página** (`renderGym`), de arriba abajo:
  - «Volver al curso».
  - Portada: la pesa en relieve, «Gimnasio cerebral», el curso (y el componente), y tres cifras: retos superados,
    estrellas y nivel.
  - «Tu entrenamiento de hoy»: tarjeta grande con el siguiente ejercicio recomendado y el botón «Entrenar».
  - Selector de nivel: tres tarjetas en fila (discos, nombre, avance `x/y`); la recomendada lleva «Tu nivel». Se abre
    en el nivel recomendado; el elegido se recuerda en `gymFocus.lvl`.
  - Lista del nivel elegido, por mundo («Tu mundo» marcado). Cerrados con el candado y la lección que los abre. En el
    calentamiento solo salen los mundos hasta el del estudiante. Si el nivel no tiene retos en este curso: «Pronto llegan
    retos de este nivel» y un botón al calentamiento.
- **El reto** (`startReto`) sirve igual para el calentamiento: su intro dice «Calentamiento» y el final no muestra
  «Respuesta» (no hay un problema único).

## Pruebas

`tests/gimnasio-niveles.test.js`: niveles y discos, calentamiento (solo juegos `play`, de lecciones hechas, cambia al
repetir, cerrado sin lecciones, en todos los cursos), recomendación en cada caso, la página con sus partes y el botón que
abre la página.
