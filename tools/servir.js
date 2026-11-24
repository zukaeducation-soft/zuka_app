// Sirve la app en local con las mismas cabeceras que manda Vercel (vercel.json) y sin lo que .vercelignore deja
// fuera: así se prueba la política de contenido (CSP) y la caché antes de subir.
// Uso: node tools/servir.js [puerto]   (5199 si no se dice)
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PORT = Number(process.argv[2]) || 5199;
const TIPOS = {
  html: 'text/html; charset=utf-8', js: 'text/javascript; charset=utf-8', css: 'text/css; charset=utf-8',
  json: 'application/json; charset=utf-8', svg: 'image/svg+xml', png: 'image/png', jpg: 'image/jpeg', webp: 'image/webp',
  m4a: 'audio/mp4', mp4: 'video/mp4', pdf: 'application/pdf', woff2: 'font/woff2', ico: 'image/x-icon',
};
const reglas = () => JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8')).headers
  .map(h => ({ re: new RegExp('^' + h.source + '$'), headers: h.headers }));
const fuera = () => fs.readFileSync(path.join(ROOT, '.vercelignore'), 'utf8').split(/\r?\n/).map(l => l.trim())
  .filter(l => l.startsWith('/')).map(p => new RegExp('^' + p.replace(/\./g, '\\.').replace(/\*/g, '[^/]*') + '(/|$)'));

http.createServer((req, res) => {
  let ruta = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (ruta.endsWith('/')) ruta += 'index.html';
  const archivo = path.join(ROOT, ruta);
  console.log(req.method, ruta);
  const publicado = archivo.startsWith(ROOT) && !fuera().some(re => re.test(ruta)) && !/\/\./.test(ruta);
  fs.readFile(archivo, (err, datos) => {
    for (const r of reglas()) if (r.re.test(ruta)) for (const h of r.headers) res.setHeader(h.key, h.value);
    if (err || !publicado) { res.writeHead(404, { 'Content-Type': 'text/plain' }); return res.end('No está'); }
    if (!res.hasHeader('Cache-Control')) res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    res.writeHead(200, { 'Content-Type': TIPOS[path.extname(archivo).slice(1).toLowerCase()] || 'application/octet-stream' });
    res.end(datos);
  });
}).listen(PORT, () => console.log(`Zuka como en Vercel: http://localhost:${PORT}`));
