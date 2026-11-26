#!/bin/sh
# Compila los libros impresos de Zuka Preuniversitario UdeA (spec 2026-11-20-libros-preuda).
# Uso: sh docs/libros/build.sh [1 … 9]   (1–4 Preuniversitario, 5–9 Preicfes; sin números: todos)
# Deja docs/libros/pdf/Zuka_Preuniversitario_Libro_N.pdf (los PDF no van al repositorio).
cd "$(dirname "$0")/tex" || exit 1
mkdir -p salida ../pdf
# la marca y las rutas de las lecciones salen de la app
node ../arte/desde_app.js || exit 1
# el arte de las portadas se genera (no va al repositorio)
[ -f arte/portada9.jpg ] || python -X utf8 ../arte/portadas.py
# el contenido de los libros del Preicfes (5 a 9) sale de los datos del curso en la app
node ../arte/icfes.js > /dev/null || exit 1
nums="$*"; [ -z "$nums" ] && nums="1 2 3 4 5 6 7 8 9"
for n in $nums; do
  [ -f "libro$n.tex" ] || { echo "no existe libro$n.tex"; continue; }
  # dibujos de las explicaciones, los ejemplos y las soluciones (salen de la app); SIN_ESCENAS=1 usa los que ya están
  [ -n "$SIN_ESCENAS" ] || node ../arte/escenas.mjs $n || exit 1
  node ../arte/pasos.js $n > /dev/null || exit 1
  if pdflatex -interaction=nonstopmode -halt-on-error -output-directory=salida "libro$n.tex" > "salida/c$n.txt" 2>&1 &&
     pdflatex -interaction=nonstopmode -halt-on-error -output-directory=salida "libro$n.tex" > "salida/c$n.txt" 2>&1; then
    cp "salida/libro$n.pdf" "../pdf/$( [ $n -gt 4 ] && echo Zuka_Preicfes_Libro_$((n-4)) || echo Zuka_Preuniversitario_Libro_$n).pdf"
    echo "listo: docs/libros/pdf/$( [ $n -gt 4 ] && echo Zuka_Preicfes_Libro_$((n-4)) || echo Zuka_Preuniversitario_Libro_$n).pdf ($(pdfinfo salida/libro$n.pdf | grep Pages | tr -s ' '))"
  else
    echo "ERROR en libro$n.tex:"; grep -A4 '^!' "salida/libro$n.log" | head -8
  fi
done
