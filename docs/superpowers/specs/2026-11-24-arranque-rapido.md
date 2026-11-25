# Arranque rápido: los scripts en paquetes

Fecha: 2026-11-24. Pedido del usuario: «la app se está demorando mucho en iniciar, tanto en móvil como en PC, sobre todo en PC».

## Qué pasaba

`index.html` cargaba **755 scripts sueltos** (6 MB): 3 librerías y 752 archivos propios (590 juegos, 51 cursos…).

- Con la app ya guardada, cada archivo pasaba por el service worker y una búsqueda en la caché: 755 búsquedas. Medido en
  este equipo, sirviendo como Vercel (`zuka.localhost`): la página quedaba lista a los **3.75 s**.
- En la primera visita eran 755 pedidos a la red, y al instalarse el service worker volvía a bajarlos todos; si uno solo
  fallaba, la versión no se instalaba.
- La hoja de letras de Google frenaba el primer pintado (unos 200 ms; si Google tardaba, toda la app esperaba).

## Qué se hizo

1. **Paquetes.** `node tools/empaquetar.js` junta los 752 archivos propios, en el orden de `index.html`, en cuatro archivos
   `js/paquetes/zuka-1.js … zuka-4.js` (1.6 MB cada uno). Son scripts clásicos que comparten el ámbito global, así que
   pegarlos en orden equivale a cargarlos en orden. Cada archivo va tras un `;` y un rótulo `//#archivo js/…`.
2. **`index.html`.** La lista de `<script defer src>` sigue ahí, pero dentro de `<template id="fuentes">` (no se carga
   sola): es la fuente del orden y lo que leen las pruebas. Un cargador al final del `<body>`:
   - en `localhost` / `127.0.0.1` carga los archivos sueltos (se programa igual que antes, sin empaquetar);
   - publicada (o con `?paquetes`, o en `zuka.localhost`) carga las tres librerías y los cuatro paquetes, en orden
     (`async = false`).
   El script del `<head>` pide los paquetes desde el principio (`<link rel="preload">`) y pone la hoja de letras de Google
   sin frenar el pintado. Si un paquete no llega, sale «No se pudo cargar Zuka» con «Reintentar» en vez de una pantalla vacía.
3. **Service worker.** El `SHELL` pasa de unos 790 archivos a 30 (página, estilos, los cuatro paquetes, iconos): se instala
   en un momento y abre con cuatro lecturas de caché.

Resultado medido igual que antes: página lista a **≈ 0.95 s** (los scripts llegan en 45 ms; el resto es ejecutar 6 MB de
JavaScript, ≈ 0.45 s, y pintar).

## Reglas

- Después de cambiar cualquier archivo de `js/` y antes de subir: `node tools/empaquetar.js` (y subir `VERSION`).
  `tests/paquetes.test.js` falla si los paquetes quedaron viejos.
- Un script nuevo se registra como siempre: su etiqueta en la plantilla de `index.html`. Ya no va en el `SHELL`.
- En las pruebas, «viene con la app» se comprueba con `require('./load').shell()` (sw.js + las rutas de los paquetes).
- Ningún archivo puede empezar con `'use strict'` (cambiaría el modo de todo el paquete).
- Si dos sesiones tocan `js/` a la vez, los paquetes chocan al mezclar: se resuelve corriendo de nuevo la herramienta.

## Lo que queda por hacer (no hecho)

- Ejecutar los 6 MB sigue costando ≈ 0.45 s en PC (más en un celular modesto). El siguiente paso sería cargar los juegos
  y los cursos solo cuando se abren (hoy todo se ejecuta al inicio).
- (Hecho el mismo día, a pedido del usuario) Se quitó la animación de entrada, que retenía la portada 2.7 s la primera
  vez de cada sesión: la portada `#boot` va vacía y se va apenas la app pintó.
