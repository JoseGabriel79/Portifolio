// LOADING (igual ao original)
window.onload = () => {
  setTimeout(() => {
    document.getElementById("loading").style.opacity = "0";
    setTimeout(()=> document.getElementById("loading").style.display = "none", 500);
  }, 800);
};

// FADE ON SCROLL
const elements = document.querySelectorAll('.fade');
function checkScroll(){
  const trigger = window.innerHeight*0.80;
  elements.forEach(el=>{
    if(el.getBoundingClientRect().top < trigger) el.classList.add('show');
  });
}
window.addEventListener('scroll', checkScroll);
checkScroll();

// MENU MOBILE
const menuBtn = document.getElementById("menuBtn");
const menuMobile = document.getElementById("menuMobile");
if(menuBtn && menuMobile){
  menuBtn.addEventListener("click", ()=> menuMobile.classList.toggle("active"));
  // close when click link
  menuMobile.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> menuMobile.classList.remove('active')));
}

// THEME TOGGLE
const themeBtn = document.getElementById("themeToggle");
if(themeBtn){
  themeBtn.addEventListener("click", ()=>{
    document.documentElement.classList.toggle("light-mode");
    themeBtn.innerHTML = document.documentElement.classList.contains("light-mode") ? "🌞" : "🌙";
  });
}

// PARTICLES CANVAS
const canvas = document.getElementById("particles");
const ctx = canvas.getContext('2d');
function resizeCanvas(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let particles = [];
class Particle {
  constructor(){
    this.reset();
  }
  reset(){
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.vx = (Math.random()-0.5)*0.4;
    this.vy = (Math.random()-0.5)*0.4;
    this.r = Math.random()*2 + 0.6;
    this.life = Math.random()*200 + 200;
  }
  update(){
    this.x += this.vx; this.y += this.vy; this.life--;
    if(this.x<0||this.x>canvas.width) this.vx *= -1;
    if(this.y<0||this.y>canvas.height) this.vy *= -1;
    if(this.life<=0) this.reset();
  }
  draw(){
    ctx.beginPath();
    ctx.fillStyle = 'rgba(78,255,255,0.9)';
    ctx.shadowBlur = 12; ctx.shadowColor = '#4effff';
    ctx.arc(this.x,this.y,this.r,0,Math.PI*2); ctx.fill();
  }
}
function initParticles(){ particles = []; for(let i=0;i<90;i++) particles.push(new Particle()); }
function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{ p.update(); p.draw(); });
  // connect close particles
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const a = particles[i], b = particles[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < 120){
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(78,255,255,'+(0.15 - dist/900)+')';
        ctx.lineWidth = 0.7;
        ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateParticles);
}
initParticles(); animateParticles();

// FLOW LINES (SVG) - decorative animated curves
(function drawFlowLines(){
  const svg = document.getElementById('flowLines');
  if(!svg) return;
  const w = window.innerWidth, h = window.innerHeight;
  svg.setAttribute('width', w); svg.setAttribute('height', h);
  svg.innerHTML = '';
  const pathCount = 4;
  for(let i=0;i<pathCount;i++){
    const path = document.createElementNS('http://www.w3.org/2000/svg','path');
    const offsetY = (i+1)*(h/(pathCount+1));
    const amplitude = 120 + i*40;
    const d = `M -100 ${offsetY} Q ${w/2} ${offsetY+amplitude} ${w+100} ${offsetY}`;
    path.setAttribute('d', d);
    path.setAttribute('fill','none');
    path.setAttribute('stroke','#4effff');
    path.setAttribute('stroke-width','1');
    path.setAttribute('opacity','0.06');
    path.setAttribute('style', `filter: blur(${2+i}px);`);
    svg.appendChild(path);
  }
})();

// small enhancement: animate bar fills on load
window.addEventListener('load', ()=>{
  document.querySelectorAll('.bar-fill').forEach((el,i)=>{
    el.style.width = el.style.width || '0%';
    const w = el.getAttribute('style').match(/width:(\d+)%/);
    const target = w ? w[1]+'%' : '70%';
    el.style.width = '0%';
    setTimeout(()=> el.style.width = target, 600 + i*120);
  });
});


