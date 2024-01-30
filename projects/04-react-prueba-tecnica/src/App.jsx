import { useEffect, useState } from 'react'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red&json=true`
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/'

export const App = () => {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  // No puedes usar React Query, SWR, axios, apollo, etc
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        setFact(fact)

        console.log(fact)

        // Recuperar la primera palabra del hecho
        const firstWord = fact.split(' ')[0]
        console.log(firstWord)

        // Muestra una imagen de un gato con la primera palabra del hecho
        fetch(`https://cataas.com/cat/says/${firstWord}?json=true`)
          .then(res => res.json())
          .then(data => {
            const { _id } = data
            console.log(_id)
            setImageUrl(`${_id}/says/${firstWord}?fontSize=50&fontColor=white`)
          })
      })
  }, [])

  return (
    <main>
      <h1>App de gatitos</h1>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt='Imagen generada usando la primera palabra de un hecho desde https://cataas.com' />}
    </main>
  )
}
