// Letras de la app: Jost (títulos, juegos y videos) y Plus Jakarta Sans (interfaz). @remotion/fonts hace que Remotion
// espere a que carguen antes de cada cuadro.
import { loadFont } from '@remotion/fonts';
import { staticFile } from 'remotion';

loadFont({ family: 'Jost', url: staticFile('fonts/Jost.ttf'), weight: '100 900', format: 'truetype' });
loadFont({ family: 'Plus Jakarta Sans', url: staticFile('fonts/PlusJakartaSans.woff2'), weight: '200 800', format: 'woff2' });
