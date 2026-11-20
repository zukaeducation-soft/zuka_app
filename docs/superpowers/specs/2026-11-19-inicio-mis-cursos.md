# Inicio, Mis cursos y gimnasio flotante (2026-11-19)

Pedido del usuario, con dos capturas de referencia (portada de un curso en una app de matemáticas, tema claro y oscuro):

1. Dentro de un mundo, un **botón flotante de gimnasio** (abajo a la derecha). Al tocarlo salen los retos guiados que
   corresponden al nivel que lleva el estudiante. Se ensaya primero en **Razonamiento lógico** (Preuniversitario).
2. Una interfaz **mucho más limpia** y profesional, que aproveche toda la pantalla como la referencia.
3. Una página de **Inicio** con los cursos más grandes y otra de **Mis cursos** con los cursos en que está inscrito.

## Decisiones

- **Menú inferior** (5 pestañas): Inicio (`home`, casa) · Mis cursos (`cursos`, libro) · Gimnasio (`gym`) · Tutorías ·
  Perfil. La app abre en Inicio (`tabFromURL` cae en `home`). `learn` sigue siendo la vista del curso (mapa de mundos y
  mundo), pero ya no tiene botón propio: mientras se ve, se marca «Mis cursos». El atrás del celular en un curso vuelve a
  Mis cursos; en cualquier otra pestaña, a Inicio; en Inicio pregunta si salir.
- **Inscripción**: `S.misCursos` (ids). Inscrito = está en esa lista o ya tiene alguna lección hecha (así quien ya venía
  estudiando no pierde nada). Abrir un curso desde Inicio lo inscribe. Lógica pura en `js/inicio.js`: `enrolledIds`.
- **Inicio** (`renderHome`, `js/inicio.js`): saludo, «Sigue aprendiendo» (el curso que se estudió por última vez y su
  lección que toca, con «Continuar»), la meta diaria (sale de la portada del curso) y **Cursos**: una tarjeta grande
  por curso, a todo el ancho, con su dibujo grande, nivel, nombre, descripción, lecciones y ejercicios, y su avance si
  está inscrito («Empezar» si no).
- **Mis cursos** (`renderMyCourses`): filas grandes con el dibujo, avance y la lección que sigue; vacía, invita a
  Inicio.
- **Portada del curso** (como la referencia): sin caja; enlace «Mis cursos» arriba, dibujo grande centrado, título,
  descripción y «N lecciones · M ejercicios». Con componentes, la del componente abierto. «Sigue aquí» queda como una
  tarjeta de nivel sencilla. La meta diaria ya no va aquí.
- **Barra de arriba** más limpia: a la izquierda la marca (cerebro + Zuka); a la derecha racha, XP y vidas. El selector
  de curso de la barra desaparece (el curso se elige en Inicio o Mis cursos). El recorrido presenta el curso señalando
  la portada (`.course-head`).
- **Gimnasio flotante** (`gymFabHTML`, `openGymSheet`): en los mundos de Razonamiento lógico (curso `preuda`, componente
  `razonamiento`; `GYM_FAB_BLOCKS`), un botón redondo con la pesa, del color del curso, con un punto que cuenta los
  retos abiertos sin hacer del mundo. Abre una hoja con «De este mundo» (abiertos y cerrados, con la lección que los
  abre) y «Para repasar» (retos abiertos de mundos anteriores del mismo componente), más «Ver todo el gimnasio». Si el
  mundo aún no tiene retos, lo dice y ofrece el repaso. `gymWorld(c, ui, done, unlockAll)` es la lógica pura.

Pruebas: `tests/inicio-mis-cursos.test.js`.

## Cambio del mismo día: gimnasio flotante en todo el curso

Pedido del usuario: el gimnasio no va en el menú inferior ni solo dentro de los mundos, sino como **botón flotante en
todo el curso** (portada, componentes, mapa de mundos y cada mundo) y **en todos los cursos**; además, **menú inferior
más grande**.

- Menú inferior de 4 pestañas: Inicio · Mis cursos · Tutorías · Perfil, con iconos de 26 px y letra de 12 px.
- El gimnasio (`gym`) sigue existiendo como vista completa («Ver todo el gimnasio» de la hoja, `?tab=gym`); mientras se
  ve, se marca «Mis cursos», y el atrás vuelve al curso.
- `gymWorld(c, ui, …)` sirve para cualquier curso (ya no hay `GYM_FAB_BLOCKS`). El nivel que lleva el estudiante es
  `courseLevelUi(c, block)`: el mundo abierto o, si no, el mundo de la lección que toca (en el componente abierto, si
  hay); si ya terminó, el último mundo. La hoja muestra «De tu mundo» y «Para repasar»; en un curso sin retos lo dice.
- El recorrido señala el botón flotante (`.gym-fab`).
