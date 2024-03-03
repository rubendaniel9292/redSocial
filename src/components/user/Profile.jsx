import avatar from '../../assets/img/user.jpg'
import { useEffect, useState } from 'react';
import { getProfile } from '../../helpers/getProfile';
import { useParams, Link } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import useAuth from '../../hooks/useAuth';


const Profile = () => {
  const [user, setUser] = useState({});
  const [counters, setCounters] = useState({});
  const { auth } = useAuth();
  const [iFollow, setIfollow] = useState(false);
  const params = useParams();

  useEffect(() => {
    getDatauser();
    getCounters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getDatauser();
    getCounters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);//siempre que haya un cambio en params se vuelve a cargar el componente y ejecutar los metodos

  const getDatauser = async () => {
    let datauser = await getProfile(params.userId, setUser);
    if (datauser.followInfo.following && datauser.followInfo.following._id) setIfollow(true);
    
  }

  const getCounters = async () => {
    const request = await fetch(Global.url + 'user/counters/' + params.userId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    });
    const data = await request.json();

    if (data.following) {
      setCounters(data)
    }

  }
  const follow = async (userId) => {
    //peticion al backend
    const request = await fetch(Global.url + 'follow/save', {
      method: 'POST',
      body: JSON.stringify({ followed: userId }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    });
    const data = await request.json();
    //cuando sea exitosa, actualziar el estado de following agregando el nuevo follow
    if (data.status === 'success') {
      setIfollow(true);
    }

  }
  const unFollow = async (userId) => {
    //peticion al backend
    const request = await fetch(Global.url + 'follow/unfollow/' + userId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    });
    const data = await request.json();

    //cuando sea exitosa, actualziar el estado de following filtando los datos para elimianr el antiguo user id que acabi de dejar de segrui
    if (data.status === 'success') {
      setIfollow(false);
    }
  }


  return (
    <>
      <header className="aside__profile-info">

        <div className="profile-info__general-info">
          <div className="general-info__container-avatar">
            <img
              src={user.image !== 'default.png' ? Global.url + 'user/avatar/' + user.image : avatar}
              className="container-avatar__img"
              alt="Foto de perfil"
            />
          </div>

          <div className="general-info__container-names">
            <div className="container-names__name">
              <h1>{user.name} {user.surname}</h1>
              {user._id != auth._id &&
                (iFollow ?
                  <button onClick={()=>unFollow(user._id)} className="content__button content__button--right post__button">Dejar de Seguir</button>
                  :
                  <button onClick={()=>follow(user._id)}className="content__button content__button--right">Seguir</button>
                )}
            </div>

            <h2 className="container-names__nickname">{user.nick}</h2>
            <p>{user.bio}</p>
          </div>

        </div>

        <div className="profile-info__stats">

          <div className="stats__following">
            <Link to={'/social/siguiendo/' + user._id} className="following__link">
              <span className="following__title">Siguiendo</span>
              <span className="following__number">{counters.following >= 1 ? counters.following : 0}</span>
            </Link>
          </div>
          <div className="stats__following">
            <Link to={'/social/seguidores/' + user._id} className="following__link">
              <span className="following__title">Seguidores</span>
              <span className="following__number">{counters.followed >= 1 ? counters.followed : 0}</span>
            </Link>
          </div>
          <div className="stats__following">
            <Link to={'/social/perfil/' + user._id} className="following__link">
              <span className="following__title">Publicaciones</span>
              <span className="following__number">{counters.publications >= 1 ? counters.publications : 0}</span>
            </Link>
          </div>


        </div>
      </header>

      <div className='content__posts'>
        <article className="posts__post">

          <div className="post__container">

            <div className="post__image-user">
              <a href="#" className="post__image-link">
                <img src={avatar} className="post__user-image" alt="Foto de perfil" />
              </a>
            </div>

            <div className="post__body">
              <div className="post__user-info">
                <a href="#" className="user-info__name">Victor Robles</a>
                <span className="user-info__divider"> | </span>
                <a href="#" className="user-info__create-date">Hace 1 hora</a>
              </div>
              <h4 className="post__content">Hola, buenos dias.</h4>
            </div>

          </div>

          <div className="post__buttons">

            <a href="#" className="post__button">
              <i className="fa-solid fa-trash-can"></i>
            </a>

          </div>
        </article>

      </div>



      <div className="content__container-btn">
        <button className="content__btn-more-post">
          Ver mas publicaciones
        </button>
      </div>
    </>
  )
}

export default Profile
