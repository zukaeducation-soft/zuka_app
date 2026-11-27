// Entrada única (spec 2026-11-26-entrada-unica): una sola pantalla para todos; la app sabe qué cuenta es y la lleva a lo suyo.
const test = require('node:test'), assert = require('node:assert/strict'), fs = require('fs'), path = require('path');
const { loadScripts, get } = require('./load'), read = f => fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
const tipo = get(loadScripts(['js/acceso.js']), 'tipoCuenta');
const toca = get(loadScripts(['js/presentacion.js']), 'presentacionToca');

test('tipoCuenta distingue las seis cuentas y dice adónde va cada una', () => {
  const t = (p, i) => { const r = tipo(p, i); return r && `${r.tipo}>${r.destino}${r.inst ? `:${r.inst}` : ''}`; };
  assert.equal(t(null), null);
  assert.equal(t({ rol: 'admin' }, { equipo: [{ papel: 'gestor', institucion: 'X' }] }), 'admin>admin', 'la administración gana');
  assert.equal(t({ rol: 'gestor' }, { equipo: [{ papel: 'gestor', institucion: 'Colegio A' }] }), 'gestor>portal:Colegio A');
  assert.equal(t({ rol: 'gestor' }, { equipo: [{ papel: 'docente', institucion: 'Colegio A' }, { papel: 'gestor', institucion: 'Colegio B' }] }), 'gestor>portal:Colegio B', 'gestor en una y docente en otra');
  assert.equal(t({ rol: 'gestor' }, { equipo: [{ papel: 'docente', institucion: 'Colegio A' }] }), 'docente>portal:Colegio A');
  assert.equal(t({ rol: 'estudiante' }, { equipo: [{ papel: 'docente', institucion: 'Colegio A' }] }), 'docente>portal:Colegio A', 'docente con perfil de estudiante');
  assert.equal(t({ rol: 'gestor' }, {}), 'gestor>portal', 'gestor sin datos de equipo todavía');
  assert.equal(t({ rol: 'estudiante' }, { nombres: ['Colegio A'] }), 'colegio>app:Colegio A');
  assert.equal(t({ rol: 'estudiante' }, { nombres: [], equipo: [] }), 'independiente>app');
  assert.equal(t({ rol: 'estudiante' }), 'independiente>app');
});

test('bienvenida: dice qué cuenta entró, salvo a la independiente', () => {
  const b = get(loadScripts(['js/acceso.js']), 'bienvenidaCuenta');
  assert.equal(b({ tipo: 'docente', inst: 'Colegio A' }), 'Entraste como docente de Colegio A');
  assert.equal(b({ tipo: 'gestor', inst: 'Colegio A' }), 'Entraste como gestor de Colegio A');
  assert.equal(b({ tipo: 'colegio', inst: 'Colegio A' }), 'Entraste con Colegio A');
  assert.equal(b({ tipo: 'independiente' }), '');
  assert.equal(b(null), '');
});

test('la entrada de la app es una sola: código o correo en el mismo campo', () => {
  const c = read('js/cuenta.js'), s = c.slice(c.indexOf('function authScreen('), c.indexOf('function dispositivoId('));
  assert.match(s, /Código o correo/);
  assert.doesNotMatch(s, /data-modo/, 'sin botón para cambiar de pantalla');
  assert.match(s, /class="auth-clave"/, 'la contraseña está en el mismo formulario');
  assert.match(s, /includes\('@'\)/, 'un correo muestra la contraseña');
  assert.match(s, /entrarConCodigo\(/); assert.match(s, /signInWithPassword/);
  assert.match(read('css/styles.css'), /\.auth-clave\[hidden\] \{ display: none; \}/);
});

test('al entrar, cada cuenta va a lo suyo', () => {
  const c = read('js/cuenta.js');
  assert.match(c, /tipoCuenta\(/);
  assert.match(c, /\? v : '\/admin\/'; \}\)/, 'la administración va al panel (o a la página de la administración que pidió entrar)');
  assert.match(c, /portalPend = true/, 'gestores y docentes van al portal');
  assert.match(c, /bienvenidaCuenta\(/);
});

test('?admin, ?portal y ?entrar abren la entrada, sin presentación y también en localhost', () => {
  for (const q of ['?admin', '?portal', '?entrar']) assert.equal(toca({ standalone: false, user: null, query: q }), false, q);
  assert.equal(toca({ standalone: false, user: null, query: '' }), true);
  assert.match(read('js/cuenta.js'), /const SIN_CANDADOS = [^;]*candados\|entrar\|admin\|portal/);
});

test('el portal y el panel ya no tienen formulario de entrada', () => {
  const p = read('instituciones/portal/portal.js'), a = read('admin/panel.js');
  assert.doesNotMatch(p, /entrar-codigo|verifyOtp|Portal de instituciones<\/h1>/);
  assert.match(p, /!MARCO && !DEMO && !INST\) \{ location\.replace\('\/\?portal'\)/, 'sin marco, el portal vive en la app');
  assert.doesNotMatch(a, /signInWithPassword|Entrar al panel/);
  assert.match(a, /location\.replace\('\/\?admin'\)/);
});

test('los enlaces para entrar llevan a la entrada única', () => {
  const i = read('instituciones/index.html'), pz = read('js/presentacion.js');
  assert.doesNotMatch(i, /href="\/instituciones\/portal\/"/); assert.match(i, /href="\/\?portal"/);
  assert.doesNotMatch(pz, /href="instituciones\/portal\/"/); assert.match(pz, /href="\?portal"/);
  assert.match(i, /instituciones\/portal\/\?demo/, 'el portal de ejemplo sigue');
});

test('arreglos de la revisión: entrada nueva solo al enviar, vuelta del administrador y estudiante sin portal', () => {
  const c = read('js/cuenta.js');
  assert.match(c, /const recien = entrando && /, 'abrir con una sesión guardada no cuenta como entrada');
  assert.match(c, /location\.replace\(entradaVuelta\)/);
  assert.match(c, /Esta cuenta no tiene portal/);
  assert.match(read('js/clave.js'), /#auth input\[name="codigo"\][^;]*includes\('@'\)/, 'la recuperación copia el correo escrito');
  assert.match(read('instituciones/portal/portal.js'), /\/\?admin=\$\{encodeURIComponent/);
});
