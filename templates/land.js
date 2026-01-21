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

