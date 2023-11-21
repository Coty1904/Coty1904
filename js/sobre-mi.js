function toggleSobreMi(displayStyle) {
  const sobreMi = document.querySelector('.sobre-mi');
  sobreMi.style.display = displayStyle;
}

document.addEventListener("DOMContentLoaded", function() {
  const titulos = document.querySelectorAll(".titulos h3");
  const containerAbout = document.querySelectorAll(".container-about");

  titulos.forEach((titulo, index) => {
      titulo.addEventListener("click", function() {
          // Oculta todos los contenedores
          containerAbout.forEach(container => container.style.display = "none");

          // Muestra solo el contenedor correspondiente
          containerAbout[index].style.display = "flex";

          // Quita la clase "Active" de todos los títulos
          titulos.forEach(t => t.classList.remove("Active"));

          // Añade la clase "Active" al título clicado
          titulo.classList.add("Active");
      });
  });
});

// Uso de la función optimizada para abrir y cerrar "Sobre Mí"
function toggleSobreMi(displayStyle) {
  const sobreMi = document.querySelector('.sobre-mi');
  sobreMi.style.display = displayStyle;
}

// Funciones específicas
function abrirSobreMi() {
  toggleSobreMi('flex');
}

function cerrarSobreMi() {
  toggleSobreMi('none');
}