// Planes, candados y códigos: lógica pura de js/acceso.js y su conexión con la app.
// Spec: docs/superpowers/specs/2026-11-17-usuarios-planes-admin.md
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const ctx = loadScripts(['js/ui.js', 'js/worlds.js', 'js/content.js', 'js/curiosidades.js', 'js/acceso.js',
  'js/courses/algebra.js', 'js/courses/trig.js', 'js/courses/trig-juegos.js', 'js/courses/calculo.js',
  'js/courses/geometria.js', 'js/courses/preuda-razonamiento.js', 'js/courses/preuda-lectura.js', 'js/courses/preuda.js', 'js/data.js']);
const f = name => get(ctx, name);
const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');

const NOW = Date.parse('2026-11-17T12:00:00Z');
const dias = n => new Date(NOW + n * 86400000).toISOString();
const acc = (tipo, hasta, curso = 'preuda') => ({ curso, tipo, desde: dias(-1), hasta });

test('accesoCurso: pago, prueba, vencidos y ninguno, con días que nunca dicen 0 si sigue vigente', () => {
  const a = f('accesoCurso');
  assert.strictEqual(a([], 'preuda', NOW).estado, 'ninguno');
  assert.strictEqual(a([acc('pago', dias(29.2))], 'preuda', NOW).dias, 30);
  assert.strictEqual(a([acc('pago', dias(0.01))], 'preuda', NOW).dias, 1);
  assert.strictEqual(a([acc('pago', dias(-1))], 'preuda', NOW).estado, 'vencido');
  assert.strictEqual(a([acc('prueba', null)], 'preuda', NOW).estado, 'prueba');
  assert.strictEqual(a([acc('prueba', dias(-1))], 'preuda', NOW).estado, 'prueba_vencida');
  assert.strictEqual(a([acc('pago', dias(5))], 'trig', NOW).estado, 'ninguno', 'cada curso por su cuenta');
});

test('motivoBloqueo: la prueba abre solo el primer mundo; vencido lo conserva; bloqueado, nada; admin, todo', () => {
  const m = f('motivoBloqueo'), uno = { curso: 'preuda', prueba: true, tipo: 'leccion' }, dos = { curso: 'preuda', prueba: false, tipo: 'leccion' };
  const con = (...accesos) => ({ perfil: { rol: 'estudiante' }, accesos });
  assert.strictEqual(m({ perfil: null }, uno, NOW), 'sesion');
  assert.strictEqual(m({ perfil: null }, { tipo: 'clip' }, NOW), null);
  assert.strictEqual(m(con(acc('prueba', null)), uno, NOW), null);
  assert.strictEqual(m(con(acc('prueba', null)), dos, NOW), 'prueba');
  assert.strictEqual(m(con(acc('prueba', dias(-1))), uno, NOW), 'prueba_vencida');
  assert.strictEqual(m(con(acc('pago', dias(5))), dos, NOW), null);
  assert.strictEqual(m(con(acc('pago', dias(-1))), dos, NOW), 'vencido');
  assert.strictEqual(m(con(acc('pago', dias(-1))), uno, NOW), null);
  assert.strictEqual(m(con(), uno, NOW), 'ninguno');
  assert.strictEqual(m(con(acc('prueba', null)), { tipo: 'tutorias' }, NOW), 'tutorias');
  assert.strictEqual(m({ ...con(acc('pago', dias(5))), horas: 0 }, { tipo: 'tutorias' }, NOW), 'tutorias');
  assert.strictEqual(m({ ...con(), horas: 1 }, { tipo: 'tutorias' }, NOW), null);
  assert.strictEqual(m({ perfil: { rol: 'estudiante', bloqueado: true }, accesos: [acc('pago', dias(5))] }, uno, NOW), 'bloqueado');
  assert.strictEqual(m({ perfil: { rol: 'admin' }, accesos: [] }, dos, NOW), null);
  for (const k of ['sesion', 'bloqueado', 'ninguno', 'prueba', 'prueba_vencida', 'vencido', 'tutorias']) assert.ok(f('textoBloqueo')(k, 'X').title, k);
  assert.strictEqual(f('textoBloqueo')(null), null);
});

test('datos personales: obligatorios con un curso pagado vigente y sin completar; se dice el primero que falta', () => {
  const faltan = f('datosFaltan'), e = f('datosError'), p = { rol: 'estudiante', datos_en: null };
  assert.strictEqual(faltan(p, [acc('prueba', null)], NOW), false);
  assert.strictEqual(faltan(p, [acc('pago', dias(5))], NOW), true);
  assert.strictEqual(faltan({ ...p, datos_en: dias(0) }, [acc('pago', dias(5))], NOW), false);
  assert.strictEqual(faltan({ ...p, rol: 'admin' }, [acc('pago', dias(5))], NOW), false);
  const ok = { nombre: 'Ana', correo: 'a@b.co', telefono: '300 123 4567', ciudad: 'Bello', genero: 'mujer', edad: '16_17', ocupacion: 'once', acepta: true };
  assert.strictEqual(e(ok), null);
  for (const k of ['nombre', 'correo', 'telefono', 'ciudad', 'genero', 'edad', 'ocupacion']) assert.strictEqual(e({ ...ok, [k]: ' ' }).campo, k);
  assert.strictEqual(e({ ...ok, correo: 'x' }).campo, 'correo');
  assert.strictEqual(e({ ...ok, telefono: '12' }).campo, 'telefono');
  assert.match(e({ ...ok, acepta: false }).texto, /acudiente/);
});

test('WhatsApp: celular de Colombia sin indicativo, mensaje con curso, duración y código; sin número no hay enlace', () => {
  const link = f('waLink'), wa = f('WA');
  assert.strictEqual(link('', 'x'), '');
  assert.ok(link('300 123 4567', 'a b').startsWith('https://wa.me/573001234567?text=a%20b'));
  assert.match(wa.compra({ curso: 'Trigonometría', meses: 6, precio: 90000, codigo: 'ABCDEFGH23', nombre: 'Ana' }), /Trigonometría por 6 meses \(\$ 90\.000\).*Ana.*ABCDE-FGH23/);
  assert.match(wa.envio({ nombre: '', codigo: 'ABCDEFGH23', cursos: 'X', prueba: true, dias: null, url: 'u' }), /primer mundo/);
});

test('códigos: se limpian espacios, guiones y minúsculas; sin I, O, 0 ni 1', () => {
  const limpia = f('limpiaCodigo'), valido = f('codigoValido');
  assert.strictEqual(limpia(' abcde-fgh23 '), 'ABCDEFGH23');
  assert.ok(valido('ABCDEFGH23'));
  for (const malo of ['ABCDEFGH2', 'ABCDEFGH234', 'ABCDEFGHI2', 'ABCDEFGHO2', 'ABCDEFGH20', 'ABCDEFGH21']) assert.ok(!valido(malo), malo);
  assert.strictEqual(f('muestraCodigo')('ABCDEFGH23'), 'ABCDE-FGH23');
});

test('cada error del canje tiene un mensaje claro', () => {
  const e = f('canjeError'), E = f('CANJE_ERRORES');
  for (const k of ['formato', 'no_existe', 'ya_usado', 'bloqueado', 'dispositivos', 'es_admin', 'demasiados_intentos', 'sin_sesion', 'red']) assert.ok(E[k].length > 20, k);
  assert.match(e('demasiados_intentos'), /15 minutos/);
  assert.ok(e('otra_cosa').length > 10);
});

test('precios en pesos y fechas cortas', () => {
  assert.strictEqual(f('cop')(20000), '$ 20.000');
  assert.strictEqual(f('cop')(299000), '$ 299.000');
  assert.strictEqual(f('fechaCorta')('2026-12-17T15:00:00Z'), '17 dic 2026');
  assert.strictEqual(f('fechaCorta')(null), '—');
  assert.strictEqual(f('diasTexto')(1), '1 día');
});

test('catálogo: cada lección una vez; la prueba abre el primer mundo y, con componentes, el primero de cada uno', () => {
  const rows = f('catalogo(COURSES, CURIOS, summaryOf)');
  const ids = rows.map(r => r.id);
  assert.strictEqual(new Set(ids).size, ids.length, 'ids repetidos');
  for (const c of f('COURSES')) {
    const ls = rows.filter(r => r.curso === c.id && r.tipo === 'leccion');
    assert.strictEqual(ls.length, c.units.flatMap(u => u.lessons).length, c.id);
    const primeros = c.blocks ? c.blocks.map(b => c.units.find(u => u.block === b.id)) : [c.units[0]];
    assert.strictEqual(ls.filter(r => r.prueba).map(r => r.id).sort().join(), primeros.flatMap(u => u.lessons.map(l => l.id)).sort().join(), c.id);
  }
  assert.ok(rows.filter(r => r.tipo === 'clip').every(r => r.prueba));
  assert.strictEqual(rows.find(r => r.id === 'tutorias').prueba, false);
  // Los videos de Bunny de las lecciones quedan en el catálogo: el servidor solo firma los que conoce.
  const alg0b = rows.find(r => r.id === 'alg-0b');
  assert.ok(alg0b.videos.length && alg0b.videos.every(v => /^[0-9a-f-]{36}$/.test(v)));
});

test('la app carga acceso.js y cuenta.js antes de app.js, y el service worker los guarda', () => {
  const html = read('index.html'), sw = require('./load').shell();
  const at = s => html.indexOf(s);
  assert.ok(at('js/acceso.js') > 0 && at('js/acceso.js') < at('js/cuenta.js') && at('js/cuenta.js') < at('js/app.js'));
  assert.ok(at('js/data.js') < at('js/cuenta.js'), 'cuenta.js necesita los cursos ya cargados');
  assert.ok(sw.includes("'js/acceso.js'") && sw.includes("'js/cuenta.js'"));
  assert.match(sw, /supabase\\\.co/, 'las respuestas de Supabase no se guardan en la caché');
});

test('los candados por plan están en la hoja de lección, al empezarla, en jefes, evaluaciones, resúmenes y tutorías', () => {
  const app = read('js/app.js');
  assert.match(app, /function openLessonSheet\(c, l\) \{\s+if \(planMotivo\(l\.id\)\) return openBloqueo\(l\.id\)/);
  assert.match(app, /function startLesson\(c, l\) \{\s+if \(planMotivo\(l\.id\)\) return openBloqueo\(l\.id\)/);
  assert.match(app, /function openBossSheet\(c, u\) \{\s+if \(planMotivo\(u\.boss\.id\)\)/);
  assert.match(app, /planMotivo\(u\.exam\.id\) \? openBloqueo\(u\.exam\.id\)/);
  assert.match(app, /data-summary-lock/);
  assert.match(read('js/tutorias.js'), /planMotivo\('tutorias'\)/);
  assert.match(app, /cuentaProgreso\(l\.id, \{ completada: true \}\)/, 'al terminar una lección se guarda el avance');
});

test('solo el administrador ve todo abierto; a los demás se les abre de a una lección', () => {
  const cuenta = read('js/cuenta.js'), app = read('js/app.js');
  assert.match(cuenta, /function cuentaRol\(\) \{\s+if \(SIN_CANDADOS\) return;\s+S\.unlockAll = cuentaEsAdmin\(\) \|\| \(Cuenta\.perfil \|\| \{\}\)\.rol === 'gestor';/, 'el admin y quien enseña; nadie más');
  assert.match(app, /cuentaInit\(\);[^\n]*\ngo\(tabFromURL/, 'el rol se aplica antes de pintar la primera pantalla');
  assert.match(app, /\$\{SIN_CANDADOS \? `<section class="set-group">\s*<h3 class="eyebrow">Administración<\/h3>\s*<button class="set-row" data-set="unlockAll"/, 'el interruptor solo existe en el computador de desarrollo');
  assert.match(app, /: cuentaEsAdmin\(\) \? `<section class="set-group">[\s\S]{0,200}Acceso total/, 'el admin ve que tiene acceso total, sin interruptor para apagarlo');
  // Sin modo revisión, una lección se abre al completar la anterior, también entre un mundo y el siguiente.
  assert.match(app, /return i <= 0 \|\| blockStart\(c, l\) \|\| isDone\(l\) \|\| isDone\(ls\[i - 1\]\);/);
});

test('sin sesión la app pide el código; no hay registro ni exploración sin cuenta', () => {
  const cuenta = read('js/cuenta.js'), app = read('js/app.js');
  assert.match(app, /if \(!presentacionPide\(\) && !cuentaPideEntrar\(\) && tourShouldStart\(S\)\) startTour\(\);/, 'el recorrido espera a la pantalla de entrada');
  for (const x of ["functions.invoke('entrar-codigo'", 'verifyOtp(', 'signInWithPassword', 'data-olvide']) assert.ok(cuenta.includes(x), x);
  for (const x of ['signUp(', 'data-guest', 'S.guest']) assert.ok(!cuenta.includes(x), x);
  assert.match(read('css/styles.css'), /#auth \{[^}]*z-index: 35/, 'encima de la app y debajo de las hojas');
  const fn = read('supabase/functions/entrar-codigo/index.ts');
  assert.match(fn, /SUPABASE_SERVICE_ROLE_KEY/);
  assert.ok(!/eyJ|sb_secret/.test(fn), 'ninguna llave escrita');
});

test('el panel no usa clases «ad-…»: los bloqueadores de anuncios las esconden', () => {
  for (const f of ['admin/panel.js', 'admin/tienda.js', 'admin/panel.css', 'admin/admin.css', 'admin/index.html']) {
    assert.ok(!/(^|[^A-Za-z0-9])ad-[a-z]/.test(read(f)), f);
  }
});

test('los estudiantes ven los cursos de su cuenta y los publicados', () => {
  const cuenta = read('js/cuenta.js'), app = read('js/app.js');
  assert.match(cuenta, /const cursoVisible = c => \(portalMios\(\) \? c\.id === 'preicfes' : SIN_CANDADOS \|\| cuentaEsAdmin\(\) \|\| \(Cuenta\.accesos \|\| \[\]\)\.some\(a => a\.curso === c\.id\) \|\| \(!cuentaDeColegio\(\) && !cursoBorrador\(c\)\)\);/);
  assert.match(cuenta, /from\('cursos'\)\.select\('id,publicado'\)/);
  assert.match(app, /const courseById = id => cursosVisibles\(\)\.find/, 'un curso oculto no queda como curso actual');
  assert.match(app, /<div class="course-list">\$\{cursosVisibles\(\)\.map/, 'el selector de cursos');
  assert.match(read('js/perfil.js'), /const all = cursosConAcceso\(\)\.flatMap\(lessonsOf\)/, 'el progreso del perfil');
  const sql = read('supabase/migrations/20261117000004_cursos_y_uso.sql');
  assert.match(sql, /grant update \(publicado\) on public\.cursos to authenticated/);
  assert.match(sql, /create policy cursos_editar[^;]*es_admin/);
  // Los cursos de la app y los de la tabla son los mismos.
  const all = fs.readdirSync(path.join(ROOT, 'supabase/migrations')).map(m => read(`supabase/migrations/${m}`)).join(' ');
  for (const c of f('COURSES')) assert.ok(all.includes(`('${c.id}', `), c.id);
});

test('el uso diario se envía solo con sesión y lo escribe únicamente registrar_uso', () => {
  const cuenta = read('js/cuenta.js'), sql = read('supabase/migrations/20261117000004_cursos_y_uso.sql');
  assert.match(cuenta, /rpc\('registrar_uso'/);
  assert.match(cuenta, /if \(visible && usoHayAlguien\(now\) && dt > 0 && dt < 40 && Cuenta\.user && !Cuenta\.user\.offline\) uso\.seg \+= dt;/, 'solo cuenta con la app a la vista');
  assert.ok(!/grant[^;]*(insert|update)[^;]*on public\.uso_diario/.test(sql), 'un estudiante no puede escribir su uso a mano');
  assert.match(cuenta, /if \(document\.hidden\) \{ usoTick\(true\); usoEnvia\(\); \} else uso.t = uso.act = Date\.now\(\);/, 'al esconder la app se envía lo que iba');
  assert.match(read('supabase/migrations/20261117000005_ajustes_uso.sql'), /least\(u\.ejercicios \+ excluded\.ejercicios, 5000\)/, 'topes diarios');
  assert.match(sql, /least\(greatest\(coalesce\(p_segundos, 0\), 0\), 300\)/, 'cada envío cuenta a lo sumo 5 minutos');
  const admin = read('admin/panel.js');
  for (const s of ['vCursos', 'Avance', 'Minutos por día', "admin('resumen')"]) assert.ok(admin.includes(s), s);
});

test('el video de Bunny se pide al servidor (enlace firmado) y no se arma en el navegador', () => {
  const player = read('js/player.js');
  assert.match(player, /cuentaVideoBase\(clip\.bunny\)/);
  assert.match(player, /if \(this\.pending\) return;/, 'play() no toca un video sin fuente (arrancaría en silencio)');
  assert.ok(!/poster="\$\{esc\(base\)\}/.test(player), 'la miniatura también sale del enlace firmado');
  const fn = read('supabase/functions/video-url/index.ts');
  assert.match(fn, /rpc\("acceso_video"/, 'el servidor pregunta a la base si la cuenta puede ver el video');
  assert.match(fn, /BUNNY_TOKEN_KEY/);
  assert.ok(!/BUNNY_TOKEN_KEY\s*=\s*["']/.test(fn), 'la llave de Bunny no va en el código');
});

test('seguridad de la base: RLS en todas las tablas, columnas del plan sin permiso de edición y funciones con search_path', () => {
  const sql = read('supabase/migrations/20261117000001_usuarios_planes.sql') + read('supabase/migrations/20261117000002_funciones_privadas.sql');
  for (const t of ['planes', 'perfiles', 'codigos', 'progreso', 'intentos_canje', 'lecciones', 'admin_pendiente']) {
    assert.match(sql, new RegExp(`alter table public\\.${t} enable row level security`), t);
  }
  assert.match(sql, /grant update \(nombre, telefono\) on public\.perfiles to authenticated/);
  assert.ok(!/grant (all|update) on public\.perfiles/.test(sql), 'nadie recibe permiso de editar rol, nivel ni fechas');
  assert.ok(!/grant[^;]*on public\.codigos to anon/.test(sql));
  const canje = read('supabase/migrations/20261117000003_canje_confirmar.sql');
  assert.match(canje, /'error', 'reemplaza'/, 'un código de otro nivel no reemplaza un plan vigente sin confirmar');
  assert.match(read('js/cuenta.js'), /\(S\.cuenta \|\| \{\}\)\.uid !== Cuenta\.user\.id\) return;/, 'el avance de otra cuenta no sube a esta');
  const fns = (sql + canje + read('supabase/migrations/20261117000004_cursos_y_uso.sql')).match(/create function[\s\S]*?as \$\$/g);
  assert.ok(fns.length >= 20);
  for (const fn of fns) assert.match(fn, /set search_path = ''/, fn.slice(0, 60));
  assert.ok(!/sb_secret|service_role key|eyJhbGciOi/.test(read('js/acceso.js')), 'en el navegador solo va la llave pública');
});

test('Bunny: lo nuevo sale de la biblioteca nueva y lo de la vieja sigue con su servidor y su firma', () => {
  const { loadScripts, get } = require('./load');
  const ctx = loadScripts(['js/content.js', 'js/courses/algebra.js', 'js/curiosidades.js']);
  const host = get(ctx, 'bunnyHost'), viejos = get(ctx, 'BUNNY_VIEJOS');
  assert.equal(host('2c656c56-44bc-4925-97f2-df27f61c74da'), 'vz-1a76d229-c83.b-cdn.net');
  assert.equal(host('a05c46b4-a0b6-4ee8-8103-b775378e43c4'), 'vz-2449e89f-b51.b-cdn.net');
  // Los clips ya viven en la biblioteca nueva.
  for (const c of get(ctx, 'CURIOS')) if (c.clip.bunny) assert.ok(!viejos.has(c.clip.bunny), `${c.id} sigue en la vieja`);
  const fs = require('fs');
  assert.match(fs.readFileSync('js/player.js', 'utf8'), /bunnyHost\(clip\.bunny\)/);
  assert.match(fs.readFileSync('js/cuenta.js', 'utf8'), /bunnyHost\(id\)/);
});

test('acceso por código: RLS en las tablas nuevas y las funciones que escriben, fuera del alcance del navegador', () => {
  const sql = read('supabase/migrations/20261124000001_acceso_codigo.sql');
  for (const t of ['accesos', 'productos', 'solicitudes', 'pagos', 'ajustes', 'estado_app', 'dispositivos', 'intentos_codigo', 'auditoria', 'perfil_notas']) assert.match(sql, new RegExp(`alter table public\\.${t} enable row level security`), t);
  for (const fn of sql.match(/create (or replace )?function[\s\S]*?\$\$/g)) assert.match(fn, /set search_path = ''/, fn.slice(0, 60));
  assert.match(sql, /if not privado\.es_admin\(\) then raise exception/);
  assert.ok(!/grant (insert|update|delete|all)[^;]*on public\.(accesos|pagos|codigos|productos)/.test(sql));
  const servicio = sql.match(/grant execute[^;]*to service_role;/)[0];
  assert.match(servicio, /codigo_entrar/);
  assert.ok(!/codigo_(entrar|vincular)|privado\.conceder/.test(sql.match(/grant execute[^;]*to (anon, )?authenticated;/g).join()), 'solo el servidor estrena códigos');
  assert.match(sql, /delete from public\.codigos where usado_por = v_uid;/, 'al borrar una cuenta su código no queda libre');
});

test('Mis cursos, el perfil y las asesorías muestran solo lo comprado; la prueba no cuenta', () => {
  const c = f('comprado');
  assert.strictEqual(c([acc('prueba', null)], 'preuda', false, NOW), false);
  assert.strictEqual(c([acc('pago', dias(5))], 'preuda', true, NOW), true);
  assert.strictEqual(c([acc('pago', dias(-1))], 'preuda', false, NOW), true, 'vencido: sigue en Mis cursos para renovar');
  assert.strictEqual(c([acc('pago', dias(-1))], 'preuda', true, NOW), false, 'vencido: sin asesorías');
  assert.match(read('js/inicio.js'), /cursosVisibles\(\)\.filter\(c => cursoComprado\(c\)\)/);
  assert.match(read('js/tutorias.js'), /cursosVisibles\(\)\.filter\(c => cursoComprado\(c, true\) && !tuDeInst\(c\)\)/);
  assert.match(read('supabase/migrations/20261124000005_asesoria_curso.sql'), /tipo = ''pago'' and hasta > now\(\)/);
});
