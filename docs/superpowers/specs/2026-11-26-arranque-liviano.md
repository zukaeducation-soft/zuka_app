# Arranque liviano: juegos por curso y paquetes con huella

Fecha: 2026-11-26. Hallazgos 7, 8 y segunda mitad del 14 de `docs/auditoria-2026-11-26.md`.
Sigue a `2026-11-24-arranque-rapido.md` (los cuatro paquetes).

## Problema

La app publicada bajaba y ejecutaba 9.75 MB de JavaScript (2.8 MB con gzip, unos 920 archivos) antes de pintar,
también en la portada y en la Tienda. De eso, 1.15 MB eran juegos que ningún ejercicio usaba, y cada versión nueva
volvía a bajar todo porque la caché del service worker era por versión.

## Qué se hizo

### 1. Juegos sin uso fuera de la app (hallazgo 8)

`tools/juegos-en-uso.js` carga los scripts de la app en un contexto de Node (como las pruebas) y recorre **los datos que
quedan**: cursos (lecciones, jefes, evaluaciones), gimnasio, simulacros y tablas, buscando ejercicios
`{ type: 'play', game }`. No busca texto: los nombres armados al vuelo y las capas que se reescriben (Álgebra) ya
están resueltos cuando se mira. Un archivo de `js/games/` se queda si registra un juego usado, si otro archivo vivo
nombra algo que declara, o si añade algo a un objeto común que alguien usa (`XG.figura`, `XG.MUEVE`…: se mide qué
añade cada archivo al cargarse).

- 243 archivos (1.15 MB) salieron de la plantilla `fuentes` de `index.html`. **Siguen en el repositorio** con sus pruebas.
- `node tools/juegos-en-uso.js` los lista; `--quita` los saca de `index.html`.
- En las pruebas: «registrado en la app» = está en `index.html`; «existe en el repositorio» = `retirados()`, `enRepo()` y
  `htmlRepo()` de `tests/load.js`. `tests/registro.test.js` exige que todo juego usado esté en la app y que ninguno sin
  uso vaya en ella. Un juego nuevo que nadie usa todavía hace fallar esa prueba: o se usa, o no se registra.
- Para volver a usar un juego retirado: poner su `<script defer src>` en la plantilla y usarlo en un ejercicio.
- Los robots del navegador que montan juegos viejos (por ejemplo `robot-torres.js`) ya no los encuentran en `GAMES`.

### 2. Paquetes por curso (hallazgo 7)

`tools/empaquetar.js` reparte los scripts de la plantilla en:

- **Arranque** (`zuka-a1` … `zuka-a6`): el núcleo, los datos de los cursos y nueve kits que esos datos usan al cargarse
  (`EN_ARRANQUE`: `kit.js`, `formula.js`, `arma-la-cuenta.js`, `explora-kit.js`, `logica-kit.js`, `figura-kit.js`,
  `explora.js`, `explora-mate.js`, `explora-escenas.js`; 235 KB). Es lo único que la página pide al abrir.
- **Diferidos**: el resto de `js/games/` y `js/explora*.js`. Un paquete por curso (`zuka-algebra`, `zuka-trig`,
  `zuka-calc`, `zuka-geo`, `zuka-preuda`, `zuka-preicfes`) y uno `zuka-comun`.

El reparto no se escribe a mano (`plan()`): un archivo es de un curso si solo ese curso lo usa: nombran un juego suyo
sus lecciones, evaluaciones o retos de gimnasio, o trae la explicación de una lección suya; y eso se propaga a los
archivos de los que depende (por nombres declarados, por lo que añaden a objetos comunes y por juegos nombrados entre
comillas). Lo que usan dos cursos o más, o ninguno a la vista, va en `comun`, que siempre se carga primero. Sobran
dependencias (palabras que coinciden) pero no faltan; lo que sobra solo engorda `comun`.

`js/carga.js` (último de la lista) envuelve `startLesson`, `startExam` y `startReto`: la primera vez que se abre algo de
un curso pide `comun` y el paquete del curso, y abre al llegar («Cargando los juegos…» si tarda más de 0.6 s; si no hay
red, avisa y deja reintentar). Después todo es inmediato. Con candado de plan no se pide nada. **Red de seguridad**: si
tras cargar falta un juego de esa lección o su explicación, pide los demás paquetes. Quien ya estudia un curso
(`S.lastLesson`) lo recibe solo, 1.5 s después de abrir y con la app quieta. En `localhost` los archivos van sueltos y
nada de esto actúa.

`hayExplora(id)` dice si una lección tiene explicación interactiva antes de cargarla (la lista de paquetes trae los
ids); la usa `js/escritorio.js`.

### 3. Huella por paquete (hallazgo 14)

Cada paquete se llama `js/paquetes/zuka-<clave>.<10 hex de sha256>.js`. `node tools/empaquetar.js` escribe los
paquetes, borra los viejos y deja la lista en dos sitios:

- `js/paquetes/lista.js` (`self.ZUKA_PAQUETES = { arranque, comun, cursos, explora }`): único `<script src>` fuera de la
  plantilla, antes del script en línea de `<head>`. Sin huella: va con cada versión.
- `sw.js`, entre las marcas `// <paquetes>` (`ARRANQUE`, `DIFERIDOS`).

Service worker: los paquetes van en la caché `zuka-paquetes-v1`, que **no se borra al cambiar de `VERSION`**. Al
instalar solo se baja el que no esté; los del arranque son obligatorios, los diferidos se intentan todos (para que la
app funcione sin conexión) y si uno falla no detiene la instalación. Al activarse se sueltan los que la lista ya no
nombra. `vercel.json` les pone `Cache-Control: immutable`.

`VERSION` se sigue subiendo en cada cambio (la prueba lo exige: `lista.js` está en el `SHELL`).

## Números

| | Antes | Ahora |
|---|---|---|
| JavaScript para abrir (portada, Tienda, inicio) | 9.75 MB (2.81 MB gzip) | 5.03 MB (1.58 MB gzip) |
| Primera lección de un curso | nada más | `comun` 853 KB (238 gzip) + su curso: Álgebra 460 (123), Trigonometría 278 (72), Cálculo 127 (29), Geometría 37 (10), Preuniversitario 804 (234), Preicfes 700 (203) |
| Todo junto | 9.75 MB | 8.29 MB (2.49 MB gzip) |
| Versión nueva que cambia un archivo | 2.8 MB gzip otra vez | el paquete que lo contiene (0.2 a 0.3 MB gzip) |

Lo que queda en el arranque son sobre todo los datos de los cursos (3.3 MB), el gimnasio (0.43 MB) y `guia.js`
(0.19 MB). Partir los datos por curso es otro trabajo: el inicio, el progreso y el catálogo los leen todos.

## Pruebas

- `tests/registro.test.js`: juegos usados registrados, ninguno sin uso en la app, kits presentes.
- `tests/paquetes.test.js`: paquetes al día, huella en el nombre, plantilla, service worker (instala solo lo que
  falta, poda, sirve de su caché), página (solo arranque, preload, aviso si falta la lista), **el arranque solo deja
  los mismos datos de los cursos**, **cada curso con `comun` + su paquete tiene todos sus juegos y explicaciones,
  iguales a los de la app completa**, y `js/carga.js` (orden, doble toque, red de seguridad, sin conexión).
- En el navegador (`node tools/servir.js 5197`, `http://localhost:5197/?paquetes` para abrir lecciones sin candado y
  `http://zuka.localhost:5197` para el service worker): `tests/robot-paquetes.js` abre la primera lección de un curso y
  monta cada juego que usa. Hecho con los nueve cursos, también aislados, y sin conexión tras una visita.

## Revisión fresca (subagente) y lo que cambió por ella

- Los paquetes se piden **en fila**: si el común no llega, el del curso no se pide (se ejecutaría a medias y quedaría
  marcado como cargado).
- Un paquete que no llega porque **ya hay otra versión** (otra pestaña aceptó la actualización y el service worker soltó
  los paquetes viejos) recarga la app en vez de culpar a la conexión: `js/carga.js` pide `lista.js` sin caché y compara.
- Una red colgada suelta el intento a los 20 s, con aviso.
- Lo que **el arranque nombra** de un archivo diferido (`figura-kit.js` lee `XG.ROTULA`, `XG.ORDEN` y `XG.cadena`, de
  `rotula-mueve.js`) va al común (`paraArranque`); y un archivo de tablas que nombra juegos sirve a los cursos de esos juegos.
- `js/escritorio.js` lee la lista de paquetes sin esperar a `js/carga.js` (el primer pintado ya dice «Explicación interactiva»).
- `lista.js` lleva `Cache-Control: no-cache`.

Quedó sin hacer (raro y se recupera con red): si un paquete diferido falló al instalar el service worker y después se
publica otra versión, ese paquete viejo ya no existe; la app lo detecta al abrir la lección y se recarga.

## Al tocar esto

- Juego o explicación nuevos: registrar en la plantilla, `node tools/empaquetar.js`, subir `VERSION`. El reparto se
  recalcula solo.
- Si un archivo de datos de un curso empieza a usar un kit al cargarse, la prueba «el arranque solo…» falla: añadir el
  kit a `EN_ARRANQUE`.
- Una pantalla nueva que monte juegos sin pasar por `startLesson`, `startExam` o `startReto` tiene que llamar
  `CARGA.abre(cursoId, { juegos }, sigue)`.
- Un script en línea de `index.html` que cambie necesita su huella en `vercel.json` (la prueba la dice).
