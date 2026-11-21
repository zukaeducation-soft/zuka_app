// S4 · los juegos — ficha page-waterfall-wall (demos/ui-entrance/page-waterfall-wall/PageWaterfallWall.tsx + VerticalTicker.tsx).
// 24 pantallas reales de juegos (Preuniversitario, Álgebra, Trigonometría, Cálculo y Geometría) en 3 columnas sobre una
// pared inclinada 20° que corre a velocidades distintas (12/9/14 s, la del centro al revés) y un empuje lento 1 → 1.06
// por fuera con CSS zoom (el texto no se ablanda). Ninguna pantalla se repite entre columnas.
// Adaptado: vertical 1080 × 1920; tarjeta = pantalla del celular recortada a enunciado + juego; abajo, el rótulo.
import React from 'react';
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Grain } from '../fx/Polish';
import { TextReveal } from '../fx/Look';
import { VerticalTicker, TickerColumn } from '../ref/VerticalTicker';
import { DISPLAY, UI, Z } from '../tokens';

export const S4_DURATION = 150;
const ZOOM = 1.2, PUSH = 0.06;
// recorte: del enunciado al final del juego (pantallas de 390 × 844; sin la barra de arriba ni «Comprobar»)
const CROP_TOP = 0.045, CROP_H = 0.56;
const COLW = 270;
const shot = (i: number) => (
  <div style={{ position: 'relative', width: COLW, height: (COLW * 844 * CROP_H) / 390, borderRadius: 22, overflow: 'hidden', background: Z.bg, boxShadow: `0 0 0 1px ${Z.line}, 0 22px 48px -12px rgba(0,0,0,0.7)` }}>
    <Img src={staticFile(`tex/game-${i}.jpg`)} style={{ position: 'absolute', left: 0, top: -(COLW * 844 * CROP_TOP) / 390, width: COLW, display: 'block' }} />
  </div>
);
const cols = (loops: [number, number, number]): TickerColumn[] => [
  { items: [0, 3, 6, 9, 12, 15, 18, 21].map(shot), durationInSeconds: loops[0], direction: -1 },
  { items: [1, 4, 7, 10, 13, 16, 19, 22].map(shot), durationInSeconds: loops[1], direction: 1 },
  { items: [2, 5, 8, 11, 14, 17, 20, 23].map(shot), durationInSeconds: loops[2], direction: -1 },
];

export const S4Muro: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const push = interpolate(f, [0, durationInFrames], [1, 1 + PUSH], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const z = ZOOM * push;
  const inT = interpolate(f, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: Z.bg }}>
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse 70% 45% at 50% 40%, rgba(111,211,255,0.12), transparent 70%)' }} />
      <AbsoluteFill style={{ opacity: inT }}>
        <div style={{ position: 'absolute', left: 0, top: -120, width: 1080 / z, height: 1920 / z, zoom: z }}>
          <VerticalTicker columns={cols([12, 9, 14])} backgroundColor="transparent" maskHeight={0} scale={1} columnWidth={COLW} gap={22} />
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: 'linear-gradient(to bottom, rgba(7,8,15,0.55) 0%, rgba(7,8,15,0) 40%)' }} />
      <AbsoluteFill style={{ background: 'linear-gradient(to bottom, #0c0e19 0%, rgba(12,14,25,0.85) 6%, rgba(12,14,25,0) 22%)' }} />
      <AbsoluteFill style={{ background: 'linear-gradient(to top, #07080f 0%, #07080f 30%, rgba(7,8,15,0.9) 36%, rgba(7,8,15,0) 50%)' }} />
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 45%, transparent 55%, rgba(3,4,9,0.55) 100%)' }} />
      <div style={{ position: 'absolute', left: 80, top: 1430, fontFamily: UI, fontSize: 28, fontWeight: 600, letterSpacing: '0.14em', color: Z.brand }}>LUEGO, A JUGAR</div>
      <div style={{ position: 'absolute', left: 76, top: 1476, fontFamily: DISPLAY, color: Z.ink, lineHeight: 1.04 }}>
        <div style={{ fontSize: 88, fontWeight: 600, letterSpacing: -1.6 }}><TextReveal text="Juegos para entenderlo." by="word" variant="rise" start={8} each={16} gap={4} /></div>
        <div style={{ fontSize: 50, fontWeight: 300, color: Z.mute, letterSpacing: -0.6, marginTop: 18 }}><TextReveal text="Más de 500 distintos, sin prisa." by="word" variant="rise" start={22} each={14} gap={3} /></div>
      </div>
      <Grain opacity={0.06} blend="soft-light" />
    </AbsoluteFill>
  );
};
