# Portada con el lenguaje de holcim.com.co (2026-11-28)

Pedido del usuario: cambiar el diseño de la página donde se ofrecen los cursos (la portada, `js/presentacion.js` +
`css/presentacion.css`) tomando como referencia https://www.holcim.com.co/ y a partir del logo nuevo (spec `2026-11-28-logo-color`).

## Lo que se toma de la referencia

Holcim usa casi solo tres colores (azul noche `#041739`, blanco y un cian de acento), títulos en mayúsculas muy gruesos, esquinas
rectas en tarjetas y franjas, botones en píldora y una barra superior azul noche con letras blancas. Su portada abre con una foto a
todo lo ancho y un panel azul noche translúcido a la izquierda con el título, una frase y un botón blanco; abajo, las pestañas del
carrusel numeradas. Las tarjetas de servicios son blancas con borde azul noche y una flecha.

## Cómo queda Zuka

Contenido, orden de secciones y comportamiento no cambian: es una capa de estilo al final de `css/presentacion.css` («Capa
Holcim»), sobre las piezas que ya existían.

- Colores: el azul noche es la tinta del logo (`#002454`) y una variante más honda para fondos (`#001634`); el acento es el azul
  institucional (`--zuka-azul`, más claro en tema oscuro). El degradado solo vive en el logo.
- Barra de arriba azul noche, letras blancas, logo con la palabra blanca; «Plataforma virtual» en azul institucional.
- Carrusel: fondo azul noche en todas las láminas (manda sobre el color de cada una). Las láminas con foto la muestran a todo lo
  ancho, con el texto en un panel azul noche translúcido; las demás dejan su figura a la derecha. Pestañas numeradas, la activa
  subrayada en lima.
- Títulos de sección en mayúsculas, peso 700 (sin 800), tinta azul noche (blanca en tema oscuro).
- Tarjetas de programas con esquinas rectas, borde de 2 px en azul noche y flecha junto al título; etiquetas sin píldora.
- Franjas de color (Quiénes somos, Colegios) y pie en azul noche, rectas. Botones en píldora: azul noche sobre claro, blancos sobre
  azul noche.
- En celular igual: la foto arriba a todo lo ancho y el panel debajo.

Pruebas: `tests/portada-holcim.test.js`.
