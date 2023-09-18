// Mouse

const trailer = document.getElementById("trailer");

const animateTrailer = (e, interacting) => {
  const x = e.clientX - trailer.offsetWidth / 2,
        y = e.clientY - trailer.offsetHeight / 2;
  
  const keyframes = {
    transform: `translate(${x}px, ${y}px) scale(${interacting ? 8 : 1})`
  }
  
  trailer.animate(keyframes, { 
    duration: 800, 
    fill: "forwards" 
  });
}

window.onmousemove = e => {
  const interactable = e.target.closest(".interactable"),
        interacting = interactable !== null;
  
  const icon = document.getElementById("trailer-icon");
  
  animateTrailer(e, interacting);
  
  trailer.dataset.type = interacting ? interactable.dataset.type : "";
  
  if(interacting) {
    icon.className = getTrailerClass(interactable.dataset.type);
  }
}

// ASCII

const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms))


function writeText(target, content, delay = 5)
{
  return new Promise((resolve) => {
    const contentArray = content.split('')

    let current = 0

    while (current < contentArray.length) {
      ;((curr) => {
        setTimeout(() => {
          target.innerHTML += contentArray[curr]
          window.scrollTo(0, document.body.scrollHeight)
          
          if (curr === contentArray.length - 1) resolve()
        }, delay * curr) 
      })(current++)
    }
  })
}

document.addEventListener('DOMContentLoaded', async () => {
  const asciiText = document.getElementById('asciiText')
  const asciiArt = asciiText.innerText
  asciiText.innerHTML = ''

  const instructions = document.getElementById('instructions')
  const prompt = document.getElementById('prompt')
  const cursor = document.getElementById('cursor')

  let isShiftPressed = false; // Variable para rastrear si la tecla Shift está presionada
  let isCtrlPressed = false; // Variable para rastrear si la tecla Control está presionada
  let isAltPressed = false; // Variable para rastrear si la tecla Alt está presionada
  let isAltGrPressed = false; // Variable para rastrear si la tecla AltGr (Right Alt) está presionada

  await wait(1000)
  await writeText(asciiText, asciiArt)
  await wait(500)
  await writeText(instructions, `Introduce un comando. Ingrese 'help' para ver una lista de comandos.`)
  prompt.prepend('>')
  cursor.innerHTML = '_'

  const input = document.getElementById('command-input')
  const output = document.getElementById('output')

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Shift') {
      isShiftPressed = true;
      return; // Salir de la función si se presiona la tecla Shift
    }
    if (e.key === 'Control') {
      isCtrlPressed = true;
      return; // Salir de la función si se presiona la tecla Control
    }
    if (e.key === 'Alt') {
      isAltPressed = true;
      return; // Salir de la función si se presiona la tecla Alt
    }
    if (e.key === 'AltGraph') {
      isAltGrPressed = true;
      return; // Salir de la función si se presiona la tecla AltGr
    }

    if (noInputHasFocus()) {
      e.preventDefault(); // Evita que la tecla se registre en el input

      if (e.key === 'Enter') {
        const command = input.innerText
        input.innerHTML = ''
        output.innerHTML += '<br><strong>' + command + '</strong>\n<br>'
        writeText(output, execute(command))
      }
      else if (e.key === 'Backspace') {
        input.innerHTML = input.innerHTML.substring(0, input.innerHTML.length - 1)
      }
      else {
        let charToInsert = e.key;
        if (isShiftPressed) {
          charToInsert = charToInsert.toUpperCase();
        }
        if (isCtrlPressed) {
          charToInsert = 'Ctrl-' + charToInsert;
        }
        if (isAltPressed) {
          charToInsert = 'Alt-' + charToInsert;
        }
        if (isAltGrPressed) {
          // Detecta AltGr + Q para el carácter "@" y trata específicamente
          if (e.key === 'Q') {
            charToInsert = '@';
          } else {
            charToInsert = 'AltGr-' + charToInsert;
          }
        }
        input.insertAdjacentText('beforeend', charToInsert);
      }
    }
  });

  document.addEventListener('keyup', function(e) {
    if (e.key === 'Shift') {
      isShiftPressed = false;
    }
    if (e.key === 'Control') {
      isCtrlPressed = false;
    }
    if (e.key === 'Alt') {
      isAltPressed = false;
    }
    if (e.key === 'AltGraph') {
      isAltGrPressed = false;
    }
  });

  function noInputHasFocus() {
    const elements = ['INPUT', 'TEXTAREA', 'BUTTON']
    return elements.indexOf(document.activeElement.tagName) === -1
  }
  
  function execute(command) {
    switch (command.toLowerCase()) {
      case '':
        return '\n';
  
      case 'clear':
        output.innerHTML = '';
        return '';
  
        case 'contacto':
          const contactoInfo = `Mis datos de contacto son:
            E-mail: <span id="email" style="cursor: pointer; text-decoration: underline; color: #FF6BFF;">Coty.carracedo@gmail.com</span>
            Teléfono: <span id="telefono" style="cursor: pointer; text-decoration: underline; color: #FF6BFF;">11-2472-7016</span>`;
          output.innerHTML += '<br>' + contactoInfo;
        
          // Agregar un evento de clic al correo electrónico para copiarlo al portapapeles
          const emailElement = document.getElementById('email');
          emailElement.addEventListener('click', () => {
            copyToClipboard('Coty.carracedo@gmail.com');
          });
        
          // Agregar un evento de clic al número de teléfono para copiarlo al portapapeles
          const telefonoElement = document.getElementById('telefono');
          telefonoElement.addEventListener('click', () => {
            copyToClipboard('11-2472-7016');
          });
        
          return '';
        
        
  
      case 'portafolio':
        const portafolioLinks = `Links a mis redes:
          Fotografía: <a class="link" href="https://instagram.com/coty_photographies?igshid=YmMyMTA2M2Y=" target="_blank">Instagram</a>
          Edición de Videos: <a class="link" href="https://www.youtube.com/@c07y52" target="_blank">YouTube</a>
          Programación: <a class="link" href="https://github.com/Coty1904" target="_blank">GitHub</a>`;
        output.innerHTML += '<br>' + portafolioLinks;
        return '';
  
      case 'help':
        const ayudaInfo = `
          Ingrese un comando aquí y se generará algo.
          Las opciones válidas son:
          help - muestra los comandos de ayuda
          sobre mi - mostrar información
          portafolio - mostrar portafolio
          contacto - mostrar medios de contacto
          clear - borra todo de la pantalla
          Hay comandos secretos ¿Podrás encontrarlos? ¿Qué harán?`;
        output.innerHTML += '<br>' + ayudaInfo;
        return '';
  
      case 'sobre mi':
        const sobreMiInfo = `Hola, soy Coty de Buenos Aires, Argentina. 
          Hablo fluidamente inglés y español y me apasiona la programación. 
          Actualmente estoy aprendiendo Python y Javascript, 
          y estoy emocionado de seguir mejorando mis habilidades 
          en estos lenguajes.`;
        output.innerHTML += '<br>' + sobreMiInfo;
        return '';
  
      case 'planes secretos':
        output.innerHTML += '<br>' + '¡Dominar el mundo!';
        return '';
  
      case 'hola':
        output.innerHTML += '<br>' + '¡Hola mundo! Soy Coty2020';
        return '';
  
      case 'playlist':
        const playlistLink = `MDR:
          <a class="link" href="https://www.youtube.com/playlist?list=PLKmELJc28sPSwrO_3yBk6YZYWQ7-WiS29" target="_blank">YouTube Playlist</a>`;
        output.innerHTML += '<br>' + playlistLink;
        return '';
  
      case 'como estas?':
        output.innerHTML += '<br>' + 'Creo que ¿bien? No se realmente';
        return '';
  
      default:
        output.innerHTML += '<br>' + 'Unknown command';
        return '';
    }
  }
    // Agregar un evento de clic al correo electrónico para copiarlo al portapapeles
    const emailElement = document.getElementById('email');
    emailElement.addEventListener('click', () => {
      copyToClipboard('Coty.carracedo@gmail.com');
    });
  
    // Agregar un evento de clic al número de teléfono para copiarlo al portapapeles
    const telefonoElement = document.getElementById('telefono');
    telefonoElement.addEventListener('click', () => {
      copyToClipboard('11-2472-7016');
    });
  
    return '';
  
    function copyToClipboard(text) {
      const textField = document.createElement('textarea');
      textField.innerText = text;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand('copy');
      textField.remove();
    }
  
  
});
