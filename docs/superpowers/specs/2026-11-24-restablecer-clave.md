# Restablecer la contraseña

- `js/clave.js` + `css/clave.css`, en la pantalla `#auth`. Vistas: `pedir` → `enviado`; `nueva` → `lista`; `vencido` (pide otro enlace).
- Los correos vuelven a `APP_URL` (`correoVuelve()`), o al servidor local al desarrollar. Supabase solo lo respeta si está en
  Authentication → URL Configuration → Redirect URLs; si no, usa el Site URL. Si cambia el dominio: los dos sitios.
- La dirección se lee al cargar (`Clave.vista`), antes de que Supabase la limpie; mientras hay vista, `cuentaSesion` no cierra `#auth`.
- Al cambiarla se cierran las demás sesiones. «Cancelar» cierra la sesión que abrió el enlace.
- Correo: `supabase/correos/restablecer-clave.html`, se pega a mano en Authentication → Email Templates → Reset password.
  Asunto: «Restablece tu contraseña de Zuka».
- Pruebas: `tests/clave.test.js`.
