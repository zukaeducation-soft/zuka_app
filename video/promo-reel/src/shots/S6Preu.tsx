// S6 · Preuniversitario UdeA — ficha pill-slot-cycle (demos/typography/pill-slot-cycle/PillSlotCycle.tsx).
// Tallo fijo «Para entrar a la UdeA,» y, en la ranura, cuatro píldoras que ruedan como tragamonedas (entra desde abajo
// con giro de tambor y desenfoque vertical por velocidad; sale hacia arriba acelerando): Razonamiento lógico →
// Comprensión lectora → Soluciones paso a paso → Preguntas tipo examen; al final la píldora se va y cae «prepárate aquí.»
// con el único sobrepaso (back 1.4) de la toma.
// Se conservan: cambio en los primeros 8 cuadros del pulso, +120/−130 px, rotateX −38°/34°, desenfoque ≤ 14/12,
// marcador invisible que da el ancho de la ranura, frase final con la misma letra que el tallo, ≥ 45 cuadros quieta.
// Adaptado a vertical: el tallo va en un renglón y la ranura en el de abajo, los dos anclados a la izquierda (el tallo
// nunca se mueve); pulso de 34 cuadros (no 21) porque debajo cambia la pantalla real que corresponde a cada píldora;
// píldoras oscuras de la app (tarjeta, borde de 1 px, icono en cuadro hielo).
import React from 'react';
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, Easing } from 'remotion';
import { EASE, mix, ramp } from '../fx/Polish';
import { Fondo } from './Fondo';
import { Celular } from './Celular';
import { DISPLAY, UI, Z, halo } from '../tokens';

type IconKey = 'logic' | 'read' | 'steps' | 'exam';
const PILLS: { label: string; icon: IconKey; shot: string }[] = [
  { label: 'Razonamiento lógico', icon: 'logic', shot: 'preu-pita' },
  { label: 'Comprensión lectora', icon: 'read', shot: 'preu-lec' },
  { label: 'Soluciones paso a paso', icon: 'steps', shot: 'preu-sol' },
  { label: 'Preguntas tipo examen', icon: 'exam', shot: 'preu-opc' },
];
const BEAT = 34, INTRO = 12, CYCLES = PILLS.length, SWAP = 8, FIN = 14, HOLD = 52;
export const S6_DURATION = INTRO + CYCLES * BEAT + FIN + HOLD; // 214
const LEFT = 80, STEM_Y = 236, SLOT_Y = 350, FS = 76;

const Icon: React.FC<{ k: IconKey }> = ({ k }) => {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <svg width={34} height={34} viewBox="0 0 24 24" style={{ display: 'block' }}>
      {k === 'logic' && (<><path d="M4 20L12 4l8 16z" {...p} /><path d="M8 12h8" {...p} /></>)}
      {k === 'read' && (<><path d="M3.5 5.5c3-1 6-1 8.5 1v13c-2.5-2-5.5-2-8.5-1z" {...p} /><path d="M20.5 5.5c-3-1-6-1-8.5 1v13c2.5-2 5.5-2 8.5-1z" {...p} /></>)}
      {k === 'steps' && (<><path d="M4 18h5v-5h5V8h6" {...p} /><path d="M17 5l3 3-3 3" {...p} /></>)}
      {k === 'exam' && (<><rect x="4" y="3.5" width="16" height="17" rx="2.5" {...p} /><path d="M8 9l1.6 1.6L12.5 7.5M8 15.5h8" {...p} /></>)}
    </svg>
  );
};
const Pill: React.FC<{ label: string; icon: IconKey; lift?: number; style?: React.CSSProperties }> = ({ label, icon, lift = 0, style }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 18, padding: '12px 34px 12px 14px', borderRadius: 999, background: `linear-gradient(180deg, ${Z.card2} 0%, ${Z.card} 100%)`,
    border: `1.5px solid ${Z.line}`, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 ${8 + lift * 26}px ${20 + lift * 50}px rgba(0,0,0,${0.35 + lift * 0.2}), 0 0 ${30 * (1 - lift)}px ${halo(Z.brand, 0.16)}`,
    fontFamily: UI, fontWeight: 600, fontSize: 50, letterSpacing: '-0.02em', color: Z.ink, whiteSpace: 'nowrap', ...style }}>
    <span style={{ width: 62, height: 62, borderRadius: 18, background: halo(Z.brand, 0.14), boxShadow: `inset 0 0 0 1px ${halo(Z.brand, 0.3)}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: Z.brand, flexShrink: 0 }}>
      <Icon k={icon} />
    </span>
    {label}
  </div>
);
const VBlur: React.FC<{ id: string; std: number }> = ({ id, std }) => (
  <svg width={0} height={0} style={{ position: 'absolute' }} aria-hidden>
    <filter id={id} x="-10%" y="-60%" width="120%" height="220%"><feGaussianBlur stdDeviation={`0 ${std.toFixed(2)}`} /></filter>
  </svg>
);
const inYAt = (bf: number) => mix(120, 0, ramp(bf, 0, SWAP, EASE.snappy));
const outYAt = (bf: number) => mix(0, -130, ramp(bf, 0, SWAP - 1, EASE.exit));
const stemStyle: React.CSSProperties = { fontFamily: DISPLAY, fontWeight: 600, fontSize: FS, color: Z.ink, letterSpacing: '-0.025em', whiteSpace: 'nowrap' };
const SW = 500, SH = (844 * SW) / 390;

export const S6Preu: React.FC = () => {
  const frame = useCurrentFrame();
  const stemT = ramp(frame, 0, INTRO, EASE.out);
  const cycleEnd = INTRO + CYCLES * BEAT;
  const rel = frame - INTRO;
  const idx = Math.max(0, Math.min(Math.floor(rel / BEAT), CYCLES - 1));
  const beatFrame = rel - idx * BEAT;
  const isFinale = frame >= cycleEnd;
  const finT = interpolate(frame, [cycleEnd, cycleEnd + FIN], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.4)) });

  let slot: React.ReactNode = null;
  if (!isFinale && rel >= 0) {
    const incoming = PILLS[idx], outgoing = idx > 0 ? PILLS[idx - 1] : null;
    const inT = ramp(beatFrame, 0, SWAP, EASE.snappy), inY = inYAt(beatFrame);
    const inBlur = Math.min(14, Math.abs(inYAt(beatFrame + 0.5) - inYAt(beatFrame - 0.5)) * 0.55);
    const outT = ramp(beatFrame, 0, SWAP - 1, EASE.exit), outY = outYAt(beatFrame);
    const outBlur = Math.min(12, Math.abs(outYAt(beatFrame + 0.5) - outYAt(beatFrame - 0.5)) * 0.45);
    slot = (
      <div style={{ position: 'relative', display: 'inline-block', perspective: 1400 }}>
        <VBlur id="p6-in" std={inBlur} /><VBlur id="p6-out" std={outBlur} />
        <Pill label={incoming.label} icon={incoming.icon} style={{ visibility: 'hidden' }} />
        {outgoing && outT < 1 && (
          <div style={{ position: 'absolute', left: 0, top: 0, transformOrigin: '50% 100%', transform: `translateY(${outY.toFixed(2)}px) rotateX(${(34 * outT).toFixed(2)}deg) scale(${mix(1, 0.94, outT).toFixed(4)})`, opacity: 1 - outT, filter: outBlur > 0.3 ? 'url(#p6-out)' : undefined }}>
            <Pill label={outgoing.label} icon={outgoing.icon} lift={outT} />
          </div>
        )}
        <div style={{ position: 'absolute', left: 0, top: 0, transformOrigin: '50% 0%', transform: `translateY(${inY.toFixed(2)}px) rotateX(${(-38 * (1 - inT)).toFixed(2)}deg) scale(${mix(0.94, 1, inT).toFixed(4)})`, opacity: idx === 0 ? inT : Math.min(1, inT * 1.6), filter: inBlur > 0.3 ? 'url(#p6-in)' : undefined }}>
          <Pill label={incoming.label} icon={incoming.icon} lift={1 - inT} />
        </div>
      </div>
    );
  } else if (isFinale) {
    const lastOutT = ramp(frame, cycleEnd, 7, EASE.exit);
    const curve = (x: number) => interpolate(x, [cycleEnd, cycleEnd + FIN], [90, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.4)) });
    const finBlur = Math.min(10, Math.abs(curve(frame + 0.5) - curve(frame - 0.5)) * 0.5);
    slot = (
      <div style={{ position: 'relative', display: 'inline-block', perspective: 1400 }}>
        <VBlur id="p6-fin" std={finBlur} /><VBlur id="p6-last" std={Math.min(12, lastOutT * 12)} />
        <span style={{ ...stemStyle, display: 'inline-block', color: Z.brand, opacity: Math.min(1, finT * 1.4), transform: `translateY(${((1 - finT) * 90).toFixed(2)}px)`, filter: finBlur > 0.3 ? 'url(#p6-fin)' : undefined }}>prepárate aquí.</span>
        {lastOutT < 1 && (
          <div style={{ position: 'absolute', left: 0, top: -8, transformOrigin: '50% 100%', transform: `translateY(${(-130 * lastOutT).toFixed(2)}px) rotateX(${(34 * lastOutT).toFixed(2)}deg) scale(${mix(1, 0.94, lastOutT).toFixed(4)})`, opacity: 1 - lastOutT, filter: lastOutT > 0.03 ? 'url(#p6-last)' : undefined }}>
            <Pill label={PILLS[CYCLES - 1].label} icon={PILLS[CYCLES - 1].icon} lift={lastOutT} />
          </div>
        )}
      </div>
    );
  }

  // pantalla real de cada píldora: cambia con un barrido corto al mismo tiempo que la píldora
  const phoneIn = interpolate(frame, [2, 26], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.34, 1.25, 0.64, 1) });
  const cur = Math.max(0, Math.min(CYCLES - 1, idx)), prev = Math.max(0, cur - 1);
  const swapT = cur === 0 ? 1 : ramp(beatFrame, 0, 10, EASE.snappy);
  return (
    <AbsoluteFill>
      <Fondo glow={{ x: 0.5, y: 0.7 }} strength={0.13} tint={Z.lime} />
      <div style={{ position: 'absolute', left: LEFT, top: 150, fontFamily: UI, fontSize: 28, fontWeight: 600, letterSpacing: '0.14em', color: Z.lime, opacity: stemT }}>PREUNIVERSITARIO UDEA</div>
      <div style={{ position: 'absolute', left: LEFT, top: STEM_Y, opacity: stemT, transform: `translateY(${((1 - stemT) * 40).toFixed(2)}px)`, filter: stemT < 0.98 ? `blur(${((1 - stemT) * 6).toFixed(2)}px)` : undefined }}>
        <span style={stemStyle}>Para entrar a la UdeA,</span>
      </div>
      <div style={{ position: 'absolute', left: LEFT, top: SLOT_Y, opacity: stemT }}>{slot}</div>
      <div style={{ position: 'absolute', left: (1080 - SW - 28) / 2, top: 560, transform: `translateY(${(1 - phoneIn) * 800}px)` }}>
        <Celular w={SW} h={SH} glow={0.35}>
          <Img src={staticFile(`tex/${PILLS[prev].shot}.jpg`)} style={{ position: 'absolute', inset: 0, width: SW, height: SH }} />
          <div style={{ position: 'absolute', inset: 0, clipPath: `inset(${((1 - swapT) * 100).toFixed(2)}% 0 0 0)` }}>
            <Img src={staticFile(`tex/${PILLS[cur].shot}.jpg`)} style={{ position: 'absolute', inset: 0, width: SW, height: SH }} />
          </div>
        </Celular>
      </div>
      <AbsoluteFill style={{ background: 'linear-gradient(to top, #07080f 0%, rgba(7,8,15,0.8) 7%, rgba(7,8,15,0) 18%)' }} />
    </AbsoluteFill>
  );
};
