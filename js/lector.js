// Lector de los libros (spec 2026-11-24-tienda-libros): las páginas viven en una carpeta privada de Supabase y solo se
// entregan a quien tiene el libro. Se dibujan en un lienzo con el nombre y el código del estudiante como marca de agua; no
// hay archivo que descargar, ni menú, ni impresión. Nada evita del todo una captura: la marca dice de quién salió.

const lectorRuta = (l, n) => `${l.id}/v${l.version}/${String(n).padStart(4, '0')}.webp`;
// Páginas que se dibujan: las visibles y una a cada lado. Pura.
const lectorCerca = (vis, total) => [...new Set(vis.flatMap(n => [n - 1, n, n + 1]))].filter(n => n >= 1 && n <= total).sort((a, b) => a - b);
let lector = null;

function lectorAtras() {
  if (!lector) return false;
  if ($('.lx-indice.on')) { $('.lx-indice').classList.remove('on'); return true; }
  lectorCerrar();
  return true;
}
function lectorCerrar() {
  if (!lector) return;
  lector.io.disconnect(); removeEventListener('resize', lector.talla); document.removeEventListener('keydown', lector.tecla, true);
  lector.urls.forEach(b => b.close?.());
  $('#lector')?.remove();
  document.body.classList.remove('leyendo');
  lector = null;
  const t = $('#tienda'); if (t) t.inert = false; else tiendaInerte(false);
}
async function openLector(id) {
  if (!Cuenta.sb || !Cuenta.user) return toast('Necesitas conexión para leer.');
  // La fila al día: si se cambió el PDF, las páginas están en otra carpeta.
  const fila = await Cuenta.sb.from('libros').select('*').eq('id', id).maybeSingle().then(x => x, () => ({}));
  if (fila.data) Tienda.libros = Tienda.libros.map(x => (x.id === id ? fila.data : x));
  const l = Tienda.libros.find(x => x.id === id);
  if (!l || !Cuenta.user) return toast('Necesitas conexión para leer.');
  if (!l.version || !l.paginas) return toast('Este libro aún no está disponible.');
  const mio = libroMio(id), total = mio ? l.paginas : Math.min(l.muestra, l.paginas);
  if (!total) return;
  lectorCerrar();
  const marca = `${(Cuenta.perfil || {}).nombre || ''}${Cuenta.codigo ? ` · ${muestraCodigo(Cuenta.codigo)}` : ''}`.trim() || 'Zuka';
  const el = document.createElement('div');
  el.id = 'lector'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', `Libro: ${l.titulo}`);
  el.innerHTML = `<header class="lx-bar"><button class="icon-btn" type="button" data-x="cerrar" aria-label="Cerrar el libro">${ICON.x}</button><h1 tabindex="-1">${esc(l.titulo)}</h1>
      <span class="lx-acc">${(l.indice || []).length && mio ? '<button class="btn sm ghost" type="button" data-x="indice">Índice</button>' : ''}<button class="icon-btn" type="button" data-x="menos" aria-label="Alejar">−</button><button class="icon-btn" type="button" data-x="mas" aria-label="Acercar">+</button></span></header>
    <div class="lx-hojas" tabindex="0" aria-label="Páginas">${Array.from({ length: total }, (_, i) => `<div class="lx-hoja" data-n="${i + 1}"><canvas aria-label="Página ${i + 1}" role="img"></canvas></div>`).join('')}
      ${mio ? '' : `<div class="lx-fin"><h2>Hasta aquí la muestra</h2><p>El libro completo tiene ${l.paginas} páginas.</p><button class="btn main brand" type="button" data-x="comprar">Ver precios</button></div>`}</div>
    <footer class="lx-pie"><label><span class="sr">Ir a la página</span><input type="number" min="1" max="${total}" inputmode="numeric" value="1"></label><span>de ${total}${mio ? '' : ' (muestra)'}</span></footer>
    ${(l.indice || []).length && mio ? `<nav class="lx-indice" aria-label="Índice"><ol>${l.indice.map(x => `<li style="--n:${Math.min(2, x.n || 0)}"><button type="button" data-ir="${x.p}">${esc(x.t)}<small>${x.p}</small></button></li>`).join('')}</ol></nav>` : ''}`;
  document.body.appendChild(el);
  document.body.classList.add('leyendo');
  const t = $('#tienda'); if (t) t.inert = true; else tiendaInerte(true);
  const cont = $('.lx-hojas', el), hojas = [...el.querySelectorAll('.lx-hoja')], input = $('.lx-pie input', el);
  const L = lector = { l, urls: new Map(), pidiendo: new Map(), vis: new Set(), zoom: 1, razon: 1.414, pag: 1 };
  const vivo = () => lector === L;

  // Cada página: se pide una vez, se dibuja al acercarse y se suelta al alejarse (un libro entero no cabe en memoria).
  const baja = n => {
    if (L.urls.has(n)) return Promise.resolve(L.urls.get(n));
    if (!L.pidiendo.has(n)) {
      L.pidiendo.set(n, Cuenta.sb.storage.from('libros').download(lectorRuta(l, n)).then(async ({ data, error }) => {
        if (error || !data) throw error || new Error('pagina');
        const bmp = await createImageBitmap(data);
        if (vivo()) { L.urls.set(n, bmp); L.razon = bmp.height / bmp.width; }
        return bmp;
      }).finally(() => L.pidiendo.delete(n)));
    }
    return L.pidiendo.get(n);
  };
  const dibuja = async n => {
    const h = hojas[n - 1], cv = $('canvas', h);
    if (!h || h.dataset.ok === String(cv.clientWidth)) return;
    let bmp;
    try { bmp = await baja(n); } catch (e) {
      if (vivo() && !$('.lx-mal', h)) {
        h.insertAdjacentHTML('beforeend', '<p class="lx-mal">No se pudo cargar la página. <button class="btn sm ghost" type="button">Reintentar</button></p>');
        $('.lx-mal button', h).onclick = () => { $('.lx-mal', h).remove(); dibuja(n); };
      }
      return;
    }
    if (!vivo() || !lectorCerca([...L.vis], total).includes(n)) return;
    const w = cv.clientWidth, px = Math.min(bmp.width, Math.round(w * Math.min(2, devicePixelRatio || 1)));
    h.style.setProperty('--r', bmp.height / bmp.width);
    cv.width = px; cv.height = Math.round(px * bmp.height / bmp.width);
    const g = cv.getContext('2d');
    g.drawImage(bmp, 0, 0, cv.width, cv.height);
    // Marca de agua en diagonal: se lee, pero no estorba.
    g.save(); g.globalAlpha = .07; g.fillStyle = '#0a1230'; g.font = `600 ${Math.round(px / 30)}px Jost, sans-serif`; g.textAlign = 'center';
    g.translate(cv.width / 2, cv.height / 2); g.rotate(-Math.PI / 6);
    for (let y = -cv.height; y <= cv.height; y += px / 4.5) g.fillText(`${marca}      ${marca}`, 0, y);
    g.restore();
    h.dataset.ok = String(w);
  };
  const ajusta = () => {
    const cerca = new Set(lectorCerca([...L.vis], total));
    cerca.forEach(dibuja);
    hojas.forEach((h, i) => { const n = i + 1; if (h.dataset.ok && !cerca.has(n)) { const c = $('canvas', h); c.width = c.height = 1; delete h.dataset.ok; } });
    [...L.urls.keys()].forEach(n => { if (!cerca.has(n)) { L.urls.get(n).close?.(); L.urls.delete(n); } });
  };
  L.io = new IntersectionObserver(es => {
    es.forEach(e => { const n = +e.target.dataset.n; e.isIntersecting ? L.vis.add(n) : L.vis.delete(n); });
    if (!L.vis.size) return;
    // La página que ocupa el centro de la pantalla.
    const b0 = cont.getBoundingClientRect(), medio = b0.top + b0.height / 2;
    L.pag = [...L.vis].sort((a, b) => { const c = n => { const r = hojas[n - 1].getBoundingClientRect(); return Math.abs((r.top + r.bottom) / 2 - medio); }; return c(a) - c(b); })[0];
    if (document.activeElement !== input) input.value = L.pag;
    if (mio) { S.libros = { ...S.libros, [id]: L.pag }; }
    ajusta();
  }, { root: cont, threshold: [0, .25, .5, .75] });
  const ir = n => { const k = Math.max(1, Math.min(total, n | 0)); hojas[k - 1].scrollIntoView({ block: 'start' }); };
  const zoom = k => {
    const antes = L.pag; L.zoom = Math.max(1, Math.min(2.5, Math.round((L.zoom + k) * 4) / 4));
    cont.style.setProperty('--z', L.zoom); hojas.forEach(h => delete h.dataset.ok); ir(antes); requestAnimationFrame(ajusta);
  };
  L.talla = () => { hojas.forEach(h => delete h.dataset.ok); ajusta(); };
  // Sin guardar, imprimir ni menú contextual sobre las páginas.
  L.tecla = e => {
    if ((e.ctrlKey || e.metaKey) && ['p', 's'].includes(e.key.toLowerCase())) { e.preventDefault(); e.stopPropagation(); toast('Este libro solo se lee en la app.'); }
    if (e.key === 'Escape' && !sheetIsOpen) { e.preventDefault(); e.stopPropagation(); lectorAtras(); }
  };
  document.addEventListener('keydown', L.tecla, true);
  addEventListener('resize', L.talla);
  el.oncontextmenu = e => e.preventDefault();
  el.ondragstart = e => e.preventDefault();
  const X = { cerrar: () => { save(); lectorCerrar(); }, menos: () => zoom(-.25), mas: () => zoom(.25), indice: () => $('.lx-indice', el).classList.toggle('on'), comprar: () => { lectorCerrar(); openTienda('libros'); } };
  el.querySelectorAll('[data-x]').forEach(b => { b.onclick = () => X[b.dataset.x](); });
  el.querySelectorAll('[data-ir]').forEach(b => { b.onclick = () => { $('.lx-indice', el).classList.remove('on'); ir(+b.dataset.ir); }; });
  input.onchange = () => { ir(+input.value); cont.focus({ preventScroll: true }); };
  hojas.forEach(h => L.io.observe(h));
  if (mio && (S.libros || {})[id] > 1) ir(S.libros[id]);
  $('h1', el).focus({ preventScroll: true });
}
