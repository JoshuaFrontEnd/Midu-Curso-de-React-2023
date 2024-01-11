export const TwitterFollowCard = ({ formatUserName, userName, name, isFollowing }) => {

  const text = isFollowing ? 'Siguiendo' : 'Seguir';
  const buttonClassName = isFollowing
    ? 'tw-followCard-button is-following'
    : 'tw-followCard-button';

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
        <button className={ buttonClassName }>
          { text }
        </button>
      </aside>

    </article>
  )
}