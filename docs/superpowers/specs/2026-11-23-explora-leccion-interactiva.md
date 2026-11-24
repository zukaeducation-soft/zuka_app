# Explicación interactiva en lugar del video («Explora»)

Pedido del 2026-11-23: ensayar otra forma de explicar los conceptos. En vez de mirar un video, el estudiante **construye**
la idea paso a paso con las manos; la app lo guía y él nunca es solo espectador. Referencias: Mimo y Brilliant, «pero más
interactivo». Piloto: lección 1 de Razonamiento lógico, `pu-cm-1` «Enteros, signos y jerarquía».

## Qué se tomó de las referencias

- **Brilliant**: no hay videos; primero un reto y luego se resuelve con una figura que se manipula; la respuesta llega
  mientras el razonamiento está fresco y un fallo es una oportunidad de corregir, no una nota; el apoyo se va retirando.
- **Mimo**: pantallas diminutas (una frase y una acción), fichas que se tocan para completar, un mensaje de ánimo tras cada
  acción, barra de avance por tramos.
- **Más allá**: aquí cada pantalla es una escena que se arrastra (no opción múltiple), la cuenta se escribe sola en vivo,
  se apuesta antes de saber, y las ideas ganadas se apilan en un «andamio» que se ve crecer y se repasa al final.

## Enfoques considerados

1. **Módulo «Explora» que ocupa el lugar del video** (elegido): la lección sigue igual (cola, ejercicios, avance); el paso
   `clip` muestra la explicación interactiva si la lección tiene una. Cambio pequeño y reversible; el video queda a un toque.
2. Convertir la explicación en ejercicios `play` normales: se mezcla con la práctica, quita vidas y obliga a «Comprobar»;
   una explicación no debe castigar.
3. Pausar el video cada tanto con preguntas: sigue siendo mirar; no cambia el enfoque.

## Diseño

- `js/explora.js` (después de `ui.js`, antes de `player.js`), `css/explora.css`, contenido en `js/explora-<lección>.js`.
- `EXPLORA[idLección] = { caps: [nombres], pasos: [paso] }`. `makePlayer` (js/player.js) entrega `exploraPlayer` cuando la
  lección tiene explicación y se pide su video principal; mismo contrato (`play`, `destroy`, `onEnd`).
- Un **paso** = `{ cap, tipo, texto, idea, ok?, ...parámetros }`: una frase (≤ 170 letras), una escena, una meta. Al cumplirla:
  sonido, la `idea` se revela y entra al andamio, y aparece «Seguir». No hay vidas, ni reloj, ni «Comprobar».
- Tipos (`XP[tipo] = { ini, ok, sol, lee }`, lógica pura y probada en Node; el dibujo va aparte en `XPD`):
  `apuesta` (apostar antes de saber; no se califica y se retoma al final), `recta` (ficha que se arrastra; modos `llegar`,
  `espejo`, `distancia`, `salto`, `dos`), `saltos` (se arrastra la punta de una cadena de saltos iguales; al cruzar el 0 se
  voltea), `signos` (tocar factores para cambiarles el signo), `capas` (tocar la operación que va primero; se funde),
  `casillas` (fichas a casillas) y `cierre` (la apuesta frente a lo descubierto, y el andamio completo).
- Movimiento: todo en código (resortes propios sobre `requestAnimationFrame`, transiciones CSS, vibración corta al pasar
  por cada marca). Con «reducir movimiento» se pone el estado final.
- Colores del tema y del curso (`--c`, `--c-ink`, `--ink`, `--line`, `--ok`): sirve en claro y oscuro. Ancho 300–380 px.
- «Ver el video» en la primera pantalla abre el reproductor de siempre.

## Lección pu-cm-1 (16 pasos, 5 capítulos)

La recta (apuesta de la diferencia de gol, llegar, espejo, distancia, dos lugares) · Sumar es moverse (sumar, sumar un
negativo, restar, restar un negativo) · El menos da la vuelta (saltos, dos vueltas, par e impar) · Capas (jerarquía, el menos
fuera de la potencia) · Cierre. Los ejemplos no repiten los de los ejercicios de la lección.

## Mis decisiones (para revisar)

- **Rive**: no se añadió. Rive necesita archivos `.riv` dibujados en su editor; sin ellos el motor (≈ 150 KB) no aporta nada.
  El movimiento se hizo en código. Si se dibujan piezas en Rive, entran en `XPD` como un tipo más.
- **Mobbin**: pide cuenta para ver los flujos; no se pudo consultar.
- **Simulador**: en este equipo no hay dispositivo virtual de Android creado (ni iOS en Windows); se probó en el navegador a
  ancho de celular.
- Solo la lección piloto. Si gusta, las demás se escriben con los mismos tipos de paso.

Pruebas: `tests/explora.test.js`.

## Más dinámica (2026-11-23, segundo pedido)

- **La escena responde**: cada tipo tiene `dice(estado, p)` (pura), una frase que cambia con cada movimiento («Llevas 3 de 7 pasos», «Así estarías sumando 7. Restar va al otro lado», «Cruzaste el 0 y la cadena se volteó»). Un aviso de error la tapa hasta el siguiente movimiento.
- **Predice y mira** (tipo `predice`): se elige qué va a pasar y la escena (`recta` o `saltos`) se anima sola de `de` a `a` (`xpTween`, `mover`); no se califica, y al que no acertó se le dice el porqué. Después viene un paso «ahora tú» con otros números. La lección queda en 18 pasos.
- **Destello** de chispas al ganar cada idea (`xpChispas`).

## Primero se explica, después se pide (2026-11-23, tercer pedido)

El usuario no quiere «atacar» al estudiante con problemas de entrada. Regla para toda lección Explora: **cada capítulo abre con una explicación** (tipo `muestra`: la escena `recta`, `saltos`, `signos` o `capas` se anima sola por momentos `{ dice, de, a, cuenta }`; arranca sola y un toque trae el siguiente momento; no pide nada y se puede repetir), sigue «Tu turno» con la misma escena y otros números, y **el problema de contexto va en el último capítulo**. Ya no hay apuesta de entrada. Con explicaciones, el andamio guarda solo sus ideas (los conceptos). `predice` queda disponible pero la lección piloto no lo usa. La lección tiene 24 pasos; la prueba exige que cada capítulo abra con `muestra`.

**Sin intervenir en la explicación** (cuarto pedido): mientras se explican los conceptos el estudiante solo mira; interviene en la práctica («Tu turno») y en el problema. La explicación arranca y pasa sola de un momento al siguiente; tras cada animación deja leer `XP.muestra.pausa(m)` = 0.9 s + 0.23 s por palabra. La escena no responde a toques; al final queda «Ver otra vez» y se habilita «Seguir».

## Más entretenida, con sonido y más detalle (2026-11-23, quinto pedido)

- **Sonido** sintetizado propio (`XS` en `js/explora.js`, WebAudio, sin archivos; respeta `S.sfx` y no programa nada si el audio no está en marcha): tic por cada marca de la recta (más agudo a la derecha), salto, volteo al cruzar el 0, fundir en las capas, aviso grave, página entre momentos, soplo al cambiar de paso y acorde al ganar una idea. Botón de silencio `.xp-snd` arriba (cambia `S.sfx`, con `aria-pressed`).
- **Más vistosa**: brillo del color del curso detrás de la escena, estela de la ficha, número resaltado bajo la ficha, zonas de positivos y negativos que se dibujan (`zona: pos|neg|ambas`, solo en «La recta»: en sumar confundían sentido con signo), marcas que laten (`marcas`), un punto por salto, puntos de avance por momento y destello al ganar una idea.
- **Fluida**: el texto entra palabra a palabra (`xpPalabras`; fórmulas y negritas enteras), la cuenta se funde al cambiar (solo en explicaciones; al arrastrar parpadearía).
- **Más detalle**: cada explicación tiene 4 a 6 momentos con analogías (termómetro, espejo, contar pasos, dinero y deudas, una rana que salta, pelar una cebolla) y la regla dicha al final. Lectura: 0.8 s + 0.215 s por palabra.

## Primera lección de Álgebra, alg-0a (2026-11-23, sexto pedido)

El mismo formato en «¿Qué es un conjunto? Notación y pertenencia» (`js/explora-alg-0a.js`, pruebas `tests/explora-alg-0a.test.js`).
Escena nueva `conjunto`: una membrana (el conjunto, con su nombre en cursiva) y fichas que se arrastran adentro o afuera (un toque o
Enter también sirven); fichas con la misma etiqueta son un solo elemento y la segunda se funde con la primera; la notación por
extensión (y n(·) con `cardinal`) se escribe sola. En las explicaciones, cada momento puede meter (`pon`), sacar (`saca`),
reordenar (`mezcla`) o señalar (`marca`). Capítulos: qué es un conjunto (bandera de Colombia; tu turno: semáforo), pertenecer
(vocales; tu turno: dado > 4), extensión y comprensión (pares menores que 10; tu turno: múltiplos de 3), sin repetidos ni orden y
cardinal (COLOMBIA, conjunto K con letras minúsculas: el conjunto nunca se llama como uno de sus elementos; tu turno: TOMATE y
cardinales), y el problema de la heladería. Toda práctica tiene algo que dejar afuera. «Interpretamos «el curso de álgebra y
trigonometría» como el curso de Álgebra (el libro es Álgebra y Trigonometría); la primera lección de Trigonometría, `trig-41a`, sigue
con su video.»

## Primera lección de Trigonometría, trig-41a (2026-11-23, séptimo pedido)

Escena `angulo` (`js/explora-angulo.js`): rueda SVG con el lado terminal que se arrastra (un dedo a la vez; el centro no gira
nada) o se gira con el teclado (flechas ±15°, Re Pág/Av Pág ±90°, Inicio = 0; `role="slider"`). Se puede pasar de una vuelta y
girar hacia atrás (−720° a 720°); una espiral muestra el giro (positivo en el color del curso, negativo en naranja). En las
explicaciones: `radio`, `arco`, `radios` (radios de un radián numerados) y `etiqueta` (solo cuando la rueda llega).
Capítulos: un ángulo es un giro, grados, radianes (arco = radio; π radios en media vuelta), convertir, coterminales y el problema
del minutero (20 minutos = −120° = −2π/3). No se dice cuántos grados mide un radián: lo calcula un ejercicio de la lección.

## Voz (2026-11-23, octavo pedido: primero una lección)

Gemini 3.8 Flash TTS, voz Nika (la del código que pasó el usuario), generada de antemano en el computador: la llave nunca va a la
app. `tools/explora-frases.js` lista lo que se dice (enunciados y momentos) y lo pasa a texto hablado (`tools/explora-habla.js`:
fórmulas y símbolos con palabras; `DICHO` para las frases que la regla dice mal, p. ej. −3² frente a (−3)²). `tools/explora-voz.py`
pide cada frase, recorta el silencio, la guarda en AAC (m4a, 48 kbps) y escribe `voz.json` { texto en pantalla: { f, d } }.
En la app (`XS.carga`/`XS.voz`, Web Audio por el mismo bus que los efectos): la explicación espera la lista de voces (hasta 0.8 s),
cada momento empieza junto con su frase y sigue cuando terminan la animación y la voz (+0.45 s); sin voz, el tiempo de lectura.
La práctica dice su enunciado. El botón de sonido calla también la voz. Los audios están en `media/voz/` (ignorado por git): falta
decidir dónde alojarlos para la app publicada y cambiar `EXPLORA_VOZ`.

La narración (m4a y voz.json) sí va a GitHub desde el 2026-11-23, por pedido del usuario: así suena también en la app publicada.

## Ejercicios con el mismo lenguaje (2026-11-23, pedido: estandarizar calidad, estética e interacción)

En una lección con explicación (EXPLORA[id]) sus ejercicios se ven, suenan y se leen como ella; las demás lecciones no cambian. `startLesson` pone `.xp-lesson` y `setGameCourse(c.id, { explora: true })`: el lienzo usa `EXPLORA_TOKENS` (fondo, superficies, líneas y tinta de css/styles.css :root; el acento sigue siendo el del curso) con el brillo suave del centro (plano en el Preuniversitario); tocar el juego suena y vibra como tocar la escena (`XS.pop`, una vez aunque el juego también lo pida) y los juegos reciben `XP_SFX` como `api.sfx`; al comprobar suenan `XS.idea` / `XS.nope`. El enunciado y la explicación del aviso entran palabra a palabra (`xpPalabras`, que no parte fórmulas ni negritas pegadas a un signo). css/explora.css viste el marco: enunciado con la letra de la frase de la escena, píldoras de pista y «Cómo se juega», pista abierta como tarjeta de idea, juego sin tarjeta con borde que se enciende al acertar o fallar, aviso que sube como la tarjeta de idea y barra de avance fina del color del curso. La mecánica de cada juego no cambia. Pruebas: tests/explora-ejercicios.test.js.

## Razonamiento lógico, mundo 1 completo (2026-11-23, pedido: «crear las demás lecciones del curso de razonamiento lógico»)

Se hace mundo por mundo. Mundo 1 (Cálculo mental): pu-cm-2 Fracciones (escena `barras`: se corta con una regla de 1 a 12 partes
y se llena arrastrando; al cortar, lo tomado conserva su tamaño desde que empieza el arrastre), pu-cm-3 Decimales y porcentajes
(escena `cien`: cuadrícula de 100 que se pinta; `quita` para descuentos) y pu-cm-4 Potencias, raíces y estimación (escena
`potencia`: fichas y puntos que se multiplican al arrastrar el exponente; modo `lado` para el cuadrado y la raíz). Mismo molde:
explicación que corre sola por capítulo, «tu turno», problema final y cierre; prácticas distintas de los ejercicios de la lección.
Pendientes: los mundos 2 a 16 de Razonamiento lógico.
