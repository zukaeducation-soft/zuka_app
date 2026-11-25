// Ejercicios de lectura sobre la hoja · balanza de una tesis (spec 2026-11-24-lectura-explora). Va por datos.
{
  const { esc, completo, zona, zonas } = HOJA;
  // La tesis está en el fiel: lo que se pone a cada lado solo pesa por cuánto hay (no dice si va bien).
  zonas('balanza-tesis', {
    varias: true, rot: (p, i) => ['la apoya', 'la debilita', 'no pesa'][i],
    escena: p => `<div class="hj-balanza"><p class="hj-tesis"><small>la tesis</small>${esc(p.tesis)}</p><div class="hj-brazo"></div><div class="hj-platos"><div><small>la apoya</small>${zona(0, '', '', 'la apoya')}</div><div><small>la debilita</small>${zona(1, '', '', 'la debilita')}</div></div></div><div class="hj-suelo"><small>no pesa</small>${zona(2, '', '', 'no pesa')}</div>${p.doc?.paras ? completo(p.docs || p.doc) : ''}`,
    vivo(root, p, s) { const n = z => s.en.filter(x => x === z).length; root.querySelector('.hj-balanza').style.setProperty('--g', Math.max(-2, Math.min(2, n(1) - n(0)))); },
    ayuda: 'Supón que cada dato es cierto y llévalo a su plato.',
  });
}
