// Robot de los paquetes por curso (spec 2026-11-26-arranque-liviano). Prueba un curso con la app en paquetes
// (http://localhost:5199/?paquetes, que no tiene candados; «node tools/servir.js»): abre su primera lección como lo
// haría un toque (ahí se piden el paquete común y el del curso), y después monta una vez cada juego que el curso usa
// (lecciones, evaluaciones y gimnasio) y revisa sus explicaciones. Devuelve lo que falló; errores: [] = todo bien.
// Ese servidor manda la política de contenido de Vercel, que no deja usar eval ni publica tests/: se pega este archivo
// en la consola (o en la herramienta de JavaScript del navegador) y luego: await __paq('algebra')
// Para probar un curso aislado: recargar antes (y S.lastLesson = null; save(), o se precarga el curso en uso).
window.__paq = async (cid, { montar = true } = {}) => {
  const c = COURSES.find(x => x.id === cid), errores = [];
  const oye = e => errores.push('página: ' + String((e.error && e.error.stack) || e.message || e.reason).slice(0, 300));
  addEventListener('error', oye); addEventListener('unhandledrejection', oye);
  const espera = ms => new Promise(r => setTimeout(r, ms));
  const antes = [...document.querySelectorAll('script[src*="paquetes/zuka-"]')].length;
  S.unlockAll = true;
  const l = c.units[0].lessons[0];
  startLesson(c, l);
  for (let i = 0; i < 150 && (CARGA.faltan(cid).length || !document.querySelector('#overlay').children.length); i++) await espera(100);
  const ov = document.querySelector('#overlay');
  const r = {
    curso: cid, leccion: l.id, abierta: ov.innerText.replace(/\s+/g, ' ').slice(0, 90),
    pedidos: [...document.querySelectorAll('script[src*="paquetes/zuka-"]')].slice(antes).map(s => s.src.split('/').pop()),
    explora: !!ov.querySelector('.explora'),
  };
  // Todo lo que el curso usa.
  const ex = [], visto = new Set(), ids = new Set(c.units.flatMap(u => u.lessons.map(x => x.id)));
  const anda = x => { if (!x || typeof x !== 'object' || visto.has(x)) return; visto.add(x); if (x.type === 'play' && typeof x.game === 'string') ex.push(x); for (const k of Object.keys(x)) anda(x[k]); };
  anda(c);
  for (const g of GYM_RETOS) if (g.after.some(id => ids.has(id))) anda(g.steps);
  const unoPor = new Map();
  for (const e of ex) if (!unoPor.has(e.game)) unoPor.set(e.game, e);
  r.ejercicios = ex.length; r.juegos = unoPor.size;
  r.faltan = [...unoPor.keys()].filter(g => !GAMES[g]);
  r.sinExplicacion = [...ids].filter(id => hayExplora(id) && !(EXPLORA[id] && EXPLORA[id].pasos.every(p => XP[p.tipo] && XPD[p.tipo])));
  r.explicaciones = [...ids].filter(id => EXPLORA[id]).length;
  if (montar) {
    const host = document.createElement('div');
    host.style.cssText = 'position:fixed;left:-2000px;top:0;width:360px;height:640px;overflow:hidden';
    document.body.appendChild(host);
    for (const [g, e] of unoPor) {
      if (!GAMES[g]) continue;
      const caja = document.createElement('div');
      caja.className = 'play'; caja.innerHTML = '<div class="game-stage"></div>';
      host.appendChild(caja);
      try {
        GAMES[g].grade({}, e.params);
      } catch (err) { /* un estado vacío puede no ser válido para grade: no es de este robot */ }
      try {
        const inst = GAMES[g].create(caja.firstChild, e.params, { ready() {}, sfx: Sfx, palette: PALETTE, tex, guideAuto: false });
        await Promise.race([Promise.resolve(inst.loaded), espera(4000)]);
        await espera(30);
        GAMES[g].grade(inst.getState(), e.params);
        inst.destroy();
      } catch (err) { errores.push(`${g}: ${String(err.stack || err).slice(0, 240)}`); }
      caja.remove();
    }
    host.remove();
  }
  await espera(200);
  removeEventListener('error', oye); removeEventListener('unhandledrejection', oye);
  r.errores = [...new Set(errores)];
  return r;
};
