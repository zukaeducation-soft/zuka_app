// Fondo común del reel: liso como la app (sin cuadrícula), negro azulado con un brillo hielo muy suave y grano fino.
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Grain } from '../fx/Polish';
import { Z, halo } from '../tokens';

export const Fondo: React.FC<{ glow?: { x: number; y: number }; tint?: string; strength?: number }> = ({ glow = { x: 0.5, y: 0.38 }, tint = Z.brand, strength = 0.16 }) => (
  <AbsoluteFill style={{ background: `linear-gradient(180deg, ${Z.bg2} 0%, ${Z.bg} 60%, #04050a 100%)` }}>
    <AbsoluteFill style={{ background: `radial-gradient(ellipse 70% 42% at ${glow.x * 100}% ${glow.y * 100}%, ${halo(tint, strength)} 0%, transparent 70%)` }} />
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)' }} />
    <Grain opacity={0.05} blend="soft-light" />
  </AbsoluteFill>
);
