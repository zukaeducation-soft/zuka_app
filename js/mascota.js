// Personaje de Zuka (pedido del 2026-11-20; spec 2026-11-20-personaje): el cerebro con antifaz que camina, dibujado en SVG a
// partir de la imagen 2D que pasó el usuario. Sale donde la app le habla al estudiante (saludo del inicio, entrenador del
// gimnasio, final de una lección o de un reto, sin vidas, recorrido, listas vacías), nunca encima de un ejercicio.
// Poses: 'think' (dedo en la sien, la de la imagen), 'cheer' (brazos arriba) y 'sad' (brazos abajo, ojos tristes).
// Colores en variables (--mb cuerpo, --mg surcos, --mi tinta, --me ojos) para poder teñirlo; por defecto, coral.
const MASCOT_POSES = ['think', 'cheer', 'sad'];
function mascotSVG(pose = 'think', cls = '') {
  if (!MASCOT_POSES.includes(pose)) pose = 'think';
  const ink = 'stroke="var(--mi, #4a1040)" stroke-linecap="round" stroke-linejoin="round" fill="none"';
  const limb = w => `${ink} stroke-width="${w}"`;
  // brazos: el de la izquierda (detrás del cuerpo) y el de la derecha (delante, en 'think' toca la sien)
  const arms = {
    think: { back: `<path d="M27 74 C19 74 14 79 15.5 87" ${limb(7)}/><circle cx="16" cy="88" r="4.6" fill="var(--mi, #4a1040)"/>`,
      front: `<path d="M93 80 C104 80 108 71 102 65" ${limb(7)}/><circle cx="101" cy="65" r="6" fill="var(--mi, #4a1040)"/><path d="M100 61 C97 58 95 56.5 93 56" ${limb(5)}/>` },
    cheer: { back: `<path d="M22 64 C12 61 7 53 8 43" ${limb(7)}/><circle cx="8.5" cy="41" r="5" fill="var(--mi, #4a1040)"/>`,
      front: `<path d="M103 64 C113 61 118 53 117 43" ${limb(7)}/><circle cx="116.5" cy="41" r="5" fill="var(--mi, #4a1040)"/>` },
    sad: { back: `<path d="M26 76 C20 79 18 85 19 92" ${limb(7)}/><circle cx="19" cy="93" r="4.6" fill="var(--mi, #4a1040)"/>`,
      front: `<path d="M99 76 C105 79 107 85 106 92" ${limb(7)}/><circle cx="106" cy="93" r="4.6" fill="var(--mi, #4a1040)"/>` },
  }[pose];
  const eyes = pose === 'sad'
    ? `<path d="M45 70 Q50 66 55 70 M73 70 Q78 66 83 70" stroke="var(--me, #93f5b6)" stroke-width="3.4" stroke-linecap="round" fill="none"/>
       <path d="M60.5 77 Q64 75 67.5 77" stroke="var(--me, #93f5b6)" stroke-width="3" stroke-linecap="round" fill="none"/>`
    : `<path d="M44 72 A6 6 0 0 1 56 72 M72 72 A6 6 0 0 1 84 72" stroke="var(--me, #93f5b6)" stroke-width="3.4" stroke-linecap="round" fill="none"/>
       ${pose === 'cheer' ? '<path d="M59 74.5 Q64 80.5 69 74.5 Z" fill="var(--me, #93f5b6)" stroke="var(--me, #93f5b6)" stroke-width="1.6" stroke-linejoin="round"/>'
        : '<path d="M60.5 75 Q64 78.5 67.5 75" stroke="var(--me, #93f5b6)" stroke-width="3" stroke-linecap="round" fill="none"/>'}`;
  const body = 'fill="var(--mb, #fa7a6c)"', groove = 'stroke="var(--mg, #e0443a)" stroke-width="3.2" stroke-linecap="round" fill="none"';
  // Brazos y piernas llevan el borde lila del dibujo original (se ven sobre fondo oscuro): un filtro que engorda la silueta.
  return `<svg class="mascot ${pose}${cls ? ` ${cls}` : ''}" viewBox="0 0 125 118" aria-hidden="true">
  <defs><filter id="m-ol" x="-20%" y="-20%" width="140%" height="140%"><feMorphology in="SourceAlpha" operator="dilate" radius="1.3" result="d"/>
    <feFlood flood-color="#b98bc0"/><feComposite in2="d" operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <g class="m-legs" filter="url(#m-ol)"><path d="M50 86 L41 101" ${limb(7.5)}/><path d="M42 102 C35 101 29 104 31 108 C33 111 41 110 45 107" fill="var(--mi, #4a1040)"/>
    <path d="M70 86 L78 101" ${limb(7.5)}/><path d="M77 101 C82 97 89 97 90 101 C91 105 84 108 78 106" fill="var(--mi, #4a1040)"/></g>
  <g class="m-back" filter="url(#m-ol)">${arms.back}</g>
  <g class="m-body" ${body}>
    <circle cx="47" cy="27" r="16"/><circle cx="79" cy="27" r="16"/><circle cx="28" cy="40" r="14"/><circle cx="98" cy="40" r="14"/>
    <circle cx="20" cy="57" r="13"/><circle cx="106" cy="57" r="13"/><circle cx="30" cy="72" r="15"/><circle cx="96" cy="72" r="15"/>
    <rect x="18" y="28" width="90" height="61" rx="24"/>
  </g>
  <g ${groove}>
    <path d="M63 19 L63 52"/>
    <path d="M47 23 C44 28 40 31 35 31.5 C30 32 28 35.5 27 39"/><path d="M53 40 C47 38.5 43.5 41 40.5 45 C37 49.5 32.5 50 29 50.5 C25 51 23 54 22 57"/>
    <path d="M78 23 C83 24 85.5 28 88 31.5 C90.5 35 94.5 35 98 36.5"/><path d="M75 42 C79.5 40 83.5 42 86.5 45.5 C89.5 48.5 93.5 48.5 98 48.5"/>
  </g>
  <path d="M35 69 C35 61 41 57.5 49 59 C55 60 60 61.5 63.5 61.5 C67 61.5 72 60 78 59 C86 57.5 92 61 92 69 C92 77 85 82.5 75 82.5 L52 82.5 C42 82.5 35 77 35 69 Z" fill="var(--mi, #4a1040)"/>
  ${eyes}
  <g class="m-front" filter="url(#m-ol)">${arms.front}</g>
</svg>`;
}
