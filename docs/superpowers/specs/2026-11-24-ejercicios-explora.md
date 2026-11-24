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
