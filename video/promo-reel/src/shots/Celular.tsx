// Marco de celular sobrio (borde fino, sin brillos de caricatura) para mostrar pantallas reales de la app.
import React from 'react';
import { Z } from '../tokens';

export const Celular: React.FC<{ w: number; h: number; children: React.ReactNode; style?: React.CSSProperties; glow?: number }> = ({ w, h, children, style, glow = 0 }) => (
  <div style={{ position: 'absolute', width: w + 28, height: h + 28, borderRadius: 64, background: '#05060b', padding: 14, boxSizing: 'border-box',
    boxShadow: `0 0 0 2px ${Z.line}, 0 0 0 3px rgba(255,255,255,0.04), 0 50px 120px rgba(0,0,0,0.75)${glow > 0 ? `, 0 0 ${120 * glow}px rgba(111,211,255,${0.22 * glow})` : ''}`, ...style }}>
    <div style={{ position: 'relative', width: w, height: h, borderRadius: 50, overflow: 'hidden', background: Z.bg }}>{children}</div>
  </div>
);
