// S1 · gancho — ficha vertical-word-roll-blur-cycle (demos/typography/vertical-word-roll-blur-cycle/VerticalWordRollBlurCycle.tsx).
// «Matemáticas que se» fijo; el rodillo pasa por explican → ven → juegan → entienden (la conclusión, la palabra más larga).
// Se conservan del demo: pasos [0.16, 0.36, 0.56] de 0.11, mezcla 0.7·outQuint + 0.3·outBack, ventana de tres filas,
// desenfoque solo vertical por distancia + desenfoque de movimiento, achatado de tambor, teñido 1 − 2.4d y salida 0.9–0.985.
// Adaptado a vertical: diseño 540 × 960 con CSS zoom; el tallo va en su propio renglón encima del rodillo (ancho fijo,
// así el tallo nunca se mueve). Colores de la app: tinta clara, palabra en hielo.
import React from 'react';
import { DesignStage, E, seg, useT } from '../fx/Motion';
import { Fondo } from './Fondo';
import { DISPLAY, Z } from '../tokens';

export const S1_DURATION = 150;
const ROW = 72, FS = 56, MASK_W = 400;
const WORDS = ['explican', 'ven', 'juegan', 'entienden'];
const STEPS = [0.16, 0.36, 0.56];
const ACCENT = Z.brand, ACCENT_DIM = '#4f577a';
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const mixHex = (a: string, b: string, k: number) => {
  k = clamp01(k);
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16)), pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  const c = pa.map((v, i) => Math.round(v + (pb[i] - v) * k));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
};
const reelAt = (t: number) => { let p = 0; for (const s of STEPS) { const u = seg(t, s, s + 0.11); p += 0.7 * E.outQuint(u) + 0.3 * E.outBack(u); } return p; };
const DT = 0.5 / (S1_DURATION - 1);

export const S1Gancho: React.FC = () => {
  const t = useT();
  const p = reelAt(t);
  const speed = Math.abs(reelAt(t + DT) - reelAt(t - DT));
  const motionBlur = Math.min(5, speed * ROW * 0.22);
  const intro = seg(t, 0, 0.08, E.outCubic);
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Fondo glow={{ x: 0.5, y: 0.47 }} strength={0.1 + 0.08 * clamp01(1 - Math.abs(p - 3) * 2)} />
      <DesignStage w={540} h={960} bg="transparent" raster="zoom">
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: DISPLAY, opacity: 1 - seg(t, 0.9, 0.985) * 0.999 }}>
          <div style={{ fontSize: FS, fontWeight: 500, color: Z.ink, letterSpacing: -0.8, opacity: intro, transform: `translateY(${(1 - intro) * 10}px)` }}>Matemáticas que se</div>
          <div style={{ position: 'relative', height: ROW * 3, width: MASK_W, overflow: 'hidden', marginTop: -2,
            WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 26%, #000 74%, transparent 100%)', maskImage: 'linear-gradient(180deg, transparent 0%, #000 26%, #000 74%, transparent 100%)', opacity: intro }}>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 0, transform: `translateY(${ROW - p * ROW}px)` }}>
              {WORDS.map((w, i) => {
                const d = Math.abs(i - p);
                const blur = (d < 1 ? 3 * d : 3 + 2 * Math.min(d - 1, 1)) * (FS / 30) + motionBlur;
                const op = d < 1 ? 1 - 0.65 * d : Math.max(0.1, 0.35 - 0.23 * (d - 1));
                const squash = 1 - 0.14 * Math.min(1, d / 1.4);
                const fid = `s1roll-${i}`;
                return (
                  <div key={w} style={{ position: 'relative', height: ROW }}>
                    <svg width={0} height={0} style={{ position: 'absolute' }} aria-hidden>
                      <filter id={fid} x="-10%" y="-120%" width="120%" height="340%" colorInterpolationFilters="sRGB"><feGaussianBlur stdDeviation={`0 ${blur.toFixed(2)}`} /></filter>
                    </svg>
                    <div style={{ height: ROW, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: FS, fontWeight: 600, letterSpacing: -0.8, whiteSpace: 'nowrap',
                      filter: blur > 0.05 ? `url(#${fid})` : undefined, opacity: op, transform: `scaleY(${squash.toFixed(4)})`, color: mixHex(ACCENT_DIM, ACCENT, clamp01(1 - d * 2.4)),
                      textShadow: d < 0.2 ? `0 0 ${18 * (1 - d * 5)}px rgba(111,211,255,0.45)` : undefined }}>{w}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </DesignStage>
    </div>
  );
};
