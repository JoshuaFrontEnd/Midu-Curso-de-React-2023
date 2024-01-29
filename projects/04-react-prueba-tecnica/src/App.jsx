import { useState } from 'react'

export const App = () => {
  const [fact, setFact] = useState('lorem ipsum cat fact whatever')

  return (
    <main>
      <h1>App de gatitos</h1>
      <p>{fact}</p>
    </main>
  )
}
