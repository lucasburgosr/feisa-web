document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const proyectoId = urlParams.get("id");

  console.log(typeof proyectoId);

  cargarProyecto(proyectoId);
});

function cargarProyecto(proyectoId) {
  fetch("/data/proyectos.json")
    .then((response) => response.json())
    .then((data) => {
      const proyectos = data.proyectos;
      const proyecto = proyectos.find((p) => p.id === proyectoId);
      if (proyecto) {
        mostrarDetallesProyecto(proyecto);
      } else {
        console.error("Proyecto no encontrado");
      }
    });
}

function mostrarDetallesProyecto(proyecto) {
  const containerProyecto = document.getElementById("dataProyecto");
  containerProyecto.innerHTML = "";

  if (proyecto != null) {
    const articulo = document.createElement("article");
    articulo.className = "container mt-4";

    const contenido = `
      <h1 class="titulo mb-4">${proyecto.titulo}</h1>
      <p class="subtitulo mb-4 fw-bold">${proyecto.subtitulo}</p>
      <p class="descripcion mb-4">${proyecto.descripcion}</p>
      <div class="container">
        <div class="row">
            ${insertarImagenes(proyecto.imagenes)}
        </div>
      </div>
    `;

    articulo.innerHTML = contenido;
    containerProyecto.appendChild(articulo);
  }
}

function insertarImagenes(imagenes) {
  let contenido = "";

  for (let i = 0; i < imagenes.length; i++) {
    contenido += `<div class="col-md-6">
        <figure>
            <img class="img-fluid" src="${imagenes[i]}">
            <figcaption>
                <p class="caption"><i>${obtenerCaption(imagenes[i])}</i></p>
            </figcaption>
        </figure>
    </div>`;
  }

  return contenido;
}


function obtenerCaption(ruta) {
    const partesRuta = ruta.split('/');
    const nombreArchivoConExtension = partesRuta[partesRuta.length - 1];
  
    // Remover la extensión para obtener solo el nombre del archivo
    const nombreArchivo = nombreArchivoConExtension.split('.')[0];
  
    // Reemplazar guiones bajos con espacios en blanco
    const nombreFormateado = nombreArchivo.replace(/_/g, ' ');
  
    return nombreFormateado;
}
