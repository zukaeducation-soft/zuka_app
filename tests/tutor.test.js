// Tutor de dudas (spec 2026-11-28-tutor-de-dudas): botón «Duda» en la lección, hoja con preguntas listas y una función del
// servidor que responde con Gemini sin regalar la respuesta de los ejercicios.
const test = require('node:test'), assert = require('node:assert/strict'), fs = require('fs'), path = require('path');
const { loadScripts, get } = require('./load'), read = f => fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
const ctx = loadScripts(['js/tutor.js']);
const cuerpo = get(ctx, 'tutorCuerpo'), chips = get(ctx, 'tutorChips');

test('lo que viaja al servidor: lección, foco recortado y nunca la solución', () => {
  const l = { id: 'pu-cm-2', title: 'Fracciones' }, c = { id: 'preuda', name: 'Preuniversitario UdeA' };
  const ex = { tipo: 'ejercicio', q: 'Reparte $\\tfrac{3}{4}$ de pizza', hint: 'Piensa en cuartos', answer: 2, solution: 'secreta' };
  const b = cuerpo(ex, { curso: c, leccion: l, pregunta: '  ¿Por dónde empiezo?  ', historial: [] });
  assert.equal(b.curso, 'Preuniversitario UdeA'); assert.equal(b.leccion, 'Fracciones'); assert.equal(b.leccion_id, 'pu-cm-2');
  assert.equal(b.tipo, 'ejercicio'); assert.equal(b.pregunta, '¿Por dónde empiezo?');
  assert.match(b.contexto, /Reparte/); assert.match(b.contexto, /Piensa en cuartos/);
  assert.doesNotMatch(JSON.stringify(b), /secreta|"answer"/, 'la solución no viaja');
  const largo = cuerpo({ tipo: 'explica', texto: 'x'.repeat(5000), ideas: ['a'.repeat(900)] }, { curso: c, leccion: l, pregunta: 'p'.repeat(900), historial: Array(9).fill({ rol: 'tutor', texto: 'r'.repeat(3000) }) });
  assert.ok(largo.pregunta.length <= 300); assert.ok(largo.contexto.length <= 1500); assert.ok(largo.historial.length <= 4);
  assert.ok(largo.historial.every(h => h.texto.length <= 1200 && ['estudiante', 'tutor'].includes(h.rol)));
});

test('preguntas listas según dónde se está', () => {
  assert.ok(chips({ tipo: 'explica' }).includes('Dame otro ejemplo'));
  assert.ok(chips({ tipo: 'ejercicio' }).includes('¿Por dónde empiezo?'));
  assert.ok(!chips({ tipo: 'ejercicio' }).includes('Dame otro ejemplo'));
});

test('el botón va en la lección, no en las evaluaciones, y los focos se enlazan', () => {
  const app = read('js/app.js'), ex = read('js/exercises.js'), xp = read('js/explora.js'), t = read('js/tutor.js');
  assert.match(app, /tutorBoton\(\)/); assert.match(app, /tutorLeccion\(c, l\)/);
  assert.match(ex, /tutorEnfoca\(/); assert.match(xp, /tutorEnfoca\(/);
  assert.match(t, /exam/, 'en una evaluación el botón se esconde');
  const idx = read('index.html'); assert.ok(idx.indexOf("js/tutor.js") > idx.indexOf('js/exercises.js') && idx.indexOf('js/tutor.js') < idx.indexOf('js/app.js'));
});

test('la función del servidor: sesión, tope diario, llave en secreto y reglas que no regalan la respuesta', () => {
  const f = read('supabase/functions/tutor/index.ts');
  assert.match(f, /Deno\.env\.get\("GEMINI_API_KEY"\)/); assert.match(f, /x-goog-api-key/);
  assert.ok(!/AIza|eyJ|sb_secret/.test(f), 'ninguna llave escrita');
  assert.match(f, /auth\.getUser\(/, 'solo con sesión');
  assert.match(f, /tutor_reserva/); assert.match(f, /"limite"/); assert.match(f, /"apagado"/);
  assert.match(f, /no des la respuesta final/i);
  assert.match(f, /nunca instrucciones/i, 'lo del estudiante no cambia las reglas');
});

test('la tabla guarda las preguntas con RLS y solo la administración la lee', () => {
  const m = fs.readdirSync(path.join(__dirname, '..', 'supabase/migrations')).find(x => /tutor/.test(x));
  assert.ok(m, 'falta la migración'); const s = read(`supabase/migrations/${m}`);
  assert.match(s, /create table public\.tutor_preguntas/); assert.match(s, /enable row level security/);
  assert.match(s, /for select[^;]*es_admin\(\)/);
});

// ---- arreglos de la revisión fresca ----
test('el tope se reserva con candado antes de llamar a Gemini y se devuelve si no hay respuesta', () => {
  const m = fs.readdirSync(path.join(__dirname, '..', 'supabase/migrations')).find(x => /tutor/.test(x)), s = read(`supabase/migrations/${m}`);
  assert.match(s, /pg_advisory_xact_lock/); assert.match(s, /revoke execute on function public\.tutor_reserva[^;]*authenticated/);
  assert.match(s, /insert into public\.ajustes \(clave, valor\) values \('tutor_diario'/);
  const f = read('supabase/functions/tutor/index.ts');
  assert.ok(f.indexOf('tutor_reserva') < f.indexOf('generativelanguage'), 'reserva primero');
  assert.match(f, /devuelve\(\)/); assert.match(f, /"bloqueo"/); assert.match(f, /MAX_TOKENS/);
  assert.match(f, /systemInstruction: \{ parts: \[\{ text: REGLAS \}\] \}/, 'en el sistema solo van las reglas');
  assert.match(f, /<pantalla>/);
});

test('la conversación solo lleva vueltas completas y lo del estudiante va corto', () => {
  const v = get(ctx, 'tutorVueltas');
  const h = [{ rol: 'estudiante', texto: 'a' }, { rol: 'tutor', texto: 'b' }, { rol: 'estudiante', texto: 'c' }, { rol: 'tutor', mal: true, texto: 'x' }, { rol: 'estudiante', texto: 'd' }, { rol: 'tutor', espera: true }];
  assert.equal(v(h).map(x => x.texto).join(), 'a,b');
  const b = cuerpo({ tipo: 'explica', texto: 't' }, { pregunta: 'p', historial: [{ rol: 'estudiante', texto: 'e'.repeat(900) }, { rol: 'tutor', texto: 'r'.repeat(900) }] });
  assert.equal(b.historial[0].texto.length, 300); assert.equal(b.historial[1].texto.length, 900);
});

test('el botón: en la cabecera de la explicación (celular), fuera en los videos y al terminar', () => {
  const app = read('js/app.js'), css = read('css/styles.css');
  assert.match(read('js/explora.js'), /tutorBoton\('tutor-xp'\)/);
  assert.match(app, /function showClip\(n, forward\) \{\s+tutorEnfoca\(null\)/); assert.match(app, /finished = true; tutorEnfoca\(null\)/);
  assert.match(css, /@media \(min-width: 1000px\) \{ \.xp-meta \.tutor-xp \{ display: none; \} \}/);
  assert.match(read('js/tutor.js'), /Tutor\.pidiendo/);
});

test('el botón solo se enciende cuando existe el ajuste tutor_diario y es mayor que 0', () => {
  const on = get(ctx, 'tutorEncendido');
  assert.equal(on({}), false, 'sin la migración no sale'); assert.equal(on({ tutor_diario: '0' }), false, '0 lo apaga');
  assert.equal(on({ tutor_diario: '20' }), true); assert.equal(on(null), false);
});
