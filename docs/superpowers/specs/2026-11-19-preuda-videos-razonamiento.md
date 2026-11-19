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
(`gridT`), fichas (`pill`, `slotB`, `nodeC`), balanza (`scaleB`), árbol de conteo (`treeD`), casillas de decisión (`boxes`) y el cierre común `closeOpts`. `examCard` acepta `col1: true` para opciones largas en una sola columna. Sus nombres no chocan con los
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
| 4 Proporcionalidad | `pu-pr-1` | `razones` | Salón 3 : 5, llegan 6 hombres → 3 : 4 → 40 mujeres | Herencia 2 : 3 : 5 (18 millones de diferencia) → 60; escala 1 : 50 000, 6 cm → 3 km |
| | `pu-pr-2` | `reglatres` | 6 obreros en 12 días, a los 4 se van 2 → 16 días | 8 llaves en 15 h → 12 llaves en 10 h; 4 máquinas, 600 piezas, 5 h → 6 máquinas, 8 h: 1 440 |
| | `pu-pr-3` | `velocidad` | Dos llaves (6 h y 3 h) y desagüe (4 h) → 4 h | Trenes de M y N (360 km, 70 y 50) → 210 km; bus 60 / 40 → 48 km/h |
| | `pu-pr-4` | `porcientos` | Elección: 60 % votó, 55 % = 6 600 → 20 000 | Tanque del 40 % al 65 % con 30 L → 120 L; grupo en bicicleta → 16 % |
| | `pu-pr-5` | `aumentos` | Salario + 8 % = 1 620 000 → 1 500 000 | +20 % y −20 % → −4 %; comerciante 80 000, +25 %, −10 % → 12.5 % (el IVA y los descuentos 20 % + 10 % ya salen en los ejercicios) |
| 5 Conteo | `pu-co-1` | `multiplicativo` | Bandera de 3 franjas, 4 colores, vecinas distintas → 36 | Código de 3 letras y 2 impares distintos → 540; clave con 1, 2, 3 sin vecinos iguales → 24 |
| | `pu-co-2` | `permutaciones` | LIBRO con las vocales juntas → 48 | Presidente, secretario y tesorero de 6 → 120 |
| | `pu-co-3` | `combinaciones` | Comité de 3 con exactamente 2 mujeres (5 H, 4 M) → 30 | 6 puntos en una circunferencia → 20 triángulos; 45 saludos → 10 personas |
| | `pu-co-4` | `casos` | Múltiplos de 3 o de 5 del 1 al 100 → 47 | Ana y Beto no juntos → 12; pares de tres cifras con 1–5 → 24 |
| | `pu-co-5` | `caminos` | Mensajero en 3 × 3 sin pasar por R → 8 | Cuadrados de una cuadrícula de 3 × 3 → 14 |
| 6 Espacial | `pu-es-1` | `rejillas` | Robot en (0, 0) mirando al norte, AADAIA → (1, 3) | Secuencia que vuelve al inicio → ADADADA; colorear 3 × 3 sin vecinas → 5 |
| | `pu-es-2` | `cubos` | Cubo de 6 pintado y cortado → 48 con dos caras (el de 4 ya es un juego de la lección) | Vistas 3, 1, 2 y 2, 3, 1 sobre base de 3 × 3 → máximo 14 (mínimo 12) |
| | `pu-es-3` | `desarrollos` | Torre de 3 dados con un 4 arriba → ocultas suman 17 | Fila 2-3-4-5, el 1 sobre el 2 y el 6 bajo el 4 → opuesta al 1: el 6 |
| | `pu-es-4` | `giros` | Reloj que en el espejo marca 8:25 → 3:35 | Tira doblada por la mitad 4 veces y un agujero → 16 |
| 7 Secuencias | `pu-se-1` | `sucesiones` | 5, 8, 13, 20, 29 → término 12: 148 | Aritmética con 3.º = 11 y 7.º = 27 → 20.º = 79; 3, 6, 5, 10, 9, 18, 17 → 10.º = 66 |
| | `pu-se-2` | `letras` | A, C, F, J, O → U | 3C, 6F, 9I, 12L → 15O; 100 palitos → figura 33 |
| | `pu-se-3` | `ciclos` | ABBCCCD en la posición 150 → B | 1 de marzo viernes → 1 de junio sábado |
| 8 Codificación | `pu-cd-1` | `cifrados` | SOL, LUZ y SUR con símbolos en desorden → LOROS = ○ □ ● □ △ | OLEUR con clave +3 → LIBRO; 33 11 43 en la tabla → MAR |
| | `pu-cd-2` | `reglas` | Dígito de control (residuo ÷ 7), 5 _ 2 8 4 → 3 | Máquinas A, B, C con el 5 → 49; ★□□△△△△○○ → 197 |

Problemas propios (mundo 6): en los exámenes, los problemas espaciales dependen de figuras que el texto no conserva, así que algunos enunciados son originales en el formato del examen; su respuesta se comprueba por fuerza bruta en la prueba.

Revisión fresca (mundos 2 a 5, 2026-11-19): ninguna respuesta errada; se corrigieron un rótulo «agudo» sobre un triángulo obtuso, una condicional mal leída («si va C, va D» no amarra a C y D), frases ambiguas al oído y narraciones con forma de pregunta.

Pruebas: `tests/preuda-videos.test.js` (formato, que ninguna lección de un mundo terminado se quede sin película, `KEYS`, y la
matemática de cada problema, mundo por mundo).
