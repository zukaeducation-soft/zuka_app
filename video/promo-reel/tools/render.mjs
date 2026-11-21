// Render completo por la API: imagen en tramos (cada tramo se reintenta si una pestaña se traba), efectos de sonido en
// una sola pasada de audio (sin cortes entre tramos) y la música mezclada aparte con ffmpeg, así las dos versiones salen
// de la misma línea de tiempo.
// Uso: node tools/render.mjs   → out/reel.mp4 (con música) y out/reel-sin-musica.mp4 (solo efectos)
import path from 'path';
import fs from 'fs';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const FF = process.env.FFMPEG || 'ffmpeg';
const tmp = path.join(root, 'out', 'tramos');
fs.mkdirSync(tmp, { recursive: true });
const serveUrl = await bundle({ entryPoint: path.join(root, 'src', 'index.ts') });
const inputProps = { bgm: false };
const composition = await selectComposition({ serveUrl, id: 'Reel', inputProps });
const N = composition.durationInFrames, STEP = 240;
const parts = [];
for (let a = 0; a < N; a += STEP) {
  const b = Math.min(N - 1, a + STEP - 1), file = path.join(tmp, `t${String(a).padStart(5, '0')}.mp4`);
  parts.push(file);
  if (fs.existsSync(file)) { console.log('ya está', a, b); continue; }
  for (let k = 1; k <= 4; k++) {
    try {
      await renderMedia({ serveUrl, composition, inputProps, codec: 'h264', muted: true, outputLocation: file + '.part.mp4', frameRange: [a, b], concurrency: 2, timeoutInMilliseconds: 90000, crf: 16 });
      fs.renameSync(file + '.part.mp4', file); console.log('tramo', a, b); break;
    } catch (e) { console.log('reintento', a, b, k, String(e.message || e).slice(0, 120)); if (k === 4) throw e; }
  }
}
const sfx = path.join(tmp, 'sfx.wav');
for (let k = 1; k <= 4 && !fs.existsSync(sfx); k++) {
  try { await renderMedia({ serveUrl, composition, inputProps, codec: 'wav', outputLocation: sfx + '.part.wav', concurrency: 2, timeoutInMilliseconds: 120000 }); fs.renameSync(sfx + '.part.wav', sfx); }
  catch (e) { console.log('reintento efectos', k, String(e.message || e).slice(0, 120)); if (k === 4) throw e; }
}
console.log('efectos');
fs.writeFileSync(path.join(tmp, 'lista.txt'), parts.map((p) => `file '${p.replace(/\\/g, '/')}'`).join('\n'));
const video = path.join(tmp, 'video.mp4');
// rango limitado y etiquetas bt709 (las redes vuelven a codificar: así no cambian el negro) y más tasa para los degradados
execFileSync(FF, ['-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', path.join(tmp, 'lista.txt'),
  '-vf', 'scale=in_range=full:out_range=tv:out_color_matrix=bt709,format=yuv420p', '-c:v', 'libx264', '-preset', 'slow', '-crf', '15', '-tune', 'film',
  '-color_range', 'tv', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', video]);
const dur = N / 30;
execFileSync(FF, ['-v', 'error', '-y', '-i', video, '-i', sfx, '-map', '0:v', '-map', '1:a', '-af', 'loudnorm=I=-16:TP=-2:LRA=11,aresample=48000,alimiter=limit=0.84:level=false', '-ar', '48000', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', path.join(root, 'out', 'reel-sin-musica.mp4')]);
execFileSync(FF, ['-v', 'error', '-y', '-i', video, '-i', sfx, '-i', path.join(root, 'public', 'audio', 'bgm.mp3'),
  '-filter_complex', `[2:a]atrim=0:${dur},asetpts=N/SR/TB,volume=0.42,afade=t=in:st=0:d=0.6,afade=t=out:st=${(dur - 1.6).toFixed(2)}:d=1.6[m];[1:a][m]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14.5:TP=-2:LRA=11,aresample=48000,alimiter=limit=0.84:level=false[a]`,
  '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', path.join(root, 'out', 'reel.mp4')]);
console.log('listo', dur.toFixed(1), 's');
