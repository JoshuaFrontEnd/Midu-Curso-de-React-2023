import { useEffect, useState } from 'react'
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red&json=true`
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/'

export const App = () => {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  const getRandomFact = () => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        setFact(fact)
      })
  }

  // Para recuperar la cita al cargar la pagina
  useEffect(getRandomFact, [])

  // Para recuperar la imagen cada vez que tenemos una cita nueva
  useEffect(() => {
    if (!fact) return

    // Recuperar la primera palabra del hecho
    const firstWord = fact.split(' ')[0]

    // Muestra una imagen de un gato con la primera palabra del hecho
    fetch(`https://cataas.com/cat/says/${firstWord}?json=true`)
      .then(res => res.json())
      .then(data => {
        const { _id } = data
        setImageUrl(`${_id}/says/${firstWord}?fontSize=50&fontColor=white`)
      })
  }, [fact])

  const handleClick = () => {
    getRandomFact()
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
