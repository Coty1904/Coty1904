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
    }, 10); // Tiempo de espera para cada carácter (ajusta según tus necesidades)
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

  function copyToClipboard(text) {
    const textField = document.createElement('textarea');
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  }

  // Evento para copiar texto seleccionado al presionar Ctrl+C
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      const selectedText = window.getSelection().toString();
      if (selectedText) {
        copyToClipboard(selectedText);
      }
    }
  });

  // Evento para pegar texto desde el portapapeles al presionar Ctrl+V
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'v') {
      e.preventDefault();
      navigator.clipboard.readText().then(function(text) {
        if (text) {
          // Verifica si el texto comienza con 'v' y elimina la 'v' si es necesario
          const cleanText = text.startsWith('v') ? text.substring(1) : text;
          // Inserta el texto limpio en el input de comandos
          input.insertAdjacentText('beforeend', cleanText);
        }
      });
    }
  });
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault(); // Evitar que la flecha izquierda mueva el cursor en el navegador
      // Manejar la tecla de flecha izquierda aquí
      // Puedes mover el cursor a la izquierda o realizar otra acción deseada
      // Ejemplo: mueve el cursor un carácter a la izquierda
      const input = document.getElementById('command-input');
      const currentText = input.innerText;
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      
      if (range.startOffset > 0) {
        range.setStart(range.startContainer, range.startOffset - 1);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    } else if (e.key === 'ArrowRight') {
      e.preventDefault(); // Evitar que la flecha derecha mueva el cursor en el navegador
      // Manejar la tecla de flecha derecha aquí
      // Puedes mover el cursor a la derecha o realizar otra acción deseada
      // Ejemplo: mueve el cursor un carácter a la derecha
      const input = document.getElementById('command-input');
      const currentText = input.innerText;
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      
      if (range.endOffset < currentText.length) {
        range.setStart(range.endContainer, range.endOffset + 1);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  });
  

  document.addEventListener('keydown', function(e) {
    if (noInputHasFocus()) {
      e.preventDefault();
  
      if (e.key === 'Enter') {
        const command = input.innerText;
        input.innerHTML = '';
        output.innerHTML += '<br><br><strong>' + command + '</strong>\n<br>';
        writeText(output, execute(command));
      } else if (e.key === 'Backspace') {
        // Elimina el último carácter del input
        input.innerHTML = input.innerHTML.substring(0, input.innerHTML.length - 1);
      } else if (e.key.length === 1) {
        // Inserta solo caracteres alfanuméricos y caracteres individuales
        input.insertAdjacentText('beforeend', e.key);
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
      
      case 'help':
        const ayudaInfo = `
  Ingrese un comando aquí y se generará algo.
    Las opciones válidas son:
    help - muestra los comandos de ayuda
    sobre mi - mostrar información
    hobbies - mostrar mis hobbies
    portafolio - mostrar portafolio
    contacto - mostrar medios de contacto
    playlist - muestra la playlist 'MDR'
    clear - borra todo de la pantalla
           `;
        await writeText(output, ayudaInfo, 'ejecucion');
        window.scrollTo(0, document.body.scrollHeight);
        return '';

      case 'sobre mi':
        const sobreMiInfo = `
    Hola, soy Coty de Buenos Aires, Argentina. 
    Hablo fluidamente inglés y español y me apasiona la programación. 
    Actualmente estoy aprendiendo Python y Javascript, 
    y estoy emocionado de seguir mejorando mis habilidades en estos lenguajes.`;
        await writeText(output, sobreMiInfo, 'ejecucion');
        window.scrollTo(0, document.body.scrollHeight);
        return '';

      case 'hobbies':
        const hobbiesInfo = `
  Mis Hobbies son:
    1. Jugar Videojuegos
    2. Programar
    3. Tocar la guitarra
    4. Tomar fotografías
        `
        await writeText(output, hobbiesInfo);
        window.scrollTo(0, document.body.scrollHeight);
        return '';

      case 'gustos':
        const gustosInfo = `
  Mis gustos son:
    1. gustos-peliculas
    2. gustos-musica
    3. gustos-libros
    4. gustos-videojuegos
        `
        await writeText(output, gustosInfo);
        window.scrollTo(0, document.body.scrollHeight);
        return '';

      case 'gustos-peliculas':
        const peliculaInfo = `
    Algunas de mis peliculas favoritas son:
      • Ford v Ferrari
      • El viaje de Chihiro
      • Los pajaros
      • Spider-man: Into the Spiderverse
      • Oppenheimer
      • El secreto de sus ojos
      • Sherk 2
      • The Batman (2022)
      • The Martian
      • Se levanta el viento
        `
        await writeText(output, peliculaInfo);
        window.scrollTo(0, document.body.scrollHeight);
        return '';

      case 'gustos-musica':
        const musicaInfo =`
    Algunos de mis artistas favoritos son:
      • Soda Stereo
      • Charly García
      • Fito Paez
      • Daft Punk
      • Gorillaz
      • LoveJoy
      • Rare Americans
      • Babasonicos
      • Nirvana

    Algunas de mis canciónes favoritas son:
      • De mi (Charly García)
      • Corazón delator (Soda Stereo)
      • Deja vú (Gustavo Cerati)
      • Infinite repiting (Daft Punk)
      • Perfume (LoveJoy)
      `
      await writeText(output, musicaInfo);
      window.scrollTo(0, document.body.scrollHeight);
      return '';

      case 'gustos-libros':
        const librosInfo= `
    Algunos de mis libros favoritos son:
      • Rebelión en la Granja, George Orwell
      • La guerra de los mundos, H. G. Wells
      • Saga Fundación (3 libros, Fundación, Fundación e Imperio, Segunda Fundación), Isaac Asimov
      • Viaje a la luna, Julio Verne
        `
        await writeText(output, librosInfo);
        window.scrollTo(0, document.body.scrollHeight);
        return '';
      
      case 'gustos-videojuegos':
        const videoJuegosInfo=`
    Algunos de mis videojuegos favoritos son:
      • Undertale
      • Minecraft
      • Portal
      • Valorant
      • Kingdom and Castles
      • Forza Horizon 4
      • Fifa (Cualquiera)
      • Mario Kart
      • Pokémon Rojo Fuego
        `
        await writeText(output, videoJuegosInfo );
        window.scrollTo(0, document.body.scrollHeight);
        return '';

      case 'contacto':
        const contactoInfo = `
  Mi e-mail esta en: contacto-mail
  Mi teléfono esta en: contacto-telefono
        `;

        await writeText(output, contactoInfo, 'ejecucion');
        window.scrollTo(0, document.body.scrollHeight);
        return '';

        case 'contacto-mail':
          copyToClipboard('coty.carracedo@gmail.com');
          const mailCopiado = 'E-mail copiado al portapapeles\n';
          await writeText(output, mailCopiado, 'ejecucion')
          window.scrollTo(0, document.body.scrollHeight);
          return '';
    
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
  
        case 'playlist':
          window.open('https://www.youtube.com/playlist?list=PLKmELJc28sPSwrO_3yBk6YZYWQ7-WiS29', '_blank');
          const playlistText = `
  MDR: Music, Dance and Run, the one week duration playlist
  En YouTube
          `;
          await writeText(output, playlistText, 'ejecucion');
          window.scrollTo(0, document.body.scrollHeight);
          return '';

        case 'muchachos':
          const muchachosText = `
  En Argentina nací
  Tierra del Diego y Lionel
  De los pibes de Malvinas
  Que jamás olvidaré

  No te lo puedo explicar
  Porque no vas a entender
  Las finales que perdimos
  Cuantos años la lloré

  Pero eso se terminó
  Porque en el Maracaná
  La final con los brazucas
  La volvió a ganar papá

  Muchachos
  Ahora nos volvimos a ilusionar
  Quiero ganar la tercera
  Quiero ser campeón mundial

  Y al Diego
  Desde el cielo lo podemos ver
  Con Don Diego y La Tota
  Alentándolo a Lionel

  Muchachos
  Ahora nos volvimos a ilusionar
  Quiero ganar la tercera
  Quiero ser campeón mundial
  
  Y al Diego
  Desde el cielo lo podemos ver
  Con Don Diego y La Tota
  Alentándolo a Lionel, y ser campeones otra vez, y ser campeones otra vez
          `

          await writeText(output, muchachosText);
          window.scrollTo(0, document.body.scrollHeight);
          return '';

        case 'pollo':
          const polloText= `
  Cuack.
          `
          await writeText(output, polloText)
          window.scrollTo(0,document.body.scrollHeight)
          return '';
  
      default:
        output.innerHTML += '<br>' + 'No entiendo';
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