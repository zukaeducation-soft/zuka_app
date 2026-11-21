// S3 · cada lección empieza con un video — toma propia (sin ficha: una sola pantalla real que entra y se queda).
// El celular sube con un resorte que sobrepasa un poco (y1 > 1, regla de aterrizaje) y reproduce 4 s del video real de la
// lección «Proporciones» (Eratóstenes y el pozo de Siena). Rótulo arriba: «Un video corto / que explica la idea».
import React from 'react';
import { AbsoluteFill, OffthreadVideo, interpolate, staticFile, useCurrentFrame, Easing } from 'remotion';
import { TextReveal } from '../fx/Look';
import { Fondo } from './Fondo';
import { Celular } from './Celular';
import { DISPLAY, UI, Z } from '../tokens';

export const S3_DURATION = 120;
const SW = 600, SH = 1066;
export const S3Video: React.FC = () => {
  const f = useCurrentFrame();
  const up = interpolate(f, [4, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.34, 1.32, 0.64, 1) });
  const push = interpolate(f, [30, 120], [1, 1.035], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const chip = interpolate(f, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill>
      <Fondo glow={{ x: 0.5, y: 0.62 }} strength={0.14} />
      <div style={{ position: 'absolute', left: 80, top: 150, fontFamily: UI, fontSize: 28, fontWeight: 600, letterSpacing: '0.14em', color: Z.brand, opacity: chip }}>PRIMERO, LA IDEA</div>
      <div style={{ position: 'absolute', left: 76, top: 196, fontFamily: DISPLAY, color: Z.ink, lineHeight: 1.04 }}>
        <div style={{ fontSize: 92, fontWeight: 600, letterSpacing: -1.6 }}><TextReveal text="Un video corto" by="word" variant="rise" start={6} each={16} gap={4} /></div>
        <div style={{ fontSize: 92, fontWeight: 300, color: Z.mute, letterSpacing: -1.6 }}><TextReveal text="que lo explica claro." by="word" variant="rise" start={12} each={16} gap={4} /></div>
      </div>
      <div style={{ position: 'absolute', left: (1080 - SW - 28) / 2, top: 560, transform: `translateY(${(1 - up) * 700}px) scale(${push})`, transformOrigin: '50% 30%', opacity: Math.min(1, up * 3) }}>
        <Celular w={SW} h={SH} glow={0.5}>
          <OffthreadVideo src={staticFile('media/leccion.mp4')} muted style={{ width: SW, height: SH, objectFit: 'cover' }} />
        </Celular>
      </div>
    </AbsoluteFill>
  );
};
