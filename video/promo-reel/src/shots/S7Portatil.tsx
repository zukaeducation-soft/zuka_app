// S7 · también en el portátil — toma propia (dos capturas reales de la versión de escritorio, 1440 × 900 a 2x).
// El portátil entra inclinado hacia atrás y se endereza (perspectiva, sin rebote: es un objeto pesado); muestra la balanza
// grande al lado de su enunciado y luego, con un barrido de arriba abajo, la lectura en dos columnas (texto a la izquierda,
// actividad a la derecha). Rótulo arriba. Ritmo de la serie: entra en ~0.9 s y se queda quieto para leer.
import React from 'react';
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, Easing } from 'remotion';
import { TextReveal } from '../fx/Look';
import { Fondo } from './Fondo';
import { DISPLAY, UI, Z } from '../tokens';

export const S7_DURATION = 132;
const LW = 960, LH = 600; // pantalla 16:10
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
export const S7Portatil: React.FC = () => {
  const f = useCurrentFrame();
  const inT = interpolate(f, [6, 34], [0, 1], { ...clamp, easing: Easing.bezier(0.22, 1, 0.36, 1) });
  const tilt = 26 * (1 - inT) + 6;
  const sweep = interpolate(f, [72, 86], [0, 1], { ...clamp, easing: Easing.bezier(0.65, 0, 0.35, 1) });
  const push = interpolate(f, [34, 132], [1, 1.04], clamp);
  return (
    <AbsoluteFill>
      <Fondo glow={{ x: 0.5, y: 0.55 }} strength={0.15} />
      <div style={{ position: 'absolute', left: 80, top: 150, fontFamily: UI, fontSize: 28, fontWeight: 600, letterSpacing: '0.14em', color: Z.brand }}>EN EL CELULAR Y EN EL PORTÁTIL</div>
      <div style={{ position: 'absolute', left: 76, top: 196, fontFamily: DISPLAY, color: Z.ink, lineHeight: 1.04 }}>
        <div style={{ fontSize: 88, fontWeight: 600, letterSpacing: -1.6 }}><TextReveal text="En pantalla grande," by="word" variant="rise" start={4} each={16} gap={4} /></div>
        <div style={{ fontSize: 88, fontWeight: 300, color: Z.mute, letterSpacing: -1.6 }}><TextReveal text="todo a la vista." by="word" variant="rise" start={12} each={16} gap={4} /></div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 640, height: 900, perspective: 2200, perspectiveOrigin: '50% 30%' }}>
        <div style={{ position: 'absolute', left: (1080 - LW) / 2, top: 0, width: LW, transformOrigin: '50% 100%', transform: `translateY(${(1 - inT) * 520}px) rotateX(${tilt}deg) scale(${push})`, opacity: Math.min(1, inT * 2.5) }}>
          {/* tapa con la pantalla */}
          <div style={{ position: 'relative', width: LW, height: LH + 36, borderRadius: '26px 26px 8px 8px', background: '#05060b', padding: '18px 18px 18px', boxSizing: 'border-box', boxShadow: `0 0 0 2px ${Z.line}, 0 0 90px rgba(111,211,255,0.14), 0 60px 140px rgba(0,0,0,0.75)` }}>
            <div style={{ position: 'relative', width: LW - 36, height: LH - 0, borderRadius: 10, overflow: 'hidden', background: Z.bg }}>
              <Img src={staticFile('tex/desk-juego.jpg')} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 0 ${((1 - sweep) * 100).toFixed(2)}% 0)` }}>
                <Img src={staticFile('tex/desk-lectura.jpg')} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              {sweep > 0 && sweep < 1 && <div style={{ position: 'absolute', left: 0, right: 0, top: `${sweep * 100}%`, height: 2, background: Z.brand, boxShadow: `0 0 18px ${Z.brand}` }} />}
            </div>
          </div>
          {/* base */}
          <div style={{ position: 'relative', left: -50, width: LW + 100, height: 26, borderRadius: '4px 4px 22px 22px', background: 'linear-gradient(180deg, #1a1e30, #0b0d16)', boxShadow: `0 0 0 1.5px ${Z.line}` }}>
            <div style={{ position: 'absolute', left: '50%', top: 0, width: 160, height: 9, marginLeft: -80, borderRadius: '0 0 10px 10px', background: '#05060b' }} />
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 80, right: 80, top: 1400, display: 'flex', justifyContent: 'space-between', fontFamily: UI, fontSize: 32, fontWeight: 500, color: Z.mute }}>
        <span style={{ opacity: interpolate(f, [30, 44], [0, 1], clamp), color: sweep < 0.5 ? Z.ink : Z.mute }}>Juegos más grandes</span>
        <span style={{ opacity: interpolate(f, [78, 92], [0, 1], clamp), color: sweep >= 0.5 ? Z.ink : Z.mute }}>Lectura a dos columnas</span>
      </div>
    </AbsoluteFill>
  );
};
