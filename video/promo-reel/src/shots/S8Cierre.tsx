// S8 · cierre — ficha logo-shrink-wordmark-lockup (demos/outro/logo-shrink-wordmark-lockup/LogoShrinkWordmarkLockup.tsx).
// Un anillo hielo con dos cortes, grande, se encoge girando (5.4 → 1, inOutCubic 0.02–0.28) y frena con un 6 % de
// sobrepaso; el corte se cierra en un aro blanco y, en el frenazo (con la onda de choque, una sola vez), pasa a ser el
// nodo encendido de la interfaz «red» (aro fino + punto hielo). El icono se corre a la izquierda (0.34–0.47) y «Zuka»
// entra letra por letra (0.46 + i·0.035, 8 px y desenfoque de foco); el lema «POTENCIA TU MENTE» entra entero (0.72–0.84).
// Pedido del usuario: arriba solo el nombre «Zuka» en letra, sin el cerebro de puntos; por eso el icono es el nodo.
// Adaptado: diseño 270 × 480 (vertical, CSS zoom ×4); la animación dura sus 132 cuadros y luego queda quieta; al final
// aparece la invitación «Empieza gratis» (botón principal de la app, el único con brillo).
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DesignStage, E, lerp, seg } from '../fx/Motion';
import { Grain, Vignette } from '../fx/Polish';
import { DISPLAY, UI, Z, halo } from '../tokens';

export const S8_DURATION = 180;
const ANIM = 132;
const WORDMARK = 'Zuka';
const ICON = 30, GAP = 10, WORD_W = 74;
const SHIFT = -(ICON + GAP + WORD_W) / 2 + ICON / 2;
const ROW_LEFT = SHIFT + ICON / 2 + GAP;
const STAGGER = 0.035;
const DT = 1 / (ANIM - 1);

const arcPath = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  const p = (a: number) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)];
  const [x0, y0] = p(a0), [x1, y1] = p(a1);
  return `M${x0.toFixed(2)},${y0.toFixed(2)} A${r},${r} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} 1 ${x1.toFixed(2)},${y1.toFixed(2)}`;
};
const Arcs: React.FC<{ col: string; w: number; blur: number; opacity: number }> = ({ col, w, blur, opacity }) => (
  <g opacity={opacity}>
    {[[-32, 122], [148, 302]].map(([b0, b1], i) => (
      <path key={i} d={arcPath(15, 15, 10.5, b0, b1)} fill="none" stroke={col} strokeWidth={w} strokeLinecap="round" style={blur ? { filter: `blur(${blur}px)` } : undefined} />
    ))}
  </g>
);
const scaleAt = (t: number) => lerp(seg(t, 0.02, 0.28, E.inOutCubic), 5.4, 1) * (1 + Math.sin(seg(t, 0.26, 0.37) * Math.PI) * 0.06);
const spinAt = (t: number) => -150 * seg(t, 0, 0.3, E.outCubic);

export const S8Cierre: React.FC = () => {
  const frame = useCurrentFrame();
  const t = Math.min(1, frame / (ANIM - 1));
  const s = scaleAt(t), spin = spinAt(t);
  const shift = seg(t, 0.34, 0.47, E.inOutCubic) * SHIFT;
  const heal = seg(t, 0.1, 0.28, E.inOutQuad);
  const markIn = seg(t, 0.24, 0.32, E.inOutQuad);
  const trail = Math.min(1, Math.abs(scaleAt(t) - scaleAt(t - DT)) / 0.35);
  const wave = seg(t, 0.28, 0.46, E.outCubic);
  const haloR = lerp(seg(t, 0.02, 0.3, E.inOutCubic), 150, 34);
  const haloA = 0.5 - 0.32 * seg(t, 0.3, 0.5, E.outCubic);
  const cta = seg(frame, 118, 136, E.outCubic);

  const icon = (sc: number, rot: number, opacity: number, ghost = false) => (
    <div style={{ position: 'absolute', left: '50%', top: '50%', width: ICON, height: ICON, margin: `${-ICON / 2}px 0 0 ${-ICON / 2}px`, transform: `translateX(${shift}px) scale(${sc})`, opacity }}>
      <svg viewBox="0 0 30 30" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', transform: `rotate(${rot}deg)` }}>
        <Arcs col={halo(Z.brand, 0.6)} w={6.5} blur={2.5} opacity={1 - heal} />
        {!ghost && <Arcs col={heal > 0.5 ? '#fff' : '#dff4ff'} w={3.4} blur={0} opacity={(1 - heal * 0.75) * (1 - markIn)} />}
        {!ghost && <circle cx={15} cy={15} r={10.5} fill="none" stroke="#fff" strokeWidth={5.5} opacity={heal * (1 - markIn)} />}
      </svg>
      {/* estado normal: el nodo encendido de la red (aro fino + punto hielo), sin girar */}
      {!ghost && markIn > 0 && (
        <svg viewBox="0 0 30 30" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', opacity: markIn }}>
          <circle cx={15} cy={15} r={12} fill="none" stroke={Z.ink} strokeWidth={1.6} style={{ filter: `drop-shadow(0 0 4px ${halo(Z.brand, 0.55)})` }} />
          <circle cx={15} cy={15} r={6.4} fill={Z.brand} style={{ filter: `drop-shadow(0 0 3px ${halo(Z.brand, 0.7)})` }} />
        </svg>
      )}
    </div>
  );

  return (
    <AbsoluteFill>
      <DesignStage w={270} h={480} bg={Z.bg} raster="zoom">
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${Z.bg2} 0%, ${Z.bg} 60%, #04050a 100%)` }} />
          <div style={{ position: 'absolute', left: `calc(50% + ${shift}px - ${haloR}px)`, top: `calc(50% - ${haloR}px)`, width: haloR * 2, height: haloR * 2, borderRadius: '50%', opacity: haloA,
            background: `radial-gradient(circle, ${halo(Z.brand, 0.42)} 0%, ${halo(Z.brand, 0.12)} 38%, ${halo(Z.brand, 0)} 70%)` }} />
          {wave > 0 && wave < 1 && (
            <div style={{ position: 'absolute', left: `calc(50% - ${lerp(wave, 16, 70)}px)`, top: `calc(50% - ${lerp(wave, 16, 70)}px)`, width: lerp(wave, 32, 140), height: lerp(wave, 32, 140), borderRadius: '50%', boxSizing: 'border-box',
              border: `${lerp(wave, 0.9, 0.25)}px solid rgba(214,240,255,${(0.55 * (1 - wave)).toFixed(3)})`, boxShadow: `0 0 ${lerp(wave, 4, 10)}px ${halo(Z.brand, 0.45 * (1 - wave))}` }} />
          )}
          {trail > 0.02 && icon(scaleAt(t - 2 * DT), spinAt(t - 2 * DT), 0.16 * trail, true)}
          {trail > 0.02 && icon(scaleAt(t - DT), spinAt(t - DT), 0.3 * trail, true)}
          {icon(s, spin, 1)}
          <div style={{ position: 'absolute', left: `calc(50% + ${ROW_LEFT}px)`, top: '50%', height: ICON, marginTop: -ICON / 2 - 1, display: 'flex', alignItems: 'center' }}>
            {[...WORDMARK].map((ch, i) => {
              const lk = seg(t, 0.46 + i * STAGGER, 0.46 + i * STAGGER + 0.1, E.outCubic);
              return (
                <span key={i} style={{ color: Z.ink, font: `600 34px/1 ${DISPLAY}`, letterSpacing: -0.7, whiteSpace: 'pre', opacity: lk, transform: `translateX(${lerp(lk, 8, 0)}px)`,
                  filter: lk < 0.999 ? `blur(${lerp(lk, 2.5, 0).toFixed(2)}px)` : undefined, textShadow: `0 0 12px ${halo(Z.brand, 0.18)}` }}>{ch}</span>
              );
            })}
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 'calc(50% + 32px)', textAlign: 'center', color: Z.brand, font: `600 10.5px/1 ${UI}`, letterSpacing: 2.4,
            opacity: seg(t, 0.72, 0.84, E.outQuad), transform: `translateY(${lerp(seg(t, 0.72, 0.86, E.outCubic), 3, 0)}px)` }}>POTENCIA TU MENTE</div>
          {/* invitación final: el botón principal de la app */}
          <div style={{ position: 'absolute', left: 0, right: 0, top: 'calc(50% + 92px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9, opacity: cta, transform: `translateY(${lerp(cta, 6, 0)}px)` }}>
            <div style={{ padding: '9px 22px', borderRadius: 14, background: `linear-gradient(180deg, #8adcff, ${Z.brand})`, color: Z.onBrand, font: `700 12px/1 ${UI}`, boxShadow: `0 0 22px ${halo(Z.brand, 0.35)}` }}>Empieza gratis</div>
            <div style={{ color: Z.mute, font: `500 8.5px/1 ${UI}`, letterSpacing: 0.2 }}>Enlace en la descripción</div>
          </div>
        </div>
      </DesignStage>
      <Vignette strength={0.55} inner={0.4} color="#000000" />
      <Grain opacity={0.06} blend="soft-light" />
    </AbsoluteFill>
  );
};
