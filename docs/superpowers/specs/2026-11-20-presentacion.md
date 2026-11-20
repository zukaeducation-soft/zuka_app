# Página de presentación en la web (2026-11-20)

El usuario pasó la portada de Brilliant (brilliant.org) como referencia: quien abre Zuka en el navegador y todavía no la
tiene instalada debe ver primero una página que cuente quiénes somos, con el botón para iniciar sesión arriba.

## Cuándo sale

`presentacionToca({ standalone, user, guest, query })` (pura, `js/presentacion.js`):

- `?presentacion` en la dirección → siempre (para revisarla); `?app` → nunca.
- Instalada (pantalla completa, `isStandalone()`) → no: la app abre directo como hasta hoy.
- Con sesión (aunque sea la guardada sin conexión) → no.
- Si ya eligió «Explorar sin cuenta» (`S.guest`) → no.
- En todo otro caso, sí. Reemplaza a la pantalla de entrada al arrancar; la de entrada se abre desde la presentación.

## Qué tiene (como la de Brilliant, adaptada)

1. **Barra fija arriba**: logo de Zuka y «Iniciar sesión»; al bajar aparece también «Empieza gratis».
2. **Portada**: el personaje, titular grande con dos palabras resaltadas en el acento («Matemáticas que se *entienden*,
   ejercicios que se *juegan*»), una frase y dos botones: «Empieza gratis» (crear cuenta) y «Ya tengo cuenta».
   Debajo, tres sellos cortos (gratis para empezar, en español, en tu celular).
3. **Abanico de cursos**: una tarjeta por curso visible (`cursosVisibles()`), con su figura, color, nombre y número de
   lecciones.
4. **Quiénes somos**: qué es Zuka y para quién, sin cifras ni testimonios inventados.
5. **Cómo se aprende**: cuatro bloques alternos texto + dibujo: primero la intuición (video corto), ejercicios que se
   juegan (se arrastra, la escena reacciona), el gimnasio cerebral por niveles (la mancuerna) y tutorías.
6. **Temas por curso**: pestañas con los cursos; cada una lista sus mundos como fichas («Lo que cubre»).
7. **Instálala**: botón «Instalar Zuka» si el navegador lo ofrece; si no, la ayuda de `installHelp()`.
8. **Cierre**: «Tu mente, más fuerte cada día» + «Empieza gratis»; pie con «Explorar sin cuenta» y © Zuka.

## Comportamiento

- «Iniciar sesión» / «Ya tengo cuenta» → pantalla de entrada en modo login; «Empieza gratis» → modo registro. La
  pantalla de entrada muestra «Volver» (solo si se llegó desde la presentación) y vuelve a ella.
- «Explorar sin cuenta» → `S.guest = true` y entra a la app (como el botón de la pantalla de entrada).
- Sin Supabase (no cargó), los botones de cuenta entran a la app sin guardar nada.
- Siempre dentro de los dos temas (variables del tema), a 300–380 px sin desplazamiento lateral; estilos en
  `css/presentacion.css`. Animaciones suaves al entrar cada bloque; nada con «reducir movimiento».

Pruebas: `tests/presentacion.test.js`.
