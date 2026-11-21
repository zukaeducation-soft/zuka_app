// Línea de tiempo única: SHOTS es la fuente de verdad (cortes, sonido y rótulos se derivan de aquí).
import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile } from 'remotion';
import { S1Gancho, S1_DURATION } from './shots/S1Gancho';
import { S2Cursos, S2_DURATION } from './shots/S2Cursos';
import { S3Video, S3_DURATION } from './shots/S3Video';
import { S4Muro, S4_DURATION } from './shots/S4Muro';
import { S5Balanza, S5_DURATION } from './shots/S5Balanza';
import { S6Preu, S6_DURATION } from './shots/S6Preu';
import { S7Portatil, S7_DURATION } from './shots/S7Portatil';
import { S8Cierre, S8_DURATION } from './shots/S8Cierre';
import { SFX } from './sfx';

export type Shot = { id: string; C: React.FC; dur: number };
export const SHOTS: Shot[] = [
  { id: 'gancho', C: S1Gancho, dur: S1_DURATION },
  { id: 'cursos', C: S2Cursos, dur: S2_DURATION },
  { id: 'video', C: S3Video, dur: S3_DURATION },
  { id: 'muro', C: S4Muro, dur: S4_DURATION },
  { id: 'balanza', C: S5Balanza, dur: S5_DURATION },
  { id: 'preu', C: S6Preu, dur: S6_DURATION },
  { id: 'portatil', C: S7Portatil, dur: S7_DURATION },
  { id: 'cierre', C: S8Cierre, dur: S8_DURATION },
];
export const FROM: Record<string, number> = {};
let acc = 0;
for (const s of SHOTS) { FROM[s.id] = acc; acc += s.dur; }
export const TOTAL = acc;

export const Main: React.FC<{ bgm?: boolean }> = ({ bgm = true }) => (
  <AbsoluteFill style={{ background: '#07080f' }}>
    {bgm && <Audio src={staticFile('audio/bgm.mp3')} volume={(f) => 0.5 * interpolate(f, [0, 18, TOTAL - 45, TOTAL - 1], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />}
    {SFX(FROM).map((s, i) => (
      <Sequence key={'sfx' + i} from={s.from} durationInFrames={s.dur ?? 90}><Audio src={staticFile(s.src)} volume={s.volume} /></Sequence>
    ))}
    {SHOTS.map((s) => (
      <Sequence key={s.id} from={FROM[s.id]} durationInFrames={s.dur}><s.C /></Sequence>
    ))}
  </AbsoluteFill>
);
