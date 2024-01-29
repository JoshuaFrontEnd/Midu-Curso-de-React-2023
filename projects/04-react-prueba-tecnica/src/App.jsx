import { useEffect, useState } from 'react'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red&json=true`

export const App = () => {
  const [fact, setFact] = useState()

  // No puedes usar React Quer, SWR, axios, apollo, etc
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => setFact(data.fact))
  }, [])

  return (
    <main>
      <h1>App de gatitos</h1>
      {fact && <p>{fact}</p>}
    </main>
  )
}
