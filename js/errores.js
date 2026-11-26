// Errores en producción (auditoría 2026-11-26, hallazgo 15): lo que falla en el celular de un estudiante llega a la
// tabla `errores_app` de Supabase (se lee en su editor de tablas). Mensaje, archivo y línea; la base anota además de qué cuenta vino y en qué navegador.
// Cada error una vez y pocos por sesión; la base pone además su tope por estudiante y por día.
const ERR_TOPE = 5, errVistos = new Set();

// El mensaje puede traer datos de quien usa la app: el navegador cita un trozo de lo que no pudo leer ("Juan…" is not
// valid JSON) y una dirección puede llevar un token. Lo citado se recorta y a las direcciones se les quita la consulta.
function errorLimpia(m) {
  return m.replace(/(https?:\/\/[^\s"'?#]+)[?#][^\s"']*/g, '$1').replace(/(["'])(.{12})[^"']{4,}\1/g, '$1$2…$1');
}

// Pura: la ficha que se manda, o null si no vale la pena (ruido del navegador, extensiones, mensaje vacío).
function errorFicha(mensaje, archivo, linea) {
  const m = String(mensaje || '').trim(), a = String(archivo || '');
  if (!m || /^Script error\.?$/i.test(m) || /ResizeObserver loop/i.test(m) || /^(chrome|moz|safari(-web)?)-extension:/i.test(a)) return null;
  const origen = a.replace(/^[a-z]+:\/\/[^/]+/i, '').replace(/[?#].*$/, '');   // solo la ruta
  return { mensaje: errorLimpia(m).slice(0, 300), origen: origen.slice(0, 200), linea: Number.isInteger(linea) && linea > 0 ? linea : 0 };
}

function errorManda(f, cuenta) {
  if (!f) return;
  // En pleno arranque `Cuenta` existe pero aún no tiene valor, y leerla lanza: ese error no se puede mandar.
  if (cuenta === undefined) { try { cuenta = Cuenta; } catch (e) { cuenta = null; } }
  const k = `${f.mensaje}|${f.origen}|${f.linea}`;
  if (errVistos.has(k) || errVistos.size >= ERR_TOPE) return;
  if (!cuenta || !cuenta.sb || !cuenta.user || cuenta.user.offline) return;
  errVistos.add(k);
  try { Promise.resolve(cuenta.sb.rpc('registrar_error', { p: f })).catch(() => {}); } catch (e) { /* avisar de un fallo no puede fallar */ }
}

if (typeof addEventListener === 'function' && typeof location !== 'undefined' && !/^(localhost|127\.0\.0\.1)$|\.localhost$/.test(location.hostname)) {
  addEventListener('error', e => errorManda(errorFicha(e.message, e.filename, e.lineno)));
  addEventListener('unhandledrejection', e => {
    const r = e.reason, pila = String((r && r.stack) || ''), donde = pila.match(/(https?:\/\/[^\s)]+?):(\d+):\d+/);
    errorManda(errorFicha(`Promesa: ${(r && r.message) || r}`, donde ? donde[1] : '', donde ? +donde[2] : 0));
  });
}
