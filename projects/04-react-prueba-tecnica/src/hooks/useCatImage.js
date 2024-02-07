import { useEffect, useState } from 'react'

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/'

// Custom Hook, a diferencia de una funcion normal, se pueden llamar otros hooks en un custom hook, en una funcion normal no se pueden llamar otros hooks
export const useCatImage = ({ fact }) => {
  const [imageUrl, setImageUrl] = useState()

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

  return { imageUrl: `${CAT_PREFIX_IMAGE_URL}${imageUrl}` }
}
