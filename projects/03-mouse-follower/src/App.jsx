import { useEffect, useState } from 'react'

function App () {
  const [enabled, setEnabled] = useState(false)

  // useEffect es un Hook que nos permite ejecutar codigo arbitrario cuando un componente se "monta" en el DOM y cada vez que cambien las dependencias que nosotros configuremos
  useEffect(() => {
    // Acá se va a ejecutar el log, cuando el componente se monte en el DOM
    console.log('effect: ', { enabled })

    // Y se volvera a ejecutar cada vez que el valor de la dependencia "enabled" cambie, si queremos que el log se ejecute solo cuando se monte el componente, hay que declarar la dependencia de cambio con un arreglo vacio []
  }, [enabled])

  return (
    <main>
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
        transform: 'translate( 0px, 0px )'
      }}
      />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </main>
  )
}

export default App
