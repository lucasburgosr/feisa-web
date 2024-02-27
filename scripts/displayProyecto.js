document.addEventListener("DOMContentLoaded", function () {
  let urlParams = new URLSearchParams(window.location.search);
  let proyectoId = urlParams.get("id");

  console.log(typeof proyectoId);

  cargarProyecto(proyectoId);
});

function cargarProyecto(proyectoId) {
  fetch("/data/proyectos.json")
    .then((response) => response.json())
    .then((data) => {
      let proyectos = data.proyectos;
      let proyecto = proyectos.find((p) => p.id === proyectoId);
      if (proyecto) {
        mostrarDetallesProyecto(proyecto);
      } else {
        console.error("Proyecto no encontrado");
      }
    });
}

function mostrarDetallesProyecto(proyecto) {
  let containerProyecto = document.getElementById("dataProyecto");
  containerProyecto.innerHTML = "";

  if (proyecto != null) {
    let articulo = document.createElement("article");
    articulo.className = "container mt-4";

    let contenido = `
      <h1 class="titulo mb-4">${proyecto.titulo}</h1>
      <p class="subtitulo mb-4 fw-bold">${proyecto.subtitulo}</p>
      <p class="descripcion mb-4">${proyecto.descripcion}</p>
      <div class="container">
        <div class="row">
            ${insertarImagenes(proyecto.imagenes)}
        </div>
      </div>
    `;

    if (proyecto.hasOwnProperty("documentos")) {
      contenido += insertarDocumentos(proyecto.documentos);
    }

    articulo.innerHTML = contenido;
    containerProyecto.appendChild(articulo);
  }
}

function insertarDocumentos(documentos) {
  let contenido = `
    <div class="col-md-8 mt-4 mb-4 ">
      <h2>Documentos</h2>
      <ul class="list-group">
  `;

  documentos.forEach((documento) => {
    contenido += `
      <li class="list-group-item">
        <a href="${documento}" target="_blank">${obtenerNombreDocumento(
      documento
    )}</a>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-pdf" viewBox="0 0 16 16">
  <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
  <path d="M4.603 14.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.7 11.7 0 0 0-1.997.406 11.3 11.3 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.8.8 0 0 1-.58.029m1.379-1.901q-.25.115-.459.238c-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361q.016.032.026.044l.035-.012c.137-.056.355-.235.635-.572a8 8 0 0 0 .45-.606m1.64-1.33a13 13 0 0 1 1.01-.193 12 12 0 0 1-.51-.858 21 21 0 0 1-.5 1.05zm2.446.45q.226.245.435.41c.24.19.407.253.498.256a.1.1 0 0 0 .07-.015.3.3 0 0 0 .094-.125.44.44 0 0 0 .059-.2.1.1 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a4 4 0 0 0-.612-.053zM8.078 7.8a7 7 0 0 0 .2-.828q.046-.282.038-.465a.6.6 0 0 0-.032-.198.5.5 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822q.036.167.09.346z"/>
</svg>
      </li>
    `;
  });

  contenido += `
      </ul>
    </div>
  `;

  return contenido;
}

function insertarImagenes(imagenes) {
  let contenido = "";

  for (let i = 0; i < imagenes.length; i++) {
    if (i === imagenes.length - 1 && imagenes.length % 2 !== 0) {
      // Último elemento en un div de ancho completo
      contenido += `<div class="col-md-12">
          <figure>
              <img class="img-fluid" src="${imagenes[i]}">
              <figcaption>
                  <p class="caption"><i>${obtenerCaption(imagenes[i])}</i></p>
              </figcaption>
          </figure>
      </div>`;
    } else {
      // Elementos regulares en divs de la mitad del ancho
      contenido += `<div class="col-md-6">
          <figure>
              <img class="img-fluid" src="${imagenes[i]}">
              <figcaption>
                  <p class="caption"><i>${obtenerCaption(imagenes[i])}</i></p>
              </figcaption>
          </figure>
      </div>`;
    }
  }

  return contenido;
}

function obtenerCaption(ruta) {
  let partesRuta = ruta.split("/");
  let nombreArchivoConExtension = partesRuta[partesRuta.length - 1];

  // Remover la extensión para obtener solo el nombre del archivo
  let nombreArchivo = nombreArchivoConExtension.split(".")[0];

  // Reemplazar guiones bajos con espacios en blanco
  let nombreFormateado = nombreArchivo.replace(/_/g, " ");

  return nombreFormateado;
}

function obtenerNombreDocumento(rutaDocumento) {
  // Extraer el nombre del documento de la ruta
  let partesRuta = rutaDocumento.split("/");
  return partesRuta[partesRuta.length - 1];
}
