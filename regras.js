document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("regras-container");

  fetch("regras.json")
    .then((res) => res.json())
    .then((regras) => {
      regras.forEach((regra, index) => {
        const box = document.createElement("div");
        box.className = "testimonial";

        const titulo = document.createElement("div");
        titulo.className = "titulo-regra";

        const texto = document.createElement("span");
        texto.textContent = regra.titulo;

        const seta = document.createElement("span");
        seta.className = "seta";
        seta.textContent = "▼";

        titulo.appendChild(texto);
        titulo.appendChild(seta);

        const descricao = document.createElement("div");
        descricao.className = "descricao-regra";
        descricao.textContent = regra.descricao;
        descricao.style.display = "none";

        box.appendChild(titulo);
        box.appendChild(descricao);
        container.appendChild(box);

        // Evento de clique para abrir/fechar regra
        box.addEventListener("click", () => {
          const isAlreadyOpen = descricao.style.display === "block";

          // Fecha todos
          document.querySelectorAll(".testimonial").forEach((outroBox) => {
            outroBox.classList.remove("expanded");
            outroBox.querySelector(".descricao-regra").style.display = "none";
            outroBox.querySelector(".seta").textContent = "▼";
          });

          // Se não estava aberta antes, abre agora
          if (!isAlreadyOpen) {
            descricao.style.display = "block";
            box.classList.add("expanded");
            seta.textContent = "▲";

            // Scroll suave e centralizado
            setTimeout(() => {
              box.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 100); // Pequeno delay para o scroll funcionar após abrir
          }
        });
      });
    })
    .catch((err) => {
      container.innerHTML = "<p>Erro ao carregar as regras.</p>";
      console.error("Erro ao carregar regras.json:", err);
    });
});
