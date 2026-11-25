// Revisa de una vez todo el Preicfes y lista lo que falta (pistas cortas, citas que no están, claves, momentos): node tools/revisa-preicfes.js [mundo]
const {loadScripts,get}=require('../tests/load');const fs=require('fs');const html=fs.readFileSync('index.html','utf8');
const all=[...html.matchAll(/src="(js\/[^"]+)"/g)].map(m=>m[1]).filter(f=>/content|games\/|courses\/|data\.js|worlds|guia|acceso|conceptos|gimnasio|explora(?!-voces)/.test(f)&&fs.existsSync(f));
const ctx=loadScripts(['js/art.js',...new Set(all)]);const C=get(ctx,'COURSES').find(c=>c.id==='preicfes'),G=get(ctx,'GAMES'),XP=get(ctx,'XP'),EX=get(ctx,'EXPLORA'),HOJA=get(ctx,'HOJA'),LEC=get(ctx,'LEC');
const W=d=>d.paras.join(' ').split(/\s+/).filter(Boolean).length;
const rev=(id,e,gym)=>{const g=G[e.game],p=e.params;const say=m=>console.log(id,e.game,m);try{
if(!gym&&g.xp){if(e.hint.length<=40)say('HINT '+e.hint);if(e.explain.length<=40)say('EXPL '+e.explain)}
if(e.hint.length<=20)say('HINT20');
if(g.xp)for(const m of [].concat(p.mira&&!Array.isArray(p.mira)?Object.values(p.mira):p.mira||[]))if(m.length<=12&&!(g.tipo==='ordena'&&m==='')&&!p.metas)say('MIRA '+m);
for(const[n,t]of p.luz||[])if(!(p.doc.paras[n-1]||'').includes(t))say('LUZ '+t);
for(const[n,a,w,b]of p.frases||[])if(!(p.doc.paras[n-1]||'').includes(a+w+b))say('FRASE '+a+w+b);
const k=p.fichas||p.tarjetas||p.lineas;if(['zonas','hilos','pinta'].includes(g.tipo)){if(p.va.length!==k.length)say('VA');if(new Set(k).size!==k.length)say('DUP')}
if(g.tipo==='zonas'){const en=p.va.filter(v=>v!=null).map(HOJA.base);if(!g.varias&&new Set(en).size!==en.length)say('HUECO');for(const z of en)if(!g.rot(p,z))say('ROT'+z)}
if(g.tipo==='hilos')for(const d of p.va.flat())if(!(d<g.destinos(p)))say('DEST'+d);
if(g.tipo==='pinta'&&new Set(p.va).size!==p.plumas.length)say('PLUMA');
if(g.tipo==='toca'){const c=[...g.claves(p)],va=p.va.map(String);for(const x of va)if(!c.includes(x))say('CLAVE'+x);for(const x of c)if(!va.includes(x)&&!(p.mira[x]?.length>12))say('SINAVISO'+x)}
if(g.tipo==='regla')p.filas.forEach((r,i)=>{if(g.inicio(r)===r.va)say('NACE fila '+i+' '+r.topes)});
if(p.metas&&p.fichas)for(const m of p.metas)if(p.fichas.filter(f=>f===m).length<p.metas.filter(x=>x===m).length)say('FALTA '+m);
if(p.tiros&&g.perilla)for(const t of p.tiros){const o=g.perilla(t,p),m=g.meta(t,p),K=o.k||1;if(!Number.isInteger(m)||m>o.max||m<=o.min)say('TIRO '+t.q+' '+m+' '+JSON.stringify(o));for(const x of Object.keys(t.e||{}))if(+x===t.r||+x>o.max*t.r/m||!Number.isInteger(+x*m/t.r))say('TIROe '+x+' '+t.q)}
if(g.xp){if(!g.grade(g.solve(p),p).ok)say('NOSOL');if(g.grade(g.ini(p),p).ok)say('NACE');if(!g.listo(g.solve(p),p))say('NOLISTO');if(g.listo(g.ini(p),p))say('LISTO');}
}catch(x){say('ERR '+x.message)}};
const re=new RegExp(process.argv[2]||'.');
for(const u of C.units.filter(u=>re.test(u.world))){for(const l of u.lessons){if(new Set(l.ex.map(e=>e.game)).size!==l.ex.length)console.log(l.id,'REP');l.ex.forEach(e=>{rev(l.id,e);const p=e.params;if(e.game==='descarta-prueba'){const o=p.nums.flatMap(n=>LEC.sentences(p.doc.paras[n-1]));p.tarjetas.forEach((t,i)=>console.log('   ',t,'=>',[].concat(p.va[i]).map(k=>o[k]).join(' // ').slice(0,110)))}
if(/comprueba|subraya-tesis/.test(e.game)){const [n,i]=p.va[0].split('.');console.log('    >>',LEC.sentences(p.doc.paras[n-1])[i].slice(0,90))}});const d=l.ex.find(e=>e.params.doc)?.params.doc;if(d)console.log(l.id,W(d));
if(EX[l.id])for(const p of EX[l.id].pasos){if(p.texto.replace(/[$*]/g,'').length>170)console.log(l.id,'TEXTO',p.texto);if(p.idea.length>135)console.log(l.id,'IDEA',p.idea);for(const m of p.momentos||[]){const ms=XP.muestra.pausa(m);if(ms<1500||ms>5600||m.dice.length>115)console.log(l.id,'MOM',m.dice,ms)}}else console.log(l.id,'SIN EXPLORA')}
for(const it of u.exam.items){const g=G[it.ex.game];try{g.grade({},it.ex.params)}catch(x){console.log(u.world,it.ex.game,'grade({})',x.message)}}
const d=u.exam.items[0].ex.params.doc;if(d)console.log(u.world,'examen',W(d));}
for(const r of get(ctx,'gymRetos')(C).flatMap(g=>g.retos))r.steps.forEach((s,i)=>rev(r.id+' '+i,s.ex,1));
