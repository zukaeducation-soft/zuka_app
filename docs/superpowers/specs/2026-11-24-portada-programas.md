# Portada con programas (2026-11-24)

El usuario pidió acomodar la portada como instruimos.com. Se toma su **estructura**, no sus textos, fotos ni marca:

1. **Barra** con menú y botón «Plataforma virtual» hasta el borde (celular: «Entrar» y menú desplegable).
2. **Carrusel** a lo ancho con franja de color por programa: la promesa (con la foto de estudiantes, `brand/estudiantes.webp`; la rueda que se juega está en «Cómo se aprende»), un programa por lámina
   (pantalla real de la app en `brand/app/<curso>.webp`) y los libros. Se desliza, con flechas, puntos y pausa; pasa solo cada
   7 s hasta que se toca, y nunca con «reducir movimiento». La lámina que no se ve es `inert`.
3. **Nuestros programas disponibles**: una tarjeta por curso publicado (`PZ_PROG`), libros y asesorías, con fichas (inicio,
   contiene, incluye, para qué, precio), «Más información» (salta a su sección) y WhatsApp (`WA.info`). El precio es el más
   bajo activo de `productos` / `articulos`; si no hay, la ficha no sale. Lo no publicado queda en «Muy pronto».
   Álgebra, Trigonometría y los demás cursos de carrera (`PZ_FUND`) van juntos como «Fundamentación en Ingeniería y Ciencias»:
   una lámina con la foto `brand/ingenieros.webp` y los logos, y una tarjeta ancha con cada curso, su precio o «Muy pronto».
   Lámina «Estudia desde cualquier lugar, a tu ritmo»: la estudiante recortada (`brand/dispositivos.webp`, sin fondo) y la app
   real en celular, computador y tablet (`brand/app/`).
4. **Quiénes somos**: franja de color con tres tarjetas (qué, cómo, por qué). Reemplaza la sección anterior.
5. Siguen: tu camino, ¿te ha pasado?, cómo se aprende, mundos, libros y preguntas.
6. **¿Qué estás esperando?**, pie con columnas y WhatsApp flotante.

`.pz-tinta` pone tinta oscura sobre franjas claras en los dos temas. Sin premios, descuentos, cifras de estudiantes ni
testimonios: solo lo que Zuka ofrece hoy. Pruebas: `tests/presentacion.test.js`.
