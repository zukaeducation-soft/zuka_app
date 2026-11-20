# Voz para los videos del Preuniversitario (razonamiento lógico, mundos 2 a 16), con el proceso del usuario (2026-11-20):
#
#   0. Voz: el .srt pasa a texto (un párrafo por línea, sin «Un problema para empezar.») y Gemini TTS lo lee entero en una sola
#      petición (gemini-3.8-flash-tts, voz Cruz, temperatura 1.2). Queda en caché: si la llave se agota, al volver se sigue.
#   1. Medir: duración y fps del video; la música es la pista de audio que ya trae.
#   2. Transcribir la voz con tiempos por palabra (faster-whisper «small», español) y detectar silencios (−40 dB, ≥ 0.2 s).
#   3. Partir en una frase por línea del SRT: números a letras y «%» a «por ciento», alinear guion y transcripción con difflib,
#      cortar en el silencio entre frases (o en el punto de menor energía, ventanas de 10 ms), y el corte va justo después de la
#      palabra anterior, antes del instante mudo con que empiezan p, t, c, d.
#   4. Colocar: cada frase busca el tiempo de su línea; un programa lineal reparte los corrimientos con el menor desfase total, con
#      ≥ 0.3 s entre frases, sin que una frase que abre escena empiece antes del fin de la línea anterior del SRT y sin pasar del
#      final del video. Si la voz se atrasa más de 1 s, se aceleran esas frases (atempo) entre 5 y 30 %; si no alcanza, toda un 10 %.
#   5. Pista de voz: cada frase con fundidos de 8 ms en su tiempo, sobre silencio de la duración del video.
#   6. Recortar silencios largos: video a 10 fps en grises; entre fin de frase + 0.2 s e inicio de la siguiente − 0.25 s se quitan
#      los tramos quietos (cambio < 1.5) de 0.3 s o más. Los trozos se unen con fundido cruzado de 0.15 s (xfade y acrossfade).
#   7. Música: acompressor (−24 dB, 3:1) → −9 dB → ducking con la voz (sidechaincompress 0.03, 3:1, 80/900 ms) → amix con la voz
#      → alimiter 0.95 → AAC 192 k, +faststart. Si la voz queda a menos de 18 dB sobre la música, se baja la música y se rehace.
#   8. Verificar: se transcribe la voz final y cada línea del SRT debe contener sus palabras; las que no, van al informe.
#
# Salida, junto al original: <NN_Mundo>/<nombre>_con_audio.mp4 y <nombre>_con_audio.srt (tiempos finales).
# La llave NUNCA va al repositorio: variable GEMINI_API_KEY o el archivo C:\Users\<usuario>\.zuka\gemini_key.txt.
# Códigos de salida: 0 terminó, 3 llave agotada, 4 llave inválida. Volver a correrlo sigue donde iba.
#
#   python -X utf8 tools/voz.py                      todas las películas desde el mundo 02
#   python -X utf8 tools/voz.py angulos areas        solo esas
import difflib, glob, hashlib, io, json, os, re, shutil, subprocess, sys, time, unicodedata
from pathlib import Path
import numpy as np
import soundfile as sf

HOME = Path.home()
SRC = HOME / 'Downloads' / 'Zuka_Preuniversitario'
HERE = Path(__file__).resolve().parent.parent
CACHE = HERE / 'out' / 'voz'
KEYFILE = HOME / '.zuka' / 'gemini_key.txt'
MODEL, VOICE, TEMP = 'gemini-3.8-flash-tts', 'Cruz', 1.2
_bins = glob.glob(str(HOME / 'AppData' / 'Local' / 'Microsoft' / 'WinGet' / 'Packages' / 'Gyan.FFmpeg_*' / 'ffmpeg-*' / 'bin'))
FFMPEG = shutil.which('ffmpeg') or (str(Path(_bins[0]) / 'ffmpeg.exe') if _bins else 'ffmpeg')
FFPROBE = shutil.which('ffprobe') or (str(Path(_bins[0]) / 'ffprobe.exe') if _bins else 'ffprobe')
SR = 24000
GAP, XF = 0.3, 0.15

class Agotada(Exception): pass
class LlaveMala(Exception): pass

def log(*a):
    msg = time.strftime('%H:%M:%S ') + ' '.join(str(x) for x in a)
    print(msg, flush=True)
    CACHE.mkdir(parents=True, exist_ok=True)
    with open(CACHE / 'voz.log', 'a', encoding='utf8') as f: f.write(msg + '\n')

def run(args, **kw):
    r = subprocess.run([str(a) for a in args], capture_output=True, text=True, encoding='utf8', errors='replace', **kw)
    if r.returncode: raise RuntimeError(f'{Path(args[0]).name} falló: {r.stderr[-1500:]}')
    return r

# ---------- 1 · medir y leer ----------
def ts(s):
    h, m, r = s.split(':'); sec, ms = r.split(',')
    return int(h) * 3600 + int(m) * 60 + int(sec) + int(ms) / 1000

def fmt(x):
    x = max(0, x); ms = int(round(x * 1000)); return f'{ms // 3600000:02d}:{ms // 60000 % 60:02d}:{ms // 1000 % 60:02d},{ms % 1000:03d}'

def read_srt(p):
    cues = []
    for block in re.split(r'\n\s*\n', p.read_text(encoding='utf8').replace('\r\n', '\n').strip()):
        lines = block.strip().split('\n')
        if len(lines) < 3 or '-->' not in lines[1]: continue
        a, b = [ts(x.strip()) for x in lines[1].split('-->')]
        cues.append({'t0': a, 't1': b, 'text': ' '.join(lines[2:]).strip()})
    if cues: cues[0]['text'] = re.sub(r'^Un problema para empezar\.\s*', '', cues[0]['text'])
    return cues

def probe(mp4):
    r = run([FFPROBE, '-v', 'error', '-select_streams', 'v', '-show_entries', 'stream=r_frame_rate:format=duration', '-of', 'json', mp4])
    j = json.loads(r.stdout); n, d = j['streams'][0]['r_frame_rate'].split('/')
    return float(j['format']['duration']), float(n) / float(d)

# ---------- 0 · Gemini ----------
def api_key():
    k = os.environ.get('GEMINI_API_KEY', '').strip()
    if not k and KEYFILE.exists(): k = KEYFILE.read_text(encoding='utf8').strip()
    if not k: raise LlaveMala(f'No hay llave: crea {KEYFILE} con la llave adentro.')
    return k

def gemini_tts(text):
    from google import genai
    from google.genai import types, errors
    # speechConfig solo existe en v1beta (este SDK usa v1 por defecto y la API responde «Unknown name speechConfig»).
    client = genai.Client(api_key=api_key(), http_options={'api_version': 'v1beta'})
    cfg = types.GenerateContentConfig(temperature=TEMP, response_modalities=['audio'],
        speech_config=types.SpeechConfig(voice_config=types.VoiceConfig(prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name=VOICE))))
    contents = [types.Content(role='user', parts=[types.Part.from_text(text='## Transcript:\n' + text)])]
    for intento in range(8):
        try:
            data, mime = bytearray(), ''
            for chunk in client.models.generate_content_stream(model=MODEL, contents=contents, config=cfg):
                if chunk.parts is None: continue
                d = chunk.parts[0].inline_data
                if d and d.data: data.extend(d.data); mime = d.mime_type
            if not data: raise RuntimeError('Gemini no devolvió audio')
            if 'wav' in (mime or ''):
                x, r = sf.read(io.BytesIO(bytes(data)), dtype='float32'); return x if x.ndim == 1 else x.mean(1), r
            m = re.search(r'rate=(\d+)', mime or '')
            return np.frombuffer(bytes(data), dtype='<i2').astype(np.float32) / 32768, int(m.group(1)) if m else 24000
        except errors.APIError as e:
            code, msg = getattr(e, 'code', 0), str(e)
            if code in (401, 403) or 'API_KEY_INVALID' in msg or 'API key not valid' in msg: raise LlaveMala(msg[:300])
            if code == 429 or 'RESOURCE_EXHAUSTED' in msg:
                if re.search(r'PerDay|per day|daily|check your plan', msg, re.I) or intento >= 3: raise Agotada(msg[:400])
                w = re.search(r'retry in ([\d.]+)s|retryDelay["\']?: ?["\']?(\d+)', msg)
                s = float(next(g for g in w.groups() if g)) + 2 if w else 65
                log(f'  límite por minuto: espero {s:.0f} s'); time.sleep(s); continue
            if code and code >= 500 and intento < 7:
                s = min(240, 30 * 2 ** min(intento, 3)); log(f'  error {code} del servidor; reintento en {s} s'); time.sleep(s); continue
            log(f'  error de Gemini: {msg[:300]}'); raise

def resample(x, r):
    if r == SR: return x.astype(np.float32)
    t = np.arange(int(len(x) * SR / r)) / SR
    return np.interp(t, np.arange(len(x)) / r, x).astype(np.float32)

def synth(name, paras):
    text = '\n\n'.join(paras)
    h = hashlib.sha1(f'{MODEL}|{VOICE}|{TEMP}|False|{text}'.encode()).hexdigest()[:12]
    f = CACHE / name / f'{h}.wav'
    if f.exists(): x, r = sf.read(f, dtype='float32'); return resample(x, r)
    log(f'  pido voz para {len(paras)} párrafos ({len(text)} letras)')
    x, r = gemini_tts(text)
    f.parent.mkdir(parents=True, exist_ok=True); sf.write(f, x, r, subtype='PCM_16')
    return resample(x, r)

# ---------- 2 · transcribir y silencios ----------
_whisper = None
def transcribe(x, cache=None):
    """Palabras con tiempos: [(palabra, inicio, fin)]."""
    if cache and Path(cache).exists(): return json.loads(Path(cache).read_text(encoding='utf8'))
    global _whisper
    if _whisper is None:
        from faster_whisper import WhisperModel
        _whisper = WhisperModel('small', compute_type='int8', cpu_threads=8)
    x16 = np.interp(np.arange(int(len(x) * 16000 / SR)) / 16000, np.arange(len(x)) / SR, x).astype(np.float32)
    segs, _ = _whisper.transcribe(x16, language='es', word_timestamps=True, beam_size=5, vad_filter=False, condition_on_previous_text=False)
    words = [(w.word.strip(), w.start, w.end) for s in segs for w in (s.words or []) if w.word.strip()]
    if cache: Path(cache).write_text(json.dumps(words, ensure_ascii=False), encoding='utf8')
    return words

def frames_db(x, hop_s=0.01):
    hop = int(SR * hop_s); n = max(1, len(x) // hop)
    return 20 * np.log10(np.sqrt(np.mean(x[:n * hop].reshape(n, hop) ** 2, axis=1)) + 1e-9)

def silences(x, thr=-40, min_s=0.2):
    db = frames_db(x); quiet = db < thr; out = []; i = 0
    while i < len(quiet):
        if quiet[i]:
            j = i
            while j < len(quiet) and quiet[j]: j += 1
            if (j - i) * 0.01 >= min_s: out.append((i * 0.01, j * 0.01))
            i = j
        else: i += 1
    return out

# ---------- 3 · partir en frases ----------
def norm_words(text):
    from num2words import num2words
    t = text.replace('%', ' por ciento ').replace('²', ' al cuadrado ').replace('³', ' al cubo ')
    t = re.sub(r'(\d)\s(\d{3})', r'\1\2', t)
    t = re.sub(r'(\d+)[.,](\d+)', lambda m: f'{m.group(1)} coma {m.group(2)}', t)
    t = re.sub(r'\d+', lambda m: ' ' + num2words(int(m.group()), lang='es') + ' ', t)
    t = unicodedata.normalize('NFD', t.lower())
    t = ''.join(c for c in t if unicodedata.category(c) != 'Mn')
    return re.findall(r'[a-zñ]+', t)

def split_phrases(x, cues, words):
    """Intervalo [a, b] (s) de cada línea dentro del audio de Gemini."""
    script, owner = [], []
    for i, c in enumerate(cues):
        for w in norm_words(c['text']): script.append(w); owner.append(i)
    heard, hidx = [], []
    for k, (w, a, b) in enumerate(words):
        for t in norm_words(w): heard.append(t); hidx.append(k)
    sm = difflib.SequenceMatcher(None, script, heard, autojunk=False)
    first, last = [None] * len(cues), [None] * len(cues)
    for blk in sm.get_matching_blocks():
        for d in range(blk.size):
            i, k = owner[blk.a + d], hidx[blk.b + d]
            if first[i] is None or words[k][1] < first[i]: first[i] = words[k][1]
            if last[i] is None or words[k][2] > last[i]: last[i] = words[k][2]
    n, dur = len(cues), len(x) / SR
    # Las líneas sin ninguna palabra reconocida se interpolan por su largo.
    lens = [len(norm_words(c['text'])) + 1 for c in cues]
    for i in range(n):
        if first[i] is None:
            p = max([j for j in range(i) if last[j] is not None], default=None); q = min([j for j in range(i + 1, n) if first[j] is not None], default=None)
            a = last[p] if p is not None else 0.0; b = first[q] if q is not None else dur
            lo = p + 1 if p is not None else 0; hi = q if q is not None else n; tot = sum(lens[lo:hi])
            off = sum(lens[lo:i]); first[i] = a + (b - a) * off / tot; last[i] = a + (b - a) * (off + lens[i]) / tot
    sil = silences(x); db = frames_db(x)
    cuts = [0.0]
    for i in range(n - 1):
        e, s = last[i], first[i + 1]
        lo, hi = (e, s) if s > e else (s - 0.3, e + 0.3)
        best = None
        for a, b in sil:                                  # el silencio que hay entre las dos frases
            if b > lo and a < hi: best = (max(a, lo), min(b, hi)); break
        if best and best[1] - best[0] > 0.02:
            cut = min(best[0] + 0.06, (best[0] + best[1]) / 2)   # justo tras la palabra anterior: el mudo de p, t, c, d va con la siguiente
        else:
            a, b = int(max(0, lo) * 100), int(min(dur, hi) * 100) + 1
            cut = (a + int(np.argmin(db[a:b]))) / 100 if b > a else (lo + hi) / 2
        cuts.append(max(cut, cuts[-1] + 0.05))
    cuts.append(dur)
    return [(cuts[i], cuts[i + 1]) for i in range(n)], first, last

def trim_edges(y):
    db = frames_db(y); loud = np.where(db > -45)[0]
    if len(loud) == 0: return y
    a = max(0, loud[0] * int(SR * .01) - int(.03 * SR)); b = min(len(y), (loud[-1] + 1) * int(SR * .01) + int(.08 * SR))
    return y[a:b]

def fade(y, ms=8):
    k = min(len(y) // 2, int(SR * ms / 1000))
    if k: y = y.copy(); r = np.linspace(0, 1, k, dtype=np.float32); y[:k] *= r; y[-k:] *= r[::-1]
    return y

def atempo(y, f):
    if abs(f - 1) < 1e-3: return y
    a, b = CACHE / '_in.wav', CACHE / '_out.wav'
    sf.write(a, y, SR, subtype='PCM_16'); run([FFMPEG, '-v', 'error', '-y', '-i', a, '-filter:a', f'atempo={f:.4f}', b])
    z, _ = sf.read(b, dtype='float32'); return z

# ---------- 4 · colocar ----------
def place(cues, durs, total):
    """Tiempos de inicio con el menor desfase total (programa lineal)."""
    from scipy.optimize import linprog
    n = len(cues)
    # variables: s_i, late_i, early_i
    c = np.r_[np.zeros(n), np.ones(n), 1.5 * np.ones(n)]
    A, B = [], []
    def row(): return np.zeros(3 * n)
    for i in range(n):
        r = row(); r[i] = 1; r[n + i] = -1; r[2 * n + i] = 1; A.append(r); B.append(cues[i]['t0'])   # s − late + early = t0 (como ≤ y ≥)
        r = -r; A.append(r); B.append(-cues[i]['t0'])
        if i:
            r = row(); r[i - 1] = 1; r[i] = -1; A.append(r); B.append(-(durs[i - 1] + GAP))          # s_i ≥ s_{i-1} + d + 0.3
            if cues[i]['t0'] - cues[i - 1]['t1'] > 1.0:                                               # abre escena
                r = row(); r[i] = -1; A.append(r); B.append(-cues[i - 1]['t1'])
    r = row(); r[n - 1] = 1; A.append(r); B.append(total - 0.3 - durs[-1])
    bounds = [(0.3, None)] * n + [(0, None)] * (2 * n)
    res = linprog(c, A_ub=np.array(A), b_ub=np.array(B), bounds=bounds, method='highs')
    if res.status != 0: return None
    return list(res.x[:n])

def arrange(cues, phrases, total):
    speed = [1.0] * len(phrases); glob_f = 1.0
    for it in range(12):
        ys = [atempo(p, speed[i] * glob_f) for i, p in enumerate(phrases)]
        durs = [len(y) / SR for y in ys]
        st = place(cues, durs, total)
        if st is None:
            if glob_f < 1.1: glob_f = 1.1; continue
            raise RuntimeError('la voz no cabe en el video ni acelerada')
        lag = [st[i] - cues[i]['t0'] for i in range(len(cues))]
        late = [i for i, l in enumerate(lag) if l > 1.0]
        if not late: return st, ys, speed, glob_f
        changed = False
        for i in late:
            for j in (i - 1, i):                     # acelera la frase que empuja y la atrasada
                if j >= 0 and speed[j] < 1.3: speed[j] = min(1.3, max(1.05, speed[j] + 0.05)); changed = True
        if not changed:
            if glob_f < 1.1: glob_f = 1.1
            else: return st, ys, speed, glob_f
    return st, ys, speed, glob_f

# ---------- 6 · tramos quietos ----------
def motion(mp4, total):
    W, H = 54, 96
    r = subprocess.run([FFMPEG, '-v', 'error', '-i', str(mp4), '-vf', f'fps=10,scale={W}:{H},format=gray', '-f', 'rawvideo', '-'], capture_output=True)
    f = np.frombuffer(r.stdout, np.uint8)
    f = f[:len(f) // (W * H) * W * H].reshape(-1, H, W).astype(np.float32)
    d = np.r_[0, np.abs(np.diff(f, axis=0)).mean(axis=(1, 2))]
    return d                                           # d[k] = cambio del cuadro k (t = k / 10) respecto al anterior

def cut_plan(st, durs, mot, total, fps):
    """Tramos que se quitan (tiempo original)."""
    rem = []
    for i in range(len(st) - 1):
        a, b = st[i] + durs[i] + 0.2, st[i + 1] - 0.25
        if b - a < 0.3: continue
        k0, k1 = int(np.ceil(a * 10)), int(np.floor(b * 10))
        k = k0
        while k < k1:
            if k < len(mot) and mot[k] < 1.5:
                j = k
                while j < k1 and j < len(mot) and mot[j] < 1.5: j += 1
                if (j - k) / 10 >= 0.3 + XF: rem.append((k / 10, j / 10))
                k = j
            else: k += 1
    snap = lambda t: round(t * fps) / fps
    return [(snap(a), snap(b)) for a, b in rem]

def keeps_of(rem, total):
    keep, t = [], 0.0
    for a, b in rem:
        if a - t > 2 * XF: keep.append((t, a)); t = b
    keep.append((t, total)); return keep

def mapper(keep):
    def f(t):
        acc = 0.0
        for j, (a, b) in enumerate(keep):
            if t <= b or j == len(keep) - 1: return acc + max(0.0, min(t, b) - a) - j * XF
            acc += b - a
    return f

# ---------- una película ----------
def film(mp4):
    name = mp4.stem; srt = mp4.with_suffix('.srt'); out = mp4.with_name(f'{name}_con_audio.mp4')
    if out.exists(): return 'ya'
    work = CACHE / name; work.mkdir(parents=True, exist_ok=True)
    cues = read_srt(srt); total, fps = probe(mp4)
    log(f'{mp4.parent.name}/{name}: {len(cues)} frases, {total:.0f} s, {fps:.0f} fps')
    x = synth(name, [c['text'] for c in cues])
    words = transcribe(x, work / 'palabras.json')
    spans, first, last = split_phrases(x, cues, words)
    (work / 'frases.txt').write_text('\n'.join(
        f"{i + 1:>2} {a:7.2f}–{b:7.2f} | {' '.join(w for w, s, e in words if a <= s < b)[:90]}" for i, (a, b) in enumerate(spans)), encoding='utf8')
    phrases = [fade(trim_edges(x[int(a * SR):int(b * SR)])) for a, b in spans]
    st, ys, speed, gf = arrange(cues, phrases, total)
    durs = [len(y) / SR for y in ys]
    voice = np.zeros(int(total * SR) + 1, np.float32)
    for s, y in zip(st, ys):
        k = int(s * SR); y = y[:len(voice) - k]; voice[k:k + len(y)] += y
    voice *= 0.89 / (np.abs(voice).max() or 1)
    sf.write(work / 'voz_completa.wav', voice, SR, subtype='PCM_16')
    lag = max(s - c['t0'] for s, c in zip(st, cues))
    nfast = sum(1 for v in speed if v > 1.001)
    # 6 · recortes
    rem = cut_plan(st, durs, motion(mp4, total), total, fps)
    keep = keeps_of(rem, total); m = mapper(keep)
    parts = []
    for j, (a, b) in enumerate(keep):
        parts.append(f'[0:v]trim=start={a:.4f}:end={b:.4f},setpts=PTS-STARTPTS[v{j}];'
                     f'[0:a]atrim=start={a:.4f}:end={b:.4f},asetpts=PTS-STARTPTS[m{j}];'
                     f'[1:a]atrim=start={a:.4f}:end={b:.4f},asetpts=PTS-STARTPTS[s{j}];')
    chain, lv, lm, ls, length = [], 'v0', 'm0', 's0', keep[0][1] - keep[0][0]
    for j in range(1, len(keep)):
        off = length - XF
        chain.append(f'[{lv}][v{j}]xfade=transition=fade:duration={XF}:offset={off:.4f}[vx{j}];'
                     f'[{lm}][m{j}]acrossfade=d={XF}[mx{j}];[{ls}][s{j}]acrossfade=d={XF}[sx{j}];')
        lv, lm, ls = f'vx{j}', f'mx{j}', f'sx{j}'; length = off + (keep[j][1] - keep[j][0])
    graph = ''.join(parts) + ''.join(chain) + f'[{lv}]format=yuv420p[V];[{lm}]anull[M];[{ls}]anull[S]'
    (work / 'grafo.txt').write_text(graph, encoding='utf8')
    vid, mus, vo = work / 'video.mp4', work / 'musica.wav', work / 'voz.wav'
    run([FFMPEG, '-v', 'error', '-y', '-i', mp4, '-i', work / 'voz_completa.wav', '-/filter_complex', work / 'grafo.txt',
         '-map', '[V]', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-r', f'{fps:g}', vid,
         '-map', '[M]', '-ar', '48000', '-ac', '2', mus, '-map', '[S]', '-ar', '48000', '-ac', '1', vo])
    # 7 · música bajo la voz (y comprobar que la voz quede 18 dB por encima)
    extra = 0.0
    for _ in range(4):
        fx = (f'[0:a]acompressor=threshold=-24dB:ratio=3:attack=3:release=120:makeup=1,volume={-9 - extra:.1f}dB[m];'
              '[1:a]aformat=channel_layouts=stereo[v1];'
              '[m][v1]sidechaincompress=threshold=0.03:ratio=3:attack=80:release=900[md]')
        run([FFMPEG, '-v', 'error', '-y', '-i', mus, '-i', vo, '-filter_complex', fx, '-map', '[md]', work / 'musica_baja.wav'])
        mb, _ = sf.read(work / 'musica_baja.wav', dtype='float32'); vv, _ = sf.read(vo, dtype='float32')
        mb = mb.mean(1) if mb.ndim > 1 else mb; n = min(len(mb), len(vv)); hop = 4800
        k = n // hop; ve = np.sqrt((vv[:k * hop].reshape(k, hop) ** 2).mean(1)); me = np.sqrt((mb[:k * hop].reshape(k, hop) ** 2).mean(1))
        talk = ve > 10 ** (-35 / 20)
        snr = 20 * np.log10(np.median(ve[talk]) / (np.median(me[talk]) + 1e-9)) if talk.any() else 99
        if snr >= 18: break
        extra += 18 - snr + 1; log(f'  la voz queda {snr:.1f} dB sobre la música: bajo la música {extra:.1f} dB más')
    fx = ('[1:a]aformat=channel_layouts=stereo[v];[v][2:a]amix=inputs=2:normalize=0:duration=first,alimiter=limit=0.95[a]')
    run([FFMPEG, '-v', 'error', '-y', '-i', vid, '-i', vo, '-i', work / 'musica_baja.wav', '-filter_complex', fx,
         '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', out])
    final = [(m(s), m(s + d), c['text']) for s, d, c in zip(st, durs, cues)]
    out.with_suffix('.srt').write_text('\n'.join(f'{k + 1}\n{fmt(a)} --> {fmt(b)}\n{t}\n' for k, (a, b, t) in enumerate(final)), encoding='utf8')
    # 8 · verificar con la voz final
    vfin, r = sf.read(vo, dtype='float32'); vfin = resample(vfin, r)
    heard = transcribe(vfin)
    bad = []
    for k, (a, b, t) in enumerate(final):
        want = set(w for w in norm_words(t) if len(w) > 3)
        got = set(w for ww, s, e in heard if a - 0.4 <= s <= b + 0.4 for w in norm_words(ww))
        cov = len(want & got) / max(1, len(want))
        if cov < 0.6: bad.append((k + 1, cov, t))
    rep = [f'{mp4.parent.name}/{name}: {total:.1f} s → {m(total):.1f} s; {len(rem)} tramos quietos quitados; '
           f'{nfast} frases aceleradas{", toda la voz ×1.1" if gf > 1 else ""}; atraso máx. {lag:.1f} s; voz {snr:.0f} dB sobre la música']
    rep += [f'  revisar línea {k} (se oyó {c:.0%} de sus palabras): {t[:80]}' for k, c, t in bad]
    (work / 'informe.txt').write_text('\n'.join(rep), encoding='utf8')
    for l in rep: log(l if l.startswith('  ') else '  ' + l)
    for f in (vid, mus, vo, work / 'musica_baja.wav'): f.unlink(missing_ok=True)
    return 'hecho'

def main():
    names = [a for a in sys.argv[1:] if not a.startswith('--')]
    mp4s = sorted(p for d in sorted(SRC.iterdir()) if d.is_dir() and d.name[:2].isdigit() and int(d.name[:2]) >= 2
                  for p in d.glob('*.mp4') if not p.stem.endswith('_con_audio'))
    if names: mp4s = [p for p in mp4s if p.stem in names]
    hechos = 0
    try:
        for p in mp4s:
            if not p.with_suffix('.srt').exists(): log(f'{p.name}: falta el .srt'); continue
            try:
                if film(p) == 'hecho': hechos += 1
            except (Agotada, LlaveMala): raise
            except Exception as e:                      # servidor caído u otro fallo de una película: se salta y se sigue
                log(f'  SALTADA {p.parent.name}/{p.name}: {str(e)[:300]}')
    except Agotada as e:
        log(f'LLAVE AGOTADA después de {hechos} películas en esta tanda. {e}'); sys.exit(3)
    except LlaveMala as e:
        log(f'LLAVE INVÁLIDA o ausente: {e}'); sys.exit(4)
    falta = [p for p in mp4s if not p.with_name(f'{p.stem}_con_audio.mp4').exists()]
    log(f'TERMINÓ: {hechos} películas nuevas; faltan {len(falta)}.')

if __name__ == '__main__':
    main()
