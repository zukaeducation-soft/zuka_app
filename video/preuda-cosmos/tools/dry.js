// Ejecuta una película con un contexto falso para encontrar cuelgues y errores: node video/preuda-cosmos/tools/dry.js <película> [t…]
const vm = require('vm'), fs = require('fs'), path = require('path');
const dir = require('path').join(__dirname, '..'), F = process.argv[2];
const noop = () => {};
const X = new Proxy({}, { get: (o, k) => (k === 'measureText' ? s => ({ width: String(s).length * 20 }) : k in o ? o[k] : (k === 'createRadialGradient' || k === 'createLinearGradient') ? () => ({ addColorStop: noop }) : noop), set: (o, k, v) => { o[k] = v; return true; } });
const ctx = { console, Math, X: null }; vm.createContext(ctx);
const src = ['kit.js', 'preu.js', 'piezas.js', `films/${F}.data.js`, `films/${F}.js`].map(f => fs.readFileSync(path.join(dir, f), 'utf8')).join('\n;\n') + '\n;X = __X; globalThis.film = film; globalThis.D = D;';
ctx.__X = X; ctx.module = undefined;
vm.runInContext(src.replace(/if \(typeof module !== 'undefined'\) module.exports = D;/g, ''), ctx);
const times = process.argv.slice(3).length ? process.argv.slice(3).map(Number) : Array.from({ length: Math.ceil(ctx.D.DUR / 0.5) }, (_, i) => i * 0.5);
for (const t of times) { try { vm.runInContext(`film(${t})`, ctx, { timeout: 2000 }); } catch (e) { console.log('t=' + t, e.message.split('\n')[0]); } }
console.log('ok', F);
