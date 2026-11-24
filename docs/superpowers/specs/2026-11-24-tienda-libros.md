# Tienda, libros y asesorías (2026-11-24)

- **Precios** en la base (`articulos`, `envios`, `productos`), sugeridos en el análisis de mercado y editables en el panel
  (Tienda y libros; Cursos y precios). `precio_plan`: para quien tiene un curso pagado y vigente. `da`: lo que entrega.
- **Pedido**: `crear_pedido` pone los precios y el envío (por cada 8 libros), nunca el navegador. Se paga por fuera y el panel
  confirma (`pedido_pagar`): abre cursos y libros digitales (365 días), suma horas, anota la venta; lo impreso pasa por
  pagado → preparando → enviado (con guía) → entregado.
- **Lector** (`js/lector.js`): páginas WebP en la carpeta privada `libros` de Supabase Storage; `privado.puede_leer` decide
  página por página (las de muestra, cualquiera con cuenta). Lienzo con marca de agua (nombre y código), sin descarga, menú,
  impresión ni caché. Una captura de pantalla no se puede impedir del todo. El administrador sube el PDF en el panel: el
  navegador lo convierte en páginas con pdf.js y el PDF no se guarda; la versión cambia solo al terminar.
- **Asesorías de 1 hora**: saldo en `horas` (general, universidad para calc/fis/int/lin, grupo). `separar_asesoria` gasta una;
  cancelar con 12 h o más la devuelve; si cancela Zuka, siempre. `S.tutorias` es copia de la base.
- Portadas: `brand/libros/N.webp` (primera página del PDF). Pruebas: `tests/tienda.test.js`.
