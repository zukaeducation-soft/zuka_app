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
