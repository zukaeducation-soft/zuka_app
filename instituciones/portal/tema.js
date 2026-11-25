// El tema elegido en la app, antes de pintar (aparte del HTML: la política de contenido no admite más scripts en línea).
(function () {
  if ('currentCSSZoom' in Element.prototype) document.documentElement.dataset.compacta = '';   // interfaz compacta (css/styles.css)
  var t = 'light';
  try { t = (JSON.parse(localStorage.getItem('zuka-v1')) || {}).theme || 'light'; } catch (e) { /* claro */ }
  if (t === 'system') t = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  document.documentElement.dataset.theme = t;
})();
