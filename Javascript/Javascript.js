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

function handleKeypress(e, input, output)
{ 
  function noInputHasFocus() {
    const elements = ['INPUT', 'TEXTAREA', 'BUTTON']
    return elements.indexOf(document.activeElement.tagName) === -1
  }
  
  if (noInputHasFocus) {
    if (e.key === 'Enter') {
      const command = input.innerText
      input.innerHTML = ''
      output.innerHTML += '<br><strong>' + command + '</strong>\n<br>'
      writeText(output, execute(command))
    }
    else if (e.key === 'Backspace') {
      input.innerHTML = input.innerHTML.substring(0, input.innerHTML.length - 1)
    }
    else input.insertAdjacentText('beforeend', e.key)
  }
  
  function execute(command)
  {
    switch(command.toLowerCase()) {
      case '':
        return `\n`

      case 'clear':
        output.innerHTML = ''
        return ''

      case 'contacto':
        return `Mis datos de contacto son:
        E-mail: Coty.carracedo@gmail.com
        Teléfono: 11-2472-7016`
      
        case 'portafolio':
          return `Links a mis redes:
  Fotografía: https://instagram.com/coty_photographies?igshid=YmMyMTA2M2Y=
  Edición de Videos: https://www.youtube.com/@c07y52
  Programación: https://github.com/Coty1904`
      
      case 'help':
        return `
  Ingrese un comando aquí y se generará algo.
    Las opciones válidas son:
      help - muestra los comandos de ayuda
      sobre mi - mostrar información
      portafolio - mostrar portafolio
      contacto - mostrar medios de contacto
      clear - borra todo de la pantalla
  Adevertencia: No use el Shift para poner letras MAYUSCULAS.
  P.D. Hay comandos secretos ¿Podrás encontrarlos? ¿Qué harán?`
   
      case 'sobre mi':
        return `Hola, soy Coty de Buenos Aires, Argentina. 
  Hablo fluidamente inglés y español y me apasiona la programación. 
  Actualmente estoy aprendiendo Python y Javascript, 
  y estoy emocionado de seguir mejorando mis habilidades 
  en estos lenguajes.`
      
      case 'planes secretos':
        return '¡Dominar el mundo!'
      
      case 'hola':
        return '¡Hola mundo! Soy Coty2020'
      
      case 'playlist':
        return `MDR:
  https://www.youtube.com/playlist?list=PLKmELJc28sPSwrO_3yBk6YZYWQ7-WiS29`
      
      case 'como estas?':
        return 'Creo que ¿bien? No se realmente'

      default:
        return 'Unknown command'
    }
  }  
}

document.addEventListener('DOMContentLoaded', async () => {
  const asciiText = document.getElementById('asciiText')
  const asciiArt = asciiText.innerText
  asciiText.innerHTML = ''
  
  const instructions = document.getElementById('instructions')
  const prompt = document.getElementById('prompt')
  const cursor = document.getElementById('cursor')  
  
  await wait(1000)
  await writeText(asciiText, asciiArt)
  await wait(500)
  await writeText(instructions, `Introduce un comando. Ingrese 'help' para ver una lista de comandos.`)
  prompt.prepend('>')
  cursor.innerHTML = '_'
  
  const input = document.getElementById('command-input')
  const output = document.getElementById('output')
  document.addEventListener('keydown', (e) => handleKeypress(e, input, output))
})

