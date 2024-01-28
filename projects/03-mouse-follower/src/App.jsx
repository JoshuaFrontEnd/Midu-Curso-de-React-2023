import { useEffect, useState } from 'react'

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)

  // Seteando el estado la posicion inicial del cursor en 0
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // useEffect es un Hook que nos permite ejecutar codigo arbitrario cuando un componente se "monta" en el DOM y cada vez que cambien las dependencias que nosotros configuremos
  useEffect(() => {
    // Acá se va a ejecutar el log, cuando el componente se monte en el DOM
    console.log('effect: ', { enabled })

    const handleMove = (event) => {
      const { clientX, clientY } = event
      console.log('handleMove: ', { clientX, clientY })
      setPosition({ x: clientX, y: clientY })
    }

    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    // El return sirve para "limpiar/remover" los eventos que se hayan agregado en el useEffect, si no se "limpian/remueven" los eventos, estos no pararian de agregarse causando problemas de rendimiento
    return () => {
      console.log('cleanUp')
      window.removeEventListener('pointermove', handleMove)
    }

    // Truco para detectar los listeners que se añadieron al DOM (solo en chromium)
    // getEventListeners(window)
    // donde "window" es el elemento al que queremos consultar sus listeners

    // Y se volvera a ejecutar cada vez que el valor de la dependencia "enabled" cambie, si queremos que el log se ejecute solo cuando se monte el componente, hay que declarar la dependencia de cambio con un arreglo vacio []
  }, [enabled])

  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: '#00F',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate( ${position.x}px, ${position.y}px )`
      }}
      />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </>
  )
}

function App () {
  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App
