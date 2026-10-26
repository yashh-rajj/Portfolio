(function(){
  var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
  var root=document.documentElement;
  var calm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* theme */
  var saved=null;try{saved=localStorage.getItem('theme')}catch(e){}
  if(!saved&&window.matchMedia('(prefers-color-scheme: dark)').matches)saved='dark';
  if(saved)root.setAttribute('data-theme',saved);
  $('#theme').onclick=function(){
    var t=root.getAttribute('data-theme')==='dark'?'light':'dark';
    root.setAttribute('data-theme',t);try{localStorage.setItem('theme',t)}catch(e){}
    drawPlot();
  };

  /* mobile menu */
  var menu=$('#menu'),nav=$('#nav');
  function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}
  menu.onclick=function(){var o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',o)};
  $$('#nav a').forEach(function(a){a.addEventListener('click',closeMenu)});
  window.addEventListener('resize',function(){if(innerWidth>820)closeMenu()});

  /* scroll: progress bar, sticky border, active link */
  var bar=$('.bar'),prog=$('#progress');
  function onScroll(){
    var h=root.scrollHeight-innerHeight;
    prog.style.transform='scaleX('+(h>0?scrollY/h:0)+')';
    bar.classList.toggle('stuck',scrollY>10);
  }
  addEventListener('scroll',onScroll,{passive:true});onScroll();

  var links=$$('#nav a');
  var spy=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting)links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})});
  },{rootMargin:'-45% 0px -50% 0px'});
  $$('main section[id]').forEach(function(s){spy.observe(s)});

  /* reveal on scroll */
  var rv=$$('.rv');
  if('IntersectionObserver' in window&&!calm){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}});
    },{threshold:.15});
    rv.forEach(function(el){io.observe(el)});
  }else rv.forEach(function(el){el.classList.add('in')});

  /* typed roles */
  var typed=$('#typed'),roles=['first-year AI & ML student','Python learner','builder of small experiments','future machine learning engineer'];
  if(calm){typed.textContent=roles[0]}
  else{
    var ri=0,ci=0,del=false;
    (function tick(){
      var word=roles[ri];
      typed.textContent=word.slice(0,ci);
      if(!del&&ci===word.length){del=true;return setTimeout(tick,1600)}
      if(del&&ci===0){del=false;ri=(ri+1)%roles.length}
      ci+=del?-1:1;
      setTimeout(tick,del?28:65);
    })();
  }

  /* grid parallax follows pointer */
  if(!calm&&matchMedia('(pointer:fine)').matches){
    addEventListener('pointermove',function(e){
      root.style.setProperty('--px',(e.clientX/innerWidth-.5)*-24+'px');
      root.style.setProperty('--py',(e.clientY/innerHeight-.5)*-24+'px');
    },{passive:true});
  }

  /* skills accordion */
  $$('.skill').forEach(function(b){b.onclick=function(){b.setAttribute('aria-expanded',b.getAttribute('aria-expanded')!=='true')}});

  /* project filter */
  $$('.chip').forEach(function(c){c.onclick=function(){
    $$('.chip').forEach(function(x){x.classList.toggle('on',x===c)});
    $$('.proj').forEach(function(p){p.classList.toggle('hide',c.dataset.f!=='all'&&p.dataset.t!==c.dataset.f)});
  }});

  /* contact form -> mailto (replace the address) */
  var EMAIL='yourname@example.com';
  $('#form').addEventListener('submit',function(e){
    e.preventDefault();
    var n=$('#fn').value.trim(),m=$('#fe').value.trim(),t=$('#fm').value.trim(),err=$('#err');
    if(!n||!t){err.textContent='Please add your name and a message.';return}
    if(!/^\S+@\S+\.\S+$/.test(m)){err.textContent='Please enter a valid email address.';return}
    err.textContent='';
    location.href='mailto:'+EMAIL+'?subject='+encodeURIComponent('Hello from '+n)+'&body='+encodeURIComponent(t+'\n\n'+n+' ('+m+')');
  });

  /* perceptron playground */
  var cv=$('#plot'),ctx=cv.getContext('2d'),stat=$('#stat'),bA=$('#bA'),bB=$('#bB');
  var pts,w,cls=1,W=0,H=0,raf=0;
  function rnd(c,cx,cy){return{x:cx+(Math.random()-.5)*.7,y:cy+(Math.random()-.5)*.7,c:c}}
  function side(p){return w[0]*p.x+w[1]*p.y+w[2]>=0?1:-1}
  function step(){
    var ch=false;
    pts.forEach(function(p){if(side(p)!==p.c){w[0]+=.08*p.c*p.x;w[1]+=.08*p.c*p.y;w[2]+=.08*p.c;ch=true}});
    return ch;
  }
  function settle(){for(var k=0;k<400;k++)step()}
  function reset(){
    pts=[];for(var i=0;i<7;i++){pts.push(rnd(1,-.5,.45));pts.push(rnd(-1,.5,-.45))}
    w=[Math.random()-.5,Math.random()-.5,Math.random()-.5];
    if(calm){settle();drawPlot()}else kick();
  }
  function css(n){return getComputedStyle(root).getPropertyValue(n).trim()}
  function size(){
    var r=cv.getBoundingClientRect(),d=devicePixelRatio||1;
    W=r.width;H=r.height;cv.width=W*d;cv.height=H*d;ctx.setTransform(d,0,0,d,0,0);
  }
  function X(x){return(x+1)/2*W}
  function Y(y){return(1-y)/2*H}
  function drawPlot(){
    if(!pts)return;
    var a=css('--a'),b=css('--b'),ink=css('--ink'),sf=css('--surface');
    ctx.clearRect(0,0,W,H);
    var cw=W/28,chh=H/21;
    ctx.globalAlpha=.13;
    for(var i=0;i<28;i++)for(var j=0;j<21;j++){
      var x=(i+.5)/28*2-1,y=1-(j+.5)/21*2;
      ctx.fillStyle=(w[0]*x+w[1]*y+w[2]>=0)?a:b;
      ctx.fillRect(i*cw,j*chh,cw+1,chh+1);
    }
    ctx.globalAlpha=1;
    var q=[];
    [-1,1].forEach(function(x){if(Math.abs(w[1])>1e-6){var y=-(w[0]*x+w[2])/w[1];if(y>=-1.5&&y<=1.5)q.push([x,y])}});
    [-1,1].forEach(function(y){if(Math.abs(w[0])>1e-6){var x=-(w[1]*y+w[2])/w[0];if(x>=-1.5&&x<=1.5)q.push([x,y])}});
    if(q.length>=2){ctx.strokeStyle=ink;ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(X(q[0][0]),Y(q[0][1]));ctx.lineTo(X(q[1][0]),Y(q[1][1]));ctx.stroke()}
    var ok=0;
    pts.forEach(function(p){
      if(side(p)===p.c)ok++;
      ctx.beginPath();ctx.arc(X(p.x),Y(p.y),7,0,6.2832);
      ctx.fillStyle=p.c===1?a:b;ctx.fill();ctx.lineWidth=2;ctx.strokeStyle=sf;ctx.stroke();
    });
    stat.textContent=ok+' of '+pts.length+' correct';
  }
  function loop(){
    raf=0;var ch=step();drawPlot();
    if(ch)raf=requestAnimationFrame(function(){setTimeout(loop,40)});
  }
  function kick(){if(!raf)raf=requestAnimationFrame(loop)}
  cv.addEventListener('pointerdown',function(e){
    var r=cv.getBoundingClientRect();
    pts.push({x:(e.clientX-r.left)/r.width*2-1,y:1-(e.clientY-r.top)/r.height*2,c:cls});
    if(calm){settle();drawPlot()}else kick();
  });
  function pick(c){cls=c;bA.setAttribute('aria-pressed',c===1);bB.setAttribute('aria-pressed',c===-1)}
  bA.onclick=function(){pick(1)};bB.onclick=function(){pick(-1)};
  $('#bR').onclick=reset;
  addEventListener('resize',function(){size();drawPlot()});
  size();reset();
})();
