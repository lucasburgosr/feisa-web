document.addEventListener("DOMContentLoaded", function () {
  cargarProyectos();
});


//Se encarga de recuperar los proyectos del JSON para ser listados en quehacemos.html
function cargarProyectos() {
  fetch("../data/proyectos.json")
    .then((response) => response.json())
    .then((data) => {
      listarProyectos(data.proyectos);
      agregarPaginacion(data.proyectos);
    })
    .catch((error) => console.error("Error al cargar proyectos:", error));
}

function listarProyectos(proyectos) {
  const proyectosContainers = document.querySelectorAll(
    ".card.mb-2.fade-right"
  );
  proyectosContainers.forEach((proyectosContainer, index) => {
    const proyecto = proyectos[index];

    if (proyecto) {
      const card = document.createElement("div");
      card.className = "row g-0 px-0";

      const contenido = `
        <div class="col-md-4">
          <img src="${proyecto.imagenes[0]}" class="img-thumbnail" alt="" />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">
              <a class="text-decoration-none" href="proyectos.html?id=${proyecto.id}">${proyecto.titulo}</a>
            </h5>
          </div>
        </div>
      `;

      card.innerHTML = contenido;
      proyectosContainer.innerHTML = "";
      proyectosContainer.appendChild(card);
    }
  });
}

function agregarPaginacion(proyectos) {
  const paginacionContainer = document.getElementById("paginacion");
  paginacionContainer.innerHTML = "";

  const proyectosPorPagina = 5;
  const numPaginas = Math.ceil(proyectos.length / proyectosPorPagina);

  for (let i = 1; i <= numPaginas; i++) {
    const li = document.createElement("li");
    li.className = "page-item";
    const a = document.createElement("a");
    a.className = "page-link";
    a.href = `#page=${i}`; // Agrega el parámetro en el href
    a.innerText = i;
    li.appendChild(a);
    paginacionContainer.appendChild(li);

    a.addEventListener("click", function (event) {
      event.preventDefault();
      mostrarListaProyectos(proyectos, i, proyectosPorPagina);
    });
  }
}

function mostrarListaProyectos(proyectos, paginaActual, proyectosPorPagina) {
  const proyectosContainers = document.querySelectorAll(
    ".card.mb-2.fade-right"
  );
  proyectosContainers.forEach((proyectosContainer) => {
    proyectosContainer.textContent = ""; // Limpiar contenido
  });

  const inicio = (paginaActual - 1) * proyectosPorPagina;
  const fin = inicio + proyectosPorPagina;
  const proyectosMostrados = proyectos.slice(inicio, fin);

  listarProyectos(proyectosMostrados);

  window.scrollTo({
    top: 0,
    behavior: "instant",
  });
}

// Inicializar la página con los primeros proyectos
mostrarListaProyectos([], 1, 5);
