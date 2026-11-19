#!/bin/sh
# Cola de render: toma películas de out/cola.txt (una por renglón, «nombre carpeta-de-entrega») una a una, las construye con
# build.sh (hasta 3 intentos) y copia el mp4 y el .srt a ~/Downloads/Zuka_Preuniversitario/<carpeta>. Si la cola queda
# vacía espera; termina cuando aparece out/cola.fin. Registro en out/cola.log.
#   sh video/preuda-cosmos/cola.sh &      echo "angulos 02_Geometria" >> out/cola.txt
HERE=$(cd "$(dirname "$0")" && pwd); Q="$HERE/out/cola.txt"; LOG="$HERE/out/cola.log"; DL="$HOME/Downloads/Zuka_Preuniversitario"
touch "$Q"
while :; do
  L=$(head -n 1 "$Q")
  if [ -z "$L" ]; then [ -f "$HERE/out/cola.fin" ] && break; sleep 20; continue; fi
  F=${L%% *}; DIR=${L#* }; [ "$DIR" = "$L" ] && DIR=.
  echo "$(date +%H:%M) empieza $F" >> "$LOG"
  ok=0; for i in 1 2 3; do if sh "$HERE/build.sh" "$F" > "$HERE/out/build_$F.log" 2>&1; then ok=1; break; fi; echo "$(date +%H:%M) reintento $F" >> "$LOG"; done
  if [ $ok = 1 ]; then mkdir -p "$DL/$DIR"; cp "$HERE/out/$F/$F.mp4" "$HERE/out/$F/$F.srt" "$DL/$DIR/"; echo "$(date +%H:%M) listo $F" >> "$LOG"; else echo "$(date +%H:%M) FALLÓ $F" >> "$LOG"; fi
  sed -i '1d' "$Q"
done
