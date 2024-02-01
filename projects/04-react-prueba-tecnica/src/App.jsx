import { useEffect, useState } from 'react'
import './App.css'
import { getRandomFact } from './services/facts'

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/'

export const App = () => {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  // Para recuperar la cita al cargar la pagina
  useEffect(() => {
    getRandomFact().then(newFact => setFact(newFact))
  }, [])

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
