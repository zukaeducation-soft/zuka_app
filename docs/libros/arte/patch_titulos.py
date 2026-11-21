# Parche único (2026-11-20): títulos de mundo y de lección sin palabras partidas y sin «EN LA APP».
import os
T = os.path.join(os.path.dirname(__file__), '..', 'tex')
p = os.path.join(T, 'zuka-libro.sty')
s = open(p, encoding='utf8').read()
a = s.index(r'    \node[anchor=north west,font=\sffamily\firathin\fontsize{64}{64}\selectfont,text=zmoss]')
b = s.index(r'  \end{tikzpicture}%', a)
s = s[:a] + r'''    \node[anchor=north west,font=\sffamily\small\bfseries,text=zolive]
      at ([xshift=19mm,yshift=-17mm]current page.north west) {M\,U\,N\,D\,O};
    \node[anchor=north west,font=\sffamily\firalight\fontsize{58}{58}\selectfont,text=zmoss]
      at ([xshift=17mm,yshift=-23mm]current page.north west) {\themundo};
    \node[anchor=south west,text width=132mm,align=flush left,font=\sffamily\fontsize{27}{31}\selectfont\fontseries{sb}\selectfont,text=zink]
      at ([xshift=18mm,yshift=-87mm]current page.north west) {#1};
    \draw[zlime,line width=2.2pt] ([xshift=19mm,yshift=-91mm]current page.north west) -- ++(22mm,0);
''' + s[b:]
s = s.replace('++(64mm,-68mm)', '++(64mm,-42mm)')
open(p, 'w', encoding='utf8').write(s)

p = os.path.join(T, 'zuka-diseno.tex')
s = open(p, encoding='utf8').read()
a = s.index(r'\newcommand{\zuka@cabezaleccion}[1]{%')
b = s.index(r'\titleformat{\section}[block]', a)
s = s[:a] + r'''\newcommand{\zuka@cabezaleccion}[1]{%
  {\sffamily\scriptsize\bfseries\color{zolive}L\,E\,C\,C\,I\,Ó\,N\quad{\color{zmoss}\thesection}}\par\vspace{3pt}
  {\raggedright\hyphenpenalty=10000\exhyphenpenalty=10000\sffamily\fontsize{21}{25}\selectfont\fontseries{sb}\selectfont\color{zink}#1\par}\vspace{3pt}%
  \noindent\tikz{\draw[zline,line width=.5pt,line cap=butt] (0,0) -- (\dimexpr\linewidth-2pt\relax,0);
    \draw[zlime,line width=2.2pt,line cap=butt] (0,0) -- (22mm,0);}}
''' + s[b:]
open(p, 'w', encoding='utf8').write(s)
print('ok')
