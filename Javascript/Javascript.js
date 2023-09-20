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

async function appendText(target, content, delay = 5) {
  return new Promise(async (resolve) => {
    const contentArray = content.split('');
    let current = 0;

    function appendNextCharacter() {
      if (current < contentArray.length) {
        target.innerHTML += contentArray[current];

        // Desplazarse hacia abajo después de agregar contenido
        window.scrollTo(0, document.body.scrollHeight);

        if (current === contentArray.length - 1) {
          // Una vez que se ha agregado todo el contenido, aplica la animación
          const newElement = target.lastChild;
          newElement.classList.add('animate-lines');
          resolve();
        } else {
          current++;
          setTimeout(appendNextCharacter, delay);
        }
      }
    }

    appendNextCharacter();
  });
}

function writeText(target, content) {
  return new Promise((resolve) => {
    const contentArray = content.split('');
    let current = 0;

    const writeInterval = setInterval(() => {
      if (current < contentArray.length) {
        target.innerHTML += contentArray[current];
        current++;

        // Desplazarse hacia abajo después de agregar cada carácter
        window.scrollTo(0, document.body.scrollHeight);
      } else {
        clearInterval(writeInterval);
        resolve();
      }
    }, 1.66666); // Tiempo de espera para cada carácter (ajusta según tus necesidades)
  });
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
        output.innerHTML += '<br><br><strong>' + command + '</strong>\n<br>'
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
  
  async function execute(command) {
    switch (command.toLowerCase()) {
      case '':
        return '\n';
  
      case 'clear':
        output.innerHTML = '';
        return '';
    
      // Caso 1: Información de contacto
      case 'contacto':
        const contactoInfo = `
  Mi e-mail esta en: contacto-mail
  Mi teléfono esta en: contacto-telefono
        `;

        // Agregar el contenido HTML al elemento de salida (output) con la clase "ejecucion"
        await writeText(output, contactoInfo, 'ejecucion');
        window.scrollTo(0, document.body.scrollHeight);
        return '';

        // Caso 2: Copiar el correo electrónico al portapapeles
        case 'contacto-mail':
          copyToClipboard('coty.carracedo@gmail.com');
          const mailCopiado = 'E-mail copiado al portapapeles\n';
          await writeText(output, mailCopiado, 'ejecucion')
          window.scrollTo(0, document.body.scrollHeight);
          return '';
    
        // Caso 3: Copiar el teléfono al portapapeles
        case 'contacto-telefono':
          copyToClipboard('11-2472-7016');
          const telCopiado = '<br>Teléfono copiado al portapapeles';
          await writeText(output, telCopiado, 'ejecucion')
          window.scrollTo(0, document.body.scrollHeight);
          return '';

        case 'portafolio':
          const portafolioText = `Mis trabajos se pueden ver en:
    Portafolio-ig (@coty_photographies)
    Portafolio-yt (@c07y52)
    Portafolio-git (@Coty_20)`;
          await writeText(output, portafolioText, 'ejecucion');
          window.scrollTo(0, document.body.scrollHeight);
          return '';
    
        case 'portafolio-ig':
          const igText = 'Este es mi cuenta de ig: @coty_photographies';
          await writeText(output, igText, 'ejecucion');
          // Abre automáticamente el enlace de Instagram
          window.open('https://instagram.com/coty_photographies?igshid=YmMyMTA2M2Y=', '_blank');
          window.scrollTo(0, document.body.scrollHeight);
          return '';
    
        case 'portafolio-yt':
          const ytText = 'Este es mi canal de YouTube: c07y52';
          await writeText(output, ytText, 'ejecucion');
          // Abre automáticamente el enlace de YouTube
          window.open('https://www.youtube.com/@c07y52', '_blank');
          window.scrollTo(0, document.body.scrollHeight);
          return '';
    
        case 'portafolio-git':
          const gitText = 'Este es mi perfil de GitHub: Coty_20';
          await writeText(output, gitText, 'ejecucion');
          // Abre automáticamente el enlace de GitHub
          window.open('https://github.com/Coty1904', '_blank');
          window.scrollTo(0, document.body.scrollHeight);
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
           `;
        await writeText(output, ayudaInfo, 'ejecucion');
        window.scrollTo(0, document.body.scrollHeight);
        return '';
  
      case 'sobre mi':
        const sobreMiInfo = `Hola, soy Coty de Buenos Aires, Argentina. 
          Hablo fluidamente inglés y español y me apasiona la programación. 
          Actualmente estoy aprendiendo Python y Javascript, 
          y estoy emocionado de seguir mejorando mis habilidades 
          en estos lenguajes.`;
        await writeText(output, sobreMiInfo, 'ejecucion')
        window.scrollTo(0, document.body.scrollHeight);
        return '';
  
        case 'playlist':
          window.open('https://www.youtube.com/playlist?list=PLKmELJc28sPSwrO_3yBk6YZYWQ7-WiS29', '_blank');
          const playlistText = `
  MDR: Music, Dance and Run, the one week duration playlist
  En YouTube
          `;
          await writeText(output, playlistText, 'ejecucion');
          window.scrollTo(0, document.body.scrollHeight);
          return '';
  
      default:
        output.innerHTML += '<br>' + 'Unknown command';
        window.scrollTo(0, document.body.scrollHeight);
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