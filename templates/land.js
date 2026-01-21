// ===============================
// SCROLL SUAVE ENTRE ÂNCORAS
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});


// ===============================
// ANIMAÇÃO SUAVE AO APARECER NA TELA
// ===============================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.15
});

document.querySelectorAll(".block, .process, .contact").forEach(section => {
  observer.observe(section);
});


// ===============================
// TRANSIÇÃO SUAVE AO TROCAR DE PÁGINA
// ===============================
const pageLinks = document.querySelectorAll('a:not([href^="#"])');

pageLinks.forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");
    if (!href) return;

    e.preventDefault();

    document.body.classList.add("fade-out");

    setTimeout(() => {
      window.location.href = href;
    }, 400);
  });
});
document.addEventListener("DOMContentLoaded", () => {

  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const progressCircle = document.querySelector(".progress-ring circle");

  if (!slides.length) {
    console.error("Slides não encontrados!");
    return;
  }

  let current = 0;
  const duration = 4000;
  const circumference = 126;

  let startTime = null;
  let animationFrame;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    current = index;
    resetProgress();
  }

  function nextSlide() {
    const next = (current + 1) % slides.length;
    showSlide(next);
  }

  function resetProgress() {
    cancelAnimationFrame(animationFrame);
    startTime = null;
    progressCircle.style.strokeDashoffset = circumference;
    animationFrame = requestAnimationFrame(animateProgress);
  }

  function animateProgress(timestamp) {
    if (!startTime) startTime = timestamp;

    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const offset = circumference - (progress * circumference);
    progressCircle.style.strokeDashoffset = offset;

    if (progress < 1) {
      animationFrame = requestAnimationFrame(animateProgress);
    } else {
      nextSlide();
    }
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
    });
  });

  // Inicializa
  showSlide(0);

});


