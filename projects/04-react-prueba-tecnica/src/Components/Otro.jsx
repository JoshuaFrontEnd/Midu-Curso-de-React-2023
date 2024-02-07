import { useCatImage } from '../hooks/useCatImage'

export const Otro = () => {
  const { imageUrl } = useCatImage({ fact: 'cat' })

  console.log(imageUrl)

  return (
    <>
      {imageUrl && <img src={imageUrl} />}
    </>
  )
}
