(function(){
var d=document;
// rok
d.querySelectorAll('[data-rok]').forEach(function(e){e.textContent=new Date().getFullYear()});
// menu
var b=d.querySelector('.burger'),pn=d.getElementById('panel');
b.addEventListener('click',function(){var o=pn.classList.toggle('otw');b.setAttribute('aria-expanded',o)});
pn.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){pn.classList.remove('otw');b.setAttribute('aria-expanded',false)})});
// cookies
d.querySelectorAll('[data-c]').forEach(function(x){x.addEventListener('click',function(){try{localStorage.setItem('om-c','1')}catch(e){}d.getElementById('cookies').hidden=true})});
// przeciaganie mysza
var moved=false;
function drag(t){var sx,sl,down=false;
 t.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=false;sx=e.clientX;sl=t.scrollLeft;});
 window.addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>5){moved=true;t.classList.add('ciag')}if(moved){t.scrollLeft=sl-dx;e.preventDefault()}});
 window.addEventListener('pointerup',function(){if(!down)return;down=false;if(moved){t.classList.remove('ciag');var w=t.firstElementChild?t.firstElementChild.getBoundingClientRect().width:t.clientWidth;var gap=parseFloat(getComputedStyle(t).columnGap)||0;var i=Math.round(t.scrollLeft/(w+gap));t.scrollTo({left:i*(w+gap),behavior:'smooth'});setTimeout(function(){moved=false},50)}});
}
// karuzele w kartach
var svgP='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M15 5l-7 7 7 7"/></svg>',svgN='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M9 5l7 7-7 7"/></svg>';
d.querySelectorAll('[data-kar]').forEach(function(k){var t=k.querySelector('.tor'),n=t.children.length;drag(t);if(n<2)return;
 var l=d.createElement('span');l.className='lic';k.appendChild(l);
 var p=d.createElement('button');p.type='button';p.className='st p';p.setAttribute('aria-label','Poprzednie zdjęcie');p.innerHTML=svgP;
 var q=d.createElement('button');q.type='button';q.className='st n';q.setAttribute('aria-label','Następne zdjęcie');q.innerHTML=svgN;k.appendChild(p);k.appendChild(q);
 function i(){return Math.round(t.scrollLeft/t.clientWidth)}
 function up(){var x=i();l.textContent=(x+1)+' / '+n;p.disabled=x<=0;q.disabled=x>=n-1}
 p.onclick=function(){t.scrollTo({left:(i()-1)*t.clientWidth,behavior:'smooth'})};q.onclick=function(){t.scrollTo({left:(i()+1)*t.clientWidth,behavior:'smooth'})};
 t.addEventListener('scroll',function(){requestAnimationFrame(up)},{passive:true});up();});
// pas produktow
d.querySelectorAll('[data-pas]').forEach(function(ps){var t=ps.querySelector('.tor');drag(t);var s=ps.parentNode.querySelector('.strz');if(!s)return;
 var p=s.querySelector('[data-p]'),q=s.querySelector('[data-n]');
 function st(){var c=t.children[0];return c.getBoundingClientRect().width+(parseFloat(getComputedStyle(t).columnGap)||0)}
 function up(){p.disabled=t.scrollLeft<4;q.disabled=t.scrollLeft+t.clientWidth>=t.scrollWidth-4}
 p.onclick=function(){t.scrollBy({left:-st(),behavior:'smooth'})};q.onclick=function(){t.scrollBy({left:st(),behavior:'smooth'})};
 t.addEventListener('scroll',function(){requestAnimationFrame(up)},{passive:true});up();});
// lightbox
var lb=d.getElementById('lb'),li=lb.querySelector('img'),lo=lb.querySelector('.opis'),grupa=[],gi=0;
function pok(){var im=grupa[gi];var src=im.currentSrc||im.src;var big=src.replace(/-(800|1024|640)\.webp$/,function(m){return m.indexOf('800')>0?'-1400.webp':'-2000.webp'});li.src=big;li.alt=im.alt;li.className=im.hasAttribute('data-arch')?'arch':'';lo.textContent=im.alt;lb.querySelector('.p').style.display=lb.querySelector('.n').style.display=grupa.length>1?'':'none'}
d.addEventListener('click',function(e){var im=e.target.closest('main img');if(!im||moved||im.closest('.hero'))return;e.preventDefault();var box=im.closest('.tor,.czesci')||im.parentNode;grupa=[].slice.call(box.querySelectorAll('img'));gi=grupa.indexOf(im);pok();lb.classList.add('otw');lb.querySelector('.x').focus()});
function zam(){lb.classList.remove('otw')}
lb.querySelector('.x').onclick=zam;lb.addEventListener('click',function(e){if(e.target===lb)zam()});
lb.querySelector('.p').onclick=function(){gi=(gi-1+grupa.length)%grupa.length;pok()};lb.querySelector('.n').onclick=function(){gi=(gi+1)%grupa.length;pok()};
d.addEventListener('keydown',function(e){if(!lb.classList.contains('otw'))return;if(e.key==='Escape')zam();if(e.key==='ArrowLeft')lb.querySelector('.p').click();if(e.key==='ArrowRight')lb.querySelector('.n').click()});
var sx2=null;lb.addEventListener('touchstart',function(e){sx2=e.touches[0].clientX},{passive:true});lb.addEventListener('touchend',function(e){if(sx2===null)return;var dx=e.changedTouches[0].clientX-sx2;if(Math.abs(dx)>50)lb.querySelector(dx<0?'.n':'.p').click();sx2=null});
// pasek mobilny po przewinieciu za przycisk hero
var mob=d.getElementById('mob'),cta=d.querySelector('.hero .akcje');
if('IntersectionObserver' in window){new IntersectionObserver(function(en){mob.classList.toggle('widac',!en[0].isIntersecting&&en[0].boundingClientRect.top<0)}).observe(cta);
 var m=d.querySelector('[data-mapa]');new IntersectionObserver(function(en,o){if(en[0].isIntersecting){m.innerHTML='<iframe title="Mapa dojazdu - Oldmilitaria.pl, Szemud" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=ul.+Wejherowska+27,+84-217+Szemud&output=embed"></iframe>';o.disconnect()}},{rootMargin:'300px'}).observe(m);}
})();
