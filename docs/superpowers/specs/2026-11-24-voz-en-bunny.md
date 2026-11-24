# Narración de Explora en Bunny Storage (2026-11-24)

Pedido: «sube la lección 1 y configura la app para que de ahora en adelante se suban a bunny.net y se gestionen
correctamente». Pruebas: `tests/voz-bunny.test.js`.

## Dónde está cada cosa

- Zona `zukavoz` (Storage, New York) → CDN `https://zukavoz.b-cdn.net/<lección>/`. En CDN → zukavoz → Headers, CORS activo
  con `json` y `m4a`.
- Llave: `~/.zuka/bunny_storage_key.txt` (la Password de la zona). Nunca en el repositorio, en pantalla ni en la app.
- Audios de trabajo: `media/voz/<lección>/` (`*.m4a` + `voz.json`), que ya no van a GitHub. Solo `pu-cm-1` queda en el
  repositorio, de respaldo.
- `js/explora-voces.js` (generado): `{ lección: lista }`. Es lo que decide qué lecciones tienen voz en la app.

## Publicar una lección

1. Generar `media/voz/<id>/` con sus `*.m4a` y `voz.json`.
2. `node tools/subir-voz.js <id>` (o `--todas`). Sube solo lo nuevo, comprueba cada archivo en el CDN (huella y CORS) y
   apunta la app. Si falta una frase o un audio, no publica. Se puede cortar y repetir.
3. Subir `VERSION` en `sw.js`, `node --test tests/`, commit de `js/explora-voces.js` y `sw.js`, push.

`node tools/subir-voz.js --revisa` comprueba todo lo publicado.

## Decisiones

- **Todo es inmutable**: el nombre de cada audio y de cada lista sale de su contenido. Cambiar una toma da otro nombre y otra
  lista; no hay que purgar cachés y volver atrás es volver al `js/explora-voces.js` anterior.
- **Nada se borra en Bunny**: un celular sin actualizar sigue usando la lista anterior. Pesa poco (2 MB por lección).
- **Celular**: el service worker guarda lo oído en `zuka-voz-v2` y, al llegar una lista nueva, borra los audios que esa lección
  ya no usa.
- **Si Bunny falla**: lista y audios se buscan en la copia propia (`media/voz/`, la frase por su texto). Si un audio no
  empieza en 6 s (1.5 s tras un fallo), ese momento usa el tiempo de lectura. Callar a mitad de frase también.
- Una lección sin narración publicada no pide nada. En `localhost` manda la carpeta local, para oír lo nuevo antes de subirlo.

## Pendiente del usuario

- La cuenta de Bunny está en prueba (7 días desde el 2026-11-24) y sin saldo.
- La voz de `pu-cm-1` (OmniVoice) no permite uso comercial y hace falta permiso del dueño de la voz.
