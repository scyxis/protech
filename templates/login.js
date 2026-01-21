const form = document.getElementById("loginForm");

form.addEventListener("submit", e => {
  e.preventDefault();

  document.querySelector("button").innerText = "Entrando...";

  setTimeout(() => {
    alert("Login simulado com sucesso 🚀");
    window.location.href = "./dashboard.html";
  }, 1200);
});
