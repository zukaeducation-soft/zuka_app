# Logo en color y colores institucionales (2026-11-28)

Pedido del usuario: cambiar el logo por el que entregó (dos imágenes, tema claro y tema oscuro), sacar de ahí los colores
institucionales de Zuka y hacer el cambio en todas las vistas donde sale el logo y en el icono de la app.

## El logo

El dibujo es el mismo de la spec `2026-11-24-logo-nuevo` (cerebro de un trazo, dos destellos y ZUKA): lo nuevo es el color. El
trazo lleva un degradado que sube hacia la derecha (dirección 0.65, −0.76 en el dibujo de 1254 px), medido sobre el trazo de las
dos imágenes; la palabra va en blanco sobre oscuro y en tinta `#002454` sobre claro.

| Lugar en el degradado | Tema oscuro | Tema claro |
|---|---|---|
| 0 (abajo a la izquierda) | `#0066ff` | `#0045fa` |
| 0.20 | `#00b5fa` | `#0270d0` |
| 0.47 | `#00e0d0` | `#00ae8d` |
| 0.63 | `#0aec82` | `#12c650` |
| 0.82 | `#50f81c` | `#58e106` |
| 1 (destellos) | `#7afb1f` | `#5ee004` |

## Colores institucionales

En `css/styles.css` (al final), por tema: `--zuka-azul`, `--zuka-cian`, `--zuka-turquesa`, `--zuka-menta`, `--zuka-lima`,
`--zuka-tinta` (palabra: blanco u `#002454`) y `--zuka-noche` (`#000000`, fondo del icono). El degradado del logo en la app usa
`--zg0` … `--zg5`. Los colores de la interfaz (`--brand` y demás) no cambian en este paso.

## Dónde

- `tools/marca.js` genera todo (`node tools/marca.js --png`): `js/marca.js` (en la app el degradado sigue al tema; cada logo
  lleva su propio id de degradado), `brand/logo-{dark,light}.svg` y `logo-vertical-*` (panel, portal, página de instituciones,
  hojas impresas), `brand/cerebro.svg`.
- Icono de la app: el cerebro en degradado sobre negro, sin la palabra. Archivos nuevos `icons/zuka-color-*` (los dispositivos
  guardan el icono por su dirección; los `zuka-claro-*` se borraron). La ficha del cerebro (`brainTile`: aviso de versión nueva,
  diálogos) es negra como el icono en los dos temas.
- Los libros en PDF (`docs/libros`) tienen su propia capa de LaTeX y no cambian aquí.

Pruebas: `tests/interfaz-red.test.js` (sección «la marca») y `tests/pwa.test.js`.
