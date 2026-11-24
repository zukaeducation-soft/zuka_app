// Cambia un código de acceso por una sesión: { codigo, dispositivo, nombre } → { ok, token_hash }.
// El navegador canjea token_hash con verifyOtp. La base decide (codigo_entrar: existe, no está bloqueado, dispositivos e
// intentos por red); si el código no se ha estrenado, aquí nace su usuario. La llave de servicio no sale de este servidor.
// Se publica con verify_jwt = false: es la puerta de entrada, todavía no hay sesión.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json", "Cache-Control": "no-store" } });

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ ok: false, error: "metodo" }, 405);
  let b: Record<string, unknown> = {};
  try { b = (await req.json()) ?? {}; } catch { /* cuerpo inválido */ }
  const codigo = String(b.codigo ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!/^[A-HJ-NP-Z2-9]{10}$/.test(codigo)) return json({ ok: false, error: "formato" });
  const disp = String(b.dispositivo ?? "").slice(0, 60), dispNombre = String(b.nombre ?? "").slice(0, 80);
  if (!/^[\w-]{16,60}$/.test(disp)) return json({ ok: false, error: "formato" });
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "sin-ip";

  const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const entrar = async () => {
    const { data, error } = await sb.rpc("codigo_entrar", { p_codigo: codigo, p_ip: ip, p_disp: disp, p_disp_nombre: dispNombre });
    if (error) throw error;
    return data as { ok: boolean; error?: string; nuevo?: boolean; email?: string };
  };
  try {
    let r = await entrar();
    if (r.ok && r.nuevo) {
      const { data, error } = await sb.auth.admin.createUser({ email: `${crypto.randomUUID()}@codigo.invalid`, email_confirm: true });
      if (error || !data.user) throw error ?? new Error("usuario");
      const v = await sb.rpc("codigo_vincular", { p_codigo: codigo, p_uid: data.user.id });
      if (v.error || v.data !== true) await sb.auth.admin.deleteUser(data.user.id);   // otro lo estrenó a la vez
      if (v.error) throw v.error;
      r = await entrar();
    }
    if (!r.ok || !r.email) return json({ ok: false, error: r.error ?? "no_existe" });
    const { data, error } = await sb.auth.admin.generateLink({ type: "magiclink", email: r.email });
    if (error || !data.properties) throw error ?? new Error("enlace");
    return json({ ok: true, token_hash: data.properties.hashed_token });
  } catch (e) {
    console.error("entrar-codigo", (e as Error)?.message);
    return json({ ok: false, error: "servidor" }, 500);
  }
});
