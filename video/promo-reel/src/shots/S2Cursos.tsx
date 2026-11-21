// S2 · los cursos — ficha deck-deal-flyin (demos/ui-entrance/deck-deal-flyin/DeckDealFlyin.tsx).
// Un montón con las 8 tarjetas reales de los cursos (recortes de la pantalla de inicio) descansa bajo un tablero oscuro;
// la cámara lo rodea de cerca, viene la preparación (el montón baja, la carta de arriba se echa atrás), las cartas
// salen con cadencia que acelera, caen en su casilla del tablero (rejilla 2 × 4) con arco en z, sobrepaso y presión,
// y la cámara sube y se inclina hasta la vista de pista con el tablero lleno. Contador: las lecciones suman al caer.
// Del demo se conservan: cámara por spline de Hermite monótona, órbita de cerca, preparación 48/30 px en 26→36,
// vuelo 8f bezier(0.3,0,0.2,1) + arco 110 + pico 1.06, asentado 4f bezier(0.3,0,0.25,1.15), presión 0.996, estela
// borrosa, sombra que se asienta con retraso, luz que se abre desde el montón (34→64) y niebla al fondo.
// Adaptado: vertical (visor 1080 × 1920, centro 540 × 960), mesa negro azulado de la app (sin metal cepillado: la app no
// tiene esa textura), solo 8 cartas reales (las que existen) con la cadencia 36 + 6k − 0.35k(k−1) para que la
// aceleración se note con pocas cartas.
import React from 'react';
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, Easing } from 'remotion';
import { EASE, ramp } from '../fx/Polish';
import { TextReveal } from '../fx/Look';
import { DISPLAY, UI, Z, halo } from '../tokens';
import layout from '../../public/tex/layout.json';

export const S2_DURATION = 150;
const VW = 1080, VH = 1920, CX0 = VW / 2, CY0 = VH / 2;
const LESSONS = [43, 20, 15, 23, 90, 5, 2, 2];
const CARD_W = 440;
const COLS = [80, 560];
const ROW_Y = (r: number) => 190 + r * 460;
const BOARD = { x: 50, y: 0, w: 980, h: ROW_Y(4) + 30 };
const PILE = { x: CX0 - CARD_W / 2, y: BOARD.h + 140 };
const STACK_STEP = 4;
const N = 8;
const DEAL_START = 36;
const PILE_CX = PILE.x + CARD_W / 2, PILE_CY = PILE.y + 210;

const cards = layout.courses.map((c: { w: number; h: number; name: string }, k: number) => {
  const h = (CARD_W * c.h) / c.w;
  return {
    file: `tex/course-${k}.png`, name: c.name, x: COLS[k % 2], y: ROW_Y(Math.floor(k / 2)), w: CARD_W, h,
    cue: DEAL_START + 6 * k - 0.35 * k * (k - 1),
    px: PILE.x + (((k * 7) % 9) - 4) * 2, py: PILE.y + (((k * 5) % 7) - 3) * 2,
    protZ: ((k * 11) % 7) - 3, pz: (N - k) * STACK_STEP,
  };
});

const HOVER_H = 40;
const SETTLE_EASE = Easing.bezier(0.3, 0, 0.25, 1.15);
const DIVE_EASE = Easing.bezier(0.3, 0, 0.2, 1);
const ANT = { from: 26, to: 36, pileDown: 48, topPull: 30 };

type Cam = { cx: number; cy: number; zoom: number; rotX: number; rotY: number; rotZ: number; persp: number; sy: number };
type Key = Cam & { frame: number };
const ANCHORS: Key[] = [
  { frame: 0, cx: PILE_CX - 30, cy: PILE_CY + 60, zoom: 1.55, rotX: 48, rotY: -28, rotZ: 8, persp: 1100, sy: 0 },
  { frame: 30, cx: PILE_CX + 20, cy: PILE_CY + 40, zoom: 1.45, rotX: 42, rotY: 22, rotZ: -5, persp: 1100, sy: 0 },
  { frame: 62, cx: 540, cy: 720, zoom: 0.86, rotX: 20, rotY: 0, rotZ: 2, persp: 1700, sy: 0 },
  { frame: 86, cx: 540, cy: 1060, zoom: 0.74, rotX: 28, rotY: -2, rotZ: -4, persp: 2400, sy: -120 },
  { frame: 110, cx: 540, cy: 1120, zoom: 0.7, rotX: 36, rotY: -3, rotZ: -8, persp: 3000, sy: -230 },
  { frame: 150, cx: 540, cy: 1120, zoom: 0.712, rotX: 36, rotY: -3, rotZ: -8, persp: 3000, sy: -230 },
];
const PARAMS: (keyof Cam)[] = ['cx', 'cy', 'zoom', 'rotX', 'rotY', 'rotZ', 'persp', 'sy'];
const hermite = (xs: number[], ys: number[]) => {
  const n = xs.length;
  const d = xs.slice(0, -1).map((x, i) => (ys[i + 1] - ys[i]) / (xs[i + 1] - x));
  const m = xs.map((_, i) => (i === 0 ? d[0] : i === n - 1 ? 0 : d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2));
  for (let i = 0; i < n - 1; i++) {
    if (d[i] === 0) { m[i] = 0; m[i + 1] = 0; continue; }
    const a = m[i] / d[i], b = m[i + 1] / d[i], h = a * a + b * b;
    if (h > 9) { const k = 3 / Math.sqrt(h); m[i] = k * a * d[i]; m[i + 1] = k * b * d[i]; }
  }
  return (x: number) => {
    if (x <= xs[0]) return ys[0];
    if (x >= xs[n - 1]) return ys[n - 1];
    let i = 0;
    while (i < n - 2 && x > xs[i + 1]) i++;
    const h = xs[i + 1] - xs[i], t = (x - xs[i]) / h, t2 = t * t, t3 = t2 * t;
    return (2 * t3 - 3 * t2 + 1) * ys[i] + (t3 - 2 * t2 + t) * h * m[i] + (-2 * t3 + 3 * t2) * ys[i + 1] + (t3 - t2) * h * m[i + 1];
  };
};
const CURVES = Object.fromEntries(PARAMS.map((p) => [p, hermite(ANCHORS.map((k) => k.frame), ANCHORS.map((k) => k[p]))])) as Record<keyof Cam, (x: number) => number>;
const camAt = (f: number): Cam => Object.fromEntries(PARAMS.map((p) => [p, CURVES[p](f)])) as Cam;

const T = 3000;

export const S2Cursos: React.FC = () => {
  const frame = useCurrentFrame();
  const cam = camAt(frame);
  const lightUp = interpolate(frame, [34, 64], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.5, 0, 0.6, 1) });
  const holeR = 3200 * lightUp, feather = 500 + 900 * lightUp;
  const fog = ramp(frame, 80, 34, EASE.smooth);
  const antT = interpolate(frame, [ANT.from, ANT.to], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const landedCards = cards.filter((c) => frame >= c.cue + 8);
  const lessons = landedCards.reduce((a, c) => a + LESSONS[cards.indexOf(c)], 0);
  const statIn = ramp(frame, 84, 12, EASE.out);
  const persp = cam.persp * cam.zoom;
  const tableBg = [
    `radial-gradient(${900 + 1300 * lightUp}px ${700 + 1500 * lightUp}px at ${T + PILE_CX}px ${T + PILE_CY - 900 * lightUp}px, ${halo(Z.brand, 0.16 - 0.06 * lightUp)}, ${halo(Z.brand, 0.03)} 45%, transparent 70%)`,
    `linear-gradient(104deg, transparent ${T + PILE_CX - 1400}px, rgba(150,190,255,0.05) ${T + PILE_CX - 400}px, rgba(170,210,255,0.08) ${T + PILE_CX}px, rgba(150,190,255,0.04) ${T + PILE_CX + 500}px, transparent ${T + PILE_CX + 1600}px)`,
    `linear-gradient(115deg, #0b0d18 0%, #10131f 30%, #090b14 56%, #0e1120 80%, #07080f 100%)`,
  ].join(', ');

  return (
    <AbsoluteFill style={{ overflow: 'hidden', background: Z.bg }}>
      <AbsoluteFill style={{ transform: `translateY(${cam.sy.toFixed(2)}px)` }}>
        <div style={{ position: 'absolute', inset: 0, perspective: `${persp.toFixed(2)}px`, perspectiveOrigin: `${CX0}px ${CY0}px` }}>
          <div style={{ position: 'absolute', width: VW, height: PILE.y + 700, zoom: cam.zoom,
            transform: `translate(${(CX0 / cam.zoom - cam.cx).toFixed(3)}px, ${(CY0 / cam.zoom - cam.cy).toFixed(3)}px) rotateY(${cam.rotY.toFixed(3)}deg) rotateX(${cam.rotX.toFixed(3)}deg) rotateZ(${cam.rotZ.toFixed(3)}deg)`,
            transformOrigin: `${cam.cx.toFixed(2)}px ${cam.cy.toFixed(2)}px`, transformStyle: 'preserve-3d' }}>
            {/* mesa: negro azulado de la app, se pierde en la oscuridad lejos */}
            <div style={{ position: 'absolute', left: -T, top: -T, width: VW + 2 * T, height: PILE.y + 700 + 2 * T, background: tableBg,
              WebkitMaskImage: `radial-gradient(ellipse 2200px 3000px at ${T + CX0}px ${T + 1300}px, #000 40%, transparent 100%)`, maskImage: `radial-gradient(ellipse 2200px 3000px at ${T + CX0}px ${T + 1300}px, #000 40%, transparent 100%)` }} />
            {/* tablero: la pantalla «Cursos» de la app, vacía, con su borde de 1 px */}
            <div style={{ position: 'absolute', left: BOARD.x, top: BOARD.y, width: BOARD.w, height: BOARD.h, borderRadius: 34, overflow: 'hidden',
              background: `linear-gradient(180deg, ${Z.bg2}, ${Z.bg})`, boxShadow: `0 0 0 1.5px ${Z.line}, 0 60px 160px rgba(0,0,0,0.7)` }}>
              <div style={{ position: 'absolute', left: 30, top: 58, fontFamily: DISPLAY, fontSize: 58, fontWeight: 500, color: Z.ink, letterSpacing: -1 }}>Cursos</div>
              <div style={{ position: 'absolute', right: 34, top: 74, fontFamily: UI, fontSize: 26, fontWeight: 600, color: Z.mute }}>Mis cursos</div>
              {cards.map((c, i) => (
                <div key={i} style={{ position: 'absolute', left: c.x - BOARD.x, top: c.y - BOARD.y, width: c.w, height: c.h, borderRadius: 26, border: `1.5px dashed ${halo(Z.line, 0.9)}` }} />
              ))}
              {lightUp < 1 && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(4,5,10,0.9)',
                  WebkitMaskImage: lightUp > 0 ? `radial-gradient(circle at ${PILE_CX - BOARD.x}px ${PILE_CY}px, transparent ${holeR.toFixed(0)}px, #000 ${(holeR + feather).toFixed(0)}px)` : undefined,
                  maskImage: lightUp > 0 ? `radial-gradient(circle at ${PILE_CX - BOARD.x}px ${PILE_CY}px, transparent ${holeR.toFixed(0)}px, #000 ${(holeR + feather).toFixed(0)}px)` : undefined }} />
              )}
            </div>
            {cards.map((c, i) => {
              const { cue } = c;
              const diveT = interpolate(frame, [cue, cue + 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: DIVE_EASE });
              const settleT = interpolate(frame, [cue + 8, cue + 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: SETTLE_EASE });
              const dx = (c.px - c.x) * (1 - diveT), dy = (c.py - c.y) * (1 - diveT);
              const rotFlight = c.protZ * (1 - diveT);
              const arc = Math.sin(diveT * Math.PI) * 110;
              const zDive = interpolate(diveT, [0, 1], [c.pz, HOVER_H]) + arc;
              const z = frame < cue ? c.pz : zDive * (1 - settleT);
              const press = interpolate(frame, [cue + 10, cue + 11, cue + 12], [1, 0.996, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
              const scale = (1 + Math.sin(diveT * Math.PI) * 0.06) * press;
              const isLanded = frame >= cue + 12, inPile = frame < cue;
              const antDy = inPile ? ANT.pileDown * antT * (frame < ANT.to + 2 ? 1 : 0) : 0;
              const antPull = i === 0 && inPile ? ANT.topPull * antT : 0;
              const transform = isLanded ? 'translate3d(0px, 0px, 0px)'
                : inPile ? `translate3d(${c.px - c.x}px, ${c.py - c.y + antDy - antPull}px, ${c.pz}px) rotateZ(${c.protZ}deg)`
                : `translate3d(${dx}px, ${dy}px, ${z}px) rotateZ(${rotFlight}deg) scale(${scale})`;
              const shadowLag = interpolate(frame, [cue + 8, cue + 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE.out });
              const shadow = isLanded ? `0 ${(2 + 14 * (1 - shadowLag)).toFixed(1)}px ${(6 + 30 * (1 - shadowLag)).toFixed(1)}px rgba(0,0,0,${(0.3 + 0.2 * (1 - shadowLag)).toFixed(3)})`
                : inPile ? (i === 0 ? '0 1px 3px rgba(0,0,0,.5), 0 26px 60px rgba(0,0,0,0.8)' : '0 1px 2px rgba(0,0,0,.45)')
                : `0 ${36 - 24 * settleT}px ${70 - 50 * settleT}px rgba(0,0,0,${(0.55 - 0.25 * settleT).toFixed(3)})`;
              const showGhost = diveT > 0.02 && diveT < 0.98;
              const gx = (c.px - c.x) * 0.06, gy = (c.py - c.y) * 0.06;
              const dist = Math.hypot(c.x + c.w / 2 - PILE_CX, c.y + c.h / 2 - PILE_CY);
              const dark = Math.min(1, Math.max(0, (dist - holeR) / feather)) * 0.88 * (lightUp < 1 ? 1 : 0);
              const shade = inPile ? 0.1 * (1 - lightUp) : diveT > 0.6 ? dark * Math.min(1, (diveT - 0.6) / 0.4) : 0;
              // las cartas del montón se apilan al revés: la 0 arriba
              const zi = inPile ? N - i : 20 + i;
              return (
                <div key={i} style={{ transformStyle: 'preserve-3d', zIndex: zi, position: 'relative' }}>
                  {showGhost && (
                    <div style={{ position: 'absolute', left: c.x, top: c.y, width: c.w, height: c.h, transform: `translate3d(${dx + gx}px, ${dy + gy}px, ${z}px) rotateZ(${rotFlight}deg) scale(${scale})`, opacity: 0.28 * (1 - diveT), filter: 'blur(7px)', borderRadius: 26, overflow: 'hidden' }}>
                      <Img src={staticFile(c.file)} style={{ width: '100%', height: '100%' }} />
                    </div>
                  )}
                  <div style={{ position: 'absolute', left: c.x, top: c.y, width: c.w, height: c.h, transform, boxShadow: shadow, borderRadius: 26, overflow: 'hidden' }}>
                    <Img src={staticFile(c.file)} style={{ width: '100%', height: '100%' }} />
                    {shade > 0.005 && <div style={{ position: 'absolute', inset: 0, background: `rgba(4,5,10,${shade.toFixed(3)})` }} />}
                  </div>
                </div>
              );
            })}
            {fog > 0 && (
              <div style={{ position: 'absolute', left: BOARD.x - 2, top: -2, width: BOARD.w + 4, height: BOARD.h + 4, borderRadius: 34, transform: 'translateZ(1px)',
                background: `linear-gradient(180deg, rgba(4,5,10,${(0.6 * fog).toFixed(3)}) 0%, rgba(4,5,10,${(0.28 * fog).toFixed(3)}) 35%, rgba(4,5,10,0) 70%)` }} />
            )}
          </div>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ pointerEvents: 'none', background: 'radial-gradient(ellipse 80% 70% at 50% 40%, transparent 45%, rgba(3,4,9,0.6) 100%)' }} />
      {/* abajo: contador y título (la mitad inferior queda libre en la vista de pista) */}
      <AbsoluteFill style={{ pointerEvents: 'none', background: `linear-gradient(180deg, transparent 58%, rgba(4,5,10,${(0.85 * statIn).toFixed(3)}) 78%)` }} />
      <div style={{ position: 'absolute', left: 84, top: 1440, display: 'flex', alignItems: 'baseline', gap: 16, opacity: statIn, fontFamily: UI, fontSize: 30, fontWeight: 600, letterSpacing: '0.12em', color: Z.mute }}>
        <span style={{ color: Z.brand, fontVariantNumeric: 'tabular-nums', minWidth: '3ch' }}>{String(lessons).padStart(3, '0')}</span>LECCIONES
      </div>
      <div style={{ position: 'absolute', left: 80, top: 1494, color: Z.ink, fontFamily: DISPLAY }}>
        <div style={{ fontSize: 108, fontWeight: 600, letterSpacing: -2, lineHeight: 1.05 }}><TextReveal text="8 cursos," by="word" variant="rise" start={98} each={16} gap={4} /></div>
        <div style={{ fontSize: 108, fontWeight: 300, color: Z.mute, letterSpacing: -2, lineHeight: 1.05 }}><TextReveal text="una sola app." by="word" variant="rise" start={104} each={16} gap={4} /></div>
      </div>
    </AbsoluteFill>
  );
};
