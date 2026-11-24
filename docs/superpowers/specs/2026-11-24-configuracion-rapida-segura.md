# Configuración: rápida, segura, estable (2026-11-24)

Pedido del usuario: «configura el proyecto de la mejor forma para que sea muy rápida, segura, estable y confiable, eficiente».
Pruebas: `tests/configuracion.test.js` (y `tests/pwa.test.js`, `tests/sw.test.js`, que siguen valiendo para el modo local).

## Qué se encontró

- La app carga unos 720 archivos propios y el service worker los pedía **primero a la red** en cada apertura.
- Vercel servía todo sin cabeceras de seguridad propias y publicaba también `video/`, `docs/`, `tests/`, `tools/` y
  `supabase/` (1683 de 2442 archivos que no son la app).
- Las librerías de los CDN (KaTeX, hls.js, supabase-js, p5.js) se ejecutaban sin comprobar su contenido.
- La narración de Explora (`media/voz/`) no se guardaba: no sonaba sin conexión.
- Supabase (proyecto `zuka`): sin avisos graves. Quedan dos avisos menores que decide el usuario (ver «Pendiente»).

## Qué se hizo

1. **Service worker, caché primero en producción** (`sw.js`). Cada versión guarda su shell completo al instalarse y lo
   sirve sin tocar la red: la app abre al instante y siempre con archivos de una misma versión. Lo nuevo llega con la
   versión siguiente (aviso «Actualizar», o al volver a abrir la app). Medido en local con `tools/servir.js`: una
   recarga pasa de ~720 peticiones al servidor a 1 (la revisión de `sw.js`), y la app abre con el servidor apagado.
   - En `localhost` sigue **red primero** (se ven los cambios al programar). El modo de producción se prueba en
     `http://zuka.localhost:5199` (cualquier nombre que no sea `localhost` exacto) o registrando `sw.js?cache`.
   - **Consecuencia: sin subir `VERSION` un cambio no le llega a nadie.** La prueba compara con `origin/main` y falla
     si cambió un archivo del shell y `VERSION` no.
2. **Narración en su propia caché** (`zuka-voz-v1`), que no se borra al cambiar de versión: el audio (nombre = huella)
   sale de la copia; `voz.json` sale de la copia y se refresca por detrás.
3. **Cabeceras en `vercel.json`**: política de contenido (CSP) sin `unsafe-inline` ni `unsafe-eval` en scripts (los
   tres scripts en línea van por su huella sha256), `nosniff`, `X-Frame-Options`, `Referrer-Policy` (Bunny necesita el
   origen), `Permissions-Policy`, y caché de un año para los audios de voz. **Si se cambia un script en línea de
   `index.html` o `admin/index.html`, la prueba dice qué huella poner en `vercel.json`.** Un servidor nuevo (otro CDN,
   otra biblioteca de video) se añade a la directiva que toque; la prueba revisa los que hoy usa la app.
4. **Huella (SRI) y `crossorigin` en las librerías de CDN**, en las páginas y en los cargadores de `js/player.js` y
   `js/games/kit.js`. Sus direcciones llevan `?sri` para no chocar con copias opacas que una versión vieja del service
   worker pudiera tener guardadas. Cambiar de versión de una librería = recalcular su huella
   (`curl -s <url> | openssl dgst -sha384 -binary | openssl base64 -A`).
5. **`.vercelignore`**: no se publican `video/`, `docs/`, `tests/`, `tools/`, `supabase/`, `.impeccable/` ni los `.md`
   de la raíz.
6. **`node tools/servir.js [puerto]`** (vista previa «zuka-vercel», 5199): sirve la app con las cabeceras de
   `vercel.json` y sin lo ignorado, para probar la política antes de subir.

## Lo que no se hizo (y por qué)

- **Unir y minificar el código** y **cargar cada curso al abrirlo**: son los cambios que más ayudarían a la primera
  visita, pero tocan el orden de carga de 700 archivos y necesitan un paso de construcción en Vercel. Con caché primero
  solo pesan la primera vez.
- **Mover los audios a Supabase o Bunny**: no hace falta con ~1 MB por lección; `EXPLORA_VOZ` permite cambiarlo en una
  línea cuando haya decenas de lecciones narradas.

## Pendiente (decide el usuario, en el panel de Supabase)

- Activar «Leaked password protection» (Auth → contraseñas filtradas).
- Las funciones viejas `add_xp`, `merge_xp`, `reset_progress` y `delete_account` (tablas en inglés que ya no se usan)
  siguen abiertas a usuarios con sesión; quitarles `EXECUTE` o borrarlas.
