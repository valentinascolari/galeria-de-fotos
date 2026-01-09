const fotos = [
  { title: "Arara Azul", src: "images/arara-azul.jpg" },
  { title: "Aurora Boreal", src: "images/aurora-boreal.jpg" },
  { title: "Boneco de Neve", src: "images/boneco-de-neve.jpg" },
  { title: "Borboleta", src: "images/borboleta.jpg" },
  { title: "Chichén Itzá (México)", src: "images/chichen-itza-mexico.jpg" },
  { title: "Coliseu (Itália)", src: "images/coliseu-italia.jpg" },
  { title: "Cristo Redentor (Corcovado)", src: "images/cristo-redentor-corcovado.jpg" },
  { title: "Grande Muralha da China", src: "images/grande-muralha-china.jpg" },
  { title: "Lago", src: "images/lago.jpg" },
  { title: "Machu Picchu", src: "images/machu-picchu.jpg" },
  { title: "Montanha", src: "images/montanha.jpg" },
  { title: "Neve no Canadá", src: "images/neve-canada.jpg" },
  { title: "Petra (Jordânia)", src: "images/petra-jordania.jpg" },
  { title: "Pirâmide de Gizé", src: "images/piramide-gize.jpg" },
  { title: "Pôr do Sol", src: "images/por-do-sol.jpg" },
  { title: "Praia", src: "images/praia.jpg" },
  { title: "Rio", src: "images/rio.jpg" },
  { title: "Taj Mahal (Índia)", src: "images/taj-mahal-india.jpg" }
];

const gallery = document.querySelector(".gallery");
const emptyMessage = document.querySelector(".empty-message");
const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");

/* -------- FUNÇÕES AUXILIARES -------- */

function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[^\w\s]/g, "");        // remove pontuação
}

function filtrarFotos(termo) {
  const termoNormalizado = normalizarTexto(termo);

  return fotos.filter(foto => {
    const tituloNormalizado = normalizarTexto(foto.title);
    const palavras = tituloNormalizado.split(" ");

    return palavras.some(palavra =>
      palavra.startsWith(termoNormalizado)
    );
  });
}

/* -------- RENDERIZAÇÃO -------- */

function renderFotos(lista) {
  gallery.innerHTML = "";

  if (lista.length === 0) {
    emptyMessage.style.display = "block";
    return;
  }

  emptyMessage.style.display = "none";

  lista.forEach(foto => {
    const card = document.createElement("div");
    card.classList.add("photo");

    card.innerHTML = `
      <img src="${foto.src}" alt="${foto.title}">
      <p>${foto.title}</p>
    `;

    gallery.appendChild(card);
  });
}

// Render inicial
renderFotos(fotos);

/* -------- BUSCA -------- */

searchInput.addEventListener("input", () => {
  const termo = searchInput.value.trim();

  if (termo === "") {
    renderFotos(fotos);
    return;
  }

  renderFotos(filtrarFotos(termo));
});

searchButton.addEventListener("click", () => {
  const termo = searchInput.value.trim();

  if (termo === "") {
    renderFotos(fotos);
    return;
  }

  renderFotos(filtrarFotos(termo));
});
