// Acceso por código y por curso: lógica pura (sin red ni DOM), compartida por la app y el panel /admin.
// La validación que cuenta está en Supabase (privado.puede, acceso_video, entrar-codigo); esto solo decide qué se pinta.
// Spec: docs/superpowers/specs/2026-11-24-acceso-por-codigo.md

const SUPA_URL = 'https://bzzzufyjhzjqawwrduom.supabase.co';
const SUPA_KEY = 'sb_publishable_g9nE6w3Da54IrmHbeKkXQg_iWR8eiAC';   // llave pública: va en el navegador

const DIA_MS = 86400000;
const vigente = (hasta, now) => !hasta || new Date(hasta).getTime() > now;

// Cómo está el acceso a un curso: 'pago', 'prueba' (primer mundo), 'vencido' (pagó y venció: conserva el primer mundo),
// 'prueba_vencida' o 'ninguno'. `accesos`: filas { curso, tipo, desde, hasta }.
function accesoCurso(accesos, curso, now = Date.now()) {
  const a = (accesos || []).find(x => x.curso === curso);
  if (!a) return { estado: 'ninguno', dias: null };
  const ok = vigente(a.hasta, now), dias = a.hasta ? Math.max(0, Math.ceil((new Date(a.hasta).getTime() - now) / DIA_MS)) : null;
  return { estado: a.tipo === 'pago' ? (ok ? 'pago' : 'vencido') : ok ? 'prueba' : 'prueba_vencida', dias, desde: a.desde, hasta: a.hasta };
}
const tienePago = (accesos, now = Date.now()) => (accesos || []).some(a => a.tipo === 'pago' && vigente(a.hasta, now));

// Por qué no se puede abrir un recurso { curso, prueba, tipo }: null (sí se puede), 'sesion', 'bloqueado', 'ninguno',
// 'prueba' (hay que comprar), 'vencido', 'prueba_vencida' o 'tutorias' (sin horas en el saldo). Los clips, para todos.
function motivoBloqueo({ perfil, accesos, horas = 0 }, rec, now = Date.now()) {
  if (!rec || rec.tipo === 'clip') return null;
  if (!perfil) return 'sesion';
  if (perfil.rol === 'admin') return null;
  if (perfil.bloqueado) return 'bloqueado';
  if (rec.tipo === 'tutorias') return horas > 0 ? null : 'tutorias';
  const { estado } = accesoCurso(accesos, rec.curso, now);
  if (estado === 'pago' || (rec.prueba && (estado === 'prueba' || estado === 'vencido'))) return null;
  return estado;
}

// Textos de la hoja que sale al tocar algo con candado.
function textoBloqueo(motivo, curso = 'este curso') {
  return ({
    sesion: { title: 'Entra con tu código', text: 'Este contenido se abre con tu código de acceso. Si aún no tienes uno, pídelo por WhatsApp.' },
    bloqueado: { title: 'Tu acceso está en pausa', text: 'Escríbenos por WhatsApp para revisarlo. Tu avance sigue guardado.' },
    ninguno: { title: `${curso} no está en tu plan`, text: 'Puedes comprarlo y se activa en tu mismo código, junto a lo que ya tienes.' },
    prueba: { title: 'Aquí termina tu prueba', text: `Tu código de prueba abre el primer mundo de ${curso}. Compra el acceso y sigue donde vas: tu avance no se pierde.` },
    prueba_vencida: { title: 'Tu prueba terminó', text: `Compra el acceso a ${curso} para continuar. Tu avance sigue guardado.` },
    vencido: { title: 'Tu plan venció', text: `Renueva ${curso} para seguir. Conservas el primer mundo y todo tu avance.` },
    tutorias: { title: 'Necesitas horas de asesoría', text: 'Compra una hora o un paquete y separa tu asesoría virtual cuando quieras.' },
  })[motivo] || null;
}

// Todo lo que la app puede abrir, como filas de la tabla `lecciones` (tools/sync-lecciones.js). `prueba`: lo abre un código
// de prueba (el primer mundo del curso; con componentes, el primer mundo de cada uno).
function catalogo(courses, curios = [], summaryOf = () => null) {
  const rows = [], seen = new Set();
  const add = r => { if (r.id && !seen.has(r.id)) { seen.add(r.id); rows.push(r); } };
  const videos = l => [l.clip, ...(l.more || [])].map(c => c && c.bunny).filter(Boolean);
  courses.forEach(c => {
    let n = 0;
    c.units.forEach((u, ui) => {
      const prueba = ui === 0 || (!!c.blocks && !!u.block && c.units[ui - 1].block !== u.block);
      const base = { curso: c.id, prueba };
      u.lessons.forEach(l => add({ ...base, id: l.id, tipo: 'leccion', titulo: l.title, orden: n++, videos: videos(l) }));
      if (u.boss) add({ ...base, id: u.boss.id, tipo: 'jefe', titulo: u.boss.title, orden: n, videos: videos(u.boss) });
      if (u.exam) add({ ...base, id: u.exam.id, tipo: 'evaluacion', titulo: u.exam.title, orden: n, videos: [] });
      if (summaryOf(u)) add({ ...base, id: `resumen-${u.world}`, tipo: 'resumen', titulo: `Resumen: ${u.title}`, orden: n, videos: [] });
    });
  });
  curios.forEach((q, i) => add({ id: q.id, tipo: 'clip', curso: 'clips', prueba: true, titulo: q.title, orden: i, videos: videos(q) }));
  add({ id: 'tutorias', tipo: 'tutorias', curso: '', prueba: false, titulo: 'Tutorías', orden: 0, videos: [] });
  return rows;
}

// Códigos: 10 letras o números, en mayúsculas, sin I, O, 0 ni 1. Se aceptan con espacios o guiones.
const limpiaCodigo = s => String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
const codigoValido = s => /^[A-HJ-NP-Z2-9]{10}$/.test(s);
const muestraCodigo = c => `${c.slice(0, 5)}-${c.slice(5)}`;

const CANJE_ERRORES = {
  formato: 'El código tiene 10 letras y números. Revísalo: no lleva la letra I, la O, el 0 ni el 1.',
  no_existe: 'Ese código no existe. Revisa que esté escrito igual que te lo enviaron.',
  ya_usado: 'Ese código ya pertenece a otra cuenta.',
  es_tuyo: 'Ese código ya es el de tu cuenta.',
  bloqueado: 'Ese código está en pausa. Escríbenos por WhatsApp para revisarlo.',
  es_admin: 'Esa cuenta es administradora: entra con correo y contraseña.',
  dispositivos: 'Ese código ya está abierto en el máximo de dispositivos. Escríbenos por WhatsApp para liberar uno.',
  demasiados_intentos: 'Demasiados intentos fallidos. Espera 15 minutos y vuelve a intentarlo.',
  sin_sesion: 'Entra con tu código para continuar.',
  sin_perfil: 'Tu cuenta aún no está lista. Cierra sesión, vuelve a entrar e inténtalo de nuevo.',
  red: 'No hay conexión. Revisa tu internet e inténtalo de nuevo.',
};
const canjeError = e => CANJE_ERRORES[e] || 'No se pudo usar el código. Inténtalo de nuevo.';

// ---------- WhatsApp ----------
const waNumero = s => { const d = String(s || '').replace(/\D/g, ''); return d.length === 10 ? `57${d}` : d; };   // celular de Colombia sin indicativo
function waLink(numero, texto) {
  const n = waNumero(numero);
  return n ? `https://wa.me/${n}?text=${encodeURIComponent(texto)}` : '';
}
const mesesTexto = n => (n === 1 ? '1 mes' : `${n} meses`);
const WA = {
  prueba: () => 'Hola, quiero un código de prueba de Zuka.',
  compra: ({ curso, meses, precio, codigo, nombre }) => `Hola, quiero comprar ${curso} por ${mesesTexto(meses)}${precio != null ? ` (${cop(precio)})` : ''}.${nombre ? ` Soy ${nombre}.` : ''}${codigo ? ` Mi código de Zuka es ${muestraCodigo(codigo)}.` : ''}`,
  ayuda: codigo => `Hola, necesito ayuda con mi acceso a Zuka.${codigo ? ` Mi código es ${muestraCodigo(codigo)}.` : ''}`,
  envio: ({ nombre, codigo, cursos, prueba, dias, url }) => `Hola${nombre ? ` ${nombre}` : ''}, este es tu código de acceso a Zuka: *${muestraCodigo(codigo)}*\n\nEntra en ${url} y escríbelo. ${prueba
    ? `Es de prueba: abre el primer mundo de ${cursos}${dias ? ` durante ${diasTexto(dias)}` : ''}.` : `Abre ${cursos} completo${dias ? ` por ${diasTexto(dias)}, desde que lo uses por primera vez` : ''}.`}\n\nGuárdalo: con el mismo código entras siempre y conservas tu avance.`,
  activado: ({ nombre, codigo, cursos, hasta, url }) => `Hola${nombre ? ` ${nombre}` : ''}, tu acceso a ${cursos} ya está activo${hasta ? ` hasta el ${fechaCorta(hasta)}` : ''}. Entra en ${url} con tu código de siempre${codigo ? `: *${muestraCodigo(codigo)}*` : ''}. Tu avance sigue igual.`,
  vence: ({ nombre, curso, hasta }) => `Hola${nombre ? ` ${nombre}` : ''}, tu acceso a ${curso} en Zuka vence el ${fechaCorta(hasta)}. Si renuevas antes, los días se suman y no pierdes tu avance.`,
};

// ---------- datos personales (obligatorios con un curso pagado) ----------
const DATOS = {
  genero: [['mujer', 'Mujer'], ['hombre', 'Hombre'], ['no_binario', 'No binario'], ['otro', 'Otro'], ['no_dice', 'Prefiero no decirlo']],
  edad: [['menos_14', 'Menos de 14'], ['14_15', '14 a 15'], ['16_17', '16 a 17'], ['18_20', '18 a 20'], ['21_25', '21 a 25'], ['26_35', '26 a 35'], ['mas_35', 'Más de 35']],
  ocupacion: [['colegio', 'Colegio, antes de 10.º'], ['decimo', 'Estoy en 10.º'], ['once', 'Estoy en 11.º'], ['egresado', 'Ya me gradué del colegio'], ['universidad', 'Estoy en la universidad'], ['trabajo', 'Trabajo'], ['otro', 'Otro']],
  presentacion: [['1_mes', 'En menos de un mes'], ['3_meses', 'En 1 a 3 meses'], ['6_meses', 'En 4 a 6 meses'], ['mas', 'En más de 6 meses'], ['no', 'No voy a presentar examen']],
  horas: [['1_2', '1 a 2 horas'], ['3_5', '3 a 5 horas'], ['6_10', '6 a 10 horas'], ['mas_10', 'Más de 10 horas']],
  medio: [['amigo', 'Me la recomendaron'], ['instagram', 'Instagram'], ['tiktok', 'TikTok'], ['facebook', 'Facebook'], ['whatsapp', 'WhatsApp'], ['colegio', 'Colegio o profesor'], ['google', 'Google'], ['otro', 'Otro']],
};
const datoTexto = (k, v) => ((DATOS[k] || []).find(x => x[0] === v) || [])[1] || v || '—';
const esMenor = edad => ['menos_14', '14_15', '16_17'].includes(edad);
const datosFaltan = (perfil, accesos, now = Date.now()) => !!perfil && perfil.rol !== 'admin' && !perfil.datos_en && tienePago(accesos, now);
// El primer dato que falta o no es válido: { campo, texto }, o null.
function datosError(d) {
  const falta = k => !String(d[k] || '').trim();
  const pide = { nombre: 'Escribe tu nombre completo.', correo: 'Escribe tu correo.', telefono: 'Escribe tu celular.', ciudad: 'Escribe tu ciudad.',
    genero: 'Elige tu género o «Prefiero no decirlo».', edad: 'Elige tu rango de edad.', ocupacion: 'Cuéntanos qué haces ahora.' };
  const orden = ['nombre', 'correo', 'telefono', 'ciudad', 'genero', 'edad', 'ocupacion'];
  for (const campo of orden) {
    if (falta(campo)) return { campo, texto: pide[campo] };
    if (campo === 'correo' && !/^\S+@\S+\.\S+$/.test(d.correo.trim())) return { campo, texto: 'Ese correo no parece válido.' };
    const n = campo === 'telefono' ? d.telefono.replace(/\D/g, '').length : 10;
    if (n < 7 || n > 15) return { campo, texto: 'Revisa tu celular: debe tener al menos 7 números.' };
  }
  if (!d.acepta) return { campo: 'acepta', texto: esMenor(d.edad) ? 'Falta la autorización de tu acudiente.' : 'Falta tu autorización para guardar los datos.' };
  return null;
}

// Mensajes de Supabase Auth en español.
function authError(err) {
  const m = String((err && (err.code || err.message)) || '').toLowerCase();
  if (/invalid login|invalid_credentials/.test(m)) return 'Correo o contraseña incorrectos.';
  if (/not confirmed|email_not_confirmed/.test(m)) return 'Confirma tu correo: te enviamos un enlace al registrarte.';
  if (/already registered|user_already_exists/.test(m)) return 'Ya hay una cuenta con ese correo. Inicia sesión.';
  if (/weak_password|at least|should be/.test(m)) return 'La contraseña es muy corta o débil: usa 8 caracteres o más.';
  if (/rate limit|too many|over_/.test(m)) return 'Demasiados intentos. Espera un momento e inténtalo de nuevo.';
  if (/valid email|invalid.*email|email_address_invalid/.test(m)) return 'Ese correo no parece válido.';
  if (/fetch|network/.test(m)) return 'No hay conexión. Revisa tu internet e inténtalo de nuevo.';
  return 'No se pudo completar. Inténtalo de nuevo.';
}

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
function fechaCorta(iso) {
  const d = new Date(iso);
  return iso && !Number.isNaN(d.getTime()) ? `${d.getDate()} ${MESES[d.getMonth()]} ${d.getFullYear()}` : '—';
}
const cop = n => `$ ${String(Math.round(Number(n) || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
const diasTexto = n => (n === 1 ? '1 día' : `${n} días`);
