# Preuniversitario UdeA · Razonamiento lógico · Videos de los mundos 2 a 16

Pedido del usuario (2026-11-19): «crea los videos de todos los mundos del curso de razonamiento lógico, en todos los mundos y
todas las lecciones», usando como anexo los diez simulacros nuevos (`Documents/PreU/Simulacros Zuka`, fuente en
`docs/simulacros/src/s01.txt` … `s10.txt`), los exámenes reales de admisión y los talleres del preuniversitario.

## Formato (el mismo del mundo 1, spec `2026-11-19-preuda-videos-mundo-1`)

- Proyecto `video/preuda-cosmos`, una película por lección: `films/<nombre>.data.js` (guion) y `films/<nombre>.js` (escenas).
  1080×1920 a 60 fps, sin voz, HUD lima sin reloj ni barra abajo. Entrega: mp4 1080 y `.srt`.
- Diez escenas, 4 a 5 minutos: el **reto** (tarjeta «RETO» con opciones A–D) → conceptos con intuición primero → al menos
  **otro problema** con tarjeta («PROBLEMA») → el reto resuelto → cierre con la opción correcta, resumen y tarjeta final.
- **Solo el enunciado**: nada dice que el problema viene de un examen, de un simulacro o de un taller (ni narración, ni rótulos,
  ni nombres de escena, ni tarjetas). Los enunciados se toman casi textuales de los simulacros, que ya imitan el formato real.
- Sin preguntas al espectador (nada de «¿?»), narración a ≤ 3.4 palabras por segundo, rótulos de ≤ 36 y ≤ 58 letras.
- `D.KEYS`: cifras propias de los ejemplos del video que no deben salir en los ejercicios de la lección (la prueba lo exige).

## Piezas nuevas

`piezas.js` (se carga después de `preu.js`): rótulos `mono`, `bigT`, `jT`, llave `brc`; geometría plana con ángulos en grados
(`at`, `angOf`, `segL`, `polyL`, `arcA`, `arcV`, `wedge`, `ticks`, `rightA`, `ptL`); cuerpos (`prism`, `cyl`, `cone`); tablas
(`gridT`), fichas (`pill`, `slotB`, `nodeC`), balanza (`scaleB`) y el cierre común `closeOpts`. `examCard` acepta `col1: true` para opciones largas en una sola columna. Sus nombres no chocan con los
que declaran las películas del mundo 1.

`cola.sh`: cola de render (`out/cola.txt`, una película y su carpeta de entrega por renglón; registro en `out/cola.log`) que
construye una a una con `build.sh` y copia el resultado a `Downloads/Zuka_Preuniversitario/<NN_Mundo>/`. Las hojas de contacto
(`tools_stills.sh`) pueden fallar por tiempo mientras corre un render: se repiten.

## Películas

| Mundo | Lección | Película | Reto | Otro problema |
|---|---|---|---|---|
| 2 Geometría | `pu-ge-1` | `angulos` | Cadena de isósceles AB = BC = CD = DE, A = 17° → 51° | Polígono regular de 150° → 12 lados; reloj a las 3:30 → 75° |
| | `pu-ge-2` | `pitagoras` | Escalera de 13 m, base 5 → se aleja 7 → baja 7 m | Lados 5 y 9 → 9 valores; rombo 10 y 24 → 52 |
| | `pu-ge-3` | `semejanza` | Vaso cónico a media altura → 1/8 | Poste 3 m / sombra 4 m, sombra 28 → 21 m; lado + 30 % → área + 69 % |
| | `pu-ge-4` | `areas` | Pista 100 × 60 con semicírculos → 200 + 60π | Ventana 2 × 1 con medio círculo → 2 + π/2 |
| | `pu-ge-5` | `sombreadas` | Cuadrado 8 con cuatro cuartos de radio 4 → 64 − 16π | Pentágono de la cuadrícula → 21 |
| | `pu-ge-6` | `volumenes` | Vela cilíndrica r 3 h 8 en conos r 1 h 2 → 108 | Caja de cartón 20 × 14 con esquinas de 3 → 336 |
| 3 Orden | `pu-or-1` | `fila` | Cinco sillas (Ana, Beto, Carla, Diego, Elsa) → Elsa en la 5 | Estaturas → Fabio; carrera de cinco → Esteban justo antes que Bruno |
| | `pu-or-2` | `circular` | Tres parejas en mesa redonda → Natalia (igual con la convención contraria) | Mesa cuadrada de los instrumentos → Tomás |
| | `pu-or-3` | `tablas` | Laura, Mónica, Natalia → ingeniera en Medellín | Cajas de 3, 5, 8 y 12 kg → roja 12 y verde 5 |
| | `pu-or-4` | `condiciones` | Seis libros en tres estantes, C en 1 y F en 2 → E en el 3 | Carrera de cuatro (si Carlos después de Pablo → tercero); equipo de cuatro → C y D |

Pruebas: `tests/preuda-videos.test.js` (formato, que ninguna lección de un mundo terminado se quede sin película, `KEYS`, y la
matemática de cada problema, mundo por mundo).
