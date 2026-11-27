# Catálogo de juegos de geometría reutilizables (2026-11-26)

Para escribir ejercicios nuevos de Geometría Euclidiana **solo con datos**, sin tocar `js/games/`. Todo lo que sigue se leyó en el código
(`grade`/`ok`, `manijas`, `dib`, pruebas). «≠ inicio» quiere decir: la respuesta no puede coincidir con el estado inicial, porque el
armazón solo deja comprobar cuando el estado cambió (`listo`) y las pruebas exigen `grade(ini).ok === false`.

## 0. Cómo se llama un juego

```js
play('nombre', enunciado, params, explicación, { hint })      // js/content.js; así lo usa preuda-r-geometria.js
x('nombre', enunciado, params, explicación, pista)            // ICF.x (preicfes-base.js:22) = play(…, { hint: pista })
sol(q, lines, extra, explain, hint)                           // completa-solucion
err(q, steps, wrong, fixes, explain, hint)                    // caza-error (pone fix: 0)
opc(q, options, answer, explain, hint)                        // opcion-examen
```

- El enunciado (`q` de `play`) admite `**negrita**` y TeX entre `$…$` (barra doble en cadenas JS).
- Todos los juegos «con escena» son `GAMES[n].xp === true` y exponen `ini`, `listo`, `solve`, `texto`, `grade` (puros).
- Lienzo de las escenas: SVG de **340 de ancho** y alto propio de cada juego. Los textos dentro de la escena y de las fichas son texto SVG
  plano: **sin TeX, sin `$`**, con Unicode (`√`, `π`, `°`, `×`, `−`).

## 1. Los tres armazones de `js/games/figura-kit.js`

### 1.1 `XG.figura(nombre, d)`: se arrastran manijas

Estado `v = { clave: número }`. Cada manija es `{ k, min, max, paso, en?, de?, et?, r?, inv?, rot? }` (`k`, `min`, `max`, `paso` pueden ser
arreglos de dos para un punto que se mueve en x e y). El valor se ajusta con `xpPaso`: **solo existen los valores `min + n·paso`** hasta
`max` (redondeados a 3 decimales). Si la manija **no tiene `en`**, es un deslizador («regla») dibujado abajo, con rótulo `et`; cada
regla añade 44 px de alto. `listo` = el estado difiere del inicial. Al comprobar, `dib(v, K, p, f)` corre con `f` de 0 a 1 y revela lo
oculto; si falla, sale `aviso(v, p)` y la figura viaja a `sol(p)`.

Regla general para los datos: **la solución `sol(p)` tiene que caer exactamente sobre un valor alcanzable de cada manija, ser distinta
del inicio, y casi todos los `ok` comparan con `===`** (enteros o medios: nada de valores que solo «casi» coinciden en coma flotante).

### 1.2 `XG.rotula(nombre, d)`: fichas a lugares

Estado `{ q: [[ficha] por lugar] }`. El juego fija `slots(p)` (lugares `{ x, y, w, h }`) y calcula `metas(p)` (la ficha correcta de cada
lugar, **cadenas**); los datos casi siempre solo aportan los números y **`fichas`** (arreglo de cadenas: todas las metas, con sus
repeticiones, más distractores). `ok` = en cada lugar está exactamente la cadena de `metas`. La bandeja se revuelve sola (determinista)
para que las buenas no salgan en el orden de los lugares; un toque manda la ficha al primer lugar libre.

- La ficha mide `max(36, letras·8 + 16)` px de ancho: para que quepa en su lugar, `letras ≤ (w − 16) / 8`.
- Deben sobrar fichas (la prueba de geometría exige ≥ 1 distractor) y cada meta debe estar en `fichas` tantas veces como aparece.
- La comparación es textual: `'62°'` ≠ `'62 °'`, `'× 25'` lleva espacio, el menos es el que escriba el juego.

### 1.3 `XG.tiros(nombre, d)`: en movimiento

`params = { tiros: [t, t, t] }`. Cada tiro: `q` (texto que se muestra arriba, con TeX y negrita), `r` (respuesta), `c` (la cuenta en TeX
**sin `$`**: el juego escribe `$c = r$`), `e` (opcional: `{ valorErróneo: 'aviso' }`) y los campos de dibujo propios del juego. Se estira una
perilla de enteros `min…max` y al soltar la escena lo ejecuta. `MAXF = 2`: **un fallo se perdona, con dos se pierde**; estado
`{ n, fallos }`. Convención y prueba: **3 tiros**, la meta es entera, `> min` y `≤ max` de la perilla; las claves de `e` son distintas de
`r` y alcanzables; el enunciado dice «Puedes fallar **una** vez».

## 2. Armazones genéricos ya registrados (los más reutilizables)

Un armazón genérico solo se puede usar con **un nombre ya registrado** (registrar otro nombre es código nuevo: archivo de juego, entrada
en `GUIDES` de `js/guia.js` y `node tools/empaquetar.js`). Estos son los nombres de geometría que aceptan datos libres.

### 2.1 Frases que se tocan: `XG.frases(nombre)` (proposiciones-escena.js:19, sobre `XG.marca`)

Nombres: **`cierran-o-no`** (forma-escena.js), **`que-se-conserva`**, **`mismo-polar`** (espacio-escena.js).

```js
{ casos: [{ t: 'texto', si: true } | { t: 'texto', no: 'por qué no (aviso)' }, …], falta: 'aviso si faltó marcar una buena', ok: 'frase al acertar', da?: ['renglón dado', …] }
```

- Se tocan todas las que cumplen; `ok` = el conjunto marcado es exactamente el de `si: true`. `listo` = hay al menos una marcada.
- Cada caso falso lleva **su** `no` (es el aviso que sale si se marca; la prueba del Preicfes exige > 12 letras para `cierran-o-no`).
  `falta` y `ok` son obligatorios (si faltan sale «undefined»). El `no` de nivel superior que aparece en el ejemplo no se usa.
- Cada frase va en una caja de 330 × 38 con letra pequeña, en un renglón: unas 40 letras como mucho. Alto = 44 px por caso.
- `da` (opcional) escribe renglones dados encima.

Ejemplo real: `x('cierran-o-no', 'Toca **todas** las ternas que forman un triángulo.', { casos: [{ t: '5, 6 y 10', si: true }, { t: '3, 4 y 8', no: 'En 3, 4 y 8 las dos cortas suman 7: no alcanzan a la de 8.' }, { t: '7, 7 y 13', si: true }, { t: '2, 5 y 7', no: 'En 2, 5 y 7 las dos cortas apenas igualan a la larga: queda una línea.' }, { t: '9, 4 y 6', si: true }], no: '…', falta: 'Falta alguna que sí cierra.', ok: 'En todas, el mayor es menor que la suma.' }, …)`

### 2.2 Casillas con rótulo en renglones: `XG.renglones(nombre, { w, x })` (proposiciones-escena.js:15, sobre `XG.rotula`)

Nombres: **`que-movimiento`** (w 108, x 274), **`polar-a-cartesiana`** (w 92, x 274).

```js
{ et: ['rótulo del renglón', …], metas: ['ficha buena del renglón', …], fichas: [metas + distractores], mira: ['aviso del renglón i', …], trampas?: { 'i:ficha': 'aviso de ese error' }, ok: 'frase al acertar' }
```

- Un lugar por renglón (48 px cada uno), el rótulo `et[i]` a su izquierda (alineado a la derecha; letra pequeña si pasa de 20 letras).
- Aviso al fallar: el primer renglón `i` mal puesto; si existe `trampas['i:fichaPuesta']` sale ese, si no `mira[i]`. `mira` debe tener
  una entrada por renglón.
- `et`, `metas` y `mira` del mismo largo.

Ejemplo real: `x('polar-a-cartesiana', 'Pasa cada punto polar (pasos; giro) a **cartesianas**.', { et: ['(5; 0°)', '(3; 90°)', '(2; 180°)', '(6; 30°)'], metas: ['(5, 0)', '(0, 3)', '(−2, 0)', '(5.2, 3)'], fichas: ['(5, 0)', '(0, 3)', '(−2, 0)', '(5.2, 3)', '(0, 5)', '(3, 5.2)', '(2, 0)'], mira: ['Sin girar, queda a la derecha.', 'Un cuarto de vuelta: arriba.', 'Media vuelta: a la izquierda.', 'A 30°, la altura es la mitad de los pasos.'], trampas: { '2:(2, 0)': 'Media vuelta lo deja a la izquierda.', '3:(3, 5.2)': 'A 30° está más a la derecha que arriba.', '0:(0, 5)': 'Sin girar no sube.' }, ok: 'Girar y caminar.' }, …)`

### 2.3 Casillas en fila bajo una escena: `XG.cuenta(nombre, alto, escena)` (conteo-escena.js:9, sobre `XG.rotula`)

Mismos campos que 2.2 más `ops`: `{ et, metas, fichas, mira, trampas?, ok, ops? }`. Las casillas van **en una fila** bajo el dibujo, con
`et[i]` debajo de cada una; ancho de cada casilla `min(84, 324/n − 18)` (con 3 casillas, 84 → fichas de hasta 8 letras; con 4, 63 → 5
letras). `ops[i]` es el signo que se dibuja entre la casilla `i` y la `i+1` (`'+'`, `'·'`, `'−'`, `'÷'`, `'='`); si `ops` forma una
cuenta de un solo tipo terminada en `'='`, al comprobar se lee lo que da (`XG.cadena`). `trampas` se lee con `?.`, pero los ejemplos
siempre la mandan (aunque sea `{}`).

Nombres con escena de geometría:

| Nombre | Archivo | Escena | Campos extra de `params` |
|---|---|---|---|
| `lados-nombra`, `razones-tres`, `recta-notables` | trig-escena.js:68 | triángulo rectángulo con θ abajo a la izquierda | `t: { a?, ca?, co?, hi?, b?, h? }`: rótulos del ángulo (por defecto `'θ'`), cateto adyacente, opuesto e hipotenusa; `b`, `h` tamaño en px (por defecto 150 × 96) |
| `torres-suma` | espacial-escena.js:71 | pila de cubos | `h`: matriz `h[fila][columna]`, fila 0 = adelante |
| `dado-escondidas` | espacial-escena.js:131 | dado con tres caras a la vista | `ve: [arriba, frente, derecha]` |

Ejemplo real: `x('razones-tres', 'Opuesto 9, adyacente 40, hipotenusa 41. Pon cada razón de θ.', { et: ['sen', 'cos', 'tan'], metas: ['9/41', '40/41', '9/40'], fichas: ['9/41', '40/41', '9/40', '41/9', '40/9'], mira: ['Opuesto sobre hipotenusa.', 'Adyacente sobre hipotenusa.', 'Opuesto sobre adyacente.'], ok: 'SOH, CAH y TOA.', trampas: {}, t: { co: '9', ca: '40', hi: '41' } }, …)`

### 2.4 Perillas que mueven una escena: `XG.mueve(nombre, alto, dib, lee)` (trig-escena.js:25, sobre `XG.figura`)

Nombres de geometría: **`catetos-razon`**, **`escalera-apoya`**, **`mirador`**.

```js
{ ks: [[clave, min, max, 'rótulo de la perilla', paso?], …], v: { clave: valorInicial }, meta: { clave: valorBueno }, mira: 'aviso al fallar', ok: 'frase al acertar' }
```

- Cada `ks` es un deslizador (regla); `paso` por defecto 1. `ok` = **todas** las claves iguales a `meta` (tolerancia 1e-6): la respuesta
  es **única**, aunque otra pareja dé la misma razón. `meta[k]` debe ser `min + n·paso`; `v` ≠ `meta`.
- `mira` y `ok` son cadenas obligatorias (son el aviso y el acierto).
- `catetos-razon`: claves `x` (adyacente) e `y` (opuesto); se dibuja a 13 px por unidad: `x ≤ 12`, `y ≤ 9`. Pide una razón irreducible
  que solo salga de una pareja dentro del rango.
- `escalera-apoya`: clave `g` (ángulo con el piso, grados). `mirador`: clave `g` (elevación; hasta 60° cabe) y además `d` (distancia en
  metros, solo rótulo).

Ejemplo real: `x('catetos-razon', 'Mueve los catetos hasta que la **tangente** de θ sea $\\tfrac{5}{8}$.', { mira: 'La tangente es opuesto sobre adyacente, en ese orden.', ok: 'Opuesto 5 y adyacente 8.', ks: [['x', 2, 12, 'adyacente'], ['y', 2, 8, 'opuesto']], v: { x: 4, y: 4 }, meta: { x: 8, y: 5 } }, …)`
y `x('mirador', 'Desde **30 m**, la altura de una torre es $30\\sqrt3$ m. Inclina la mirada.', { mira: '…', ok: '…', d: 30, ks: [['g', 15, 60, 'elevación', 15]], v: { g: 15 }, meta: { g: 60 } }, …)`

### 2.5 Ascensor (en movimiento): `XG.ascensor(nombre, max, paso, avisos)` (conteo-escena.js:51, sobre `XG.tiros`)

Nombres: **`sube-movimiento`** (máx 100, de 2 en 2), **`sube-distancia`** (máx 60, de 1 en 1). Sirve para **cualquier respuesta numérica**.

```js
{ tiros: [{ q: 'pregunta', r: respuesta, c: 'cuenta en TeX sin $', e: { valorErróneo: 'aviso' } }, ×3] }
```

`r` debe ser múltiplo de `paso`, `> 0` y `≤ max`; las claves de `e` también múltiplos de `paso`. Sin `e`, el aviso es «Se pasó…» o
«Le faltó…».

Ejemplo real: `x('sube-distancia', 'Sube a la cantidad que responde. Puedes fallar **una** vez.', { tiros: [{ q: 'Distancia entre $(1, 2)$ y $(9, 17)$.', r: 17, c: '\\sqrt{8^2 + 15^2}', e: { 23: 'Sumaste los catetos: falta Pitágoras.' } }, { q: 'Diagonal interior de una caja de **2**, **3** y **6**.', r: 7, c: '\\sqrt{4 + 9 + 36}', e: { 11: 'Sumaste los lados: se suman sus cuadrados.' } }, { q: 'Área del rectángulo con vértices $(-2, 1)$, $(6, 1)$, $(6, 6)$ y $(-2, 6)$.', r: 40, c: '8 \\cdot 5', e: { 26: 'Ese es el perímetro.' } }] }, …)`

### 2.6 `XG.rotula` con datos libres: `caja-coordenadas` (espacio-escena.js)

`{ d: [a, b, h], ver: [['P', [x, y, z]], …], metas: ['(3, 0, 4)', …], fichas, mira: [uno por vértice], trampas?, ok }`. Dibuja la caja
`a × b × h` en isométrico (22 px por unidad, cabe hasta 3 × 2 × 4 aprox.) con los vértices `ver` marcados; un lugar por vértice (112 de
ancho: fichas de hasta 12 letras), en el orden de `ver`. Ejemplo real: `{ d: [3, 2, 4], ver: [['P', [3, 0, 4]], ['Q', [0, 2, 0]], ['R', [3, 2, 4]]], metas: ['(3, 0, 4)', '(0, 2, 0)', '(3, 2, 4)'], fichas: ['(3, 0, 4)', '(0, 2, 0)', '(3, 2, 4)', '(0, 2, 4)', '(3, 2, 0)'], mira: ['Está arriba, sobre el eje x: no avanza en y.', 'Está en el piso, sobre el eje y.', 'Está en la esquina opuesta al origen.'], trampas: { '1:(0, 2, 4)': 'Q está en el piso: su altura es 0.', '2:(3, 2, 0)': 'R está arriba.' }, ok: 'Lado, fondo y altura.' }`

### 2.7 Lo que NO es reutilizable solo con datos

- `XG.marca`, `XG.cartas`, `XG.tabla`, `XG.puestos` (logica-kit.js) y `XG.conPerillas` (explora-kit.js) son armazones para **programar**
  un juego: reciben funciones (`sitios`, `cara`, `sol`, `aviso`…). Con datos solo se usan sus nombres ya registrados (los `frases` de 2.1,
  `vista-frente`, `cierra-cubo`, `vecinas-cara` de la sección 6). `XG.tabla`/`XG.cartas`/`XG.puestos` no tienen ningún juego de geometría:
  `tabla` pide `{ filas, cols, pistas: [{ t, r }] }` con reglas `['es'|'no'|'o'|'liga', …]`; `cartas`, `{ names, dadas?, cartas: [{ t, r }], k }`;
  `puestos`, `{ fichas, pistas: [{ t, r }], fijas?, ini? }` con las reglas de `XG.regla` (`en`, `noen`, `sig`, `antes`, `dist`, `junto`, `nojunto`,
  `sigc`, `frente`, `juntoc`, `nojuntoc`, `entre`, `grupo`, `noext`, `mismo`, `rel`).
- `js/games/marca-mueve.js` (`XG.MUEVE`, `XG.PRUEBA`) y `js/games/rotula-mueve.js` (`XG.ROTULA`, `XG.ORDEN`, `XG.cadena`) son tablas **por
  nombre de juego** con la animación al comprobar. De geometría solo tienen entrada `vista-frente`, `vista-izquierda`, `cierra-cubo` y
  `vecinas-cara`; no piden nada a los datos.

## 3. Juegos de `geo-escena-1.js` … `geo-escena-6.js` (Preuniversitario, pu-ge-1 a 6)

Abreviaturas: F = `XG.figura`, R = `XG.rotula`, T = `XG.tiros` (en movimiento).

### 3.1 Ángulos y paralelas (`js/games/geo-escena-1.js`)

| Juego | Tipo | Qué hace el estudiante | `params` y restricciones |
|---|---|---|---|
| `vecinos-razon` | F | Gira un rayo sobre una recta hasta que un ángulo sea k veces el otro | `{ k }`. Manija `a` de 12 a 168 de 3 en 3, inicio 90. Respuesta `180k/(k+1)`: debe ser múltiplo de 3 y ≠ 90 → **k ∈ {2, 3, 4, 5, 9, 14}** (k = 1 no sirve; con k = 8 da 160, que no está en la rejilla). `180/(k+1)` entero |
| `tres-parientes` | R | Pone complementario, suplementario y opuesto por el vértice de un ángulo | `{ a, fichas }`. Metas `['(90−a)°', '(180−a)°', 'a°']` (número pegado a `°`). `a < 90`. Lugares de 58: fichas ≤ 5 letras |
| `cruce-ocho` | R | Pone los 4 ángulos que faltan en dos paralelas y una transversal | `{ a, fichas }`. Metas `[a°, a°, (180−a)°, a°]` → `fichas` necesita **tres** `'a°'` y una `'(180−a)°'` más distractores. `a` agudo y grande (usados 64 y 72): con ángulos chicos la transversal se sale |
| `conjugados-justos` | F | Inclina la transversal hasta que el ángulo dorado mida `dif` más que el de abajo | `{ dif }`. Manija 40 a 140 de 5 en 5, inicio 90. Respuesta `(180−dif)/2` → **`dif` múltiplo de 10, de 10 a 100** |
| `tercer-angulo` | F | Abre los dos ángulos de la base (iguales) para que arriba quede `top` | `{ top }`. Manijas `a`, `b` de 30 a 58 de 2 en 2 (inicio 34 y 44). Respuesta `(180−top)/2` par entre 30 y 58 → **`top` ∈ {64, 68, 72, …, 120}** (de 4 en 4) |
| `exterior-alcanza` | F | Corre un vértice por el piso hasta que el ángulo exterior mida `ext` | `{ a, ext }`. Manija `c` de 20 a 75 de 5 en 5, inicio 30. `c = ext − a` múltiplo de 5 en 20…75 y **≠ 30**. `a ≤ 75` (con más, el vértice se sale del lienzo). Error con aviso propio: `c = 180 − ext` |
| `poligono-regular` | F | Elige el número de lados para que cada ángulo mida `ang` | `{ ang }`. Deslizador `n` de 3 a 20, inicio 4. `360/(180−ang)` entero ≠ 4 → **`ang` ∈ {60, 108, 120, 135, 140, 144, 150, 156, 160, 162}** |
| `lanza-angulo` | **T** | Da un ángulo al faro y lo suelta | `{ tiros: [{ q, r, c, e? }] }`. Perilla de 0° a 180° **de 5 en 5**: `r` múltiplo de 5, de 5 a 180. Claves de `e` en grados (múltiplos de 5). El juego escribe `$c = r^\circ$` |

Ejemplos reales (preuda-r-geometria.js): `play('vecinos-razon', '… **4 veces** el dorado.', { k: 4 }, …)` · `{ a: 28, fichas: ['62°', '152°', '28°', '72°', '118°'] }` · `{ a: 72, fichas: ['72°', '72°', '72°', '108°', '108°', '18°'] }` · `{ dif: 40 }` · `{ top: 76 }` · `{ a: 75, ext: 130 }` · `{ ang: 156 }` · `{ tiros: [{ q: 'El vecino de $155^\\circ$ sobre una recta', r: 25, c: '180^\\circ - 155^\\circ', e: { 155: 'Ese es el dato: falta lo que completa la recta.' } }, …] }`

### 3.2 Triángulos y Pitágoras (`js/games/geo-escena-2.js`)

| Juego | Tipo | Qué hace | `params` y restricciones |
|---|---|---|---|
| `cuadrado-catetos` | F | Arrastra las puntas de dos catetos en cuadrícula hasta que el cuadrado de la hipotenusa valga `c2` | `{ c2, mas }`. `a`, `b` enteros de 1 a 10, inicio (4, 4). `ok`: `a² + b² = c2` y los dos `> mas`. Debe existir una pareja con `mas < a ≤ b ≤ 10`; `c2 ≠ 32`. Conviene que `mas` deje una sola pareja (65 con mas 2 → 4 y 7; 85 con mas 3 → 6 y 7) |
| `cateto-falta` | F | Sube la punta de un mástil; el cable `c` baja a `b` del pie | `{ c, b }`. `h` entero de 4 a 28, inicio 8. `√(c² − b²)` entero en 4…28 y **≠ 8**. `b ≤ 26`. Aviso propio para `h = c − b` |
| `lados-familia` | R | Pone el lado que falta de tres triángulos rectángulos | `{ tri: [t, t, t], fichas }`, `t = { a, b }` (falta la hipotenusa) o `{ a, h }` (falta el otro cateto; `a` es el cateto vertical). **Exactamente 3**. Metas `String(√…)`: deben salir enteros. Lugares de 50 o 54: ≤ 4 letras. El aviso y el acierto dicen «son 3-4-5 agrandados»: **los tres deben ser múltiplos de 3-4-5**. Distractor con aviso: `a + b` |
| `diagonal-cuadrado` | F | Corta una cinta del largo de la diagonal de un cuadrado de lado `lado` | `{ lado }`. Cinta de `lado` a `2·lado` de 0.5 en 0.5; acepta `|c − lado·√2| ≤ 0.25`. **`lado ≤ 12`** (la manija llega a `60 + 22·lado` px). Aviso propio para `c = 2·lado` |
| `equilatero-partes` | R | Pone lado, media base y altura de medio triángulo equilátero | `{ per, fichas }`. Metas `[per/3, per/6, 'per/6√3']` (p. ej. `'12'`, `'6'`, `'6√3'`): **`per` múltiplo de 6**. Lugares de 62: ≤ 5 letras |
| `a-diez-pasos` | F | Lleva un punto de la cuadrícula a distancia `d` de A, en diagonal | `{ A: [x, y], d }`. Cuadrícula x 0…12, y 0…9, inicio (4, 3). `ok`: distancia² = `d²` y fuera de la fila y la columna de A. `sol` busca **arriba y a la derecha** de A: debe caber ahí (`A.x + dx ≤ 12`, `A.y + dy ≤ 9`). (4, 3) no puede ser respuesta. `d` hipotenusa de una terna (5, 10, 13) |
| `dos-pasos` | F | Estira el segundo cable de un poste (dos triángulos con la misma altura) | `{ c1, b1, b2 }`. Altura `√(c1² − b1²)` (entera, ≤ 30) y respuesta `√(alt² + b2²)` entera de 8 a 40, **≠ 12**. `b1 ≤ 20`, `b2 ≤ 33`; con `b2 < 20` la manija se sale por la izquierda en los valores más altos (la prueba de geometría lo rechaza; el Preicfes usa 16). Avisos propios: `alt + b2` y `c1` |
| `lanza-cuerda` | **T** | Lanza una cuerda del largo del lado que falta | `{ tiros: [{ q, a, b, r } | { q, h, b, r }] }`: con `a` y `b` se pide la hipotenusa; con `h` (hipotenusa) y `b`, el otro cateto. `r` entero de 1 a 50 y **exacto** (la prueba lo calcula). No lleva `c` ni `e`: la cuenta y los avisos (`a + b`, `h − b`) los arma el juego |

Ejemplos reales: `{ c2: 85, mas: 3 }` · `{ c: 26, b: 10 }` · `{ tri: [{ a: 12, b: 16 }, { a: 30, h: 50 }, { a: 27, b: 36 }], fichas: ['20', '40', '45', '28', '63', '58'] }` · `{ lado: 10 }` · `{ per: 36, fichas: ['12', '6', '6√3', '12√3', '6√2', '18'] }` · `{ A: [1, 1], d: 10 }` · `{ c1: 17, b1: 8, b2: 20 }` · `{ tiros: [{ q: 'Catetos 16 y 30: lanza la hipotenusa', a: 16, b: 30, r: 34 }, { q: 'Hipotenusa 39 y cateto 36: lanza el otro cateto', h: 39, b: 36, r: 15 }, { q: 'Hipotenusa 37 y cateto 35: lanza el otro cateto', h: 37, b: 35, r: 12 }] }`

### 3.3 Semejanza y escala (`js/games/geo-escena-3.js`)

| Juego | Tipo | Qué hace | `params` y restricciones |
|---|---|---|---|
| `foto-fiel` | F | Arrastra la esquina de una foto hasta el alto pedido sin deformarla | `{ w0, h0, h }`. `w` de 2 a 16 y alto de 2 a 12, de 0.5 en 0.5; inicio (w0, h0). `ok`: alto `= h` y `w·h0 = w0·alto` → `w0·h/h0` múltiplo de 0.5 y ≤ 16; `h ≤ 12`, `h ≠ h0`. `w0 ≤ 6` (la foto original va a la izquierda) |
| `sombra-poste` | F | Sube un poste: su sombra `s` y la de una vara (`h0`, `s0`) | `{ h0, s0, s }`. `h` de 1 a 10 de 0.5 en 0.5, inicio `h0`. `s·h0/s0` múltiplo de 0.5 en 1…10 y ≠ `h0`. `s ≤ 13`, `s0 ≤ 5`. Aviso propio: `h0 + s − s0` |
| `tales-corte` | F | Pone el punto por donde pasa la tercera paralela | `{ a, b, c }` (trozos `a` y `b` en una recta, `c` en la otra). `x` entero de 1 a 17, inicio 4. `b·c/a` entero en 1…17 y **≠ 4**. `c ≥ 6` y `b/a ≤ 3` para que quepa. Avisos propios: `c + b − a` y `x = b` |
| `escala-mapa` | F | Estira el camino real (km) de un tramo de `cm` en un mapa 1 : `den` | `{ den, cm }`. km de 0.25 a 6 de 0.25 en 0.25, inicio 0.25. `cm·den/100000` múltiplo de 0.25, `≤ 6` y **≠ 0.25**. `cm` entero. Aviso propio: `km = cm` |
| `papel-factor` | F | Elige por cuánto se multiplicó el lado si el área creció `veces` | `{ veces }`. Deslizador `k` de 1 a 36, inicio 1. **`veces` cuadrado perfecto**, de 4 a 1296. Avisos propios: `k = veces`, `k = veces/2` |
| `tres-crecimientos` | R | Pone por cuánto crecen borde, pintura y arena al copiar un cubo con arista × k | `{ k, fichas }`. Metas `['× k', '× k²', '× k³']` (signo `×`, espacio, número). Lugares de 76: ≤ 7 letras. Distractor con aviso: `'× 2k'`. `k ≤ 5` (el cubo grande se dibuja a 11 px por unidad) |
| `achica-area` | F | Arrastra la esquina de una copia semejante con el área partida entre `div` | `{ w, h, div }`. Copia de 1 a `w` y de 1 a `h`, de 0.5 en 0.5, inicio (w, h). **`div` cuadrado perfecto** y `w/√div`, `h/√div` múltiplos de 0.5. `w ≤ 11`, `h ≤ 7`. Aviso propio: dividir cada lado entre `div` |
| `lanza-escala` | **T** | Manda un dron al número de la respuesta, en una regla de 0 a 30 | `{ tiros: [{ q, r, c, e? }] }`. `r` entero de 1 a 30; el juego escribe `$c = r$` |

Ejemplos reales: `{ w0: 6, h0: 4, h: 10 }` · `{ h0: 1.5, s0: 2, s: 10 }` · `{ a: 4, b: 10, c: 6 }` · `{ den: 25000, cm: 8 }` · `{ veces: 36 }` · `{ k: 5, fichas: ['× 5', '× 25', '× 125', '× 10', '× 15'] }` · `{ w: 8, h: 6, div: 4 }` · `{ tiros: [{ q: 'Plano $1 : 300$. Una pared mide 5 cm: ¿cuántos metros reales?', r: 15, c: '5 \\cdot 300 \\div 100', e: { 5: 'Un centímetro de este plano son 3 metros.' } }, …] }`

### 3.4 Perímetros, áreas y círculos (`js/games/geo-escena-4.js`)

| Juego | Tipo | Qué hace | `params` y restricciones |
|---|---|---|---|
| `misma-area` | F | Sube el vértice de un triángulo de base `b` hasta igualar un rectángulo `w × H` | `{ w, H, b }`. `h` entero de 1 a 14, inicio 3. `2·w·H/b` entero en 1…14 y **≠ 3**. `b ≤ 12`, `w ≤ 14`. Aviso propio: `b·h = w·H` |
| `inclina-marco` | F | Inclina un paralelogramo de base `b` y lado `l` hasta el área pedida | `{ b, l, area }`. Corrimiento `s` entero de 0 a `l − 1`, inicio 0. `ok`: `b·√(l² − s²) === area` **exacto** → `area/b` entero y `(s, area/b, l)` terna pitagórica con `s ≥ 1`. `l ≤ 13`, `b + s ≤ 21` |
| `trapecio-gemelo` | F | Estira un rectángulo de igual altura hasta igualar un trapecio | `{ B, b }`. `w` entero de 2 a 18, inicio 4. `(B + b)/2` entero y **≠ 4**. `b < B ≤ 19`. Aviso propio: `w = B + b` |
| `radio-area` | F | Arrastra el borde de un círculo de área `area`·π | `{ area }`. `r` entero de 1 a 18, inicio 2. **`area` cuadrado perfecto ≠ 4**. Aviso propio: `2r = area` |
| `arco-justo` | F | Abre un sector de radio `r` hasta que su arco mida `arco`·π | `{ r, arco }`. Ángulo de 10 a 350 de 10 en 10, inicio 30. `180·arco/r` múltiplo de 10 y **≠ 30**. Aviso propio: `360·arco/r` |
| `borde-mixto` | R | Pone curva, tramos rectos y borde total de un rectángulo `w × h` con medio círculo encima | `{ w, h, fichas }`. Metas `['(w/2)π', 'w+2h', '(w+2h) + (w/2)π']`, p. ej. `'3π'`, `'26'`, `'26 + 3π'` (espacios alrededor de `+`). `w` par. Lugares de 92: ≤ 9 letras. Distractores con aviso: `'wπ'` y `'2w+2h'` |
| `rombo-diagonales` | F | Estira una diagonal de un rombo (la otra mide `d`) hasta el área pedida | `{ d, area }`. `D` entero de 2 a 14, inicio 4. `2·area/d` entero en 2…14 y **≠ 4**. Aviso propio: `D·d = area` |
| `rueda-lanza` | **T** | Da a una rueda las vueltas justas para llegar a la bandera | `{ tiros: [{ q, d, m, r, c, e? }] }`. `d`: dato que se escribe en la escena (texto plano, `'radio 2'`); `m`: rótulo de la meta (texto plano, `'12π'`); `r` vueltas, entero de 1 a 12 |

Ejemplos reales: `{ w: 10, H: 4, b: 8 }` · `{ b: 9, l: 10, area: 72 }` · `{ B: 11, b: 5 }` · `{ area: 36 }` · `{ r: 9, arco: 5 }` · `{ w: 6, h: 10, fichas: ['3π', '6π', '26', '32', '26 + 3π', '32 + 3π'] }` · `{ d: 8, area: 40 }` · `{ tiros: [{ q: 'La rueda tiene **radio** 2 y debe avanzar $12\\pi$', d: 'radio 2', m: '12π', r: 3, c: '12\\pi \\div 4\\pi', e: { 6: 'Usaste el radio: una vuelta mide dos radios por π.' } }, …] }`

### 3.5 Áreas sombreadas y cuadrícula (`js/games/geo-escena-5.js`)

| Juego | Tipo | Qué hace | `params` y restricciones |
|---|---|---|---|
| `marco-hueco` | F | Ajusta un hueco cuadrado en una lámina `w × h` para que queden `area` cuadros | `{ w, h, area }`. Lado `s` entero de 1 a `min(w, h)`, inicio 2. `√(w·h − area)` entero y **≠ 2**. `w ≤ 15`, `h ≤ 9` (21 px por unidad) |
| `anillo-justo` | F | Ajusta el hueco de un disco de radio `R` para que el anillo mida `area`·π | `{ R, area }`. `r` entero de 1 a `R − 1`, inicio 1. `√(R² − area)` entero y **≠ 1**. `R ≤ 7` |
| `vertice-lejos` | F | Mueve el vértice libre de un triángulo con la base vertical (`base`) hasta el área pedida | `{ base, area }`. Punto en x 2…11, y 0…7, inicio (4, 3). `ok`: `base·(x − 1) = 2·area` (cualquier `y`) → `2·area/base` entero de 1 a 10 y **≠ 3**. `base ≤ 7`. Avisos propios: `base·(x−1) = area` y `x·base = 2·area` |
| `caja-torcida` | R | Pone el área de las tres esquinas de la caja y la del triángulo torcido | `{ w, h, ya, xc, fichas }`: caja `w × h`; vértices del triángulo `(0, ya)`, `(w, 0)`, `(xc, h)`. Metas `[w·ya/2, (w−xc)·h/2, (h−ya)·xc/2, resto]` como cadenas (conviene que salgan enteros). Lugares de 64: ≤ 6 letras. **`w ≤ 8`, `h ≤ 6`**. Distractor con aviso: el doble de una esquina |
| `techo-justo` | F | Mueve la punta del techo de una casa (pared `w × h`) hasta el área total pedida | `{ w, h, area }`. Punta en x 0…11 e y de `h + 0.5` a 7 de 0.5 en 0.5; inicio (5, h + 1). `ok`: `w·h + w·(y − h)/2 = area` (cualquier `x`) → `y = h + 2(area − w·h)/w` múltiplo de 0.5, `≤ 7` y **≠ h + 1**. `w ≤ 9` |
| `bandera-onda` | F | Estira un rectángulo hasta igualar una bandera `w × h` con una onda que sale y otra que entra | `{ w, h }`. Deslizado de 2 a 18, inicio 5. Respuesta `w`: **`w ≠ 5`**, `w ≤ 18`; `h ≤ 6` y par (los avisos usan `w ± h/2`) |
| `anden-ancho` | F | Ensancha un andén parejo alrededor de un jardín `w × h` hasta que el andén mida `area` | `{ w, h, area }`. Ancho de 0.5 a 4 de 0.5 en 0.5, inicio 0.5. Debe existir un ancho con `(w + 2a)(h + 2a) − w·h = area` y **`a ≠ 0.5`**. `h ≤ 5`, `w ≤ 15`. Aviso propio: sumar el ancho una sola vez |
| `llena-lanza` | **T** | Lanza la pintura justa (cuadros) para cubrir lo sombreado | `{ tiros: [{ q, f, r, c, e? }] }`, `f = { w, h, tri?: true, hueco?: [ancho, alto], esq?: n }`: rectángulo (o triángulo con `tri`) `w × h`, con un hueco rectangular y/o sin dos esquinas triangulares de catetos `esq` y `h`. **`r = w·h/(tri ? 2 : 1) − hueco − esq·h`** (la prueba lo calcula), entero de 1 a 40. `w ≤ 11`, `h ≤ 8` |

Ejemplos reales: `{ w: 9, h: 8, area: 47 }` · `{ R: 7, area: 40 }` · `{ base: 6, area: 24 }` · `{ w: 7, h: 6, ya: 2, xc: 3, fichas: ['7', '12', '6', '17', '14', '24', '25'] }` · `{ w: 6, h: 3, area: 27 }` · `{ w: 9, h: 6 }` · `{ w: 6, h: 4, area: 56 }` · `{ tiros: [{ q: 'Un cuadrado de lado 6 con un hueco de 3 por 4', f: { w: 6, h: 6, hueco: [3, 4] }, r: 24, c: '36 - 12', e: { 36: 'Falta quitar el hueco.' } }, { q: 'Un triángulo de base 8 y altura 6 con un hueco de 4 por 2', f: { w: 8, h: 6, tri: true, hueco: [4, 2] }, r: 16, c: '24 - 8', e: { 24: 'Falta quitar el hueco.', 40: 'El triángulo vale la mitad de base por altura.' } }, { q: 'Un rectángulo de 8 por 5 sin dos esquinas de catetos 2 y 5', f: { w: 8, h: 5, esq: 2 }, r: 30, c: '40 - 5 - 5', e: { 20: '…', 35: 'Son dos esquinas.' } }] }`

### 3.6 Volúmenes y superficies (`js/games/geo-escena-6.js`)

| Juego | Tipo | Qué hace | `params` y restricciones |
|---|---|---|---|
| `capas-caja` | F | Apila capas de cubitos sobre una base `a × b` hasta el volumen pedido | `{ a, b, vol }`. Deslizador de 0 a 9, inicio 1. `vol/(a·b)` entero de 2 a 9. `a`, `b` ≤ 5 |
| `cilindro-altura` | F | Sube la tapa de un cilindro de radio `r` hasta el volumen `vol`·π | `{ r, vol }`. `h` entero de 1 a 12, inicio 2. `vol/r²` entero en 1…12 y **≠ 2**. Aviso propio: `2·r·h = vol` |
| `cono-agua` | F | Marca hasta dónde sube el agua de 1 o 2 conos vaciados en un cilindro igual | `{ conos, h }`. Nivel entero de 0 a `h`, inicio 0. **`conos` 1 o 2** (el texto solo sabe esos dos), **`h` múltiplo de 3**, `h ≤ 17`. Aviso propio: tomar el cono por la mitad |
| `piramide-altura` | F | Sube la punta de una pirámide de base cuadrada `a` hasta el volumen pedido | `{ a, vol }`. `h` entero de 1 a 11, inicio 3. `3·vol/a²` entero en 1…11 y **≠ 3**. Aviso propio: `a²·h = vol` |
| `caras-caja` | R | Pone el área de tapa, frente, costado y toda la superficie de una caja | `{ a, b, h, fichas }`. Metas `[a·b, a·h, b·h, 2(ab + ah + bh)]` como cadenas. Lugares de 78: ≤ 7 letras. Distractor con aviso: la mitad del total. Si dos caras valen lo mismo, la ficha va repetida |
| `cubo-arista` | F | Cambia la arista de un cubo hasta la superficie pedida | `{ sup }`. `a` entero de 1 a 9, inicio 1. **`sup` ∈ {24, 54, 96, 150, 216, 294, 384, 486}**. Aviso propio: `6a = sup` |
| `litros-nivel` | F | Sube el nivel del agua en un tanque de fondo `a × b` m | `{ a, b, litros }`. Deslizador de 0.25 a 4 de 0.25 en 0.25, inicio 0.25. `ok`: `a·b·h·1000 === litros` → `litros/(1000·a·b)` múltiplo de 0.25, `≤ 4` y **≠ 0.25**. Fondos chicos (3 × 2, 4 × 2): 28 px por metro |
| `llena-tanque` | **T** | Bombea agua (en π) para llenar un recipiente | `{ tiros: [{ q, t, rad?, h?, cilindro?, r, c, e? }] }`. `t: 'cil'` → `r = rad²·h`; `t: 'cono'` → `r = rad²·h/3`; `t: 'esf'` → `r = cilindro·2/3` (esfera que cabe justa en un cilindro de `cilindro`·π). La prueba lo calcula. `r` entero de 1 a 40. El juego escribe `$c = r\pi$` |

Ejemplos reales: `{ a: 4, b: 4, vol: 112 }` · `{ r: 4, vol: 96 }` · `{ conos: 2, h: 15 }` · `{ a: 6, vol: 72 }` · `{ a: 6, b: 3, h: 2, fichas: ['18', '12', '6', '72', '36', '11'] }` · `{ sup: 54 }` · `{ a: 3, b: 2, litros: 15000 }` · `{ tiros: [{ q: 'Un **cilindro** de radio 2 y altura 8', t: 'cil', rad: 2, h: 8, r: 32, c: '4\\pi \\cdot 8', e: { 16: 'La base es r por r, no r.' } }, { q: 'Un **cono** de radio 3 y altura 4', t: 'cono', rad: 3, h: 4, r: 12, c: '\\tfrac13 \\cdot 9\\pi \\cdot 4', e: { 36: '…', 4: '…' } }, { q: 'Una **esfera** que cabe justa en un cilindro de $54\\pi$', t: 'esf', cilindro: 54, r: 36, c: '\\tfrac23 \\cdot 54\\pi', e: { 18: '…', 27: '…' } }] }`

## 4. `js/games/forma-escena.js` (Preicfes, Triángulos y Semejanza)

| Juego | Tipo | Qué hace | `params` y restricciones |
|---|---|---|---|
| `tercer-lado` | F (dos reglas) | Dice la tercera varilla más corta y la más larga (enteras) que cierran el triángulo | `{ a, b, max }`. Reglas `m` y `n` de 1 a `max`, inicio (1, 1). Respuesta `m = |a − b| + 1`, `n = a + b − 1`: **`max ≥ a + b − 1`** (mejor `a + b` o más, para que quepa el error «suma»). Las varillas se dibujan a `250/max` px por unidad |
| `cierran-o-no` | frases (2.1) | Toca las ternas que forman triángulo | ver 2.1 |

Ejemplo real: `x('tercer-lado', 'Dos varillas miden **7** y **4**. ¿Entre qué números enteros puede medir la tercera para que el triángulo **cierre**?', { a: 7, b: 4, max: 14 }, …)`

Los demás juegos de ese mundo vienen de otros archivos: los de 3.1 a 3.3, `escala-plano` y los de trigonometría de 2.3 y 2.4.

**`escala-plano`** (`js/games/proporcion-escena.js:79`, F): ubica en el mapa (cm) una distancia real. `{ den, km }`. Manija de 0.5 a 8 cm de
0.5 en 0.5, inicio 1. `ok`: `cm·den === km·100000` → `km·100000/den` múltiplo de 0.5, `≤ 8` y **≠ 1**. Ejemplo real: `{ den: 90000, km: 4.5 }`.

## 5. `js/games/espacio-escena.js` (Preicfes, Movimientos y Vistas: plano cartesiano)

Plano de −6 a 6 en los dos ejes, puntos enteros. En todos, el punto que se arrastra **empieza en (0, 0)**: la respuesta no puede ser el
origen y debe caer dentro de ±6 (también conviene que toda la figura imagen quepa).

| Juego | Tipo | Qué hace | `params` y restricciones |
|---|---|---|---|
| `traslada-punto` | F | Arrastra un punto a la imagen de A por una traslación | `{ A: [x, y], otros: [[x, y], …], v: [dx, dy] }`. `otros` = los demás vértices de la figura (se dibuja el polígono `A, …otros`) |
| `refleja-punto` | F | Imagen de A por una reflexión | `{ A, otros, eje }`: `'y'` → (−x, y); `'x'` → (x, −y); cualquier otro valor → recta y = x, (y, x) |
| `rota-punto` | F | Imagen de A por un giro alrededor del origen, contra el reloj | `{ A, otros, g }`: `90` → (−y, x); `180` → (−x, −y); cualquier otro valor → 270°, (y, −x) |
| `homotecia-punto` | F | Imagen de A por una homotecia de centro el origen | `{ A, otros, k }`: (k·x, k·y) enteros dentro de ±6; `k` puede ser negativo (tiene aviso propio) |
| `que-movimiento` | renglones (2.2) | Pone qué movimiento lleva un punto a otro | ver 2.2 |
| `que-se-conserva` | frases (2.1) | Toca lo que se conserva | ver 2.1 |
| `sube-movimiento` | **T** ascensor (2.5) | Sube a la cantidad pedida | máx 100, de 2 en 2: **`r` par** |
| `cuarto-vertice` | F | Arrastra el cuarto vértice D del paralelogramo ABCD | `{ A, B, C }` (vértices seguidos). `D = A + C − B` dentro de ±6 y ≠ (0, 0) |
| `punto-medio` | F | Arrastra el punto medio de AB | `{ A, B }`. Las sumas de las x y de las y **pares** (el punto solo cae en enteros) y medio ≠ (0, 0) |
| `polar-gira` | F (dos reglas) | Pone el giro y los pasos para llegar a un punto | `{ P: [x, y], r, g }`. Giro de 0 a 345 de 15 en 15, pasos de 1 a 6; inicio (0°, 1). `ok`: `g` y `r` iguales a los datos; `P` solo se dibuja, así que **debe ser el punto de `r` pasos a `g`** (lo comprueba quien escribe). No puede ser (0°, 1 paso) |
| `polar-a-cartesiana` | renglones (2.2) | Pasa polares a cartesianas | ver 2.2 |
| `mismo-polar` | frases (2.1) | Toca las instrucciones que llevan al mismo punto | ver 2.1 |
| `caja-coordenadas` | R (2.6) | Coordenadas 3D de vértices de una caja | ver 2.6 |
| `sube-distancia` | **T** ascensor (2.5) | Sube a la cantidad pedida | máx 60, de 1 en 1 |

Ejemplos reales (preicfes-ma-espacio.js): `{ A: [-3, 2], otros: [[-1, 2], [-3, 5]], v: [5, -3] }` · `{ A: [4, 3], otros: [[1, 3], [4, -1]], eje: 'y' }` · `{ A: [4, 1], otros: [[2, 1], [4, 4]], g: 90 }` · `{ A: [2, -1], otros: [[1, -1], [1, 1]], k: 3 }` · `{ A: [-4, -2], B: [-2, 3], C: [4, 3] }` · `{ A: [-5, 4], B: [3, -2] }` · `{ P: [0, -4], r: 4, g: 270 }`

## 6. Sólidos y vistas de `js/games/espacial-escena.js` (usados en icf-ma-espacio-2)

| Juego | Tipo | Qué hace | `params` y restricciones |
|---|---|---|---|
| `vista-frente`, `vista-izquierda` | marca | Toca los cuadros que se ven desde ese lado | `{ h: [[…], …], alto }`: `h[fila][columna]` alturas, fila 0 = adelante; `alto` = filas de la rejilla de respuesta (≥ la torre más alta). La respuesta se calcula sola |
| `torres-suma` | cuenta (2.3) | Cuenta los cubos por fila y el total | `{ h, et, ops, metas, fichas, mira, trampas, ok }` |
| `plano-maximo` | R | Pone las alturas del plano con más cubos para dos vistas | `{ cols: […], filas: […], fichas }` (`filas` de atrás hacia adelante). Metas: `min(fila, columna)` de cada casilla, fila por fila, como cadenas: `fichas` debe traerlas todas con sus repeticiones, más distractores |
| `cierra-cubo` | marca | Toca los moldes que cierran un cubo | `{ moldes: [[[col, fila] × 6], …] }` (tres por renglón; el juego dobla cada molde y decide) |
| `opuestas-molde` | R | Pone la cara opuesta de las que se piden | `{ cel: [[col, fila] × 6], letras: 'ABCDEF', pide: ['A', …], fichas: [letras] }`. El molde debe cerrar un cubo. Hasta 3 en `pide` |
| `vecinas-cara` | marca | Toca las caras que tocan a una dada | `{ cel, letras, de: 'T' }` |
| `dado-escondidas` | cuenta (2.3) | Pone las caras escondidas de un dado | `{ ve: [arriba, frente, derecha], et, metas, fichas, mira, trampas, ok }` |
| `atajo-recto` | F | Sube un punto hasta que la distancia en línea recta sea `c` | `{ b, c }`. `h` entero de 1 a 16, inicio 3. `√(c² − b²)` entero y **≠ 3**. (Pitágoras con otra escena; usado en pu-es-1) |

Ejemplos reales: `{ h: [[2, 1, 1], [1, 1, 3]], alto: 4 }` · `{ h: [[1, 1, 2], [2, 2, 3], [3, 3, 3]], et: ['adelante', 'en medio', 'atrás', 'total'], ops: ['+', '+', '='], metas: ['4', '7', '9', '20'], fichas: ['4', '7', '9', '20', '3', '8', '15'], mira: ['Suma la fila de adelante: 1, 1 y 2.', 'Suma 2, 2 y 3.', 'Suma 3, 3 y 3.', 'Suma las tres filas.'], trampas: {}, ok: 'También cuentan los que no se ven.' }` · `{ cols: [3, 4], filas: [4, 3], fichas: ['3', '4', '3', '3', '5', '2'] }` · `{ cel: [[0, 1], [1, 1], [2, 1], [3, 1], [1, 0], [3, 2]], letras: 'ABCDEF', pide: ['A', 'B', 'E'], fichas: ['C', 'D', 'F', 'B', 'E'] }` · `{ cel: [[1, 0], [1, 1], [1, 2], [1, 3], [0, 1], [2, 3]], letras: 'RSTUVW', de: 'T' }` · `{ ve: [6, 2, 4], et: ['abajo', 'atrás', 'izquierda'], metas: ['1', '5', '3'], fichas: ['1', '5', '3', '2', '4', '6'], mira: [...], trampas: {}, ok: 'Cada pareja suma 7.' }` · `play('atajo-recto', '…', { b: 8, c: 17 }, …)`

También hay, en `js/games/conteo-escena.js:150`, **`lados-diagonales`** (F): `{ total, max }`, lados de 3 a `max` (inicio 4), `n(n − 3)/2 = total`
(ejemplo real `{ total: 54, max: 14 }`).

## 7. Juegos p5 viejos (siguen en las evaluaciones): solo el esquema

Todos `{ rounds: [...] }`; **en una evaluación, una sola ronda** (lo exige la prueba del Preicfes). Se llaman con
`play(nombre, enunciadoCorto, { rounds }, explicación, { hint })`. No son `xp`: no sirven como ejercicio de lección con el estándar nuevo.

| Juego | Ronda | Restricciones |
|---|---|---|
| `tijera-angulos` | `{ kind: 'opp' | 'sup' | 'comp' | 'ratio', given?, k? }` | El ángulo azul va de 5° a 175° de 5 en 5 (inicio 100). Respuesta: `opp` → `given`; `sup` → `180 − given`; `comp` → `90 − given`; `ratio` → `180/(k + 1)`. Debe ser múltiplo de 5 |
| `paralelas-gira` | `{ t, top, pair: 'corr' | 'alt' | 'conj' }` | `t` dirección de la transversal; `top` inclinación de la recta de arriba = respuesta. La de abajo va de −35° a 35° de 5 en 5 y empieza a 20° de `top`: `top` múltiplo de 5 entre −35 y 35 |
| `apice-triangulo` | `{ mode: 'falta', A, C }` o `{ mode: 'tipo', tipo, A, y? }` | Ángulos de la base de 10° a 150° de 5 en 5 (inicio A 50, B 25). `falta`: `B = 180 − A − C` múltiplo de 5. `tipo` (e `y`, segundo tipo opcional): `'isosceles'`, `'rectangulo'`, `'equilatero'`, `'obtusangulo'` |
| `suma-poligono` | `{ n }` | Se trazan las `n − 3` diagonales desde un vértice. El rótulo solo tiene nombre para **n de 4 a 8** (`NOM`) |
| `cuadrados-pitagoras` | `{ c2 }`, y `max?` junto a `rounds` | Catetos enteros de 1 al tamaño `min(max o 12, ⌈√c2⌉ + 1)`; inicio (2, 1). Debe haber catetos enteros con `a² + b² = c2` |
| `escalera-pared` | `{ L, h }` | El pie `d` es entero de 0 a `L` (inicio 1): `√(L² − h²)` entero y ≠ 1 |
| `billar-rebote` (en movimiento, `questGame`) | `{ title, items: [{ p: [x, y], t: [x, y] }, …] }` | Mesa de 10 × 6 (y hacia arriba); la mira salta de 0.5 en 0.5 por la banda de arriba y acepta ±0.26: el punto `p.x + (t.x − p.x)(6 − p.y)/(12 − p.y − t.y)` debe caer en un medio. Tres vidas |
| `tales-rectas` | `{ a, b, c }` (OA, AB, OA′) | A′B′ de 0.5 a 12 de 0.5 en 0.5: `b·c/a` múltiplo de 0.5 y ≤ 12. Inicio 2 (o 3 si la respuesta es 2) |
| `factor-area` | `{ kind: 'area' | 'vol', side, target }` | Factor `k` de 1 a 5 (inicio 1): `(side·k)²` o `(side·k)³` igual a `target`, con `k ≥ 2` |
| `mide-altura` | `{ kind: 'edificio' | 'arbol' | 'faro', h, angle, mode?: 'elev' | 'dep', maxD }` | Distancia de 0.1 en 0.1 hasta `maxD`; acepta ±1° del ángulo: `h/tan(angle) ≤ maxD` |

Ejemplos reales: `{ rounds: [{ kind: 'sup', given: 70 }, { kind: 'opp', given: 40 }] }` · `{ rounds: [{ t: 65, top: 0, pair: 'corr' }, { t: 70, top: 10, pair: 'alt' }, { t: 60, top: -15, pair: 'corr' }, { t: 75, top: 5, pair: 'conj' }] }` · `{ rounds: [{ mode: 'falta', A: 45, C: 80 }] }` · `{ rounds: [{ n: 4 }, { n: 5 }, { n: 7 }, { n: 8 }] }` · `{ max: 12, rounds: [{ c2: 100 }] }` · `{ rounds: [{ L: 25, h: 24 }] }` · `{ rounds: [{ title: 'Misma altura', items: [{ p: [1, 2], t: [9, 2] }, { p: [1, 3], t: [7, 3] }, { p: [8, 1], t: [2, 1] }] }, { title: 'Alturas distintas', items: [{ p: [2, 4], t: [8, 2] }, { p: [1, 1], t: [9, 3] }, { p: [9, 2], t: [3, 4] }] }] }` · `{ rounds: [{ a: 3, b: 2, c: 6 }] }` · `{ rounds: [{ kind: 'area', side: 1, target: 25 }] }` · `{ rounds: [{ kind: 'edificio', h: 25, angle: 45, maxD: 60 }] }`

En las evaluaciones de geometría también aparecen (no revisados aquí; copiar el esquema de su uso): `corta-paralelogramo`
`{ h, slant, target }`, `mide-circulo` `{ ask: 'A', target }`, `sombreado-resta` `{ s, kind: 'sq', target }`, `triangulo-cuadricula`
`{ b, target }`, `prisma-capas` y `cono-tercio` `{ base: 'circ' | 'rect', dims, target }`, `toca-lados`, `espejo-figura`, `gira-figura`,
`cubos-ocultos`, `torres-vistas`, `atrapa-punto`.

## 8. Zona de examen (`js/games/examen-kit.js`)

| Juego | `params` | Restricciones (código y `tests/preicfes.test.js`) |
|---|---|---|
| `completa-solucion` (`sol`) | `{ q, lines: ['… [[valor]] …'], extra: [fichas que sobran] }` | Los huecos `[[…]]` van **fuera de las fórmulas**: en cada trozo entre huecos los `$` deben quedar pares (bien: `'$4 \\cdot 2 =$ [[8]] m'`; mal: `'$4 \\cdot 2 = [[8]]$'`). **De 3 a 6 huecos** en total. **`extra` ≥ 2** y ninguna ficha de `extra` puede ser igual a un hueco. Se califica por texto, hueco por hueco y en orden. Un toque manda la ficha al primer hueco libre. El valor del hueco es texto de ficha (`'72 000'`, `'2π'`, `'−5'`, `'opuesto'`) |
| `caza-error` (`err`) | `{ q, steps: [texto], wrong, fixes: [3 textos], fix: 0 }` | **De 3 a 5 pasos**; `wrong` = índice (desde 0) del paso equivocado; **exactamente 3 correcciones, la buena primero** (`err` pone `fix: 0`); las tres y el paso malo, distintos entre sí. Pasos y correcciones admiten TeX |
| `opcion-examen` (`opc`) | `{ q, options: [4], answer }` | 4 opciones distintas, `answer` de 0 a 3. En el curso las claves deben quedar repartidas: ninguna letra con más del 35 % |

En los tres: `q` de al menos 25 letras y con los `$` pares. El orden de fichas y correcciones se revuelve solo. `completa-solucion` y
`caza-error` **no pueden ir en la evaluación** del mundo; `opcion-examen` sí (una por lección).

Ejemplo real: `sol('Una antena de 24 m de altura se sostiene con dos cables iguales. … ¿Cuántos metros de cable se necesitan en total?', ['Cada cable es una hipotenusa: $7^2 + 24^2 =$ [[625]]', 'Un cable mide $\\sqrt{625} =$ [[25]] m', 'Los dos cables: $2 \\cdot 25 =$ [[50]] m'], ['31', '62', '49'], 'explicación', 'pista')` · `err('Un triángulo isósceles tiene dos lados de 10 cm y la base de 12 cm. ¿Cuál es su área?', ['La altura cae en la mitad de la base: cada mitad mide 6 cm', 'Altura: $h^2 = 10^2 + 6^2 = 136$', '$h = \\sqrt{136} \\approx 11.7$ cm', 'Área: $\\tfrac{12 \\cdot 11.7}{2} \\approx 70$ cm²'], 1, ['Altura: $h^2 = 10^2 - 6^2 = 64$, así que $h = 8$ cm', 'Altura: $h^2 = 10^2 - 12^2$', 'Altura: $h = 10 - 6 = 4$ cm'], 'explicación', 'pista')` · `opc('La diagonal de un rectángulo mide 13 cm y uno de sus lados mide 5 cm. El perímetro del rectángulo, en centímetros, es:', ['30', '36', '34', '60'], 2, 'explicación', 'pista')`

## 9. Trampas

Sacadas de `tests/ejercicios-geometria.test.js`, `tests/ejercicios-explora.test.js`, `tests/preicfes.test.js` y del código.

1. **La solución debe ganar y el inicio no.** `grade(solve(p), p).ok === true`, `grade(ini(p), p).ok === false`, `listo(ini) === false`,
   `listo(solve) === true`. En las figuras `listo` es «cambió respecto al inicio»: si la respuesta es el valor inicial, el botón de
   comprobar nunca se enciende (los «≠» de las tablas).
2. **Respuesta fuera de la rejilla.** Si `sol(p)` no es `min + n·paso` (o sale de `min…max`), el ejercicio es imposible aunque
   `grade(solve)` pase. Hay que comprobar a mano la divisibilidad de cada juego (columnas de restricciones).
3. **Igualdad exacta.** Casi todos los `ok` usan `===` con productos: usar enteros o medios que den cuentas exactas (`inclina-marco`
   compara `b·√(l² − s²)` con `area`; `litros-nivel` multiplica por 1000; `escala-plano` y `escala-mapa` por 100000).
4. **Raíces que no salen enteras** dan metas como `'14.142135623730951'` (`lados-familia`) o `NaN`/«undefined» en `texto`; las pruebas
   rechazan `NaN`, `undefined`, `Infinity` y `[object` en `solution`, en el dibujo, en `aviso` y en `bien`.
5. **Las fichas son cadenas y se comparan letra por letra.** Formatos que arma el juego: `'62°'`, `'× 25'`, `'6√3'`, `'3π'`,
   `'26 + 3π'`, números con `String()` (`'7.5'`, nunca `'7,5'`). El menos de las fichas escritas a mano es el que uno ponga en `metas`
   (los ejemplos usan `−`, U+2212).
6. **Fichas: alcanzan y sobran.** Cada meta debe estar en `fichas` tantas veces como se repite (`cruce-ocho`: tres iguales) y debe
   sobrar al menos un distractor. Cambiar cualquier meta por otra ficha distinta debe fallar: no poner un distractor que también sea
   correcto. Conviene incluir los distractores que tienen aviso propio (el error típico «tiene que poder responderse»).
7. **`mira`, `ok`, `falta`, `no`** son obligatorios donde el armazón los lee (2.1 a 2.6): si faltan, el aviso sale «undefined» y la
   prueba «aviso roto» falla. `mira` es un arreglo (uno por lugar) en renglones/cuenta/`caja-coordenadas` y **una cadena** en `mueve`.
8. **Tiros.** Tres por juego; `r` entero, mayor que el mínimo de la perilla y dentro del máximo; múltiplo de 5 en `lanza-angulo` y del
   paso en los ascensores. Claves de `e` distintas de `r` y dentro de la perilla. `c` va sin `$` (el juego los pone, y añade `^\circ` o
   `\pi`). En `lanza-cuerda`, `llena-lanza` y `llena-tanque` la prueba recalcula `r` con los datos del dibujo. El enunciado debe decir
   que se puede fallar una vez.
9. **TeX.** `$` siempre pares en `q`, en `texto`, en cada `tiros[i].q` y en cada trozo de `lines`. Barra doble en cadenas JS
   (`'$\\tfrac{5}{8}$'`); seno como `\\operatorname{sen}`; decimales con punto; miles con `\\,` dentro de TeX. Dentro de la escena (fichas,
   `et`, `d`, `m`, `casos[i].t`, `t.ca`…) va texto plano, **sin `$`**, y sin `<` ni `&`.
10. **Textos mínimos.** Lección: `hint` de más de 40 letras y `explain` de más de 40; enunciado de más de 8. Evaluación: `hint` y
    `explain` de más de 20 y nota de repaso (`review`) de más de 15. La pista no debe dar la respuesta.
11. **Juego repetido.** En una lección ningún juego se repite (prueba del Preicfes); en la evaluación tampoco, salvo `opcion-examen`.
    Estructura de una lección «de diez»: de 9 a 11 ejercicios, los tres últimos `completa-solucion`, `caza-error`, `opcion-examen`, y
    el último antes de la zona de examen, el de movimiento (T).
12. **Todo juego usado necesita guía** (`GUIDES[nombre]` en `js/guia.js` o `demo`): los de este catálogo ya la tienen. Un nombre nuevo
    para un armazón genérico no: es código, guía, registro en `index.html` y `node tools/empaquetar.js`.
13. **Lo que cabe.** Lienzo de 340 px; la prueba de geometría exige la manija entre x 8…332 e y 4…(alto − 4) en **todos** los estados
    alcanzables, y lugares de fichas que no se pisen. Los topes de las tablas (`lado ≤ 12`, `R ≤ 7`, `a ≤ 75`, `c ≥ 6`, `w ≤ 8`…) salen
    de ahí. Rótulo de un `questGame` p5: unas 60 letras.
14. **No se ve el resultado mientras se responde.** Los juegos ya esconden lo que revelan con `f`; el enunciado tampoco debe decirlo
    (p. ej. no escribir el ángulo que la figura muestra como «?»).
15. **`catetos-razon` y demás `mueve` solo aceptan `meta`**: una razón equivalente con otros catetos se califica mal. Elegir datos con
    una sola pareja posible en el rango.
16. **`a-diez-pasos`** acepta cualquier punto a distancia `d` en diagonal, pero `sol` solo busca arriba a la derecha de A: si ahí no
    cabe ninguno, `solve` devuelve `null` y la prueba falla.
17. **`lados-familia`, `cono-agua`, `equilatero-partes`, `tres-crecimientos`** traen textos fijos («3-4-5 agrandado», «dos conos, dos
    tercios», «x, x√3 y 2x», «cinta del borde, pintura, arena»): los datos y el enunciado deben ser coherentes con ellos.
18. **`suma-poligono`** solo nombra polígonos de 4 a 8 lados; con otro `n` el rótulo dice «Parte el undefined…» (hoy pasa en la
    evaluación `pu-geometria`, que usa 10 y 9).
19. **Preicfes:** ningún texto puede decir de qué examen o año sale (la expresión `SOURCE` rechaza «icfes», «saber 11», «simulacro»,
    «cuadernillo», años como 2019, 2021, 2022, 2024, 2025 y «20xx-1»). Y los ejemplos de la explicación o del video de la lección no se
    repiten en los ejercicios.
20. **Evaluaciones con juegos p5:** `rounds` de una sola ronda; no usar `completa-solucion`, `caza-error` ni los «aburridos»
    (`escala-solucion`, `arma-la-cuenta`, `une-parejas`, `clasifica-cartas`, `verdadero-falso`, `ordena-terminos`, `detective-pasos`).
