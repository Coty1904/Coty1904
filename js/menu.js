/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    var dropdown = document.getElementById("myDropdown");
    if (dropdown.style.display === "block") {
      dropdown.style.display = "none";
    } else {
      dropdown.style.display = "block";
    }
}
  
  // Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.style.display === 'block') {
          openDropdown.style.display = 'none';
        }
      }
    }
}

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

function toggleContacto(){
    var contactoPopUp = document.getElementById("contacto");
    if (contactoPopUp.style.display === "flex") {
        contactoPopUp.style.display = "none";
    } else {
        contactoPopUp.style.display = "flex";
    }
}

function cerrarContacto() {
    var contactoPopUp = document.getElementById("contacto");
    contactoPopUp.style.display = "none";
}

function toogleCompeticiones(){
  var contactoPopUp = document.getElementById("competiciones");
  if (contactoPopUp.style.display === "flex") {
      contactoPopUp.style.display = "none";
  } else {
      contactoPopUp.style.display = "flex";
  }
}

function cerrarCompeticiones() {
  var contactoPopUp = document.getElementById("competiciones");
  contactoPopUp.style.display = "none";
}