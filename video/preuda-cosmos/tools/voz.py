# Voz para los videos del Preuniversitario (razonamiento lógico, mundos 2 a 16).
#
# Por cada película de Downloads/Zuka_Preuniversitario/<NN_Mundo>/<nombre>.mp4 + .srt:
#   1. pasa el .srt a texto (un párrafo por subtítulo) y le quita «Un problema para empezar.»;
#   2. pide la narración a Gemini TTS (modelo gemini-3.8-flash-tts, voz Cruz, temperatura 1.2), toda la película en una sola
#      petición, igual que el flujo manual del usuario;
#   3. parte el audio en párrafos por los silencios (programación dinámica contra el largo esperado de cada párrafo) y pone cada
#      párrafo en el tiempo de su subtítulo; si uno no cabe antes del siguiente, lo acelera un poco (máximo ×1.18);
#   4. mezcla con la música que ya trae el video, más baja y que se aparta cuando habla la voz (sidechain), y escribe
#      Downloads/Zuka_Preuniversitario_voz/<NN_Mundo>/<nombre>.mp4 y su .srt con los tiempos reales de la voz.
#
# La llave NUNCA va al repositorio: se lee de la variable GEMINI_API_KEY o del archivo C:\Users\<usuario>\.zuka\gemini_key.txt.
# Si la llave se agota (cuota) el script se detiene con código 3 y escribe LLAVE AGOTADA; al volver a correrlo sigue donde iba
# (el audio de Gemini queda guardado en video/preuda-cosmos/out/voz/).
#
# Uso (Python de video/.venv-audio, con google-genai, numpy y soundfile):
#   python -X utf8 tools/voz.py                      todos los mundos desde el 02
#   python -X utf8 tools/voz.py semejanza areas      solo esas películas
#   python -X utf8 tools/voz.py --fake semejanza     prueba sin Gemini (voz de Windows) para revisar alineación y mezcla
import hashlib, json, os, re, subprocess, sys, time, struct
from pathlib import Path
import numpy as np
import soundfile as sf

HOME = Path.home()
SRC = HOME / 'Downloads' / 'Zuka_Preuniversitario'
DST = HOME / 'Downloads' / 'Zuka_Preuniversitario_voz'
HERE = Path(__file__).resolve().parent.parent
CACHE = HERE / 'out' / 'voz'
KEYFILE = HOME / '.zuka' / 'gemini_key.txt'
MODEL, VOICE, TEMP = 'gemini-3.8-flash-tts', 'Cruz', 1.2
import glob, shutil
_bins = glob.glob(str(HOME / 'AppData' / 'Local' / 'Microsoft' / 'WinGet' / 'Packages' / 'Gyan.FFmpeg_*' / 'ffmpeg-*' / 'bin'))
FFMPEG = shutil.which('ffmpeg') or (str(Path(_bins[0]) / 'ffmpeg.exe') if _bins else 'ffmpeg')
FFPROBE = shutil.which('ffprobe') or (str(Path(_bins[0]) / 'ffprobe.exe') if _bins else 'ffprobe')
SR = 24000

class Agotada(Exception): pass
class LlaveMala(Exception): pass

def log(*a):
    msg = time.strftime('%H:%M:%S ') + ' '.join(str(x) for x in a)
    print(msg, flush=True)
    CACHE.mkdir(parents=True, exist_ok=True)
    with open(CACHE / 'voz.log', 'a', encoding='utf8') as f: f.write(msg + '\n')

# ---------- subtítulos ----------
def ts(s):
    h, m, r = s.split(':'); sec, ms = r.split(',')
    return int(h) * 3600 + int(m) * 60 + int(sec) + int(ms) / 1000

def fmt(x):
    x = max(0, x); h = int(x // 3600); m = int(x % 3600 // 60); s = x % 60
    return f'{h:02d}:{m:02d}:{int(s):02d},{int(round((s - int(s)) * 1000)) % 1000:03d}'

def read_srt(p):
    cues = []
    for block in re.split(r'\n\s*\n', p.read_text(encoding='utf8').replace('\r\n', '\n').strip()):
        lines = block.strip().split('\n')
        if len(lines) < 3 or '-->' not in lines[1]: continue
        a, b = [ts(x.strip()) for x in lines[1].split('-->')]
        cues.append({'t0': a, 't1': b, 'text': ' '.join(lines[2:]).strip()})
    if cues: cues[0]['text'] = re.sub(r'^Un problema para empezar\.\s*', '', cues[0]['text'])
    return cues

# ---------- Gemini ----------
def api_key():
    k = os.environ.get('GEMINI_API_KEY', '').strip()
    if not k and KEYFILE.exists(): k = KEYFILE.read_text(encoding='utf8').strip()
    if not k: raise LlaveMala(f'No hay llave: crea {KEYFILE} con la llave adentro.')
    return k

def pcm_rate(mime):
    m = re.search(r'rate=(\d+)', mime or '')
    return int(m.group(1)) if m else 24000

def gemini_tts(text):
    from google import genai
    from google.genai import types, errors
    client = genai.Client(api_key=api_key())
    cfg = types.GenerateContentConfig(temperature=TEMP, response_modalities=['audio'],
        speech_config=types.SpeechConfig(voice_config=types.VoiceConfig(prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name=VOICE))))
    contents = [types.Content(role='user', parts=[types.Part.from_text(text='## Transcript:\n' + text)])]
    for intento in range(4):
        try:
            data, mime = bytearray(), ''
            for chunk in client.models.generate_content_stream(model=MODEL, contents=contents, config=cfg):
                if chunk.parts is None: continue
                d = chunk.parts[0].inline_data
                if d and d.data: data.extend(d.data); mime = d.mime_type
            if not data: raise RuntimeError('Gemini no devolvió audio')
            if 'wav' in (mime or ''):   # por si algún día devuelve WAV con cabecera
                x, r = sf.read(__import__('io').BytesIO(bytes(data)), dtype='float32'); return x if x.ndim == 1 else x.mean(1), r
            return np.frombuffer(bytes(data), dtype='<i2').astype(np.float32) / 32768, pcm_rate(mime)
        except errors.APIError as e:
            code, msg = getattr(e, 'code', 0), str(e)
            if code in (401, 403) or 'API_KEY_INVALID' in msg or 'API key not valid' in msg: raise LlaveMala(msg[:300])
            if code == 429 or 'RESOURCE_EXHAUSTED' in msg:
                daily = re.search(r'PerDay|per day|daily', msg, re.I)
                if daily or intento == 3: raise Agotada(msg[:400])
                wait = re.search(r'retry in ([\d.]+)s|retryDelay["\']?: ?["\']?(\d+)', msg)
                s = float(next(g for g in wait.groups() if g)) + 2 if wait else 65
                log(f'  límite por minuto: espero {s:.0f} s'); time.sleep(s); continue
            if code and code >= 500 and intento < 3: log(f'  error {code} del servidor; reintento'); time.sleep(20); continue
            raise

def fake_tts(text):
    """Voz de Windows (System.Speech) con una pausa entre párrafos: solo para probar alineación y mezcla."""
    out = CACHE / '_fake.wav'; txt = CACHE / '_fake.txt'
    txt.write_text(text, encoding='utf8')
    ps = ("Add-Type -AssemblyName System.Speech; $s = New-Object System.Speech.Synthesis.SpeechSynthesizer; "
          "$f = New-Object System.Speech.AudioFormat.SpeechAudioFormatInfo(24000, [System.Speech.AudioFormat.AudioBitsPerSample]::Sixteen, [System.Speech.AudioFormat.AudioChannel]::Mono); "
          f"$s.SetOutputToWaveFile('{out}', $f); $s.Rate = 2; "
          f"$p = (Get-Content -Raw -Encoding UTF8 '{txt}') -split \"`n`n\"; "
          "$b = New-Object System.Speech.Synthesis.PromptBuilder; foreach ($q in $p) { $b.AppendText($q); $b.AppendBreak([TimeSpan]::FromMilliseconds(650)) }; $s.Speak($b); $s.Dispose()")
    subprocess.run(['powershell', '-NoProfile', '-Command', ps], check=True)
    x, r = sf.read(out, dtype='float32'); return x, r

def synth(name, paras, fake):
    """Audio de un grupo de párrafos (guardado en caché por contenido)."""
    text = '\n\n'.join(paras)
    h = hashlib.sha1(f'{MODEL}|{VOICE}|{TEMP}|{fake}|{text}'.encode()).hexdigest()[:12]
    f = CACHE / name / f'{h}.wav'
    if f.exists(): x, r = sf.read(f, dtype='float32'); return x, r
    log(f'  pido voz para {len(paras)} párrafos ({len(text)} letras)')
    x, r = (fake_tts if fake else gemini_tts)(text)
    f.parent.mkdir(parents=True, exist_ok=True); sf.write(f, x, r, subtype='PCM_16')
    return x, r

# ---------- partir por silencios ----------
def split(x, r, paras):
    """Corta x en len(paras) segmentos en silencios, con largos parecidos a los esperados. Devuelve [(i0, i1)] o None."""
    n = len(paras)
    if n == 1:
        a, b = speech_span(x, r); return [(a, b)]
    hop = int(r * 0.02); fr = len(x) // hop
    rms = np.sqrt(np.mean(x[:fr * hop].reshape(fr, hop) ** 2, axis=1) + 1e-12); db = 20 * np.log10(rms)
    thr = max(db.max() - 38, -48)
    loud = np.where(db > thr)[0]
    if len(loud) == 0: return None
    first, last = loud[0], loud[-1]
    sil = db <= thr; cands = []; i = first
    while i <= last:
        if sil[i]:
            j = i
            while j <= last and sil[j]: j += 1
            if (j - i) * 0.02 >= 0.16: cands.append(((i + j) / 2, (j - i) * 0.02))
            i = j
        else: i += 1
    m = len(cands)
    if m < n - 1: return None
    w = np.array([len(p) + 12 for p in paras], float); span = (last - first) * 0.02
    exp = w / w.sum() * span
    pos = [first] + [c[0] for c in cands] + [last + 1]; gap = [0] + [c[1] for c in cands] + [0]
    INF = 1e18
    # dp[k][j]: mejor costo con el k-ésimo corte en pos[j] (j = 0 es el inicio, j = m + 1 el final)
    dp = np.full((n + 1, m + 2), INF); back = np.zeros((n + 1, m + 2), int); dp[0][0] = 0
    for k in range(1, n + 1):
        js = [m + 1] if k == n else range(1, m + 1)
        for j in js:
            best, arg = INF, -1
            for i in range(0 if k == 1 else 1, j):
                if dp[k - 1][i] >= INF: continue
                d = (pos[j] - pos[i]) * 0.02
                c = dp[k - 1][i] + ((d - exp[k - 1]) / exp[k - 1]) ** 2 - (0.35 * min(gap[j], 1.2) if k < n else 0)
                if c < best: best, arg = c, i
            dp[k][j], back[k][j] = best, arg
    if dp[n][m + 1] >= INF: return None
    cuts, j = [], m + 1
    for k in range(n, 0, -1): cuts.append(j); j = back[k][j]
    cuts = [0] + cuts[::-1]
    segs = []
    for k in range(n):
        a, b = int(pos[cuts[k]] * hop), int(pos[cuts[k + 1]] * hop)
        sa, sb = speech_span(x[a:b], r); segs.append((a + sa, a + sb))
    durs = np.array([(b - a) / r for a, b in segs])
    err = np.abs(durs - exp) / exp
    if err.max() > 0.6: log(f'    alineación dudosa (error máx. {err.max():.2f})'); return None
    return segs

def speech_span(x, r):
    hop = int(r * 0.01); fr = max(1, len(x) // hop)
    rms = np.sqrt(np.mean(x[:fr * hop].reshape(fr, hop) ** 2, axis=1) + 1e-12); db = 20 * np.log10(rms)
    loud = np.where(db > max(db.max() - 40, -50))[0]
    if len(loud) == 0: return 0, len(x)
    return max(0, loud[0] * hop - int(0.04 * r)), min(len(x), (loud[-1] + 1) * hop + int(0.06 * r))

def voice_segments(name, paras, fake):
    """Un audio por párrafo. Pide la película entera; si no se puede alinear, la parte en mitades."""
    def go(lo, hi):
        x, r = synth(name, paras[lo:hi], fake)
        if r != SR: x = resample(x, r)
        segs = split(x, SR, paras[lo:hi])
        if segs is None and hi - lo > 1:
            mid = (lo + hi) // 2; log(f'  parto en dos: párrafos {lo + 1}–{mid} y {mid + 1}–{hi}')
            return go(lo, mid) + go(mid, hi)
        if segs is None: segs = [speech_span(x, SR)]
        return [x[a:b] for a, b in segs]
    return go(0, len(paras))

def resample(x, r):
    t = np.arange(int(len(x) * SR / r)) / SR
    return np.interp(t, np.arange(len(x)) / r, x).astype(np.float32)

def atempo(x, f):
    a, b = CACHE / '_in.wav', CACHE / '_out.wav'
    sf.write(a, x, SR, subtype='PCM_16')
    subprocess.run([FFMPEG, '-v', 'error', '-y', '-i', str(a), '-filter:a', f'atempo={f:.4f}', str(b)], check=True)
    y, _ = sf.read(b, dtype='float32'); return y

# ---------- una película ----------
def duration(mp4):
    out = subprocess.run([FFPROBE, '-v', 'error',
                          '-show_entries', 'format=duration', '-of', 'csv=p=0', str(mp4)], capture_output=True, text=True, check=True)
    return float(out.stdout.strip())

def film(mp4, fake=False):
    name, srt = mp4.stem, mp4.with_suffix('.srt')
    out = DST / mp4.parent.name / mp4.name
    if out.exists() and not fake: return 'ya'
    cues = read_srt(srt); total = duration(mp4)
    log(f'{mp4.parent.name}/{name}: {len(cues)} párrafos, {total:.0f} s')
    segs = voice_segments(name, [c['text'] for c in cues], fake)
    track = np.zeros(int(total * SR) + SR, np.float32); prev = 0.0; placed = []; fast = 0
    for i, (c, y) in enumerate(zip(cues, segs)):
        nxt = cues[i + 1]['t0'] if i + 1 < len(cues) else total - 0.4
        start = max(c['t0'], prev + 0.15); avail = nxt - start - 0.15; d = len(y) / SR
        if d > avail > 0:
            f = min(d / avail, 1.18); y = atempo(y, f); d = len(y) / SR; fast += 1
        a = int(start * SR); y = y[:max(0, len(track) - a)]
        track[a:a + len(y)] += y; prev = start + d; placed.append((start, prev, c['text']))
    late = max(0.0, prev - (total - 0.2))
    if late: log(f'  aviso: la voz termina {late:.1f} s después del video')
    tmp = CACHE / name / 'voz.wav'; tmp.parent.mkdir(parents=True, exist_ok=True)
    peak = np.abs(track).max() or 1; sf.write(tmp, track / peak * 0.89, SR, subtype='PCM_16')
    target = out if not fake else CACHE / name / f'{name}_prueba.mp4'
    target.parent.mkdir(parents=True, exist_ok=True)
    fx = ('[1:a]aresample=48000,aformat=channel_layouts=stereo,loudnorm=I=-16:TP=-1.5:LRA=7,asplit=2[v1][v2];'
          '[0:a]volume=0.32[m];[m][v1]sidechaincompress=threshold=0.02:ratio=6:attack=15:release=400[md];'
          '[md][v2]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.94[a]')
    subprocess.run([FFMPEG, '-v', 'error', '-y', '-i', str(mp4), '-i', str(tmp), '-filter_complex', fx, '-map', '0:v', '-map', '[a]',
                    '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', str(target)], check=True)
    target.with_suffix('.srt').write_text('\n'.join(f'{k + 1}\n{fmt(a)} --> {fmt(b)}\n{t}\n' for k, (a, b, t) in enumerate(placed)), encoding='utf8')
    log(f'  listo → {target}' + (f' ({fast} párrafos acelerados)' if fast else ''))
    return 'hecho'

def main():
    args = sys.argv[1:]; fake = '--fake' in args; names = [a for a in args if not a.startswith('--')]
    mp4s = sorted(p for d in sorted(SRC.iterdir()) if d.is_dir() and d.name[:2].isdigit() and int(d.name[:2]) >= 2 for p in d.glob('*.mp4'))
    if names: mp4s = [p for p in mp4s if p.stem in names]
    hechos = 0
    try:
        for p in mp4s:
            if not p.with_suffix('.srt').exists(): log(f'{p.name}: falta el .srt'); continue
            if film(p, fake) == 'hecho': hechos += 1
    except Agotada as e:
        log(f'LLAVE AGOTADA después de {hechos} películas en esta tanda. {e}'); sys.exit(3)
    except LlaveMala as e:
        log(f'LLAVE INVÁLIDA o ausente: {e}'); sys.exit(4)
    falta = [p for p in mp4s if not (DST / p.parent.name / p.name).exists()]
    log(f'TERMINÓ: {hechos} películas nuevas; faltan {len(falta)}.')

if __name__ == '__main__':
    main()
