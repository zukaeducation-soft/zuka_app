// Aviso de versión nueva. El service worker nuevo queda en espera (sw.js ya no se salta la
// espera) y aquí se detecta: o ya estaba esperando al abrir la app (el usuario dijo «más tarde»
// la vez anterior) o acaba de instalarse mientras otra versión controla la página. En los dos
// casos se llama a show(apply, dismiss): apply le manda SKIP_WAITING al SW en espera y recarga
// la página una sola vez cuando toma el control; dismiss solo oculta el aviso hasta la próxima
// apertura. La primera instalación (sin controlador) no avisa.

function watchUpdates(reg, sw, show, reload = () => location.reload()) {
  let accepted = false, reloaded = false;
  sw.addEventListener('controllerchange', () => {
    if (!accepted || reloaded) return;
    reloaded = true;
    reload();
  });
  const offer = worker => show(() => { accepted = true; worker.postMessage('SKIP_WAITING'); }, () => {});
  if (reg.waiting) offer(reg.waiting);
  reg.addEventListener('updatefound', () => {
    const w = reg.installing;
    if (!w) return;
    w.addEventListener('statechange', () => {
      if (w.state === 'installed' && sw.controller) offer(w);
    });
  });
}

// Una app que vive en «recientes» no vuelve a cargar la página: al volver a primer plano se busca versión nueva, a lo
// sumo una vez por hora. Si la hay, el aviso de arriba la ofrece.
function checkOnReturn(reg, doc = document, now = Date.now, cada = 3600000) {
  let ultima = now();
  doc.addEventListener('visibilitychange', () => {
    if (doc.visibilityState !== 'visible' || now() - ultima < cada) return;
    ultima = now();
    try { Promise.resolve(reg.update()).catch(() => {}); } catch (e) { /* sin red no pasa nada */ }
  });
}
