// Juegos y explicaciones por curso (auditoría 2026-11-26, hallazgo 7; spec 2026-11-26-arranque-liviano).
// La app publicada arranca con el núcleo y los datos de los cursos. Los juegos y las explicaciones interactivas van en
// paquetes aparte, uno por curso y uno común (los arma tools/empaquetar.js; la lista es ZUKA_PAQUETES, de
// js/paquetes/lista.js), y se piden aquí la primera vez que se abre una lección, una evaluación o un reto de ese curso.
// En localhost los archivos van sueltos y ya están todos: nada se pide y todo sigue siendo inmediato.
// Va de último en la lista de index.html: envuelve startLesson, startExam y startReto, que ya existen.
const CARGA = (() => {
  // null = archivos sueltos (o pruebas en Node): no hay nada que pedir.
  const P = (typeof window !== 'undefined' && window.zukaPaquetes && window.ZUKA_PAQUETES) || null;
  const pedidos = {}, listos = new Set();
  const pide = src => (pedidos[src] ??= new Promise((ok, no) => {
    const s = document.createElement('script');
    s.async = false;   // el común se ejecuta antes que el del curso
    s.onload = () => { listos.add(src); ok(); };
    s.onerror = () => { delete pedidos[src]; s.remove(); no(new Error('no llegó ' + src)); };
    s.src = src;
    document.head.appendChild(s);
  }));
  const de = id => (P ? [P.comun, ...[P.cursos[id]].flat()].filter(Boolean) : []);   // un curso grande viene en varios trozos, en orden
  const faltan = id => de(id).filter(s => !listos.has(s));
  // De uno en uno: si el común no llega, el del curso no se pide (sin el común se ejecutaría a medias y, ya marcado como
  // cargado, dejaría el curso roto hasta recargar).
  const enFila = lista => lista.filter(s => !listos.has(s)).reduce((antes, s) => (antes ? antes.then(() => pide(s)) : pide(s)), null) || Promise.resolve();
  const curso = id => enFila(de(id));
  const todo = () => (P ? enFila([P.comun, ...Object.values(P.cursos).flat()]) : Promise.resolve());
  // Un paquete que no llega puede ser de una versión que ya no está publicada (otra pestaña aceptó la actualización y el
  // service worker soltó los paquetes viejos): si la lista de ahora ya no lo nombra, lo que toca es recargar.
  const caduco = () => (typeof fetch !== 'function' ? Promise.resolve(false)
    : fetch('js/paquetes/lista.js', { cache: 'no-store' }).then(r => (r.ok ? r.text() : '')).then(t => !!t && [P.comun, ...Object.values(P.cursos).flat()].some(s => !t.includes(s.split('/').pop())), () => false));

  // ¿Está todo lo que esta lección necesita? Si el reparto por curso dejó algo fuera, se pide el resto (red de seguridad).
  const completo = n => (n.juegos || []).every(g => typeof GAMES === 'undefined' || GAMES[g]) &&
    (!n.explora || !P || !P.explora.includes(n.explora) || typeof EXPLORA === 'undefined' || !!EXPLORA[n.explora]);
  const juegosDe = lista => (lista || []).map(e => (e && e.ex ? e.ex : e)).filter(e => e && e.type === 'play').map(e => e.game);

  let abriendo = false;
  // Corre `sigue` cuando el curso tiene sus juegos: de inmediato si ya estaban; si no, al llegar.
  function abre(cursoId, necesita, sigue) {
    if (!P || (!faltan(cursoId).length && completo(necesita))) return sigue();
    if (abriendo) return undefined;   // un segundo toque mientras llega no abre dos lecciones
    abriendo = true;
    const di = m => { if (typeof toast === 'function') toast(m); };
    const aviso = setTimeout(() => { if (abriendo) di('Cargando los juegos…'); }, 600);
    // Una red que se queda colgada no deja la app sin poder abrir lecciones: a los 20 s se suelta y se avisa.
    let vencido = false;
    const plazo = setTimeout(() => { if (!abriendo) return; vencido = true; abriendo = false; di('Los juegos están tardando en cargar. Revisa tu conexión e inténtalo otra vez.'); }, 20000);
    const fin = () => { clearTimeout(aviso); clearTimeout(plazo); const sigo = !vencido; if (sigo) abriendo = false; return sigo; };
    return curso(cursoId).then(() => (completo(necesita) ? null : todo())).then(
      () => { if (fin()) sigue(); },
      () => {
        if (!fin()) return undefined;
        return caduco().then(viejo => {
          if (!viejo) return di('No se pudieron cargar los juegos. Revisa tu conexión e inténtalo otra vez.');
          di('Hay una versión nueva de Zuka: se va a recargar.');
          return setTimeout(() => location.reload(), 1200);
        });
      });
  }
  return { P, abre, curso, todo, faltan, completo, juegosDe, listos };
})();

// ¿La lección tiene explicación interactiva? Antes de cargar las explicaciones lo dice la lista de paquetes.
const hayExplora = id => !!((typeof EXPLORA !== 'undefined' && EXPLORA[id]) || (CARGA.P && CARGA.P.explora.includes(id)));

if (typeof startLesson === 'function') {
  const abreLeccion = startLesson;
  startLesson = function (c, l) {
    if (typeof planMotivo === 'function' && planMotivo(l.id)) return abreLeccion.apply(this, arguments);   // con candado no se pide nada
    return CARGA.abre(c.id, { juegos: CARGA.juegosDe(l.ex), explora: l.id }, () => abreLeccion.apply(this, arguments));
  };
}
if (typeof startExam === 'function') {
  const abreExamen = startExam;
  startExam = function (c, u) {
    return CARGA.abre(c.id, { juegos: CARGA.juegosDe(u && u.exam && u.exam.items) }, () => abreExamen.apply(this, arguments));
  };
}
if (typeof startReto === 'function') {
  const abreReto = startReto;
  startReto = function (c, r) {
    return CARGA.abre(c.id, { juegos: CARGA.juegosDe(r && r.steps) }, () => abreReto.apply(this, arguments));
  };
}

// Quien ya estudia un curso lo tiene listo antes de tocar «Continuar»: se piden sus juegos con la app ya pintada y quieta.
// Quien solo mira la portada o la Tienda no los pide nunca.
if (CARGA.P && typeof S !== 'undefined' && S.lastLesson && S.course) {
  const suyo = typeof findLesson === 'function' && findLesson(S.lastLesson);   // el curso de la última lección, no el que se mira
  const pide = () => CARGA.curso(suyo ? suyo.c.id : S.course).catch(() => {});
  setTimeout(() => (typeof requestIdleCallback === 'function' ? requestIdleCallback(pide, { timeout: 4000 }) : pide()), 1500);
}
