// Restablecer la contraseña (spec 2026-11-24-restablecer-clave).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { ROOT, loadScripts, get } = require('./load');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const ctx = loadScripts(['js/clave.js']);
const URLSP = URLSearchParams;
ctx.URLSearchParams = URLSP;

test('el enlace del correo vuelve a la dirección pública, o al servidor local al desarrollar', () => {
  const v = get(ctx, 'correoVuelve');
  assert.equal(v({ hostname: 'zukaapp.vercel.app', origin: 'https://zukaapp.vercel.app', pathname: '/' }), 'https://zukaapp-mu.vercel.app/');
  assert.equal(v({ hostname: 'localhost', origin: 'http://localhost:5173', pathname: '/' }), 'http://localhost:5173/');
  assert.doesNotMatch(read('js/cuenta.js'), /(emailRedirectTo|redirectTo): location/);
});
test('se reconoce el enlace de recuperar, el vencido y la dirección normal', () => {
  const e = get(ctx, 'claveEnlace');
  assert.equal(e('#access_token=a&type=recovery'), 'nueva');
  assert.equal(e('#error=access_denied&error_code=otp_expired'), 'vencido');
  assert.equal(e('#access_token=a&type=signup'), null);
  assert.equal(e('#', '?tab=clips'), null);
});
test('pide 8 caracteres y que las dos sean iguales', () => {
  const r = get(ctx, 'claveRevisa');
  assert.match(r('corta', 'corta').error, /8 caracteres/);
  assert.match(r('12345678', '12345679').error, /iguales/);
  assert.equal(r('12345678', '12345678').error, null);
  assert.equal(r('', '').igual, false);
});
test('la vista no la tapa la presentación ni la cierra el aviso de sesión', () => {
  assert.match(read('js/presentacion.js'), /if \(claveAlAbrir\(\)\) return true;/);
  assert.match(read('js/cuenta.js'), /if \(!Clave\.vista\) authCerrar\(\)/);
  const html = read('index.html');
  assert.ok(html.indexOf('js/clave.js') < html.indexOf('js/app.js') && html.includes('css/clave.css'));
  assert.match(read('sw.js'), /'js\/clave\.js'/);
  assert.match(read('sw.js'), /'css\/clave\.css'/);
});
test('el correo lleva el enlace de Supabase y ningún archivo externo', () => {
  const c = read('supabase/correos/restablecer-clave.html');
  assert.equal(c.match(/\{\{ \.ConfirmationURL \}\}/g).length, 2);
  assert.doesNotMatch(c, /<img|<script|<link/);
});
