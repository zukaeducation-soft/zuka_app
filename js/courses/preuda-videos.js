// Videos del Preuniversitario ya subidos a Bunny (biblioteca 811556), con voz. GENERADO por
// video/preuda-cosmos/tools/app-videos.js desde out/voz/bunny.json: no editar a mano. Va después de preuda-razonamiento.js.
// Cada entrada: { bunny, duration (s, la que reporta Bunny), film, scenes: [[segundos, título, texto]] } (escenas de respaldo).
const PU_VIDEOS = {

};
(() => {
  const lessons = PU_RAZONAMIENTO.flatMap(u => u.lessons);
  for (const [id, v] of Object.entries(PU_VIDEOS)) {
    const l = lessons.find(l => l.id === id);
    if (l) l.clip = { bunny: v.bunny, duration: v.duration, scenes: v.scenes.map(([d, title, text]) => sc(d, text, { title })) };
  }
})();
