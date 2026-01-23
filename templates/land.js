// SLIDER
const slides = document.querySelectorAll(".slide");
let index = 0;

setInterval(()=>{
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
},5000);

// ADVANCED FILTER SYSTEM
const checkboxes = document.querySelectorAll(".sidebar input");
const cards = document.querySelectorAll(".card");

checkboxes.forEach(box=>{
  box.addEventListener("change", applyFilters);
});

function applyFilters(){
  const activeFilters = {
    device: [],
    service: [],
    model: []
  };

  checkboxes.forEach(box=>{
    if(box.checked){
      const group = box.closest(".filter-group").querySelector("h4").innerText;

      if(group.includes("Dispositivo")) activeFilters.device.push(box.value);
      if(group.includes("Serviço")) activeFilters.service.push(box.value);
      if(group.includes("Modelo")) activeFilters.model.push(box.value);
    }
  });

  cards.forEach(card=>{
    const device = card.dataset.device;
    const service = card.dataset.service;
    const model = card.dataset.model;

    const matchDevice = activeFilters.device.length === 0 || activeFilters.device.includes(device);
    const matchService = activeFilters.service.length === 0 || activeFilters.service.includes(service);
    const matchModel = activeFilters.model.length === 0 || activeFilters.model.includes(model);

    if(matchDevice && matchService && matchModel){
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}


// PARTICLES BACKGROUND
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i=0;i<80;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*2 + 1,
    dx: (Math.random()-0.5)*0.7,
    dy: (Math.random()-0.5)*0.7
  });
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  
  particles.forEach(p=>{
    p.x += p.dx;
    p.y += p.dy;

    if(p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if(p.y < 0 || p.y > canvas.height) p.dy *= -1;

    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle="rgba(255,255,255,0.6)";
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();

window.onresize = ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
