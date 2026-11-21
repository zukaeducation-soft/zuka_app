// Tabla central de efectos (Freesound, CC0; créditos en public/audio/sfx/FREESOUND-CREDITS.md).
// from = FROM[toma] + cuadro del movimiento − pico del sonido (energy_peak_seconds × 30 del manifiesto).
export type Sfx = { from: number; src: string; volume: number; dur?: number };
const P = (s: number) => Math.round(s * 30); // pico en cuadros
const CLICK_A = 'audio/sfx/fs-278205.mp3', CLICK_B = 'audio/sfx/fs-830459.mp3';
const CARD_A = 'audio/sfx/fs-571577.mp3', CARD_B = 'audio/sfx/fs-787405.mp3';
const WHOOSH = 'audio/sfx/fs-720954.mp3', WHOOSH_BIG = 'audio/sfx/fs-648729.mp3';
const TAP = 'audio/sfx/fs-478285.mp3', OK = 'audio/sfx/fs-541985.mp3';
const RISER = 'audio/sfx/fs-859482.mp3', THUD = 'audio/sfx/fs-879272.mp3', SPARKLE = 'audio/sfx/fs-878614.mp3';
const cue = (k: number) => 36 + 6 * k - 0.35 * k * (k - 1); // S2Cursos

export const SFX = (F: Record<string, number>): Sfx[] => [
  // S1: cada palabra que se asienta en el rodillo (dos muestras alternas, volumen que baja)
  { from: F.gancho + 37 - P(0.035), src: CLICK_A, volume: 0.32 },
  { from: F.gancho + 67 - P(0.015), src: CLICK_B, volume: 0.28 },
  { from: F.gancho + 97 - P(0.035), src: CLICK_A, volume: 0.36 },
  // S2: el reparto arranca con un soplo grande; algunas cartas caen con sonido de carta (no todas: se volvería metralla)
  { from: F.cursos + 36 - P(0.635), src: WHOOSH_BIG, volume: 0.38 },
  ...[0, 1, 3, 5].map((k, i) => ({ from: F.cursos + Math.round(cue(k) + 8) - P(0.35), src: i % 2 ? CARD_B : CARD_A, volume: 0.5 - i * 0.08 })),
  // S3: el celular sube
  { from: F.video + 22 - P(0.395), src: WHOOSH, volume: 0.26 },
  // S4: la pared aparece
  { from: F.muro + 6 - P(0.395), src: WHOOSH, volume: 0.18 },
  // S5: el dedo aprieta la x, toca «Comprobar» y la app dice «¡Excelente!»
  { from: F.balanza + 24, src: TAP, volume: 1 },
  { from: F.balanza + 120, src: TAP, volume: 1 },
  { from: F.balanza + 125 - P(0.295), src: OK, volume: 0.34 },
  // S6: cada píldora que entra y la frase final
  ...[0, 1, 2, 3].map((k) => ({ from: F.preu + 12 + k * 34 + 4 - P(0.03), src: k % 2 ? CLICK_B : CLICK_A, volume: 0.22 })),
  { from: F.preu + 148 + 8 - P(0.035), src: CLICK_A, volume: 0.34 },
  // S7: el portátil entra y la pantalla cambia
  { from: F.portatil + 22 - P(0.395), src: WHOOSH, volume: 0.28 },
  { from: F.portatil + 79 - P(0.395), src: WHOOSH, volume: 0.12 },
  // S8: subida → golpe en el frenazo del anillo (t 0.28) → brillo cuando entran las letras
  { from: F.cierre + 37 - P(2.285), src: RISER, volume: 0.4, dur: 100 },
  { from: F.cierre + 37, src: THUD, volume: 0.6 },
  { from: F.cierre + 61 - P(0.135), src: SPARKLE, volume: 0.4, dur: 80 },
];
