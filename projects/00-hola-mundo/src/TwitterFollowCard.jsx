import { useState } from 'react';

export const TwitterFollowCard = ({ formatUserName, userName, name, initialIsFollowing }) => {

  const [ isFollowing, setIsFollowing ] = useState( initialIsFollowing );

  const text = isFollowing ? 'Siguiendo' : 'Seguir';
  const buttonClassName = isFollowing
    ? 'tw-followCard-button is-following'
    : 'tw-followCard-button';

  const handleClick = () => {
    setIsFollowing( !isFollowing );
  }

  return (
    <article className="tw-followCard">

      <header className="tw-followCard-header">
        <img
          className="tw-followCard-avatar"
          src={`https://unavatar.io/${ userName }`}
          alt="El avatar del usuario" />
        <div className="tw-followCard-info">
          <strong>{ name }</strong>
          <span className="tw-followCard-infoUserName">{ formatUserName( userName ) }</span>
        </div>
      </header>

      <aside>
        <button className={ buttonClassName } onClick={ handleClick }>
          <span className='tw-followCard-text'>{ text }</span>
          <span className='tw-followCard-stopFollow'>Dejar de Seguir</span>
        </button>
      </aside>

    </article>
  )
}

/* ----------------------------------------------------------------
  * Hooks
  Los Hooks en React permiten añadir funcionalidad a los componentes en diferentes puntos del renderizado, por ejemplo:

  El Hook useState permite modificar el estado del componente siguiendo algunas directivas basicas:
  - Se debe inicializar el hook con el valor inicial del estado:

  const state = useState( false );

  // Lo que devuelve el Hook es un array con dos pocisiones, en la primera posicion va el valor inicial del estado:

  const isFollowing = state[0];

  // Y en la seguna posicion va el valor del estado actualizado

  const setIsFollowing = state[1];

  // Se pueden agrupar y optimizar estas 3 lineas de codigo, usando la desestructuracion de javascript:

  const [ isFollowing, setIsFollowing ] = useState( false );

  // Tambien se puede inicializar el valor del estado con una prop, y como convencion se agrega el prefijo "initial", para identificar esa variable como propiedad que inicializa el estado, cabe destacar, que el valor inicial del estado siempre sera el mismo y no cambiara, ya que en React el estado debe ser inmutable, con useState lo que hacemos es modificar una copia del valor inicial del estado, pero NO el estado en si. Es una mala pratica definir el estado de un hijo en un componete padre mediante un useState, ya que no funcionara, se debe pasar como prop un valor fijo y no variable

  const [ isFollowing, setIsFollowing ] = useState( initialIsFollowing );

  // Cada vez que cambia el estado React actualiza la parte que modifica el estado, esto lo hace haciendo una copia del DOM original, y al comparar la copia con el DOM original solo actualiza la parte que fue modificada en el estado

---------------------------------------------------------------- */