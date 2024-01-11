import './App.css';
import { TwitterFollowCard } from './TwitterFollowCard';

export const App = () => {

  //Pasando una funcion como Prop ( Pasar una funcion como parametro), funcion que agrega un @ al nombre de usuario
  const format = ( userName ) => `@${ userName }`;

  // Otra forma de pasar las props, como un objeto y luego declararla en el componente con el operador "spread", esta forma no se recomienda, ya que la potencia de React esta en ser lo mas declarativo posible
  // const lastCompProps = { formatUserName: format, userName: "github", name: "GitHub" };

  // return (
  //   <section className='App'>

  //     <TwitterFollowCard
  //       formatUserName={ format }
  //       initialIsFollowing={ true }
  //       userName="midudev"
  //       name="Miguel Ángel Durán"
  //     />

  //     <TwitterFollowCard
  //       formatUserName={ format }
  //       userName="YouTube"
  //       name="YouTube"
  //     />

  //     <TwitterFollowCard
  //       formatUserName={ format }
  //       userName="reactjs"
  //       name="React"
  //     />

  //     <TwitterFollowCard { ...lastCompProps } />

  //   </section>
  // )

  // Usando un JSON para renderizar la informacion en un componente y explicar el tema de las "keys" en React
  const users = [
    {
      userName: 'midudev',
      name: 'Miguel Ángel Durán',
      isFollowing: true
    },
    {
      userName: 'YouTube',
      name: 'YouTube',
      isFollowing: false
    },
    {
      userName: 'reactjs',
      name: 'React',
      isFollowing: true
    },
    {
      userName: 'github',
      name: 'GitHub',
      isFollowing: false
    }
  ]

  return (
    <section className='App'>
      {
        // users.map( user => {

        //   const { userName, name, isFollowing } = user;

        //   return (

        //     <TwitterFollowCard
        //       key={ userName }
        //       formatUserName={ format }
        //       userName={ userName }
        //       name={ name }
        //       initialIsFollowing={ isFollowing }
        //     />

        //   )

        // })

        /* Refactorizacion ( optimización ) del codigo anterior */
        users.map( ({ userName, name, isFollowing }) => (

          <TwitterFollowCard
            key={ userName }
            formatUserName={ format }
            userName={ userName }
            name={ name }
            initialIsFollowing={ isFollowing }
          />

        ))

      }
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

  * La propiedad "key" en React sirve para identificar los elementos de una iteracion, el valor de esta propiedad debe ser unica para que React pueda realizar un seguimiento de que elementos han sido modificados de manera mas optima, si no se declara o no es unica, react podria renderizar el componente de iteracion con problemas. Algunas recomendaciones es no usar datos aleatorios como valor de "key", por ejemplo usando la funcion Math.random() o Date.now(), o usar el index, lo ideal seria usar un id de la informacion que venga ya seteada desde una base de datos, o identificar valores no repetibles unicos como el nombre de usuario, etc.
---------------------------------------------------------------- */