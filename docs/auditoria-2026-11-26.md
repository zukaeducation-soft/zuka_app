# Auditoría de Zuka · 2026-11-26

Revisión de solo lectura: no se cambió código ni base de datos.

**Qué es la app.** Una PWA de matemáticas y preparación para la universidad, en JavaScript sin frameworks, publicada en Vercel (`zukaapp-mu.vercel.app`, versión `zuka-v409`). Supabase guarda cuentas, códigos de acceso, pagos, avance e instituciones; Bunny entrega los videos y la voz.

**Carga que supuse.** Hoy hay 13 usuarios y 2 administradores; juzgué todo pensando en cientos de estudiantes en celulares Android de gama baja, con red irregular.

**Qué se revisó.** La versión publicada (`origin/main`), no la carpeta local, que está atrasada (hallazgo 1). Backend: la base real de Supabase (48 tablas, permisos, funciones, avisos de seguridad) y las dos funciones de servidor. Frontend: arranque, service worker, estado, reproductor, kit de juegos. UI/UX: estilos, flujos y accesibilidad por código, más la portada y la pantalla de entrada en el navegador a 375 px.

## Lo que está bien

- Las 48 tablas tienen seguridad por filas (RLS) y toda escritura delicada pasa por funciones en el esquema `privado`.
- Los códigos salen de un generador seguro, hay límite de intentos por red y por cuenta, y cada cambio del panel deja rastro en `auditoria`.
- Un código cuya cuenta se borra queda en pausa: no se puede volver a estrenar para reiniciar los días.
- No hay llaves secretas en el repositorio ni en su historial; `gemini api keys.txt` está ignorado y nunca se subió.
- Vercel no publica `supabase/`, `tests/`, `tools/` ni los `.md` (comprobado: responden 404).
- Hay política de contenido (CSP) estricta y las librerías de CDN llevan `integrity`.
- Los datos del servidor se escapan antes de pintarse (muestra revisada, sin XSS).
- Al salir de una lección se destruyen el reproductor, p5 y los relojes.
- Las hojas modales manejan bien el foco, Escape y el fondo inerte.

## Debe arreglarse

### 1. La carpeta local está 167 versiones atrás y tiene cambios sin guardar
- **Qué es:** `Documents/zuka_app`, donde se abren las sesiones de trabajo.
- **Problema:** está en `zuka-v316`; producción va en `zuka-v409` (749 archivos de diferencia). Además tiene 14 archivos modificados sin commit (`js/cuenta.js`, `css/styles.css`, `admin/`…). Lo que se pruebe ahí no es lo que ven los estudiantes, y un commit desde ahí choca con lo publicado.
- **Arreglo:** apartar los cambios locales en una rama, y luego `git pull`. Revisar si esos 14 archivos todavía hacen falta.
- **Si no se hace:** se arreglan cosas que ya no existen, o se pisa trabajo publicado.

### 2. En tema claro no se leen los mensajes de acierto, error y estado del plan (`css/styles.css:597, 1174-1196, 1227`)
- **Qué es:** los colores `--ok`, `--bad`, `--gold`, `--fire` usados como color de letra.
- **Problema:** el contraste queda entre 2.4 y 3.8 (el mínimo es 4.5). «¡Correcto!» tiene 2.76; las píldoras Activo / Prueba / Vencido, 2.4 a 3.2; «quedan N días», 2.93. En tema oscuro todo pasa.
- **Arreglo:** en `:root[data-theme="light"]` definir `--ok-ink`, `--bad-ink`, `--gold-ink` más oscuros y usarlos solo para texto. Explora ya lo hace (`css/explora.css:273`).
- **Si no se hace:** con el celular al sol no se distingue si la respuesta fue buena.

### 3. Una actualización con el CDN lento deja la app sin juegos ni fórmulas sin conexión (`sw.js:27-36, 44-48, 59-63`)
- **Qué es:** el service worker guarda p5 y KaTeX en la caché de cada versión, con 8 s de espera.
- **Problema:** si al instalar la versión nueva el CDN tarda más de 8 s, se instala sin ellos y luego borra la caché vieja, que sí los tenía. Sin red, todos los juegos dicen «El juego no pudo cargar».
- **Arreglo:** guardar lo del CDN en una caché propia que no se borre al cambiar de versión, como ya se hace con la voz (`zuka-voz-v2`).
- **Si no se hace:** el modo sin conexión falla al azar después de una actualización.

### 4. Si hls.js falla una vez, los videos no vuelven hasta recargar (`js/player.js:242-254`)
- **Qué es:** la carga del reproductor de video.
- **Problema:** la promesa fallida se queda guardada. Si la app se abrió sin red, al volver la red los videos siguen sin reproducirse en Chrome.
- **Arreglo:** `s.onerror = e => { hlsLib = null; reject(e); }`. Una línea; `loadP5` ya lo hace así.
- **Si no se hace:** el estudiante ve el video detenido y cree que la app está dañada.

### 5. Dos pestañas abiertas se pisan el avance (`js/app.js:21-26`)
- **Qué es:** el estado `S` se lee al abrir y `save()` escribe el objeto entero.
- **Problema:** la pestaña A termina una lección; la pestaña B, abierta antes, guarda cualquier cosa y borra lo de A. Con cuenta se recupera parte desde la nube; sin cuenta se pierde.
- **Arreglo:** escuchar el evento `storage` y mezclar con `estadoMezcla`, que ya existe.
- **Si no se hace:** avance y XP perdidos sin explicación.

### 6. Lección, evaluación y pantalla de entrada no aíslan lo que tapan (`js/app.js:596-613, 762-776`, `js/exam.js`, `js/cuenta.js:87-133`)
- **Qué es:** las pantallas completas que se ponen encima de la app.
- **Problema:** lo comprobé en producción: con la pantalla «Entra con tu código» abierta, Inicio, Mis cursos, Tienda siguen alcanzables por teclado y lector. Al tocar «Comprobar», el foco queda en un botón invisible. El campo del código no tiene etiqueta asociada (se anuncia como «ABCDE-FGH23»).
- **Arreglo:** el mismo patrón de las hojas: `inert` en lo de atrás, foco adentro al abrir, y enfocar «Continuar» tras comprobar.
- **Si no se hace:** la app no se puede usar con teclado ni lector de pantalla.

## Conviene arreglar

### 7. Se descargan y ejecutan 9.75 MB de JavaScript antes de pintar, incluso en la portada (`index.html:80-1036`, `tools/empaquetar.js`)
- **Qué es:** los 4 paquetes `js/paquetes/zuka-1..4.js` (2.2 MB comprimidos) con 920 archivos: 623 juegos, 99 cursos, 135 explicaciones.
- **Problema:** quien solo mira la página de presentación, o la Tienda, carga todos los juegos de todos los cursos. En un Android barato son varios segundos de procesador en cada arranque; la caché no lo evita.
- **Arreglo:** dejar en el arranque el núcleo y los datos; empaquetar juegos y explicaciones por curso y pedirlos al abrir una lección, como ya se hace con p5.
- **Si no se hace:** primera impresión lenta justo en la página que vende.

### 8. Más de 1 MB de juegos que ninguna lección usa (`js/games/`, `js/courses/algebra*.js`)
- **Qué es:** 242 archivos de juegos (1.16 MB) registrados pero sin ejercicio que los llame; y los ejercicios de Álgebra pasan por cinco capas que se reescriben una a otra al cargar.
- **Problema:** se descarga y ejecuta código que se descarta. Ejemplos: los 14 `taller-*`, `lluvia-elementos`, `jefe-venn`, `jefe-ruta`.
- **Arreglo:** quitarlos de la lista de fuentes del paquete. Confirmar antes con el robot en el navegador (la búsqueda no ve nombres armados al vuelo).
- **Si no se hace:** cada juego nuevo hace más pesado un arranque que ya es pesado.

### 9. Las dos cuentas de administrador no tienen segundo factor (Supabase Auth)
- **Qué es:** el panel `/admin` entra con correo y contraseña; puede borrar usuarios, regalar accesos y ver datos personales.
- **Problema:** 0 factores MFA registrados y la protección contra contraseñas filtradas está apagada. Una contraseña reutilizada basta para entrar.
- **Arreglo:** activar «Leaked password protection» y MFA (TOTP) para los administradores; exigir nivel `aal2` en `privado.es_admin()`.
- **Si no se hace:** una sola contraseña robada expone a todos los estudiantes.

### 10. El esquema viejo en inglés sigue vivo y abierto (base de datos)
- **Qué es:** 11 tablas (`profiles`, `lessons`, `lesson_progress`…) y las funciones `add_xp`, `merge_xp`, `delete_account`, `reset_progress`.
- **Problema:** cualquier estudiante con sesión puede llamarlas. `delete_account` borra su propia cuenta y deja su código en pausa: termina en un mensaje de soporte. El disparador `handle_new_user` todavía crea una fila en `profiles` por cada cuenta nueva.
- **Arreglo:** borrar esas funciones, el disparador y las tablas. Elimina código, no añade.
- **Si no se hace:** superficie de ataque y de confusión que nadie usa.

### 11. La historia de la base no coincide con el repositorio (`supabase/migrations/`)
- **Qué es:** el repositorio tiene 18 migraciones; Supabase registra 12, con otros nombres. Varias se aplicaron a mano en el editor SQL.
- **Problema:** no se puede levantar una copia de pruebas ni saber con certeza qué SQL está en producción. Tampoco se pueden correr `supabase/tests/*.sql` contra algo confiable.
- **Arreglo:** sacar un volcado del esquema actual como línea base y, desde ahí, aplicar todo con migraciones.
- **Si no se hace:** un cambio de base arriesgado no se puede ensayar antes.

### 12. Los videos nuevos solo los protege el `Referer` (`js/cuenta.js:370-380`, `supabase/functions/video-url`)
- **Qué es:** la biblioteca nueva de Bunny no usa token; el servidor solo dice «sí puede» y la app arma la dirección libre.
- **Problema:** los ID están en el JavaScript público y en la tabla `lecciones`, que cualquiera puede leer. Un programa fuera del navegador puede inventar el `Referer`. No lo pude reproducir (recibí 403 con los que probé), así que queda como riesgo sin confirmar.
- **Arreglo:** activar la autenticación por token también en la biblioteca nueva; `video-url` ya sabe firmar.
- **Si no se hace:** quien quiera los videos de pago puede bajarlos sin código.

### 13. Los candados son solo visuales (`js/cuenta.js:58-65, 217`)
- **Qué es:** todo el contenido (ejercicios, textos, explicaciones) va en los paquetes públicos; el rol se guarda en `localStorage`.
- **Problema:** quien edite `zuka-v1`, ponga `"rol":"admin"` y abra sin red, ve todo menos los videos.
- **Arreglo:** decidir si importa. Si importa, servir el contenido de pago aparte y con sesión (encaja con el hallazgo 7). Si no, al menos sacar `rol` de la copia sin red.
- **Si no se hace:** lo único realmente de pago son los videos.

### 14. La app abierta no se entera de versiones nuevas, y cada versión lo baja todo otra vez (`js/app.js:66-68`, `sw.js:12-17`)
- **Qué es:** el service worker solo busca actualización al cargar la página; la caché es por versión.
- **Problema:** una app que vive en «recientes» puede pasar días en una versión vieja. Y con 409 versiones publicadas, cada una vuelve a bajar unos 2.6 MB aunque cambie un solo juego.
- **Arreglo:** `reg.update()` al volver a primer plano (una vez por hora), y poner una huella en el nombre de cada paquete para reutilizar lo que no cambió.
- **Si no se hace:** arreglos que tardan en llegar y datos móviles gastados.

### 15. Nadie se entera de los errores en producción (`js/`)
- **Qué es:** no hay `window.onerror` ni `unhandledrejection`; muchas promesas fallan en silencio.
- **Problema:** si `localStorage` se llena, `save()` falla sin aviso y el avance de la sesión se pierde al cerrar.
- **Arreglo:** un manejador global que mande a Supabase mensaje y archivo, y un aviso único cuando `save()` falle.
- **Si no se hace:** los fallos solo se conocen cuando un estudiante escribe por WhatsApp.

### 16. Juegos y video no se pueden usar con teclado ni lector (`js/games/kit.js:822-829`, `js/player.js:49, 151`)
- **Qué es:** los lienzos de los juegos y los controles del reproductor.
- **Problema:** solo 2 juegos tienen teclado; los lienzos no tienen nombre accesible. La barra del video dice ser un deslizador pero no responde a flechas.
- **Arreglo:** `aria-label` con el enunciado en cada lienzo; una ruta genérica de teclado en `questGame` y `roundsGame` con las cajas de `peek().solve`; botón real de play y flechas en la barra.
- **Si no se hace:** un estudiante con baja visión o dificultad motora no puede avanzar.

### 17. Botones pequeños y letra diminuta en celular (`css/styles.css:75, 124, 269, 318, 572, 616`)
- **Qué es:** la X de «Salir» de la lección mide 36 px; la pista, 34; la racha, 30. Hay 48 reglas con letra menor a 12 px (hasta 10.5).
- **Problema:** toques fallidos y rótulos difíciles de leer a 300–380 px. En la portada conté 14 controles de menos de 40 px.
- **Arreglo:** mínimo de 44 px de zona táctil y 12 px de letra.
- **Si no se hace:** roces diarios en lo que más se toca.

### 18. Acciones del panel sin confirmación (`admin/panel.js:391, 473, 489, 517-520`)
- **Qué es:** publicar un curso, descartar una solicitud de compra, liberar dispositivos, pausar un código.
- **Problema:** un toque accidental publica un curso en borrador para todos o descarta una compra pendiente.
- **Arreglo:** el mismo `confirma({ peligro })` que ya usan borrar pago y eliminar código.
- **Si no se hace:** un error de dedo con efecto inmediato en estudiantes.

## Opcional

### 19. «Te quedaste sin vidas» no ofrece salida útil (`js/app.js:801-809`)
- **Qué es:** la pantalla al perder todas las vidas.
- **Problema:** habla del gimnasio pero solo tiene el botón «Salir».
- **Arreglo:** un botón «Ir al gimnasio».
- **Si no se hace:** el estudiante se va en el momento de más frustración.

### 20. `tools/empaquetar.js` escribe archivos con solo importarlo
- **Qué es:** el bloque final, después de `module.exports`.
- **Problema:** `tests/paquetes.test.js` lo importa, así que cada corrida de pruebas reescribe `instituciones/cuentas.js` y `banco.json`.
- **Arreglo:** meter el bloque en `if (require.main === module)`.
- **Si no se hace:** cambios fantasma en el repositorio al correr pruebas.

Quedaron fuera 9 hallazgos menores: sincronización de `estado_app` sin control de concurrencia (se recupera sola), XP y racha que el cliente puede inventar, estado sin validar tipos, respuestas opacas en la caché, CDN en el camino crítico del arranque, 315 colores fijos y 24 `z-index` sin escala en CSS, nodos cerrados con poco contraste, pestaña activa sin `aria-current`, y listas del panel sin paginar.

## Cierre

**Veredicto:** el backend está bien pensado; lo urgente es poner al día la carpeta local (1) y luego los arreglos cortos 2, 3, 4 y 5.

**Lean:** unos 1.2 MB de juegos sin uso, 11 tablas y 4 funciones viejas se pueden borrar. Ninguna dependencia sobra.

**No revisado:** los ~620 juegos uno por uno; el interior de la app en producción (pide un código; solo vi portada y entrada); `instituciones/` y el portal; tiempos reales en un celular; copias de seguridad de Supabase; las cabeceras CSP más allá de leerlas; desbordes a 300 px dentro de la app.
