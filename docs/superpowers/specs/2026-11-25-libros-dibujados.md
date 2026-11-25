# Libros dibujados: los que se publican en la app (2026-11-25)

Pedido: con los dos componentes ya terminados en la app, diseñar los cuatro libros con gráficos profesionales, conceptos
explicados con claridad y ejemplos con su solución en detalle, usando muchos dibujos en conceptos y en soluciones.

## Decisión

Los dibujos del libro **son los de la app**: cada explicación de Explora (90 lecciones) se imprime cuadro por cuadro, en vectorial.
Así el estudiante ve lo mismo en el papel y en el celular, y si la app cambia el libro se pone al día al compilar.

| Parte de la lección | De dónde sale |
|---|---|
| Ruta, analogía | Explora / `analogias-*.tex` |
| Capítulos **cuadro por cuadro** (dibujo numerado + texto + cuenta), la idea | `momentos` de cada `muestra` |
| **Tu turno** con su dibujo, la pista y, al final del libro, la **solución dibujada** | pasos de práctica (estado inicial y `sol`) |
| **Ejemplo resuelto con dibujos** (83 en razonamiento, 33 en lectura), nuevos | `docs/libros/arte/ejemplos/*.js` |
| Técnica, regla, más ejemplos en corto, trampa, reto, taller, evaluación, claves | los `.tex` de siempre |

Orden: primero el concepto, después usarlo. En el mundo 1 el texto por capítulos lleva encima su explicación dibujada. En lectura
cada explicación es una sola hoja con todas las marcas (subrayado, tachado, rótulos) y los pasos numerados al lado.

## Cómo se arma

- `arte/escenas.mjs N` (playwright-core de `~/lemo-opuscar`, Chrome): monta cada escena con el código real, guarda un PDF por libro
  con una escena por página (`tex/salida/escenas-N.pdf`) y los datos en `.json`; recorta el aire igual en todos los cuadros de una
  misma explicación. `arte/recorta.py` ajusta las hojas de lectura.
- `arte/pasos.js N` escribe `tex/salida/pasos/*.tex`; junta los momentos que no cambian el dibujo; cambia «arrastra» y «toca» por
  verbos de lápiz. `arte/texto.js` pasa los textos a LaTeX. `tex/zuka-dibujo.tex` es la capa de diseño.
- `sh docs/libros/build.sh [N]` hace todo; `SIN_ESCENAS=1` no vuelve a dibujar.
- Ejemplo nuevo: en `arte/ejemplos/`, `{ t, q, de: <paso cuya escena se usa>, v / en, m: [[texto, cambios, cuenta]], r }`, o
  `escena: 'dibujo'` con su propio `dib(v, K)`; en lectura, `H(título, pregunta, párrafos, opciones, pasos, respuesta)`.

## Pendiente

Las soluciones de «Más ejemplos, en corto» y de los talleres siguen siendo de texto. Falta la lectura de una persona de los ejemplos nuevos.
