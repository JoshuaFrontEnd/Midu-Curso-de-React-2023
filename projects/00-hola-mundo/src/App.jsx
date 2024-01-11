import './App.css';
import { TwitterFollowCard } from './TwitterFollowCard';

export const App = () => {

  //Pasando una funcion como Prop ( Pasar una funcion como parametro), funcion que agrega un @ al nombre de usuario
  const format = ( userName ) => `@${ userName }`;

  // Otra forma de pasar las props, como un objeto y luego declararla en el componente con el operador "spread", esta forma no se recomienda, ya que la potencia de React esta en ser lo mas declarativo posible
  const lastCompProps = { formatUserName: format, isFollowing: true, userName: "github", name: "GitHub" };

  return (
    <section className='App'>

      <TwitterFollowCard
        formatUserName={ format }
        isFollowing
        userName="midudev"
        name="Miguel Ángel Durán"
      />

      <TwitterFollowCard
        formatUserName={ format }
        isFollowing={ false }
        userName="YouTube"
        name="YouTube"
      />

      <TwitterFollowCard
        formatUserName={ format }
        isFollowing
        userName="reactjs"
        name="React"
      />

      <TwitterFollowCard { ...lastCompProps } />

    </section>
  )
}

/* ----------------------------------------------------------------
  * Cuando pasamos una propiedad sin definir su valor ( en este caso "isFollowing" ) React lo interpreta como valor "True", en cambio si no se define la propiedad, React lo interpreta como valor "undefined", lo cual se tomaria como "falsy" es decir, "false"

  - isFollowing={ true } es igual a isFollowing con valor true
  - isFollowing={ false } es igual a no declararla con valor undefined pero considerada falsy puede ser false
  - isFollowing={ false } declarada literal queda con valor false

  * En React existen los Componentes y los Elementos, basicamente los componentes son los que fabrican los elementos, y los elementos son los que se renderizan

  * Las propiedades en React deben ser inmutables, es decir, no deben modificarse, porque eso seria modificar el estado real de las cosas, lo que si se puede hacer es crear una copia de la propiedad y esa copia modificarla
---------------------------------------------------------------- */