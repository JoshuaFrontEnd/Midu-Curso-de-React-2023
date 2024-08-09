import { products } from './mocks/products'
import { Products } from './components/Products'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Products products={ products } />
  )
}

export default App
