import { useCatImage } from './hooks/useCatImage'
import './App.css'
import { useCatFact } from './hooks/useCatFact'

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/'

export const App = () => {
  const { fact, refreshFact } = useCatFact()
  const { imageUrl } = useCatImage({ fact })

  // Esto esta mal, si bien funcionara, nunca se debe pasar el "setState" fuera del componente
  // const handleClick = () => {
  //   getRandomFact(setFact)
  // }

  const handleClick = async () => {
    refreshFact()
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
