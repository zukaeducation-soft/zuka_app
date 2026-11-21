# Reel promocional de Zuka · diseño (video-shotcraft, creación autónoma)

## Brief

- **Producto:** Zuka, app web de matemáticas en español (celular y portátil). 8 cursos (Álgebra, Trigonometría, Cálculo
  Diferencial, Geometría Vectorial y Analítica, Preuniversitario UdeA, Física Mecánica, Cálculo Integral, Álgebra Lineal),
  200 lecciones, 1 380 ejercicios hechos con 511 juegos distintos. Cada lección = video corto + juegos de arrastrar.
- **Uso:** reel vertical para redes (Instagram, TikTok, Shorts). **Público:** estudiantes de colegio y primeros semestres,
  aspirantes a la UdeA.
- **Pedido del usuario (2026-11-20):** «un reel con shotcraft para promocionar la app». Sin preguntas (regla del proyecto):
  creación autónoma.
- **Formato:** 1080 × 1920, 30 fps, 42 s (1 261 cuadros), sin voz. Música + efectos; versión solo con efectos desde la misma línea.

## Decisiones (pedido → ejecución)

| Pedido / regla | Decisión |
|---|---|
| promocionar | gancho de una frase, cuatro beneficios (cursos, video, juegos, preuniversitario), portátil y cierre con invitación |
| capturas reales | todo sale de la app servida en local (`tools/capture.mjs`, Playwright, celular 390 × 844 a 3x / 2x, portátil 1440 × 900 a 2x) y de un video real de lección (`02_proporciones.mp4`, 7 s) |
| datos | invitado sin cuenta ni datos personales |
| marca | interfaz «red»: negro azulado `#07080f`, hielo `#6fd3ff`, bordes de 1 px, brillo solo en lo actual; Jost + Plus Jakarta Sans |
| logo | el usuario quitó el cerebro de puntos de arriba: el cierre usa «Zuka» en letra y el nodo encendido de la red como icono |
| ritmo | educación «calma»: entradas suaves, ≥ 1 s quieto al leer, un protagonista por toma; los juegos no apuran |
| sonido | Freesound CC0 (12 efectos, `public/audio/sfx/FREESOUND-CREDITS.md`); música «Cat Walk» (Arulo, Mixkit, libre sin atribución) |

## Función → toma

| # | Función | Ficha | Demo de referencia | Archivo |
|---|---|---|---|---|
| 1 | gancho | vertical-word-roll-blur-cycle | demos/typography/vertical-word-roll-blur-cycle/VerticalWordRollBlurCycle.tsx | src/shots/S1Gancho.tsx |
| 2 | 8 cursos, 200 lecciones | deck-deal-flyin | demos/ui-entrance/deck-deal-flyin/DeckDealFlyin.tsx | src/shots/S2Cursos.tsx |
| 3 | video de la lección | propia (celular que sube con el video real) | — | src/shots/S3Video.tsx |
| 4 | más de 500 juegos | page-waterfall-wall | demos/ui-entrance/page-waterfall-wall/ | src/shots/S4Muro.tsx |
| 5 | se juega arrastrando | propia (folioscopio de 29 capturas reales + dedo) | — | src/shots/S5Balanza.tsx |
| 6 | Preuniversitario UdeA | pill-slot-cycle | demos/typography/pill-slot-cycle/PillSlotCycle.tsx | src/shots/S6Preu.tsx |
| 7 | portátil | propia (dos capturas reales de escritorio) | — | src/shots/S7Portatil.tsx |
| 8 | cierre e invitación | logo-shrink-wordmark-lockup | demos/outro/logo-shrink-wordmark-lockup/LogoShrinkWordmarkLockup.tsx | src/shots/S8Cierre.tsx |

Tomas propias: no hay ficha que muestre una interacción real cuadro a cuadro (5) ni un aparato que entra y se queda (3, 7);
son movimientos simples (subir con resorte, barrido) para no competir con las tomas de ficha.

## Guion

| # | Cuadros | Qué se ve |
|---|---|---|
| 1 | 150 | «Matemáticas que se» fijo; rodillo explican → ven → juegan → **entienden** (hielo) |
| 2 | 150 | montón de las 8 tarjetas reales de cursos; preparación; reparto que acelera a una rejilla 2 × 4; vista de pista; contador de lecciones hasta 200; «8 cursos, / una sola app.» |
| 3 | 120 | «PRIMERO, LA IDEA — Un video corto / que lo explica claro.»; celular con el video real (Eratóstenes, Siena) |
| 4 | 150 | pared inclinada con 24 juegos reales en 3 columnas; «Juegos para entenderlo. / Más de 500 distintos, sin prisa.» |
| 5 | 165 | «Mueves la x, / la balanza responde.»; el dedo arrastra x de 15 a 12, la balanza se equilibra, toca «Comprobar» → «¡Excelente!» real |
| 6 | 214 | «Para entrar a la UdeA,» + píldoras Razonamiento lógico · Comprensión lectora · Soluciones paso a paso · Preguntas tipo examen, con su pantalla real → «prepárate aquí.» |
| 7 | 132 | portátil: juego grande y lectura a dos columnas |
| 8 | 180 | anillo → nodo, «Zuka», «POTENCIA TU MENTE», botón «Empieza gratis» |

## Producir

```
node tools/capture.mjs [home juegos balanza preu clips leccion escritorio]   # app en http://localhost:5198
node tools/stills.mjs S-cursos:20,149 …                                      # cuadros de control → out/qa
node tools/render.mjs                                                        # out/reel.mp4 y out/reel-sin-musica.mp4
```

`node_modules` es un enlace a `video/bienvenida/node_modules`. Las capturas, el video y el audio no van al repositorio.
