// PARTICLES SIMPLES
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const isMobile = window.innerWidth < 768;
const particleCount = isMobile ? 35 : 80;

const particles = Array.from({length:particleCount},()=>({


function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{
    p.x+=p.vx;
    p.y+=p.vy;

    if(p.x<0||p.x>canvas.width) p.vx*=-1;
    if(p.y<0||p.y>canvas.height) p.vy*=-1;

    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fillStyle="rgba(255,255,255,0.6)";
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();
// FEEDBACK CADASTRO
const forms = document.querySelectorAll("form");

forms.forEach(form=>{
  form.addEventListener("submit", e=>{
    e.preventDefault();

    const button = form.querySelector("button");
    button.innerText = "Processando...";
    button.disabled = true;

    setTimeout(()=>{
      button.innerText = "✔ Conta criada!";
      button.style.background = "#2ecc71";

      setTimeout(()=>{
        window.location.href = "./login.html";
      },1200);
    },1200);
  });
});
