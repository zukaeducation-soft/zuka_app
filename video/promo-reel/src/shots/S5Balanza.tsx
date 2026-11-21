// S5 · un juego en vivo — toma propia (no hay ficha que muestre una interacción real cuadro a cuadro).
// 29 capturas reales de la balanza de la proporción (alg-12e) tomadas mientras un dedo arrastra x de 15 a 12 (se pasa,
// vuelve y la suelta): se pasan como un folioscopio dentro del celular, con el dedo dibujado en su sitio real.
// La cámara se acerca al juego durante el arrastre (para que se lea la inclinación) y se aleja para el «¡Excelente!» real.
// Ritmo «calma»: el dedo se toma su tiempo; tras soltar, la balanza se asienta y queda quieta ≥ 0.5 s antes de comprobar.
import React from 'react';
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, Easing } from 'remotion';
import { TextReveal } from '../fx/Look';
import { Fondo } from './Fondo';
import { Celular } from './Celular';
import { DISPLAY, UI, Z, halo } from '../tokens';
import layout from '../../public/tex/layout.json';

export const S5_DURATION = 165;
const PW = 390, PH = 844;
const SW = 540, K = SW / PW, SH = PH * K;
const FR = layout.balanza.frames as { name: string; cx: number; cy: number; down: boolean }[];
// cuadro de la película → índice de captura
const DRAG0 = 30, DRAG1 = 84, SET1 = 108, CHECK = 122;
const pick = (f: number) => {
  if (f < 18) return 0;
  if (f < DRAG0) return f < 24 ? 0 : 2;
  if (f < DRAG1) return Math.min(20, 3 + Math.floor(((f - DRAG0) / (DRAG1 - DRAG0)) * 18));
  if (f < SET1) return Math.min(28, 21 + Math.floor(((f - DRAG1) / (SET1 - DRAG1)) * 8));
  return 28;
};
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

export const S5Balanza: React.FC = () => {
  const f = useCurrentFrame();
  const i = pick(f);
  const fr = FR[i];
  const ok = f >= CHECK + 3;
  const up = interpolate(f, [0, 22], [0, 1], { ...clamp, easing: Easing.bezier(0.34, 1.3, 0.64, 1) });
  // acercamiento al lienzo durante el arrastre
  const zin = interpolate(f, [20, 40, 104, 118], [0, 1, 1, 0], { ...clamp, easing: Easing.bezier(0.45, 0, 0.25, 1) });
  const scale = 1 + 0.08 * zin;
  const focusY = 360; // centro del lienzo en px de la pantalla (canvas y 189–520)
  // dedo: aparece, aprieta, arrastra; tras soltar va a «Comprobar» y lo toca
  const btnY = 802, btnX = 195;
  const toBtn = interpolate(f, [108, CHECK], [0, 1], { ...clamp, easing: Easing.bezier(0.4, 0, 0.2, 1) });
  const fx = i <= 2 && f < 18 ? fr.cx + 40 : fr.cx + (btnX - fr.cx) * toBtn;
  const fy = i <= 2 && f < 18 ? fr.cy + 60 : fr.cy + (btnY - fr.cy) * toBtn;
  const down = (f >= 24 && f < DRAG1 + 2) || (f >= CHECK - 2 && f < CHECK + 4);
  const fingerOp = interpolate(f, [12, 20, CHECK + 6, CHECK + 14], [0, 1, 1, 0], clamp);
  const ripple = interpolate(f, [CHECK, CHECK + 14], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <Fondo glow={{ x: 0.5, y: 0.6 }} strength={0.12 + 0.08 * (ok ? 1 : 0)} tint={ok ? Z.ok : Z.brand} />
      <div style={{ position: 'absolute', left: 80, top: 150, fontFamily: UI, fontSize: 28, fontWeight: 600, letterSpacing: '0.14em', color: Z.brand }}>SE JUEGA ARRASTRANDO</div>
      <div style={{ position: 'absolute', left: 76, top: 196, fontFamily: DISPLAY, color: Z.ink, lineHeight: 1.04 }}>
        <div style={{ fontSize: 88, fontWeight: 600, letterSpacing: -1.6 }}><TextReveal text="Mueves la x," by="word" variant="rise" start={4} each={16} gap={4} /></div>
        <div style={{ fontSize: 88, fontWeight: 300, color: Z.mute, letterSpacing: -1.6 }}><TextReveal text="la balanza responde." by="word" variant="rise" start={40} each={16} gap={4} /></div>
      </div>
      <div style={{ position: 'absolute', left: (1080 - SW - 28) / 2, top: 470, transform: `translateY(${(1 - up) * 700}px)`, opacity: Math.min(1, up * 3) }}>
        <Celular w={SW} h={SH} glow={ok ? 0.7 : 0.4}>
          <div style={{ position: 'absolute', inset: 0, transform: `scale(${scale})`, transformOrigin: `50% ${focusY * K}px` }}>
            <Img src={staticFile(`tex/${ok ? 'bal-ok' : fr.name}.jpg`)} style={{ position: 'absolute', inset: 0, width: SW, height: SH }} />
            {/* dedo: círculo claro con aro, en px de la pantalla real */}
            <div style={{ position: 'absolute', left: fx * K - 44, top: fy * K - 44, width: 88, height: 88, borderRadius: 44, opacity: fingerOp,
              background: "rgba(237,241,255,0.26)", border: "3px solid rgba(237,241,255,0.92)", transform: `scale(${down ? 0.82 : 1})`,
              boxShadow: `0 0 26px ${halo(Z.brand, 0.5)}` }} />
            {ripple > 0 && ripple < 1 && (
              <div style={{ position: 'absolute', left: btnX * K - 60 * ripple - 10, top: btnY * K - 60 * ripple - 10, width: 120 * ripple + 20, height: 120 * ripple + 20, borderRadius: '50%', border: `2px solid ${halo(Z.ok, 0.8 * (1 - ripple))}` }} />
            )}
          </div>
        </Celular>
      </div>
    </AbsoluteFill>
  );
};
