// Explora · ilustraciones realistas para Ciencias, Sociales e Inglés (spec 2026-11-28-preicfes-paso-a-paso). Piezas SVG con luz,
// sombra y volumen (vidrio, líquidos, madera, papel viejo, metal) para dibujar experimentos y escenas «como en una foto» dentro de la
// escena `dibujo` (ancho 340). Todo va dentro de un marco con su propio fondo (`XLAB.foto`), como una fotografía: por eso sus colores
// son fijos y se ven igual en tema claro y oscuro; los rótulos sobre la foto van en placas (`XLAB.rot`).
//   dib: (v, K) => XLAB.foto(XLAB.vaso(110, 160, 60, 80, v.n, 'agua') + XLAB.rot(110, 186, 'con sal'), 200, 'lab')
// Va después de explora-escenas.js.
const XLAB = (() => {
  const n = x => Math.round(x * 100) / 100;
  const LIQ = { agua: ['#9fd8f5', '#4aa3d8'], te: ['#e0a560', '#9a5a1e'], leche: ['#ffffff', '#e4e0d6'], rojo: ['#f4877d', '#c0392b'],
    azul: ['#7aa7ff', '#2949b8'], verde: ['#9be08a', '#3e9b35'], morado: ['#c79bf0', '#6c3aa8'], aceite: ['#ffe27a', '#d6a419'],
    turbio: ['#c9b48c', '#8a7350'], cafe: ['#a0703f', '#4b2b12'] };
  const id = 'xlb';
  const DEFS = `<defs>
    <linearGradient id="${id}-vidrio" x1="0" x2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".55"/><stop offset=".18" stop-color="#e8f4fb" stop-opacity=".18"/><stop offset=".75" stop-color="#e8f4fb" stop-opacity=".1"/><stop offset="1" stop-color="#ffffff" stop-opacity=".45"/></linearGradient>
    <linearGradient id="${id}-pared" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dfe6ea"/><stop offset="1" stop-color="#b9c4cb"/></linearGradient>
    <linearGradient id="${id}-mesa" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a5764a"/><stop offset=".12" stop-color="#8a5a30"/><stop offset="1" stop-color="#5e3a1c"/></linearGradient>
    <linearGradient id="${id}-cielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fb8e6"/><stop offset="1" stop-color="#d6ecf7"/></linearGradient>
    <linearGradient id="${id}-pasto" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fae4a"/><stop offset="1" stop-color="#4b7a2a"/></linearGradient>
    <linearGradient id="${id}-papel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3e6c4"/><stop offset=".6" stop-color="#e8d5a6"/><stop offset="1" stop-color="#cfb27a"/></linearGradient>
    <linearGradient id="${id}-metal" x1="0" x2="1"><stop offset="0" stop-color="#8d969c"/><stop offset=".45" stop-color="#e9eef0"/><stop offset="1" stop-color="#6f787e"/></linearGradient>
    <linearGradient id="${id}-llama" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#2f6bff"/><stop offset=".35" stop-color="#ffd23f"/><stop offset="1" stop-color="#ff6a1a" stop-opacity=".2"/></linearGradient>
    <linearGradient id="${id}-hoja" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8fd16a"/><stop offset="1" stop-color="#2f7d2a"/></linearGradient>
    <linearGradient id="${id}-seca" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e3c35a"/><stop offset="1" stop-color="#9c7a22"/></linearGradient>
    <linearGradient id="${id}-barro" x1="0" x2="1"><stop offset="0" stop-color="#b4552e"/><stop offset=".5" stop-color="#d9754a"/><stop offset="1" stop-color="#8f3f1f"/></linearGradient>
    <linearGradient id="${id}-ladrillo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9e2d4"/><stop offset="1" stop-color="#c8bca6"/></linearGradient>
    <radialGradient id="${id}-sol"><stop offset="0" stop-color="#fff7c2"/><stop offset=".55" stop-color="#ffd84a"/><stop offset="1" stop-color="#ffb020" stop-opacity="0"/></radialGradient>
    <radialGradient id="${id}-luz"><stop offset="0" stop-color="#fffbe0"/><stop offset=".5" stop-color="#ffe680" stop-opacity=".8"/><stop offset="1" stop-color="#ffe680" stop-opacity="0"/></radialGradient>
    <radialGradient id="${id}-celula" cx=".4" cy=".35"><stop offset="0" stop-color="#fbe7f0"/><stop offset="1" stop-color="#e7a9c4"/></radialGradient>
    <radialGradient id="${id}-cel-v" cx=".4" cy=".35"><stop offset="0" stop-color="#e6f7d6"/><stop offset="1" stop-color="#a9d98a"/></radialGradient>
    <radialGradient id="${id}-nucleo" cx=".35" cy=".35"><stop offset="0" stop-color="#b98be0"/><stop offset="1" stop-color="#6a3c9a"/></radialGradient>
    <radialGradient id="${id}-piel" cx=".4" cy=".35"><stop offset="0" stop-color="#e9b48c"/><stop offset="1" stop-color="#a86b45"/></radialGradient>
    <filter id="${id}-sombra" x="-20%" y="-20%" width="140%" height="160%"><feGaussianBlur stdDeviation="2.2"/></filter>
  </defs>`;
  const g = (s, extra = '') => `<g ${extra}>${s}</g>`;
  const sombra = (x, y, w) => `<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(w / 2)}" ry="${n(Math.max(2, w / 12))}" fill="#000" opacity=".28" filter="url(#${id}-sombra)"/>`;
  const L = (x1, y1, x2, y2, c = '#333', w = 1.2, extra = '') => `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" stroke="${c}" stroke-width="${w}" ${extra}/>`;
  const T = (x, y, s, c = '#1d2328', tam = 11, a = 'middle', peso = 600) => `<text x="${n(x)}" y="${n(y)}" fill="${c}" font-size="${tam}" font-weight="${peso}" style="text-anchor:${a};font-family:Jost,system-ui,sans-serif">${s}</text>`;
  const liq = k => LIQ[k] || LIQ.agua;
  const lg = (k, x1 = 0, y1 = 0, x2 = 0, y2 = 1) => { const [a, b] = liq(k); return `<linearGradient id="${id}-l-${k}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`; };
  const LDEFS = `<defs>${Object.keys(LIQ).map(k => lg(k)).join('')}</defs>`;

  const X = {
    LIQ: Object.keys(LIQ),
    // Marco de foto: fondo 'lab' (pared y mesa), 'campo', 'ciudad', 'papel', 'mesa', 'noche' o 'agua'. H = alto del dibujo.
    foto(cuerpo, H = 200, fondo = 'lab', yMesa = H - 34) {
      let f = '';
      if (fondo === 'lab' || fondo === 'mesa') {
        f = `<rect x="0" y="0" width="340" height="${H}" fill="url(#${id}-pared)"/>`;
        if (fondo === 'lab') for (let y = 18; y < yMesa - 10; y += 22) f += L(0, y, 340, y, '#ffffff', 0.6, 'opacity=".35"') + L(0, y + 1, 340, y + 1, '#8e9aa2', 0.5, 'opacity=".25"');
        f += `<rect x="0" y="${n(yMesa)}" width="340" height="${n(H - yMesa)}" fill="url(#${id}-mesa)"/>` + L(0, yMesa, 340, yMesa, '#c79a6a', 1.5);
        for (let k = 0; k < 6; k++) f += `<path d="M0 ${n(yMesa + 8 + k * 5)} Q170 ${n(yMesa + 5 + k * 6)} 340 ${n(yMesa + 9 + k * 5)}" stroke="#4a2c12" stroke-width=".5" fill="none" opacity=".35"/>`;
      } else if (fondo === 'campo') {
        f = `<rect width="340" height="${H}" fill="url(#${id}-cielo)"/><path d="M0 ${n(yMesa - 30)} Q60 ${n(yMesa - 70)} 130 ${n(yMesa - 40)} T260 ${n(yMesa - 50)} T340 ${n(yMesa - 34)} V${H} H0Z" fill="#8fae9a" opacity=".7"/>` +
          `<rect x="0" y="${n(yMesa)}" width="340" height="${n(H - yMesa)}" fill="url(#${id}-pasto)"/>`;
      } else if (fondo === 'ciudad') {
        f = `<rect width="340" height="${H}" fill="url(#${id}-cielo)"/>`;
        [[0, 60, 70], [52, 40, 100], [86, 54, 58], [150, 46, 90], [204, 70, 64], [262, 40, 110], [300, 50, 76]].forEach(([x, w, h]) => {
          f += `<rect x="${x}" y="${n(yMesa - h)}" width="${w}" height="${h}" fill="#8796a3"/>`;
          for (let yy = yMesa - h + 8; yy < yMesa - 8; yy += 12) for (let xx = x + 6; xx < x + w - 6; xx += 10) f += `<rect x="${xx}" y="${n(yy)}" width="5" height="6" fill="#d9e4ec" opacity=".75"/>`;
        });
        f += `<rect x="0" y="${n(yMesa)}" width="340" height="${n(H - yMesa)}" fill="#6f7479"/>` + L(0, yMesa + (H - yMesa) / 2, 340, yMesa + (H - yMesa) / 2, '#f2f2f2', 2, 'stroke-dasharray="14 10"');
      } else if (fondo === 'papel') {
        f = `<rect width="340" height="${H}" fill="#5b4a36"/>`;
      } else if (fondo === 'noche') {
        f = `<rect width="340" height="${H}" fill="#121a2b"/>` + [[30, 20], [90, 44], [150, 16], [220, 36], [290, 22], [318, 60], [60, 70]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.2" fill="#fff" opacity=".8"/>`).join('');
      } else if (fondo === 'agua') {
        f = `<rect width="340" height="${H}" fill="#2a6f97"/><rect width="340" height="${n(H * 0.25)}" fill="#5fa8d3" opacity=".6"/>`;
      }
      return `<g class="xlab">${DEFS}${LDEFS}<clipPath id="${id}-marco-${H}"><rect x="1" y="1" width="338" height="${H - 2}" rx="10"/></clipPath>` +
        `<g clip-path="url(#${id}-marco-${H})">${f}${cuerpo}</g><rect x="1" y="1" width="338" height="${H - 2}" rx="10" fill="none" stroke="#000" stroke-opacity=".25"/></g>`;
    },
    // Placa con texto (rótulo sobre la foto).
    rot(x, y, s, tono = 'claro') {
      const w = Math.max(26, String(s).replace(/<[^>]+>/g, '').length * 6.4 + 14), osc = tono === 'oscuro';
      return `<rect x="${n(x - w / 2)}" y="${n(y - 12)}" width="${n(w)}" height="17" rx="8.5" fill="${osc ? '#1d2328' : '#ffffff'}" fill-opacity=".92" stroke="#000" stroke-opacity=".15"/>` + T(x, y + 1, s, osc ? '#ffffff' : '#1d2328', 11);
    },
    // Flecha sobre la foto.
    flecha(x1, y1, x2, y2, c = '#ffffff') {
      const a = Math.atan2(y2 - y1, x2 - x1), q = d => `${n(x2 - 9 * Math.cos(a + d))} ${n(y2 - 9 * Math.sin(a + d))}`;
      return L(x1, y1, x2, y2, '#000', 3.6, 'opacity=".35" stroke-linecap="round"') + L(x1, y1, x2, y2, c, 2, 'stroke-linecap="round"') + `<path d="M${q(0.45)} L${n(x2)} ${n(y2)} L${q(-0.45)}" stroke="${c}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    },
    // Vaso de precipitado: base en (x, y), ancho w, alto h, nivel 0 a 1. o: { hielo, burbujas, marcas, solido (0 a 1, al fondo) }.
    vaso(x, y, w, h, nivel = 0.5, k = 'agua', o = {}) {
      const x0 = x - w / 2, top = y - h, ly = y - 3 - (h - 10) * Math.max(0, Math.min(1, nivel));
      let s = sombra(x, y + 1, w * 1.05);
      if (nivel > 0.01) s += `<path d="M${n(x0 + 3)} ${n(ly)} H${n(x0 + w - 3)} V${n(y - 4)} Q${n(x0 + w - 3)} ${n(y - 1)} ${n(x0 + w - 6)} ${n(y - 1)} H${n(x0 + 6)} Q${n(x0 + 3)} ${n(y - 1)} ${n(x0 + 3)} ${n(y - 4)}Z" fill="url(#${id}-l-${k})" opacity=".88"/>` +
        `<ellipse cx="${n(x)}" cy="${n(ly)}" rx="${n(w / 2 - 3)}" ry="2.4" fill="#ffffff" opacity=".45"/>`;
      if (o.solido) s += `<path d="M${n(x0 + 4)} ${n(y - 2)} Q${n(x)} ${n(y - 2 - 14 * o.solido)} ${n(x0 + w - 4)} ${n(y - 2)}Z" fill="#f4f1ea" stroke="#bdb6a6" stroke-width=".6"/>`;
      for (let i = 0; i < (o.hielo || 0); i++) s += X.hielo(x0 + 12 + (i % 3) * (w - 24) / 2, ly - 2 + Math.floor(i / 3) * 9, 13, (i * 23) % 30 - 15);
      for (let i = 0; i < (o.burbujas || 0); i++) s += `<circle cx="${n(x0 + 8 + ((i * 37) % (w - 16)))}" cy="${n(y - 8 - ((i * 53) % Math.max(4, y - ly - 10)))}" r="${1.4 + (i % 3) * 0.7}" fill="none" stroke="#ffffff" stroke-width=".9" opacity=".85"/>`;
      s += `<path d="M${n(x0 - 3)} ${n(top)} Q${n(x0)} ${n(top)} ${n(x0)} ${n(top + 4)} V${n(y - 4)} Q${n(x0)} ${n(y)} ${n(x0 + 4)} ${n(y)} H${n(x0 + w - 4)} Q${n(x0 + w)} ${n(y)} ${n(x0 + w)} ${n(y - 4)} V${n(top)}" fill="url(#${id}-vidrio)" stroke="#5d7684" stroke-width="1.3" stroke-opacity=".8"/>`;
      if (o.marcas !== false) for (let k = 1; k <= 4; k++) { const yy = y - 3 - (h - 10) * k / 5; s += L(x0 + w - 13, yy, x0 + w - 3, yy, '#ffffff', 1, 'opacity=".8"'); }
      s += L(x0 + 4, top + 8, x0 + 4, y - 8, '#ffffff', 2.2, 'opacity=".6" stroke-linecap="round"');
      return g(s);
    },
    // Tubo de ensayo vertical en (x, y = fondo), alto h.
    tubo(x, y, h = 70, nivel = 0.4, k = 'agua', o = {}) {
      const r = o.r || 8, top = y - h, ly = y - (h - r) * nivel;
      let s = '';
      if (nivel > 0.01) s += `<path d="M${n(x - r + 1.5)} ${n(ly)} V${n(y - r)} A${r - 1.5} ${r - 1.5} 0 0 0 ${n(x + r - 1.5)} ${n(y - r)} V${n(ly)}Z" fill="url(#${id}-l-${k})" opacity=".9"/>`;
      s += `<path d="M${n(x - r)} ${n(top)} V${n(y - r)} A${r} ${r} 0 0 0 ${n(x + r)} ${n(y - r)} V${n(top)}" fill="url(#${id}-vidrio)" stroke="#5d7684" stroke-width="1.2"/>` +
        `<rect x="${n(x - r - 2)}" y="${n(top - 3)}" width="${n(2 * r + 4)}" height="4" rx="2" fill="#dfe9ef" stroke="#5d7684" stroke-width=".8"/>` + L(x - r + 2.5, top + 6, x - r + 2.5, y - r - 2, '#fff', 1.6, 'opacity=".6"');
      for (let i = 0; i < (o.burbujas || 0); i++) s += `<circle cx="${n(x - 3 + (i * 5) % 7)}" cy="${n(y - 8 - i * 7)}" r="1.5" fill="none" stroke="#fff" stroke-width=".8"/>`;
      return g(s);
    },
    // Gradilla con tubos: lista de [nivel, líquido].
    gradilla(x, y, tubos) {
      const w = tubos.length * 26 + 16;
      let s = sombra(x, y + 1, w);
      tubos.forEach(([nv, k], i) => { s += X.tubo(x - w / 2 + 21 + i * 26, y - 6, 62, nv, k); });
      s += `<rect x="${n(x - w / 2)}" y="${n(y - 34)}" width="${n(w)}" height="7" rx="2" fill="#c9965f" stroke="#7a5229" stroke-width=".8"/><rect x="${n(x - w / 2)}" y="${n(y - 7)}" width="${n(w)}" height="7" rx="2" fill="#b07d48" stroke="#7a5229" stroke-width=".8"/>`;
      return g(s);
    },
    // Probeta graduada en (x, y = base).
    probeta(x, y, h = 120, nivel = 0.5, k = 'agua', et = '') {
      const w = 22, top = y - h, ly = y - 8 - (h - 16) * nivel;
      let s = sombra(x, y + 1, 40) + `<path d="M${n(x - 20)} ${n(y)} H${n(x + 20)} L${n(x + 14)} ${n(y - 6)} H${n(x - 14)}Z" fill="#dfe9ef" stroke="#5d7684"/>`;
      if (nivel > 0.01) s += `<path d="M${n(x - w / 2 + 2)} ${n(ly + 2)} Q${n(x)} ${n(ly + 5)} ${n(x + w / 2 - 2)} ${n(ly + 2)} V${n(y - 7)} H${n(x - w / 2 + 2)}Z" fill="url(#${id}-l-${k})" opacity=".9"/>`;
      s += `<rect x="${n(x - w / 2)}" y="${n(top)}" width="${w}" height="${n(h - 6)}" fill="url(#${id}-vidrio)" stroke="#5d7684" stroke-width="1.2"/>`;
      for (let i = 1; i < 10; i++) { const yy = y - 8 - (h - 16) * i / 10; s += L(x - w / 2, yy, x - w / 2 + (i % 5 ? 5 : 9), yy, '#33424b', 0.8); }
      if (et) s += X.rot(x + 34, ly + 4, et);
      return g(s);
    },
    // Erlenmeyer en (x, y = base), tamaño s (≈ 1).
    matraz(x, y, s = 1, nivel = 0.4, k = 'agua', o = {}) {
      const w = 70 * s, h = 86 * s, cu = 12 * s, top = y - h, hb = h * 0.62, ly = y - 3 - hb * nivel;
      const ancho = yy => (yy > y - hb ? cu / 2 + (w / 2 - cu / 2) * (1 - (y - yy) / hb) : cu / 2);
      let q = sombra(x, y + 1, w);
      if (nivel > 0.01) q += `<path d="M${n(x - ancho(ly) + 2)} ${n(ly)} H${n(x + ancho(ly) - 2)} L${n(x + w / 2 - 3)} ${n(y - 3)} H${n(x - w / 2 + 3)}Z" fill="url(#${id}-l-${k})" opacity=".88"/>`;
      for (let i = 0; i < (o.burbujas || 0); i++) q += `<circle cx="${n(x - w / 4 + (i * 13) % (w / 2))}" cy="${n(y - 6 - (i * 9) % Math.max(4, y - ly - 8))}" r="1.6" fill="none" stroke="#fff" stroke-width=".9"/>`;
      q += `<path d="M${n(x - cu / 2)} ${n(top)} V${n(y - hb)} L${n(x - w / 2)} ${n(y - 3)} Q${n(x - w / 2)} ${n(y)} ${n(x - w / 2 + 4)} ${n(y)} H${n(x + w / 2 - 4)} Q${n(x + w / 2)} ${n(y)} ${n(x + w / 2)} ${n(y - 3)} L${n(x + cu / 2)} ${n(y - hb)} V${n(top)}" fill="url(#${id}-vidrio)" stroke="#5d7684" stroke-width="1.3"/>` +
        `<rect x="${n(x - cu / 2 - 2)}" y="${n(top - 3)}" width="${n(cu + 4)}" height="4" rx="2" fill="#dfe9ef" stroke="#5d7684" stroke-width=".8"/>`;
      if (o.tapon) q += `<rect x="${n(x - cu / 2 - 1)}" y="${n(top - 10)}" width="${n(cu + 2)}" height="12" rx="2" fill="#7b4f2a"/>`;
      if (o.globo) q += `<path d="M${n(x - cu / 2)} ${n(top + 2)} C${n(x - 26 * o.globo - 6)} ${n(top - 40 * o.globo)} ${n(x + 26 * o.globo + 6)} ${n(top - 40 * o.globo)} ${n(x + cu / 2)} ${n(top + 2)}Z" fill="#e8434f" stroke="#a51f2a" stroke-width=".8"/>`;
      return g(q);
    },
    // Mechero con llama 0 a 1.
    mechero(x, y, llama = 1) {
      let s = sombra(x, y + 1, 46) + `<path d="M${n(x - 20)} ${n(y)} H${n(x + 20)} L${n(x + 14)} ${n(y - 8)} H${n(x - 14)}Z" fill="url(#${id}-metal)" stroke="#4d565c" stroke-width=".8"/>` +
        `<rect x="${n(x - 5)}" y="${n(y - 44)}" width="10" height="37" fill="url(#${id}-metal)" stroke="#4d565c" stroke-width=".8"/>`;
      if (llama > 0.01) s += `<path d="M${n(x)} ${n(y - 44 - 34 * llama)} C${n(x + 9)} ${n(y - 58)} ${n(x + 7)} ${n(y - 46)} ${n(x)} ${n(y - 44)} C${n(x - 7)} ${n(y - 46)} ${n(x - 9)} ${n(y - 58)} ${n(x)} ${n(y - 44 - 34 * llama)}Z" fill="url(#${id}-llama)"/>` +
        `<circle cx="${n(x)}" cy="${n(y - 56)}" r="${n(22 * llama)}" fill="url(#${id}-luz)" opacity=".5"/>`;
      return g(s);
    },
    // Soporte universal con aro a la altura ya (lo que se apoya va encima).
    soporte(x, y, h = 140, ya = 80) {
      return g(sombra(x + 20, y + 1, 70) + `<rect x="${n(x - 16)}" y="${n(y - 6)}" width="72" height="6" rx="2" fill="#3e464c"/>` + `<rect x="${n(x - 3)}" y="${n(y - h)}" width="5" height="${n(h - 6)}" fill="url(#${id}-metal)"/>` +
        L(x, y - ya, x + 36, y - ya, '#59626a', 3) + `<ellipse cx="${n(x + 52)}" cy="${n(y - ya)}" rx="18" ry="4" fill="none" stroke="#59626a" stroke-width="3"/>`);
    },
    // Termómetro vertical: valor 0 a 1 y texto de la lectura.
    termometro(x, y, h = 110, val = 0.5, et = '') {
      const top = y - h, ly = y - 12 - (h - 22) * val;
      let s = `<rect x="${n(x - 6)}" y="${n(top)}" width="12" height="${n(h - 8)}" rx="6" fill="#f6f8f9" stroke="#7d8b93"/>` + `<circle cx="${n(x)}" cy="${n(y - 6)}" r="9" fill="#d7263d" stroke="#8b1222"/>` +
        `<rect x="${n(x - 2.2)}" y="${n(ly)}" width="4.4" height="${n(y - 8 - ly)}" fill="#d7263d"/>`;
      for (let i = 1; i < 10; i++) { const yy = y - 12 - (h - 22) * i / 10; s += L(x + 6, yy, x + (i % 5 ? 9 : 12), yy, '#56646c', 0.8); }
      if (et) s += X.rot(x + 30, ly + 4, et);
      return g(s);
    },
    // Balanza digital con su pantalla.
    balanza(x, y, lectura = '0.0 g') {
      return g(sombra(x, y + 1, 104) + `<path d="M${n(x - 50)} ${n(y)} H${n(x + 50)} L${n(x + 44)} ${n(y - 22)} H${n(x - 44)}Z" fill="#e9edef" stroke="#7a868d"/>` +
        `<rect x="${n(x - 42)}" y="${n(y - 30)}" width="84" height="8" rx="2" fill="url(#${id}-metal)" stroke="#6b757b"/>` +
        `<rect x="${n(x - 26)}" y="${n(y - 18)}" width="52" height="13" rx="2" fill="#1f2b22"/>` + T(x, y - 8, lectura, '#9cff8a', 10, 'middle', 600));
    },
    // Cubo de hielo.
    hielo(x, y, s = 14, rot = 0) {
      return `<g transform="rotate(${rot} ${n(x)} ${n(y)})"><rect x="${n(x - s / 2)}" y="${n(y - s / 2)}" width="${n(s)}" height="${n(s)}" rx="3" fill="#eaf7ff" fill-opacity=".85" stroke="#9cc7de"/>` +
        L(x - s / 2 + 3, y - s / 2 + 3, x - s / 2 + s * 0.6, y - s / 2 + 3, '#ffffff', 1.4) + `</g>`;
    },
    // Planta en maceta: alto h, salud 0 (seca) a 1 (verde), o: { hojas, flor }.
    planta(x, y, h = 60, salud = 1, o = {}) {
      const hj = o.hojas ?? 6, col = salud > 0.5 ? `${id}-hoja` : `${id}-seca`, inc = (1 - salud) * 18;
      let s = sombra(x, y + 1, 50) + `<path d="M${n(x - 20)} ${n(y - 34)} H${n(x + 20)} L${n(x + 15)} ${n(y)} H${n(x - 15)}Z" fill="url(#${id}-barro)"/>` +
        `<rect x="${n(x - 23)}" y="${n(y - 38)}" width="46" height="7" rx="2" fill="#c4643a"/><ellipse cx="${n(x)}" cy="${n(y - 37)}" rx="19" ry="3" fill="#4a3120"/>`;
      const top = y - 38 - h;
      s += `<path d="M${n(x)} ${n(y - 37)} Q${n(x + 4 + inc / 2)} ${n((y - 37 + top) / 2)} ${n(x + inc)} ${n(top)}" stroke="#3d7a2c" stroke-width="3" fill="none"/>`;
      for (let i = 0; i < hj; i++) {
        const t = (i + 1) / (hj + 1), yy = y - 37 - h * t, xx = x + inc * t * t, lado = i % 2 ? 1 : -1, cai = (1 - salud) * 30;
        s += `<path d="M${n(xx)} ${n(yy)} q${n(lado * 12)} ${n(-10 + cai / 3)} ${n(lado * 24)} ${n(-2 + cai)} q${n(-lado * 12)} ${n(6)} ${n(-lado * 24)} ${n(2 - cai)}Z" fill="url(#${col})" stroke="#2a5a1e" stroke-width=".6"/>`;
      }
      if (o.flor) s += `<g>${[0, 72, 144, 216, 288].map(a => `<ellipse cx="${n(x + inc + 7 * Math.cos(a * Math.PI / 180))}" cy="${n(top - 4 + 7 * Math.sin(a * Math.PI / 180))}" rx="6" ry="4" transform="rotate(${a} ${n(x + inc + 7 * Math.cos(a * Math.PI / 180))} ${n(top - 4 + 7 * Math.sin(a * Math.PI / 180))})" fill="#f5a3c7"/>`).join('')}<circle cx="${n(x + inc)}" cy="${n(top - 4)}" r="4" fill="#ffd23f"/></g>`;
      return g(s);
    },
    sol: (x, y, r = 22) => `<circle cx="${n(x)}" cy="${n(y)}" r="${n(r * 2)}" fill="url(#${id}-sol)"/><circle cx="${n(x)}" cy="${n(y)}" r="${n(r * 0.7)}" fill="#ffe25a"/>`,
    // Lámpara de escritorio apuntando abajo; on 0 a 1.
    lampara(x, y, on = 1) {
      return g(`<rect x="${n(x - 18)}" y="${n(y - 5)}" width="36" height="5" rx="2" fill="#2f3539"/>` + L(x, y - 5, x - 10, y - 70, '#3b4247', 3) + L(x - 10, y - 70, x + 30, y - 96, '#3b4247', 3) +
        `<path d="M${n(x + 22)} ${n(y - 104)} L${n(x + 50)} ${n(y - 90)} L${n(x + 40)} ${n(y - 76)}Z" fill="#2f6f8f"/>` + (on > 0.01 ? `<path d="M${n(x + 45)} ${n(y - 83)} L${n(x + 95)} ${n(y)} L${n(x + 5)} ${n(y)}Z" fill="#fff3a8" opacity="${n(0.35 * on)}"/>` : ''));
    },
    // Resorte colgado de (x, y) con largo largo y una pesa abajo con su texto.
    resorte(x, y, largo = 60, pesa = '') {
      let d = `M${n(x)} ${n(y)} v6`, k = 10, paso = (largo - 12) / k;
      for (let i = 0; i < k; i++) d += ` l${i % 2 ? -9 : 9} ${n(paso / 2)} l${i % 2 ? 9 : -9} ${n(paso / 2)}`;
      d += ' v6';
      let s = `<rect x="${n(x - 40)}" y="${n(y - 8)}" width="80" height="8" fill="url(#${id}-metal)"/>` + `<path d="${d}" stroke="#6e7b83" stroke-width="2" fill="none"/>`;
      if (pesa) s += `<rect x="${n(x - 16)}" y="${n(y + largo)}" width="32" height="26" rx="3" fill="url(#${id}-metal)" stroke="#4d565c"/>` + T(x, y + largo + 17, pesa, '#1d2328', 10);
      return g(s);
    },
    // Imán de barra con N (rojo) y S (azul), ancho w, girado rot grados.
    iman(x, y, w = 90, rot = 0) {
      return `<g transform="rotate(${rot} ${n(x)} ${n(y)})">${sombra(x, y + 13, w)}<rect x="${n(x - w / 2)}" y="${n(y - 10)}" width="${n(w / 2)}" height="20" fill="#d63a3a"/><rect x="${n(x)}" y="${n(y - 10)}" width="${n(w / 2)}" height="20" fill="#3a5fd6"/>` +
        L(x - w / 2 + 2, y - 7, x + w / 2 - 2, y - 7, '#fff', 1.4, 'opacity=".45"') + T(x - w / 4, y + 4, 'N', '#fff', 12) + T(x + w / 4, y + 4, 'S', '#fff', 12) + `</g>`;
    },
    // Pila con + y −.
    pila(x, y, et = '1.5 V') {
      return g(sombra(x, y + 14, 60) + `<rect x="${n(x - 28)}" y="${n(y - 11)}" width="56" height="22" rx="4" fill="#2b2f33"/><rect x="${n(x + 6)}" y="${n(y - 11)}" width="22" height="22" rx="0" fill="#d9a400"/>` +
        `<rect x="${n(x + 28)}" y="${n(y - 4)}" width="5" height="8" fill="url(#${id}-metal)"/>` + L(x - 26, y - 8, x + 26, y - 8, '#fff', 1.2, 'opacity=".4"') + T(x - 10, y + 4, et, '#fff', 9) + T(x + 17, y + 4, '+', '#2b2f33', 12));
    },
    // Bombillo encendido de 0 a 1.
    bombillo(x, y, on = 1) {
      return g((on > 0.01 ? `<circle cx="${n(x)}" cy="${n(y)}" r="${n(36 * on)}" fill="url(#${id}-luz)"/>` : '') +
        `<path d="M${n(x - 9)} ${n(y + 12)} C${n(x - 22)} ${n(y)} ${n(x - 14)} ${n(y - 20)} ${n(x)} ${n(y - 20)} C${n(x + 14)} ${n(y - 20)} ${n(x + 22)} ${n(y)} ${n(x + 9)} ${n(y + 12)}Z" fill="${on > 0.3 ? '#fff6b8' : '#eef3f5'}" fill-opacity=".9" stroke="#8a969c"/>` +
        `<path d="M${n(x - 4)} ${n(y + 10)} L${n(x - 3)} ${n(y - 4)} L${n(x + 3)} ${n(y - 4)} L${n(x + 4)} ${n(y + 10)}" stroke="${on > 0.3 ? '#ff9b1a' : '#7d878c'}" stroke-width="1.2" fill="none"/>` +
        `<rect x="${n(x - 9)}" y="${n(y + 12)}" width="18" height="12" rx="2" fill="url(#${id}-metal)" stroke="#5b646a"/>`);
    },
    // Cable por una lista de puntos.
    cable: (pts, c = '#c0392b') => `<polyline points="${pts.map(q => q.map(n).join(',')).join(' ')}" stroke="#000" stroke-opacity=".3" stroke-width="4" fill="none" stroke-linejoin="round"/><polyline points="${pts.map(q => q.map(n).join(',')).join(' ')}" stroke="${c}" stroke-width="2.4" fill="none" stroke-linejoin="round"/>`,
    // Microscopio de perfil, tamaño s.
    microscopio(x, y, s = 1) {
      const P = (a, b) => `${n(x + a * s)} ${n(y + b * s)}`;
      return g(sombra(x, y + 1, 80 * s) + `<path d="M${P(-36, 0)} H${n(x + 36 * s)} L${P(30, -10)} H${n(x - 30 * s)}Z" fill="#2f3539"/>` +
        `<path d="M${P(14, -10)} C${P(30, -40)} ${P(30, -90)} ${P(8, -110)}" stroke="#3b4247" stroke-width="${n(12 * s)}" fill="none" stroke-linecap="round"/>` +
        `<rect x="${n(x - 26 * s)}" y="${n(y - 52 * s)}" width="${n(44 * s)}" height="${n(5 * s)}" fill="#4a5258"/>` +
        `<path d="M${P(-6, -112)} L${P(2, -66)} L${P(-10, -64)} L${P(-18, -110)}Z" fill="url(#${id}-metal)" stroke="#4d565c"/>` +
        `<rect x="${n(x - 22 * s)}" y="${n(y - 126 * s)}" width="${n(14 * s)}" height="${n(18 * s)}" rx="2" transform="rotate(-12 ${P(-15, -117).replace(' ', ' ')})" fill="#2f3539"/>` +
        `<circle cx="${n(x - 4 * s)}" cy="${n(y - 30 * s)}" r="${n(6 * s)}" fill="#fff3a8" stroke="#8a969c"/>`);
    },
    // Célula vista al microscopio: tipo 'animal' o 'vegetal'.
    celula(x, y, r = 50, tipo = 'animal') {
      let s = '';
      if (tipo === 'vegetal') {
        s += `<rect x="${n(x - r)}" y="${n(y - r * 0.8)}" width="${n(2 * r)}" height="${n(1.6 * r)}" rx="8" fill="url(#${id}-cel-v)" stroke="#4f8a2e" stroke-width="4"/>` +
          `<rect x="${n(x - r * 0.55)}" y="${n(y - r * 0.45)}" width="${n(r * 0.9)}" height="${n(r * 0.8)}" rx="14" fill="#d7efe9" opacity=".8"/>`;
        for (let i = 0; i < 7; i++) s += `<ellipse cx="${n(x - r * 0.8 + ((i * 41) % (r * 1.6)))}" cy="${n(y - r * 0.6 + ((i * 29) % (r * 1.2)))}" rx="7" ry="4" fill="#3e9b35" stroke="#256b20" stroke-width=".6"/>`;
        s += `<circle cx="${n(x + r * 0.55)}" cy="${n(y + r * 0.3)}" r="${n(r * 0.22)}" fill="url(#${id}-nucleo)"/>`;
      } else {
        s += `<path d="M${n(x - r)} ${n(y)} C${n(x - r)} ${n(y - r * 0.9)} ${n(x + r * 0.7)} ${n(y - r)} ${n(x + r)} ${n(y - r * 0.2)} C${n(x + r * 1.1)} ${n(y + r * 0.7)} ${n(x - r * 0.3)} ${n(y + r)} ${n(x - r)} ${n(y)}Z" fill="url(#${id}-celula)" stroke="#b5527d" stroke-width="1.6"/>`;
        for (let i = 0; i < 6; i++) s += `<ellipse cx="${n(x - r * 0.6 + ((i * 37) % (r * 1.3)))}" cy="${n(y - r * 0.4 + ((i * 23) % (r * 0.9)))}" rx="6" ry="3" fill="#f08a4b" opacity=".8"/>`;
        s += `<circle cx="${n(x + r * 0.05)}" cy="${n(y + r * 0.05)}" r="${n(r * 0.26)}" fill="url(#${id}-nucleo)"/>`;
      }
      return g(s);
    },
    // Lupa: aro en (x, y) de radio r, mango hacia abajo a la derecha.
    lupa(x, y, r = 26) {
      return g(L(x + r * 0.7, y + r * 0.7, x + r * 1.6, y + r * 1.6, '#3b2a1c', 7, 'stroke-linecap="round"') + `<circle cx="${n(x)}" cy="${n(y)}" r="${n(r)}" fill="#dff3ff" fill-opacity=".35" stroke="#3b4247" stroke-width="4"/>` +
        `<path d="M${n(x - r * 0.6)} ${n(y - r * 0.2)} A${n(r * 0.7)} ${n(r * 0.7)} 0 0 1 ${n(x - r * 0.1)} ${n(y - r * 0.65)}" stroke="#fff" stroke-width="2" fill="none" opacity=".8"/>`);
    },
    // Cronómetro con su texto.
    cronometro(x, y, r = 22, et = '00:10') {
      return g(sombra(x, y + r + 2, r * 2) + `<rect x="${n(x - 4)}" y="${n(y - r - 8)}" width="8" height="7" fill="#5b646a"/><circle cx="${n(x)}" cy="${n(y)}" r="${n(r)}" fill="url(#${id}-metal)" stroke="#4d565c" stroke-width="1.5"/>` +
        `<circle cx="${n(x)}" cy="${n(y)}" r="${n(r - 5)}" fill="#f7f9fa"/>` + T(x, y + 4, et, '#1d2328', 10));
    },
    // Regla de madera: largo en px y marcas cada `cada` px.
    regla(x, y, largo = 200, cada = 20) {
      let s = `<rect x="${n(x)}" y="${n(y)}" width="${n(largo)}" height="16" rx="2" fill="#f0d08a" stroke="#a37a2c"/>`;
      for (let k = 0; k * cada <= largo; k++) s += L(x + k * cada, y, x + k * cada, y + (k % 5 ? 5 : 9), '#5a4214', 0.8);
      return g(s);
    },
    gota: (x, y, s = 10, k = 'agua') => `<path d="M${n(x)} ${n(y - s)} C${n(x + s * 0.8)} ${n(y)} ${n(x + s * 0.7)} ${n(y + s * 0.8)} ${n(x)} ${n(y + s * 0.8)} C${n(x - s * 0.7)} ${n(y + s * 0.8)} ${n(x - s * 0.8)} ${n(y)} ${n(x)} ${n(y - s)}Z" fill="url(#${id}-l-${k})" stroke="#2c6f99" stroke-width=".6"/>`,
    // Árbol de copa redonda.
    arbol(x, y, s = 1, salud = 1) {
      const c = salud > 0.5 ? ['#5c9e3c', '#3a7424'] : ['#c9a441', '#8a6d1f'];
      return g(sombra(x, y + 1, 50 * s) + `<path d="M${n(x - 4 * s)} ${n(y)} L${n(x - 3 * s)} ${n(y - 34 * s)} L${n(x + 3 * s)} ${n(y - 34 * s)} L${n(x + 4 * s)} ${n(y)}Z" fill="#6b4423"/>` +
        [[0, -52, 22], [-14, -40, 16], [14, -42, 17], [0, -36, 15]].map(([a, b, r], i) => `<circle cx="${n(x + a * s)}" cy="${n(y + b * s)}" r="${n(r * s)}" fill="${c[i % 2]}"/>`).join('') +
        `<circle cx="${n(x - 6 * s)}" cy="${n(y - 58 * s)}" r="${n(6 * s)}" fill="#fff" opacity=".15"/>`);
    },
    // Pez de lado, mirando a la derecha.
    pez(x, y, s = 1, c = '#f39c32') {
      return g(`<path d="M${n(x - 22 * s)} ${n(y)} C${n(x - 10 * s)} ${n(y - 14 * s)} ${n(x + 14 * s)} ${n(y - 12 * s)} ${n(x + 22 * s)} ${n(y)} C${n(x + 14 * s)} ${n(y + 12 * s)} ${n(x - 10 * s)} ${n(y + 14 * s)} ${n(x - 22 * s)} ${n(y)}Z" fill="${c}"/>` +
        `<path d="M${n(x - 20 * s)} ${n(y)} L${n(x - 32 * s)} ${n(y - 10 * s)} L${n(x - 30 * s)} ${n(y + 10 * s)}Z" fill="${c}"/><circle cx="${n(x + 13 * s)}" cy="${n(y - 3 * s)}" r="${n(2.2 * s)}" fill="#1d2328"/>` +
        `<path d="M${n(x - 4 * s)} ${n(y - 9 * s)} Q${n(x + 2 * s)} ${n(y)} ${n(x - 4 * s)} ${n(y + 9 * s)}" stroke="#fff" stroke-opacity=".4" fill="none"/>`);
    },
    // ---------------------------------------------------------------------------------------------------- sociales e inglés
    // Documento antiguo con renglones de texto (lista de cadenas cortas) y sello.
    documento(x, y, w = 150, h = 120, lineas = [], o = {}) {
      let s = sombra(x + w / 2, y + h + 2, w) + `<path d="M${n(x)} ${n(y + 4)} Q${n(x + w / 2)} ${n(y - 3)} ${n(x + w)} ${n(y + 2)} L${n(x + w - 2)} ${n(y + h)} Q${n(x + w / 2)} ${n(y + h + 4)} ${n(x + 2)} ${n(y + h - 2)}Z" fill="url(#${id}-papel)" stroke="#9c7b45" stroke-width=".8"/>`;
      if (o.titulo) s += T(x + w / 2, y + 20, o.titulo, '#3b2a12', 12, 'middle', 600);
      lineas.forEach((t, i) => { s += T(x + 12, y + (o.titulo ? 38 : 22) + i * 15, t, '#3b2a12', 10, 'start', 500); });
      if (o.sello) s += `<circle cx="${n(x + w - 26)}" cy="${n(y + h - 24)}" r="14" fill="#a3242a"/><circle cx="${n(x + w - 26)}" cy="${n(y + h - 24)}" r="9" fill="none" stroke="#e7a2a2" stroke-width="1"/>` + T(x + w - 26, y + h - 20, o.sello, '#f3d3d3', 8);
      if (o.fecha) s += T(x + 12, y + h - 10, o.fecha, '#6b4f22', 9, 'start', 500);
      return g(s);
    },
    // Hoja de periódico con titular y columnas.
    periodico(x, y, w = 150, h = 110, titular = '', o = {}) {
      let s = sombra(x + w / 2, y + h + 2, w) + `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" fill="#f2f0ea" stroke="#9a978e"/>` +
        T(x + w / 2, y + 14, o.nombre || 'EL DIARIO', '#1d2328', 11, 'middle', 600) + L(x + 6, y + 19, x + w - 6, y + 19, '#1d2328', 1.2) + T(x + 8, y + 34, titular, '#1d2328', 11, 'start', 600);
      const cols = 3, cw = (w - 16 - (cols - 1) * 6) / cols;
      for (let c = 0; c < cols; c++) for (let r = 0; r < Math.floor((h - 50) / 7); r++) s += L(x + 8 + c * (cw + 6), y + 46 + r * 7, x + 8 + c * (cw + 6) + cw * (r % 4 === 3 ? 0.6 : 1), y + 46 + r * 7, '#8d8a82', 1.6);
      if (o.foto) s += `<rect x="${n(x + 8)}" y="${n(y + 44)}" width="${n(cw)}" height="30" fill="#b8c3c9"/>`;
      return g(s);
    },
    // Urna de votación con un voto entrando (entra 0 a 1).
    urna(x, y, s = 1, entra = 0.5) {
      const w = 70 * s, h = 60 * s;
      return g(sombra(x, y + 1, w * 1.1) + `<rect x="${n(x - w / 2)}" y="${n(y - h)}" width="${n(w)}" height="${n(h)}" rx="3" fill="#e9f1f7" fill-opacity=".75" stroke="#6d8696" stroke-width="1.4"/>` +
        `<rect x="${n(x - w / 2 - 3)}" y="${n(y - h - 6)}" width="${n(w + 6)}" height="7" rx="2" fill="#3f5d73"/><rect x="${n(x - 14 * s)}" y="${n(y - h - 4)}" width="${n(28 * s)}" height="3" fill="#0e1b24"/>` +
        `<rect x="${n(x - 11 * s)}" y="${n(y - h - 4 - 26 * s * (1 - entra))}" width="${n(22 * s)}" height="${n(28 * s)}" fill="#fffdf6" stroke="#9a978e" transform="rotate(-4 ${n(x)} ${n(y - h)})"/>` +
        T(x, y - h / 2 + 4, 'VOTO', '#3f5d73', 11) + `<rect x="${n(x - w / 2 + 4)}" y="${n(y - h + 3)}" width="5" height="${n(h - 8)}" fill="#fff" opacity=".5"/>`);
    },
    // Edificio: 'capitolio', 'fabrica', 'casa', 'colegio', 'hospital'. Base en (x, y), ancho w.
    edificio(x, y, w = 110, tipo = 'casa', o = {}) {
      let s = sombra(x, y + 1, w * 1.05);
      if (tipo === 'capitolio') {
        const h = w * 0.55;
        s += `<rect x="${n(x - w / 2)}" y="${n(y - 8)}" width="${n(w)}" height="8" fill="#cfc6b4"/><rect x="${n(x - w / 2 + 6)}" y="${n(y - h)}" width="${n(w - 12)}" height="${n(h - 8)}" fill="url(#${id}-ladrillo)"/>`;
        for (let k = 0; k < 8; k++) s += `<rect x="${n(x - w / 2 + 12 + k * (w - 30) / 7)}" y="${n(y - h + 8)}" width="6" height="${n(h - 18)}" fill="#f7f3ea" stroke="#b5ab96" stroke-width=".6"/>`;
        s += `<path d="M${n(x - w / 2)} ${n(y - h)} L${n(x)} ${n(y - h - w * 0.2)} L${n(x + w / 2)} ${n(y - h)}Z" fill="#e3dccd" stroke="#b5ab96"/>`;
        if (o.bandera !== false) s += L(x, y - h - w * 0.2, x, y - h - w * 0.2 - 26, '#555', 1.4) + `<rect x="${n(x)}" y="${n(y - h - w * 0.2 - 26)}" width="18" height="5" fill="#fcd116"/><rect x="${n(x)}" y="${n(y - h - w * 0.2 - 21)}" width="18" height="2.5" fill="#003893"/><rect x="${n(x)}" y="${n(y - h - w * 0.2 - 18.5)}" width="18" height="2.5" fill="#ce1126"/>`;
      } else if (tipo === 'fabrica') {
        const h = w * 0.4;
        s += `<rect x="${n(x - w / 2)}" y="${n(y - h)}" width="${n(w)}" height="${n(h)}" fill="#9a6b52"/>` + [0, 1, 2].map(k => `<path d="M${n(x - w / 2 + k * w / 3)} ${n(y - h)} l${n(w / 3)} ${n(-h * 0.4)} v${n(h * 0.4)}Z" fill="#7d533e"/>`).join('') +
          `<rect x="${n(x + w / 2 - 24)}" y="${n(y - h - 50)}" width="14" height="50" fill="#8a5c45"/>`;
        for (let k = 0; k < 4; k++) s += `<rect x="${n(x - w / 2 + 10 + k * (w - 20) / 4)}" y="${n(y - h / 2)}" width="12" height="10" fill="#e8d9a8"/>`;
        if (o.humo !== 0) for (let k = 0; k < 4; k++) s += `<circle cx="${n(x + w / 2 - 17 + k * 9)}" cy="${n(y - h - 58 - k * 12)}" r="${8 + k * 3}" fill="#7d7f82" opacity="${n((o.humo ?? 1) * (0.55 - k * 0.1))}"/>`;
      } else if (tipo === 'colegio' || tipo === 'hospital') {
        const h = w * 0.5;
        s += `<rect x="${n(x - w / 2)}" y="${n(y - h)}" width="${n(w)}" height="${n(h)}" fill="${tipo === 'hospital' ? '#eef3f6' : '#f0d9a8'}" stroke="#9aa3a8"/>`;
        for (let r = 0; r < 2; r++) for (let k = 0; k < 5; k++) s += `<rect x="${n(x - w / 2 + 8 + k * (w - 16) / 5)}" y="${n(y - h + 8 + r * h * 0.42)}" width="${n((w - 16) / 5 - 6)}" height="${n(h * 0.28)}" fill="#a9c7da"/>`;
        s += tipo === 'hospital' ? `<rect x="${n(x - 4)}" y="${n(y - h - 22)}" width="8" height="20" fill="#d7263d"/><rect x="${n(x - 10)}" y="${n(y - h - 16)}" width="20" height="8" fill="#d7263d"/>` : `<path d="M${n(x - w / 2 - 4)} ${n(y - h)} L${n(x)} ${n(y - h - 20)} L${n(x + w / 2 + 4)} ${n(y - h)}Z" fill="#b24a30"/>`;
      } else {
        const h = w * 0.5;
        s += `<rect x="${n(x - w / 2)}" y="${n(y - h)}" width="${n(w)}" height="${n(h)}" fill="#f2e6cf" stroke="#b3a27f"/><path d="M${n(x - w / 2 - 6)} ${n(y - h)} L${n(x)} ${n(y - h - w * 0.32)} L${n(x + w / 2 + 6)} ${n(y - h)}Z" fill="#b5492b"/>` +
          `<rect x="${n(x - 9)}" y="${n(y - h * 0.55)}" width="18" height="${n(h * 0.55)}" fill="#7a4b26"/><rect x="${n(x - w / 2 + 10)}" y="${n(y - h * 0.7)}" width="18" height="14" fill="#a9c7da"/><rect x="${n(x + w / 2 - 28)}" y="${n(y - h * 0.7)}" width="18" height="14" fill="#a9c7da"/>`;
      }
      return g(s);
    },
    // Persona de pie, tamaño s, color de la ropa, o: { cartel: 'texto' }.
    persona(x, y, s = 1, ropa = '#3f6fb5', o = {}) {
      const P = (a, b) => `${n(x + a * s)} ${n(y + b * s)}`;
      let q = sombra(x, y + 1, 26 * s) + `<path d="M${P(-5, 0)} L${P(-4, -26)} L${P(4, -26)} L${P(5, 0)}" stroke="#2b3440" stroke-width="${n(5 * s)}" fill="none"/>` +
        `<path d="M${P(-10, -24)} Q${P(-11, -50)} ${P(0, -52)} Q${P(11, -50)} ${P(10, -24)}Z" fill="${ropa}"/>` +
        `<circle cx="${n(x)}" cy="${n(y - 60 * s)}" r="${n(8 * s)}" fill="url(#${id}-piel)"/><path d="M${P(-8, -62)} Q${P(0, -73)} ${P(8, -62)}" fill="#2a1c12"/>`;
      if (o.cartel) q += L(x + 12 * s, y - 30 * s, x + 12 * s, y - 86 * s, '#6b4423', 2) + `<rect x="${n(x + 12 * s - 26)}" y="${n(y - 108 * s)}" width="52" height="24" rx="2" fill="#fffdf6" stroke="#9a978e"/>` + T(x + 12 * s, y - 92 * s, o.cartel, '#1d2328', 9);
      return g(q);
    },
    // Moneda y billete.
    moneda: (x, y, r = 14, et = '$') => g(`<circle cx="${n(x)}" cy="${n(y + 2)}" r="${n(r)}" fill="#8a6d1f"/><circle cx="${n(x)}" cy="${n(y)}" r="${n(r)}" fill="#e2b93b" stroke="#9c7a22"/><circle cx="${n(x)}" cy="${n(y)}" r="${n(r - 4)}" fill="none" stroke="#b8901f"/>` + T(x, y + 4, et, '#6b4f12', 10)),
    billete: (x, y, w = 90, et = '$ 50 000') => g(sombra(x + w / 2, y + w * 0.45 + 2, w) + `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(w * 0.45)}" rx="3" fill="#bfe0c8" stroke="#4d8a5c"/><circle cx="${n(x + w * 0.25)}" cy="${n(y + w * 0.22)}" r="${n(w * 0.13)}" fill="#8cc29c"/>` + T(x + w * 0.66, y + w * 0.28, et, '#24543a', 10)),
    // Río sinuoso de izquierda a derecha a la altura y.
    rio: (y, ancho = 16) => `<path d="M0 ${n(y)} C90 ${n(y - 20)} 150 ${n(y + 24)} 230 ${n(y)} S320 ${n(y - 10)} 340 ${n(y + 4)}" stroke="#4f97c9" stroke-width="${ancho}" fill="none"/><path d="M0 ${n(y - 3)} C90 ${n(y - 23)} 150 ${n(y + 21)} 230 ${n(y - 3)}" stroke="#bfe3f7" stroke-width="1.4" fill="none" opacity=".7"/>`,
    // Aviso realista (para Inglés): tipo 'metal' (gris con tornillos), 'verde', 'peligro' (amarillo), 'papel' (nota pegada), 'rojo'.
    aviso(x, y, w = 170, h = 80, lineas = [], tipo = 'metal', o = {}) {
      const C = { metal: ['#e9eef0', '#56646c', '#1d2328'], verde: ['#1f7a4a', '#0f4d2d', '#ffffff'], peligro: ['#ffd23f', '#1d2328', '#1d2328'], papel: ['#fff7b8', '#c9b85a', '#2b2b2b'], rojo: ['#c62828', '#7f1515', '#ffffff'], azul: ['#1f5fae', '#0f3a6e', '#ffffff'] }[tipo] || ['#e9eef0', '#56646c', '#1d2328'];
      let s = '';
      if (o.poste) s += `<rect x="${n(x + w / 2 - 4)}" y="${n(y + h)}" width="8" height="${n(o.poste)}" fill="url(#${id}-metal)"/>`;
      s += sombra(x + w / 2, y + h + 3, w) + (tipo === 'papel' ? `<path d="M${n(x)} ${n(y)} H${n(x + w)} V${n(y + h - 8)} L${n(x + w - 10)} ${n(y + h)} H${n(x)}Z" fill="${C[0]}" stroke="${C[1]}"/><rect x="${n(x + w / 2 - 18)}" y="${n(y - 6)}" width="36" height="11" fill="#e9eef0" fill-opacity=".7"/>`
        : `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="6" fill="${C[0]}" stroke="${C[1]}" stroke-width="2"/><rect x="${n(x + 5)}" y="${n(y + 5)}" width="${n(w - 10)}" height="${n(h - 10)}" rx="4" fill="none" stroke="${C[2]}" stroke-opacity=".5"/>`);
      if (tipo === 'peligro') s += `<path d="M${n(x + 22)} ${n(y + 14)} L${n(x + 36)} ${n(y + 38)} H${n(x + 8)}Z" fill="#1d2328"/>` + T(x + 22, y + 35, '!', '#ffd23f', 14);
      if (tipo === 'metal' || tipo === 'verde' || tipo === 'azul' || tipo === 'rojo') [[8, 8], [w - 8, 8], [8, h - 8], [w - 8, h - 8]].forEach(([a, b]) => { s += `<circle cx="${n(x + a)}" cy="${n(y + b)}" r="2" fill="url(#${id}-metal)" stroke="#555" stroke-width=".4"/>`; });
      const x0 = tipo === 'peligro' ? x + 44 + (w - 44) / 2 : x + w / 2, dy = h / (lineas.length + 1);
      lineas.forEach((t, i) => { s += T(x0, y + dy * (i + 1) + 4, t, C[2], i === 0 ? 12 : 10, 'middle', i === 0 ? 600 : 500); });
      return g(s);
    },
  };
  return X;
})();
