#!/bin/sh
# Compila los libros impresos de Zuka Preuniversitario UdeA (spec 2026-11-20-libros-preuda).
# Uso: sh docs/libros/build.sh [1 2 3 4]   (sin números: los cuatro)
# Deja docs/libros/pdf/Zuka_Preuniversitario_Libro_N.pdf (los PDF no van al repositorio).
cd "$(dirname "$0")/tex" || exit 1
mkdir -p salida ../pdf
# la marca y las rutas de las lecciones salen de la app
node ../arte/desde_app.js || exit 1
# el arte de las portadas se genera (no va al repositorio)
[ -f arte/portada4.jpg ] || python -X utf8 ../arte/portadas.py
nums="$*"; [ -z "$nums" ] && nums="1 2 3 4"
for n in $nums; do
  [ -f "libro$n.tex" ] || { echo "no existe libro$n.tex"; continue; }
  if pdflatex -interaction=nonstopmode -halt-on-error -output-directory=salida "libro$n.tex" > "salida/c$n.txt" 2>&1 &&
     pdflatex -interaction=nonstopmode -halt-on-error -output-directory=salida "libro$n.tex" > "salida/c$n.txt" 2>&1; then
    cp "salida/libro$n.pdf" "../pdf/Zuka_Preuniversitario_Libro_$n.pdf"
    echo "listo: docs/libros/pdf/Zuka_Preuniversitario_Libro_$n.pdf ($(pdfinfo salida/libro$n.pdf | grep Pages | tr -s ' '))"
  else
    echo "ERROR en libro$n.tex:"; grep -A4 '^!' "salida/libro$n.log" | head -8
  fi
done
