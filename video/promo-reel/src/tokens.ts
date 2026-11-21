// Lenguaje visual del reel = la interfaz «red» de Zuka (css/styles.css :root, spec 2026-11-27-interfaz-red):
// negro azulado, acento hielo, bordes de 1 px, brillo solo en lo que toca ahora, títulos en Jost.
export const Z = {
  bg: '#07080f', bg2: '#0c0e19', card: '#10131f', card2: '#191d2e', line: '#262b44',
  ink: '#edf1ff', mute: '#8b93b8', dim: '#4a5072', brand: '#6fd3ff', onBrand: '#04121d',
  ok: '#3ddc97', bad: '#ff6178', gold: '#f2cf73', lime: '#c6f432',
};
export const DISPLAY = 'Jost, "Plus Jakarta Sans", sans-serif';
export const UI = '"Plus Jakarta Sans", Jost, sans-serif';
// brillo de la app: color-mix(in srgb, <color> 55%, transparent)
export const halo = (hex: string, a = 0.55) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};
