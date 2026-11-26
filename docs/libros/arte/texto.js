// Texto de la app (negritas **…**, fórmulas $…$) a LaTeX.
const R = String.raw;
const MAT = { '×': R`\times`, '÷': R`\div`, '∧': R`\land`, '∨': R`\lor`, '¬': R`\lnot`, '±': R`\pm`, '−': '-', '→': R`\to`, '↔': R`\leftrightarrow`,
  '≤': R`\le`, '≥': R`\ge`, '≠': R`\ne`, '≈': R`\approx`, '√': R`\surd`, 'π': R`\pi`, '∪': R`\cup`, '∩': R`\cap`, '∈': R`\in`, '∅': R`\varnothing`,
  '²': '{}^2', '³': '{}^3', '½': R`\tfrac12`, '·': R`\cdot`, '⋆': R`\star`, '⊕': R`\oplus`, '⊙': R`\odot`, '⊗': R`\otimes`, '⋄': R`\diamond`, '△': R`\triangle`,
  '★': R`\star`, '✱': R`\ast`, '■': R`\blacksquare`, '▲': R`\blacktriangle`, '●': R`\bullet`, '∞': R`\infty`, '□': R`\square`, '○': R`\circ`,
  '←': R`\leftarrow`, '↑': R`\uparrow`, '↓': R`\downarrow`, 'ℓ': R`\ell`, 'α': R`\alpha`, 'β': R`\beta`, 'θ': R`\theta`,
  '₁': '{}_1', '₂': '{}_2', '₃': '{}_3', 'ⁿ': '{}^n', '⁴': '{}^4', '⁵': '{}^5', '⁰': '{}^0', '¹': '{}^1', '⁶': '{}^6', '⁷': '{}^7', '⁸': '{}^8', '⁹': '{}^9', 'Ω': R`\Omega`,
  '⁺': '{}^+', '⁻': '{}^-', '₄': '{}_4', '₀': '{}_0', 'ˣ': '{}^x' };
const DING = { '◆': '117', '✗': '55', '✓': '51' };
const plain = s => s.replace(/\\%/g, '%').replace(/%/g, R`\%`).replace(/&/g, R`\&`).replace(/#/g, R`\#`).replace(/_/g, R`\_`).replace(/\$/g, () => R`\$`)
  .replace(/[^\x00-\x7F]/g, c => (c === '°' ? R`\textdegree{}` : MAT[c] ? R`\ensuremath{` + MAT[c] + '}' : DING[c] ? R`\ding{` + DING[c] + '}' : c));
const mate = t => t.replace(/°/g, () => R`^\circ `).replace(/[¿¡áéíóúñ…]/g, (c, k) => (/\\(text|operatorname)\w*\{[^}]*$/.test(t.slice(0, k)) ? c : R`\text{` + c + '}')).replace(/(^|[^\\])%/g, (m, a) => a + R`\%`).replace(/\\operatorname\{sen\}/g, () => R`\sen`).replace(/[^\x00-\x7F]/g, c => (MAT[c] ? `${MAT[c]} ` : c));
const trozos = s => s.split(/(\$[^$]+\$)/).map(t => (t[0] === '$' && t.length > 2 ? mate(t) : plain(t))).join('');
const tex = s => String(s ?? '').split(/(\*\*.+?\*\*)/).map(q => (/^\*\*.+\*\*$/.test(q) ? R`\textbf{` + trozos(q.slice(2, -2)) + '}' : trozos(q))).join('');
// «Segunda idea: para ver…» → «Para ver…»
const entrada = s => s.replace(/^(Empecemos por la idea|(Primera|Segunda|Tercera|Cuarta|Quinta|Última) idea)\s*:\s*/i, '').replace(/^(\**)([a-záéíóúñ])/, (m, a, b) => a + b.toUpperCase());
module.exports = { tex, cuenta: tex, entrada };
