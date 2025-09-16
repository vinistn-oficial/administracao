document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("regras-container");

  fetch("regras.json")
    .then((res) => res.json())
    .then((regras) => {
      regras.forEach((regra) => {
        // Cria o item de regra
        const item = document.createElement("div");
        item.className = "card regra-item";

        // Título (clicável)
        const titulo = document.createElement("button");
        titulo.className = "regra-titulo";
        titulo.innerHTML = `
          <span>${regra.titulo}</span>
          <span class="seta">▼</span>
        `;
        titulo.setAttribute("aria-expanded", "false");

        // Conteúdo da descrição
        const descricao = document.createElement("div");
        descricao.className = "regra-descricao";
        descricao.textContent = regra.descricao;
        descricao.style.display = "none";

        item.appendChild(titulo);
        item.appendChild(descricao);
        container.appendChild(item);

        // Evento de clique
        titulo.addEventListener("click", () => {
          const isOpen = titulo.getAttribute("aria-expanded") === "true";

          // Fecha todos
          document.querySelectorAll(".regra-item").forEach((outro) => {
            outro.querySelector(".regra-descricao").style.display = "none";
            outro.querySelector(".seta").textContent = "▼";
            outro.querySelector("button").setAttribute("aria-expanded", "false");
          });

          // Abre o clicado (se não estava aberto)
          if (!isOpen) {
            descricao.style.display = "block";
            titulo.querySelector(".seta").textContent = "▲";
            titulo.setAttribute("aria-expanded", "true");

            setTimeout(() => {
              item.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 100);
          }
        });
      });
    })
    .catch((err) => {
      container.innerHTML = "<p>Erro ao carregar as regras.</p>";
      console.error("Erro ao carregar regras.json:", err);
    });
});
