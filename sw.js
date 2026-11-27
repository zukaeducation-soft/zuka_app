// Service worker de Zuka: permite instalar la app y usarla sin conexión.
// Archivos propios: caché primero. Cada versión guarda todo su shell al instalarse, así la app abre al instante y
// siempre con archivos de una misma versión; lo nuevo llega con la versión siguiente (aviso «Actualizar» de
// js/update.js, o al volver a abrir la app). En localhost: red primero, para ver los cambios al programar
// (registrar «sw.js?cache» prueba ahí el modo de producción). Recursos externos (KaTeX, fuentes): caché primero.
// La narración (Bunny Storage, o media/voz de respaldo) va en su propia caché, que no se borra al cambiar de versión.
// Las librerías de CDN también (CDN_CACHE): sus direcciones llevan la versión, así que no cambian, y si el CDN falla
// justo al instalar una versión nueva la app no se queda sin juegos ni fórmulas.
// Spec: docs/superpowers/specs/2026-11-24-configuracion-rapida-segura.md

const VERSION = 'zuka-v419';
// Los scripts van en paquetes (js/paquetes, los arma tools/empaquetar.js con la lista de index.html). El nombre de cada
// uno lleva la huella de su contenido, así que nunca cambia: se guardan en su propia caché (PAQUETES), que no se borra
// al cambiar de versión, y una versión nueva solo baja los que no estaban. ARRANQUE es lo que la página pide al abrir;
// DIFERIDOS, los juegos y explicaciones de cada curso (js/carga.js los pide al abrir una lección): se guardan también al
// instalar, para que todo funcione sin conexión, pero si uno falla no detiene la instalación.
// <paquetes> Generado por tools/empaquetar.js: no editar a mano.
const ARRANQUE = ["js/paquetes/zuka-a1.07318a5149.js","js/paquetes/zuka-a2.4c948e2de9.js","js/paquetes/zuka-a3.41a60ce7f4.js","js/paquetes/zuka-a4.c761f4a53d.js","js/paquetes/zuka-a5.50fd6b2780.js","js/paquetes/zuka-a6.06d175312d.js"];
const DIFERIDOS = ["js/paquetes/zuka-comun.eac03cf57a.js","js/paquetes/zuka-algebra.e79a197add.js","js/paquetes/zuka-trig.ef6189aba1.js","js/paquetes/zuka-calc.9c117ef5fd.js","js/paquetes/zuka-geo.f8e61ed0aa.js","js/paquetes/zuka-euc.66840feb17.js","js/paquetes/zuka-preuda.41f33ad8b5.js","js/paquetes/zuka-preicfes.99180240e5.js"];
// </paquetes>
const PAQUETES = 'zuka-paquetes-v1';
const esPaquete = ruta => /\/js\/paquetes\/zuka-[\w-]+\.[0-9a-f]{10}\.js$/.test(ruta);
const SHELL = [
  './', 'index.html', 'manifest.json', 'css/styles.css', 'css/examen.css', 'css/explora.css', 'css/presentacion.css', 'css/clave.css', 'css/acceso.css', 'css/tienda.css', 'css/escritorio.css', 'css/tutorias.css', 'css/inicio.css', 'css/perfil.css',
  'js/paquetes/lista.js',
  'icons/zuka-claro-192.png', 'icons/zuka-claro-512.png', 'icons/zuka-claro-maskable-512.png', 'icons/zuka-claro-apple-180.png', 'icons/zuka-claro-favicon-48.png', 'icons/zuka-claro-favicon.svg',
  'brand/pago-breb.png', 'brand/libros/1.webp', 'brand/libros/2.webp', 'brand/libros/3.webp', 'brand/libros/4.webp', 'brand/logo-light.svg', 'brand/logo-dark.svg', 'brand/cerebro.svg',
];

// Librerías de CDN (minijuegos, fórmulas, reproductor) se precachean aparte: si el CDN falla no
// bloquean la instalación. Sin esto la primera visita no las guarda (el SW aún no controla la página).
const VOZ = 'zuka-voz-v2';
const CDN_CACHE = 'zuka-cdn-v1';
const VOZ_CDN = 'https://zukavoz.b-cdn.net';   // la misma dirección de EXPLORA_VOZ (js/explora.js)
const DEV = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:|$)/.test(self.location.origin) && !/[?&]cache\b/.test(self.location.search || '');
// «?sri»: dirección distinta de la que guardaron las versiones viejas, que pudieron guardar una copia opaca (sin CORS)
// que el navegador rechazaría al comprobar la huella «integrity» de index.html.
const P5_URL = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js?sri';
const CDN = [
  P5_URL,
  'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css?sri',
  'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js?sri',
  'https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.5.13/hls.min.js?sri',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js?sri',
  // Fuentes que katex.min.css pide para casi toda fórmula.
  ...['Main-Regular', 'Main-Bold', 'Main-Italic', 'Math-Italic', 'AMS-Regular', 'Size1-Regular', 'Size2-Regular']
    .map(f => `https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/fonts/KaTeX_${f}.woff2`),
];
// Con red lenta, al abrir la app no se espera más que esto si hay una copia guardada (la red sigue
// actualizando la copia por detrás). Solo para navegaciones: ver fromCache.
const NET_TIMEOUT = 3000;
// Un CDN que no contesta no debe retener la instalación (ni el aviso de versión nueva).
const CDN_TIMEOUT = 8000;
const wait = ms => new Promise(r => setTimeout(r, ms));

self.addEventListener('install', e => {
  // Del CDN solo se pide lo que falta: lo guardado sirve, también lo que dejó una versión anterior en su propia caché.
  // De los paquetes solo se baja el que no esté ya guardado (su nombre dice su contenido).
  const guarda = (c, u) => Promise.resolve(c.match(u)).then(hit => hit || c.add(u));
  const paquetes = caches.open(PAQUETES).then(c => Promise.all(ARRANQUE.map(u => guarda(c, u)))
    .then(() => Promise.all(DIFERIDOS.map(u => guarda(c, u).catch(() => {})))));
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => paquetes).then(() => caches.open(CDN_CACHE)).then(c => Promise.all(CDN.map(u =>
    Promise.resolve().then(() => c.match(u)).then(hit => hit || caches.match(u).then(vieja => (vieja && vieja.type !== 'opaque' ? c.put(u, vieja)
      : Promise.race([c.add(u), wait(CDN_TIMEOUT)])))).catch(() => {})))));
});

// Páginas que se abrieron desde la caché (por red lenta): sus scripts también salen de la caché,
// para no mezclar un index.html viejo con scripts nuevos (o al revés).
const fromCache = new Set();

// La versión nueva espera a que el usuario acepte el aviso en la app (js/update.js).
self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== VOZ && k !== CDN_CACHE && k !== PAQUETES).map(k => caches.delete(k))))
    // Los paquetes de versiones anteriores que esta ya no usa se sueltan; los que no cambiaron se quedan.
    .then(() => caches.open(PAQUETES)).then(c => Promise.resolve(c.keys()).then(ks => {
      const vivos = new Set(ARRANQUE.concat(DIFERIDOS).map(u => new URL(u, self.location.origin + '/').pathname));
      return Promise.all((ks || []).filter(k => !vivos.has(new URL(k.url).pathname)).map(k => c.delete(k)));
    })).catch(() => {})
    .then(() => self.clients.claim()));
});

// Llegó una lista nueva de una lección: se borran del celular sus audios y listas que ya no se usan.
async function podaVoz(c, url, res) {
  const dir = url.slice(0, url.lastIndexOf('/') + 1), vivos = new Set(Object.values(await res.json()).map(v => dir + v.f)).add(url);
  await Promise.all((await c.keys()).filter(k => k.url.startsWith(dir) && !vivos.has(k.url)).map(k => c.delete(k)));
}

self.addEventListener('fetch', e => {
  const req = e.request;
  // Los videos se piden por rangos (respuestas 206), que la caché no admite.
  if (req.method !== 'GET' || !req.url.startsWith('http') || req.headers.has('range')) return;
  const sameOrigin = new URL(req.url).origin === self.location.origin;
  // Narración de las explicaciones: se guarda al oírla y luego suena sin conexión. En Bunny todo es inmutable (el nombre
  // sale del contenido); en la copia propia (media/voz) solo la lista voz.json se refresca por detrás.
  const enBunny = new URL(req.url).origin === VOZ_CDN;
  if (!DEV && (enBunny || (sameOrigin && /\/media\/voz\//.test(new URL(req.url).pathname)))) {
    const lista = /\.json$/.test(new URL(req.url).pathname);
    const res = caches.open(VOZ).then(c => c.match(req).then(hit => {
      if (hit && (enBunny || !lista)) return { hit };
      const net = fetch(req);
      const guarda = net.then(r => {
        if (r.status !== 200) return null;
        const copia = r.clone(), otra = lista && enBunny ? r.clone() : null;
        // Primero se poda (hace sitio) y luego se guarda.
        return Promise.resolve(otra && podaVoz(c, req.url, otra)).catch(() => {}).then(() => c.put(req, copia));
      }).catch(() => {});   // sin espacio en el celular: suena igual, solo que no queda guardada
      return { hit, net, guarda };
    }));
    e.respondWith(res.then(r => r.hit || r.net));
    e.waitUntil(res.then(r => r.guarda).catch(() => {}));   // sigue viva aunque ya se haya respondido
    return;
  }
  // Los videos propios pesan varios MB: se sirven de la red y nunca se guardan.
  if (sameOrigin && /\/media\//.test(new URL(req.url).pathname)) return;
  // El panel /admin y lo de instituciones son solo con conexión: no pasan por la caché.
  if (sameOrigin && /\/(admin|instituciones)(\/|$)/.test(new URL(req.url).pathname)) return;
  // YouTube maneja su propia caché; guardar su API dejaría una versión vieja. Supabase (cuenta, plan,
  // progreso) siempre va a la red: una respuesta guardada mostraría un plan viejo.
  if (/youtube|ytimg|googlevideo|b-cdn\.net|mediadelivery\.net|supabase\.co/.test(new URL(req.url).hostname)) return;

  // Producción: la copia de esta versión, sin tocar la red. Solo lo que no esté guardado se pide (y se guarda).
  if (sameOrigin && !DEV) {
    const navigate = req.mode === 'navigate';
    e.respondWith(caches.open(esPaquete(new URL(req.url).pathname) ? PAQUETES : VERSION).then(c => c.match(req, { ignoreSearch: true })
      .then(hit => hit || (navigate ? c.match('index.html') : null))
      .then(hit => hit || fetch(req).then(res => { if (res.ok) c.put(req, res.clone()); return res; }))
      .catch(() => Response.error())));
    return;
  }

  if (sameOrigin) {
    const navigate = req.mode === 'navigate';
    const cached = () => caches.match(req, { ignoreSearch: true })
      .then(hit => hit || (navigate ? caches.match('index.html') : null));
    // Página abierta desde la caché: todo lo suyo también (red solo si falta la copia).
    if (!navigate && e.clientId && fromCache.has(e.clientId)) {
      e.respondWith(cached().then(hit => hit || fetch(req)).catch(() => Response.error()));
      return;
    }
    // Red primero (para recibir lo nuevo). Un error del servidor (404/500) cede a la copia buena.
    const net = fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
      return res;
    });
    const fromNet = net.then(
      res => (res.ok || res.type === 'opaqueredirect' ? res : cached().then(hit => hit || res)),
      () => cached().then(hit => hit || Response.error()));
    e.waitUntil(net.catch(() => {}));
    if (!navigate) { e.respondWith(fromNet); return; }
    // Al abrir la app con red lenta: si la red tarda más de NET_TIMEOUT y hay copia, la copia.
    e.respondWith(new Promise(resolve => {
      let done = false;
      const finish = r => { if (!done && r) { done = true; resolve(r); } };
      const timer = setTimeout(() => cached().then(hit => {
        if (hit && !done && e.resultingClientId) fromCache.add(e.resultingClientId);
        finish(hit);
      }), NET_TIMEOUT);
      fromNet.then(res => { clearTimeout(timer); finish(res); });
    }));
    return;
  }

  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    // En la caché del CDN, que no se vacía sola, solo entran copias comprobables (no las opacas). Si la lista CDN cambia
    // de versiones, subir CDN_CACHE para soltar las viejas.
    const cdn = CDN.includes(req.url);
    if (res.ok || (res.type === 'opaque' && !cdn)) { const copy = res.clone(); caches.open(cdn ? CDN_CACHE : VERSION).then(c => c.put(req, copy)); }
    return res;
  })));
});
