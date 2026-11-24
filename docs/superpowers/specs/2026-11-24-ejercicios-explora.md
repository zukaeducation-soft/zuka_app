# Ejercicios con las escenas de la explicación (2026-11-24)

Pedido: que los ejercicios sean consistentes con el estilo de las explicaciones (también en color), mejor diseñados, interactivos y que
de verdad evalúen la comprensión de los conceptos de la explicación. Se empieza por la lección 1 de razonamiento (`pu-cm-1`).

## Reglas de diseño

1. **Las mismas piezas**: SVG y fichas con las clases `.xp-*` (recta, ficha, arcos, aros, bandeja), los sonidos `XS` y los colores del
   tema y del curso (`--c`, `--c-ink`, `--fire` para lo negativo o volteado, `--ok`). Nada de lienzo p5 ni colores propios.
2. **Predecir y después ver**: mientras se responde, la escena no dice el resultado ni avisa que coincide. Al tocar «Comprobar», la escena
   **ejecuta la respuesta del estudiante** (camina, salta, se voltea, se funde) y se ve por qué sirve o no; si no, muestra la buena.
3. **Evalúa la idea, no el procedimiento**: se construye una situación que cumple una condición; lo que sobra son los errores típicos.
   Una sola ronda por ejercicio, sin reloj.
4. La zona de examen conserva sus tres formatos, vestida igual (letra, tarjetas y fichas de la explicación).

Kit: `js/games/explora-kit.js` (`XG.juego`, `XG.recta`, `XG.perilla`, `XG.camina`, `XG.arrastra`). Un juego da `{ ini, listo, ok, sol,
texto, monta }`, todo puro menos `monta`, que devuelve `fin(ok)`. Estilos al final de `css/explora.css` (`.xg`). Teclado: lo que se
arrastra se mueve con las flechas.

## pu-cm-2, pu-cm-3 y pu-cm-4

Barras (`fracciones-escena.js`), porcentajes (`porcentajes-escena.js`) y potencias (`potencias-escena.js`); los de perillas usan `XG.conPerillas`.
pu-cm-3: `rejilla-otra` (de cada 100), `cuelga-porcientos` (tres formas), `que-porcentaje`, `pedazos-porciento` (porcentaje de una cantidad),
`etiqueta-vieja`, `vuelta-al-precio`, `factor-final` (subir y bajar) y `lanza-porciento`. pu-cm-4: `crece-factor`, `cuadrado-justo`,
`exponentes-justos`, `misma-potencia`, `raiz-bandera`, `cuelga-decimales`, `estima-diez` y `lanza-potencia`. Lo que la explicación no enseñaba
(la parte entre el todo, deshacer un cambio, decimales al cuadrado y estimar productos) se añadió a sus momentos.

## Mundo 2, Geometría (pu-ge-1 a pu-ge-6)

Se responde **moviendo la figura misma**. Armazones en `js/games/figura-kit.js`: `XG.figura` (manijas sobre el dibujo; `dib(v, K, p, f)` con f = 0
mientras se responde y 1 cuando la figura ya ejecutó la respuesta), `XG.rotula` (medidas que se arrastran a su lugar; reutiliza
`XPD.fichas`) y `XG.tiros` (en movimiento: tres tiros, un fallo perdonado). Un archivo por lección, `js/games/geo-escena-N.js`, con ocho juegos;
las zonas de examen no cambian. Pruebas `tests/ejercicios-geometria.test.js`: recorren todos los estados alcanzables y fijan qué se acepta.
El error típico tiene que caber en la manija o en la perilla, y con su aviso. A la explicación de pu-ge-4 se le añadieron el rombo y el borde.

## Mundo 3, Acertijos de orden (pu-or-1 a pu-or-4)

Armazones de `js/games/logica-kit.js`, con las reglas como datos (`XG.regla`, `XG.reglaEq`, `XG.reglaTb`): `XG.puestos` (fichas a sus puestos; al comprobar
se encienden las pistas una por una, cumplida o rota), `XG.marca` (tocar todos los que cumplen, o un grupo que cumpla), `XG.cartas` (escoger las
pistas que dejan un solo orden) y `XG.tabla` (✓ y ✗). Escenas en `js/games/orden-escena.js`; pruebas `tests/ejercicios-orden.test.js` (solución única
por fuerza bruta y ninguna pista de sobra; los tiros fallados no enseñan la respuesta).

## Mundo 4, Proporcionalidad y porcentajes (pu-pr-1 a pu-pr-5)

Un solo archivo, `js/games/proporcion-escena.js` (40 juegos: vasos, cortes, escalas, rectángulos de trabajo, vías, tanques, dobles reglas y barras de
precio), con los armazones ya hechos; pruebas `tests/ejercicios-proporcion.test.js`. En los tiros, un fallo dice si faltó o sobró, sin dejar medir cuánto.

## Mundo 5, Conteo y combinatoria (pu-co-1 a pu-co-5)

`js/games/conteo-escena.js`: `cuenta` (casillas con fichas; `mira` es el aviso de cada casilla y `trampas` el de un error típico en ella), `frases`, `fichas` y
`celdas` (tocar), perillas y `ascensor` (tiros). Pruebas `tests/ejercicios-conteo.test.js`: las metas se comprueban contando de verdad, y cada trampa
tiene que poder armarse con las fichas que hay.

## Mundo 6, Razonamiento espacial (pu-es-1 a pu-es-4)

`js/games/espacial-escena.js`: calles, torres de cubos con sus vistas, moldes que se doblan de verdad (`XG.espacial.dobla`, con orientación), dados,
espejos y dobleces. `XG.cuenta` y `XG.ascensor` (de `conteo-escena.js`) quedan para los demás mundos. Pruebas `tests/ejercicios-espacial.test.js`.

## Mundo 7, Secuencias y patrones (pu-se-1 a pu-se-3)

`js/games/secuencias-escena.js`: filas de fichas con huecos y saltos (`huecos`), alfabeto con señalador, figuras que crecen y ruedas (`rueda`, que avanza
o retrocede `pasos` desde `de`). Pruebas `tests/ejercicios-secuencias.test.js`. El lugar en un ciclo se cuenta desde antes de la primera pieza (`de: -1`),
para que la cuenta que se muestra sea la de la explicación; ninguna sucesión tiene los saltos ni la razón de los ejemplos explicados.

## Mundo 8, Codificación (pu-cd-1 y pu-cd-2)

`js/games/codigos-escena.js`: rueda de letras, letras con valor, bombillos, máquinas y letras que cambian de puesto. El cuadro de coordenadas y el código
espejo se quitaron porque la explicación no los enseña. Pruebas `tests/ejercicios-codigos.test.js`.

`XG.rotula` revuelve la bandeja (siempre igual) para que tocar las fichas de izquierda a derecha no dé la respuesta, en todos los mundos.

## pu-cm-1

| Juego | Concepto | Qué se hace | Error que detecta |
|---|---|---|---|
| `recta-muda` | orden, opuesto, valor absoluto | colgar cuatro expresiones en una recta que solo trae el 0 y el 2 | creer que el menos de afuera de las barras desaparece, o que −3 va antes que −5 |
| `dos-radares` | distancia | poner el barco con la distancia a dos radares | olvidar que a una distancia hay dos lugares |
| `arma-viaje` | sumar y restar | armar con dos cartas el viaje de −6 a 5 | creer que − (−8) baja |
| `taller-saltos` | multiplicar como saltos | fijar salto y veces para caer en 15 con la cadena volteada | menos por menos da menos |
| `signos-condiciones` | paridad de los signos | producto positivo y suma negativa a la vez | mezclar la regla del producto con la de la suma |
| `potencia-signo` | menos adentro o afuera | armar una potencia que valga −16 con el menos adentro | (−2)⁴ = −16 |
| `parentesis-justo` | jerarquía | arrastrar sobre la cuenta para poner el paréntesis que la hace dar −18 | el menos delante del paréntesis |
| `lanza-ficha` (en movimiento) | suma y resta en la recta | dar el impulso; la ficha sale saltando. Tres tiros, un fallo permitido | sentido y tamaño del paso |
