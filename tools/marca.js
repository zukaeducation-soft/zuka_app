// Marca de Zuka: el cerebro de un solo trazo con dos destellos y la palabra ZUKA, en un color (spec 2026-11-24-logo-nuevo).
//   node tools/marca.js         escribe js/marca.js, brand/*.svg y la animación de entrada de index.html
//   node tools/marca.js --png   además dibuja icons/*.png y brand/*.png (usa playwright-core de ~/lemo-opuscar)
// Los contornos están calcados de la imagen que entregó el usuario (1254 × 1254 px).
const fs = require('fs');
const path = require('path');
const os = require('os');

const ROOT = path.join(__dirname, '..');
const NAVY = '#060d1a', WHITE = '#ffffff';

const BRAIN_D = 'M621.0 899.5C609.5 896.9 602.5 890.7 596.8 877.9C592.0 867.4 579.0 840.5 572.4 827.8C565.1 813.5 561.7 808.4 555.2 802.0C548.0 794.7 546.4 794.4 538.0 798.2C478.3 825.6 410.9 796.4 392.5 735.3C390.1 727.2 390.4 727.5 383.5 726.5C333.1 719.0 292.6 685.5 275.9 637.3C259.1 589.1 270.8 539.3 307.8 502.2C314.2 495.7 314.1 496.2 311.2 490.3C288.8 445.5 298.9 388.8 336.1 350.4C356.2 329.6 380.7 317.2 408.7 313.7C414.3 313.0 414.5 312.7 415.0 307.5C417.5 281.5 427.5 259.2 445.9 239.0C492.6 187.5 574.5 183.7 622.5 230.7C629.5 237.5 628.9 237.5 634.1 232.3C675.5 190.8 741.8 186.1 791.0 221.2C819.6 241.6 836.5 271.1 839.7 306.3C840.3 312.8 840.5 313.0 845.5 313.7C889.7 319.1 930.7 352.2 946.3 395.0C956.0 421.5 956.1 454.5 946.7 479.5C945.2 483.3 942.2 490.3 940.3 494.1C938.1 498.4 938.1 498.4 944.8 505.3C963.2 524.5 974.6 547.7 978.5 574.0C988.2 640.5 945.9 704.3 881.1 720.8C875.6 722.2 872.9 722.7 864.9 723.8C859.3 724.6 859.6 724.3 857.3 733.0C842.9 788.8 786.1 820.3 730.2 803.5C719.4 800.2 715.4 803.0 700.6 824.0C690.3 838.6 666.5 870.8 655.1 885.7C646.5 896.7 632.9 902.3 621.0 899.5ZM649.9 809.1C651.1 808.1 658.6 797.5 670.1 780.5C689.6 751.8 713.7 741.4 740.4 750.1C742.3 750.8 745.6 751.9 747.8 752.7C770.8 760.7 797.1 747.7 806.5 723.6C818.7 692.6 796.9 660.2 762.5 658.3C746.7 657.5 738.3 647.8 740.8 633.5C742.9 621.7 751.7 616.4 767.3 617.6C801.5 620.0 830.1 637.9 845.9 667.0C849.3 673.2 849.3 673.2 854.3 673.1C882.5 672.8 914.2 647.4 924.1 617.0C943.9 556.8 884.9 499.3 826.1 521.1C806.2 528.5 789.4 511.7 798.2 493.4C801.4 486.7 804.8 484.3 816.4 480.3C838.1 473.0 857.0 472.1 879.5 477.3C889.0 479.6 889.3 479.4 894.6 469.0C913.8 431.6 894.4 383.6 853.3 367.2C826.9 356.6 796.3 364.6 780.2 386.5C765.9 405.9 736.8 393.7 742.2 370.7C743.0 367.2 744.7 364.2 748.2 360.0C760.5 345.3 768.1 338.8 781.9 331.1C787.8 327.9 788.0 327.4 788.1 318.0C788.1 254.7 706.4 225.5 663.6 273.5C651.6 286.9 647.4 299.4 647.1 322.7C646.9 335.4 646.8 336.1 644.7 340.2C637.0 355.1 614.5 353.2 608.7 337.2C607.9 334.9 607.9 334.7 607.6 321.3C607.4 307.0 607.2 305.2 605.5 298.7C593.2 253.5 537.0 235.0 495.7 262.6C475.8 275.9 462.2 300.4 463.5 320.5C463.8 326.6 464.1 326.9 470.3 330.0C488.9 339.2 510.2 359.6 512.8 370.7C518.3 394.2 488.9 406.0 474.4 386.2C462.4 369.7 438.2 359.7 417.1 362.5C366.8 369.1 335.2 424.8 357.0 468.5C362.1 478.8 362.5 479.0 370.4 477.1C394.3 471.3 414.9 472.1 437.5 479.7C452.2 484.7 457.9 491.4 457.2 503.0C456.3 518.3 442.7 525.8 426.7 519.8C376.3 501.1 319.3 540.4 319.3 594.0C319.3 634.3 352.6 671.2 392.5 675.3C399.4 676.0 400.6 675.6 402.8 670.9C418.5 637.8 452.6 616.7 490.2 616.7C503.0 616.7 511.3 622.6 513.2 633.2C515.7 646.4 506.7 657.3 493.3 657.3C472.9 657.3 456.8 665.4 446.8 680.7C425.0 713.8 450.5 755.7 492.3 755.7C502.4 755.7 508.3 754.0 520.8 747.8C550.9 732.9 574.1 741.3 600.6 776.8C605.5 783.3 606.2 783.9 607.1 782.2C607.4 781.7 607.5 771.6 607.7 732.8C607.8 684.2 607.8 684.2 608.5 682.3C615.4 664.4 639.6 664.4 646.1 682.3C646.8 684.5 646.8 684.5 647.0 746.5C647.2 812.5 647.1 809.7 648.7 809.7C649.0 809.7 649.6 809.4 649.9 809.1Z';
const RAYS_D = 'M851.5 231.3C840.6 229.7 833.0 220.1 833.8 209.0C834.0 205.1 834.6 203.5 840.4 190.2C843.1 183.8 847.0 174.7 849.0 170.0C851.1 165.3 853.7 159.1 855.0 156.2C856.3 153.2 858.9 147.1 860.9 142.5C866.8 128.5 866.9 128.3 870.1 125.2C883.9 111.5 906.7 120.8 906.7 140.1C906.7 144.2 906.1 146.3 903.5 152.4C902.3 155.2 900.4 159.7 899.3 162.3C898.2 165.0 896.3 169.5 895.0 172.3C893.7 175.2 891.4 180.5 889.8 184.2C888.2 187.8 885.0 195.1 882.8 200.3C880.5 205.6 877.7 212.1 876.5 214.9C871.4 227.2 862.4 233.1 851.5 231.3ZM904.5 290.0C888.3 285.4 883.2 264.8 895.4 253.1C897.0 251.6 917.6 236.8 932.3 226.6C934.4 225.1 937.3 223.1 938.7 222.0C940.0 221.0 943.6 218.5 946.7 216.4C949.7 214.3 954.1 211.2 956.5 209.5C963.2 204.8 965.4 203.5 967.2 202.7C984.6 195.5 1002.5 213.0 996.2 231.1C994.3 236.6 991.6 239.4 981.2 246.5C977.0 249.5 969.7 254.5 965.1 257.7C960.5 260.9 954.1 265.3 950.9 267.5C947.8 269.7 942.3 273.4 938.8 275.8C927.6 283.6 921.2 287.9 919.7 288.6C915.8 290.6 908.7 291.3 904.5 290.0Z';
const WORD_D = 'M246.9 1103.5C236.1 1100.9 231.6 1087.9 238.2 1078.0C239.0 1076.8 242.5 1072.7 246.1 1069.0C249.6 1065.3 253.6 1061.0 255.0 1059.5C256.3 1058.0 260.0 1054.1 263.1 1050.8C266.3 1047.5 270.7 1042.8 273.0 1040.3C275.3 1037.9 280.3 1032.5 284.2 1028.3C294.9 1016.9 302.8 1008.3 306.6 1004.0C308.5 1001.9 312.2 997.9 314.8 995.2C320.2 989.5 321.0 988.5 321.0 987.4C321.0 985.6 322.0 985.7 285.4 985.7C257.5 985.7 251.5 985.6 249.6 985.2C233.8 981.8 233.7 958.7 249.4 954.5C252.2 953.7 361.3 953.8 364.2 954.5C371.9 956.5 376.4 963.1 375.9 971.6C375.6 976.7 374.2 979.3 368.5 985.4C364.2 989.9 356.4 998.4 352.0 1003.3C350.3 1005.2 346.5 1009.4 343.7 1012.5C340.8 1015.6 335.9 1021.1 332.7 1024.7C329.5 1028.2 324.2 1034.0 320.9 1037.6C317.6 1041.2 313.3 1046.0 311.3 1048.3C309.2 1050.6 305.1 1055.2 302.0 1058.5C292.2 1069.1 292.1 1069.2 292.5 1070.5C292.8 1071.8 293.1 1071.8 331.2 1072.0C368.5 1072.2 368.5 1072.2 371.1 1073.5C384.9 1080.2 382.4 1100.9 367.5 1103.6C364.3 1104.2 249.4 1104.1 246.9 1103.5ZM520.0 1110.1C519.4 1110.1 517.2 1109.8 515.2 1109.7C485.0 1106.8 461.4 1086.1 455.4 1057.2C453.5 1048.3 453.6 1050.6 453.4 1008.5C453.3 966.0 453.3 966.9 455.1 962.8C460.7 950.6 479.8 950.6 485.8 962.7C487.6 966.5 487.7 966.7 487.7 1005.2C487.7 1042.5 487.8 1045.3 489.2 1051.0C497.1 1082.1 544.3 1086.4 558.8 1057.3C562.7 1049.6 562.7 1050.2 562.8 1005.9C562.9 971.7 563.0 967.4 563.5 965.7C568.2 949.5 592.3 949.7 596.4 966.0C597.3 969.7 597.0 1046.0 596.1 1051.7C593.1 1069.0 587.8 1079.9 577.0 1090.6C563.3 1104.1 540.2 1112.0 520.0 1110.1ZM695.2 1107.0C687.9 1106.1 682.5 1101.4 680.8 1094.3C680.1 1091.1 680.1 969.1 680.8 966.2C684.1 953.2 700.1 948.9 709.7 958.3C714.3 962.8 714.3 963.3 714.3 991.3C714.3 1021.3 713.7 1019.9 722.8 1011.5C730.1 1004.8 748.4 987.8 758.0 978.8C782.5 956.0 781.7 956.7 784.6 955.3C799.4 948.2 814.0 962.2 806.8 976.5C805.5 979.2 801.0 983.5 781.0 1001.3C761.0 1019.2 757.3 1022.7 757.3 1024.4C757.3 1025.9 758.3 1027.0 787.3 1057.7C790.7 1061.2 795.1 1065.9 797.0 1068.0C798.9 1070.1 802.5 1073.9 804.9 1076.5C812.8 1084.7 814.4 1090.6 810.8 1098.0C805.5 1108.7 790.7 1110.5 781.9 1101.5C778.7 1098.3 766.6 1085.3 753.3 1070.8C746.9 1063.9 737.0 1053.4 733.6 1049.9C728.7 1044.9 729.3 1044.8 720.6 1052.6C713.8 1058.7 714.5 1056.0 714.3 1076.3C714.1 1090.6 714.0 1093.8 713.6 1095.2C711.2 1103.3 703.8 1108.0 695.2 1107.0ZM881.0 1106.5C872.1 1104.1 866.9 1095.1 869.2 1086.2C869.5 1085.0 872.2 1079.3 875.6 1072.8C885.4 1053.8 890.2 1044.6 895.5 1034.3C898.3 1028.9 901.8 1022.2 903.3 1019.3C904.8 1016.5 908.4 1009.6 911.3 1004.0C914.2 998.4 918.6 989.9 921.2 985.0C923.7 980.1 927.5 972.6 929.7 968.2C934.4 958.9 935.4 957.6 940.1 955.3C947.1 951.9 955.7 953.2 961.0 958.6C962.9 960.6 962.9 960.5 974.0 982.0C976.6 987.0 980.4 994.2 982.3 997.8C984.3 1001.5 987.8 1008.2 990.2 1012.8C992.5 1017.4 996.7 1025.5 999.5 1030.8C1009.8 1050.5 1026.6 1083.6 1027.1 1085.3C1031.5 1100.1 1016.6 1112.0 1002.5 1104.9C998.4 1102.8 996.8 1100.7 991.0 1089.5C984.2 1076.2 984.5 1076.7 982.9 1076.0C981.3 1075.3 916.8 1075.0 914.3 1075.7C912.2 1076.2 912.6 1075.7 903.9 1092.8C897.7 1105.1 891.0 1109.1 881.0 1106.5ZM966.8 1044.3C968.9 1043.5 968.8 1043.0 962.2 1029.3C959.4 1023.6 956.7 1017.9 956.2 1016.7C955.7 1015.5 954.1 1012.2 952.8 1009.4C948.3 1000.0 948.6 999.8 940.8 1016.0C928.0 1042.5 927.8 1043.0 929.4 1044.1C930.3 1044.8 965.2 1044.9 966.8 1044.3Z';

const MARK = `<g transform="translate(-29.1 -13.7) scale(.125)"><path d="${BRAIN_D}"/><path class="rays" d="${RAYS_D}"/></g>`;
const WORD = `<path d="${WORD_D}"/>`;
const WORD_BOX = '234 952 795 160';

// Sin `ink`, toma el color del texto.
const brain = ({ ink = 'currentColor', cls = ' class="brain"' } = {}) =>
  `<svg${cls} viewBox="0 0 100 100" fill="${ink}" aria-hidden="true" focusable="false">${MARK}</svg>`;
const wordmark = (ink = 'currentColor') =>
  `<svg class="wordmark" viewBox="${WORD_BOX}" fill="${ink}" aria-hidden="true" focusable="false">${WORD}</svg>`;

// Archivos sueltos (panel de administración, libros, documentos): colores fijos.
const XMLNS = 'xmlns="http://www.w3.org/2000/svg"';
const file = (box, ink, body) => `<svg ${XMLNS} viewBox="${box}" fill="${ink}" role="img" aria-label="Zuka"><title>Zuka</title>${body}</svg>\n`;
const horizontal = ink => file('0 0 312 100', ink, `${MARK}<g transform="translate(54 -206) scale(.248)">${WORD}</g>`);
const vertical = (ink, bg) => file('0 0 1254 1254', ink, `<path fill="${bg}" d="M0 0h1254v1254H0z"/><path d="${BRAIN_D}"/><path d="${RAYS_D}"/>${WORD}`);

function build() {
  const js = `// Marca de Zuka: el cerebro de un trazo y la palabra ZUKA. GENERADO por \`node tools/marca.js\`: no editar a mano.
// Los dos toman el color del texto. brainTile: el cerebro en su ficha oscura, como el icono de la app.
const BRAIN = '${brain()}';
const brainSVG = () => BRAIN;
const brainTile = (cls = '') => \`<span class="brain-tile\${cls ? ' ' + cls : ''}">\${BRAIN}</span>\`;
const WORDMARK = '${wordmark()}';
const logoHTML = () => \`<span class="logo" role="img" aria-label="Zuka">\${BRAIN}\${WORDMARK}</span>\`;
`;
  return {
    files: {
      'js/marca.js': js,
      'brand/logo-dark.svg': horizontal(WHITE),     // para fondo oscuro
      'brand/logo-light.svg': horizontal(NAVY),     // para fondo claro
      'brand/logo-vertical-dark.svg': vertical(WHITE, NAVY),
      'brand/logo-vertical-light.svg': vertical(NAVY, WHITE),
      'icons/zuka-claro-favicon.svg': file('0 0 100 100', NAVY, `<rect width="100" height="100" rx="22" fill="${WHITE}"/><g transform="translate(7 7) scale(.86)">${MARK}</g>`),
      'brand/cerebro.svg': file('0 0 100 100', NAVY, MARK),
    },
  };
}

// ---- iconos PNG ----
// El cerebro azul noche sobre blanco (pedido del 2026-11-24), sin la palabra (el celular ya escribe el nombre debajo). `k`: lado del cerebro como
// fracción del icono. Si cambia el dibujo, cambiar también el nombre del archivo: los dispositivos guardan el icono por su dirección.
// Android recorta el enmascarable: el cerebro queda dentro de la zona segura (círculo del 80 %).
const ICONS = [
  { file: 'icons/zuka-claro-512.png', size: 512, k: 0.8, round: 0.22 },
  { file: 'icons/zuka-claro-192.png', size: 192, k: 0.8, round: 0.22 },
  { file: 'icons/zuka-claro-maskable-512.png', size: 512, k: 0.62 },
  { file: 'icons/zuka-claro-apple-180.png', size: 180, k: 0.78 },
  { file: 'icons/zuka-claro-favicon-48.png', size: 48, k: 0.9, round: 0.22 },
];
function iconPage({ size, k, round = 0 }) {
  const s = size * k;
  return `<!doctype html><meta charset="utf-8"><style>html,body{margin:0;background:transparent}
    #i{width:${size}px;height:${size}px;display:grid;place-items:center;border-radius:${round * size}px;background:${WHITE}}</style>
    <div id="i">${brain({ ink: NAVY }).replace('<svg', `<svg ${XMLNS} width="${s}" height="${s}"`)}</div>`;
}
async function pngs() {
  const lemo = path.join(os.homedir(), 'lemo-opuscar');
  const { chromium } = require(path.join(lemo, 'node_modules', 'playwright-core'));
  const { EXE } = await import('file:///' + path.join(lemo, 'core/render/browser.mjs').replace(/\\/g, '/'));
  const browser = await chromium.launch({ executablePath: EXE });
  const shots = ICONS.map(i => ({ ...i, html: iconPage(i) }));
  for (const t of ['dark', 'light']) shots.push({ file: `brand/logo-vertical-${t}.png`, size: 1024,
    html: `<!doctype html><style>body{margin:0}</style><div id="i" style="width:1024px;height:1024px">${build().files[`brand/logo-vertical-${t}.svg`]}</div>` });
  for (const shot of shots) {
    const page = await browser.newPage({ viewport: { width: shot.size, height: shot.size }, deviceScaleFactor: 1 });
    await page.setContent(shot.html);
    await page.waitForTimeout(50);
    await page.locator('#i').screenshot({ path: path.join(ROOT, shot.file), omitBackground: true });
    await page.close();
    console.log('  ' + shot.file);
  }
  await browser.close();
}

if (require.main === module) {
  const { files } = build();
  for (const [f, text] of Object.entries(files)) { fs.writeFileSync(path.join(ROOT, f), text); console.log('  ' + f); }
  if (process.argv.includes('--png')) pngs().catch(e => { console.error(e); process.exit(1); });
}

module.exports = { build, brain, BRAIN_D, RAYS_D, WORD_D };
