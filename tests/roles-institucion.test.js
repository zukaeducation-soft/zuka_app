// Docentes y gestores en la app; datos que solo cambia la institución (spec 2026-11-25-roles-de-institucion).
const test = require('node:test'), assert = require('node:assert/strict'), fs = require('fs'), path = require('path');
const { loadScripts, get } = require('./load'), read = f => fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
const ctx = loadScripts(['js/instituciones.js', 'js/equipo.js']), rol = get(ctx, 'rolDe'), fija = get(ctx, 'instFija');
test('rol en la app', () => {
  const g = { rol: 'gestor' }, d = { papel: 'docente' }, e = { papel: 'gestor' };
  assert.equal([rol(g, [d]), rol(g, [e]), rol(g, [d, e]), rol(g, []), rol(g), rol({ rol: 'estudiante' }, []), rol({ rol: 'admin' }, [e]), rol(null, [])].join(), 'docente,gestor,gestor,equipo,equipo,,,');
});
test('datos fijos: miembros de una institución, salvo quien compró por su cuenta', () => {
  const now = Date.parse('2026-11-25'), inst = { nombres: ['X'] }, e = { rol: 'estudiante' };
  assert.equal(fija({ perfil: e, inst }, now), true); assert.equal(fija({ perfil: { rol: 'gestor' } }, now), true); assert.equal(fija({ perfil: { rol: 'admin' }, inst }, now), false); assert.equal(fija({ perfil: e, inst: { nombres: [] } }, now), false);
  assert.equal(fija({ perfil: e, inst, accesos: [{ tipo: 'pago', hasta: '2027-01-01' }] }, now), false); assert.equal(fija({ perfil: e, inst, accesos: [{ tipo: 'pago', hasta: '2027-01-01', institucion: 'X' }] }, now), true);
});
test('nada se edita en la app y la base lo impide', () => {
  assert.match(read('js/perfil.js'), /cuentaFija\(\) \? ' readonly/); assert.match(read('js/datos.js'), /if \(!fija && cuentaFija\(\)\)/); assert.match(read('js/cuenta.js'), /admin \|\| cuentaFija\(\) \? '<span>/);
  const sql = read('supabase/migrations/20261125000005_datos_de_institucion.sql'); assert.match(sql, /create trigger perfil_fijo before update on public\.perfiles/); assert.match(read('js/inicio.js'), /if \(rolEquipo\(\)\) return renderHomeEquipo/);
  const idx = read('index.html'); assert.ok(idx.indexOf('js/portal.js') < idx.indexOf('js/equipo.js') && idx.indexOf('js/equipo.js') < idx.indexOf('js/app.js'));
});
