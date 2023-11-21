// Función genérica para cambiar la visibilidad de un elemento
function toggleVisibility(elementId) {
  const element = document.getElementById(elementId);
  element.style.display = element.style.display === "block" ? "none" : "block";
}

// Función genérica para cerrar un elemento
function closeElement(elementId) {
  const element = document.getElementById(elementId);
  element.style.display = "none";
}

// Función genérica para abrir un popup de contacto o competiciones
function openPopup(popupId) {
  const popup = document.getElementById(popupId);
  popup.style.display = "block";
}

// Navbar dropdown
function toggleDropdown() {
  toggleVisibility("myDropdown");
}

// Cierra el dropdown si se hace clic fuera de él
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
      const dropdowns = document.getElementsByClassName("dropdown-content");
      Array.from(dropdowns).forEach(function (dropdown) {
          if (dropdown.style.display === 'block') {
              dropdown.style.display = 'none';
          }
      });
  }
};

// Actualiza el reloj
function updateClock() {
  const clockElement = document.getElementById("clock");
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const timeString = `${hours}:${minutes}`;
  clockElement.textContent = timeString;
}

// Llama a la función updateClock cada minuto (60,000 ms)
setInterval(updateClock, 60000);

// Actualiza el reloj una vez al cargar la página
updateClock();

// Contacto
function toggleContacto() {
  toggleVisibility("contacto");
}

function cerrarContacto() {
  closeElement("contacto");
}

// Competiciones
function toggleCompeticiones() {
  toggleVisibility("competiciones");
}

function cerrarCompeticiones() {
  closeElement("competiciones");
}