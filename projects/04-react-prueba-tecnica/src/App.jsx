import { useEffect, useState } from 'react'
import { useCatImage } from './hooks/useCatImage'
import './App.css'
import { getRandomFact } from './services/facts'

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/'

export const App = () => {
  const [fact, setFact] = useState()

  const { imageUrl } = useCatImage({ fact })

  // Para recuperar la cita al cargar la pagina
  useEffect(() => {
    getRandomFact().then(newFact => setFact(newFact))
  }, [])

  // Esto esta mal, si bien funcionara, nunca se debe pasar el "setState" fuera del componente
  // const handleClick = () => {
  //   getRandomFact(setFact)
  // }

  const handleClick = async () => {
    const newFact = await getRandomFact()
    setFact(newFact)
  }

  return (
    <main className='appCatMain'>

      <h1>App de gatitos</h1>

      <button onClick={handleClick} className='appCatMainButton_newData'>Obtener nuevos datos</button>

      <section className='appCatMain_section'>
        {fact && <p>{fact}</p>}
        <div className='appCatMain_section_imgcont'>
          {imageUrl && <img className='appCatMain_section_img' src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt='Imagen generada usando la primera palabra de un hecho desde https://cataas.com' />}
        </div>
      </section>
    </main>
  )
}
