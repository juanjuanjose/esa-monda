import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import DefaultProfileIcon from '../../assets/icons/no-user-avatar.svg';
import "./UserProfile.css";

const UserProfile = () => {

  const { user } = useAuth();

  const getProfileImage = () => {
    if (user && user.profileImageUrl) {
      return user.profileImageUrl;
    }
    return DefaultProfileIcon;
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="user-profile-iconss">
          <img src={getProfileImage()} alt={`Perfil de ${user ? user.name : 'Usuario'}`} className="profile-icons" />
          <span className="user-name">{user ? user.name : 'Usuario'}</span>
          <span><Link to="/user/profile/edit" className="editar-perfil">Editar perfil</Link></span>
        </div>
        <div className="profile-nav">
          <ul>
            <li>
              <Link to="/user/profile/edit">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                </svg>
                <p className="message-texts">Mi cuenta</p>
            </Link>
            </li>
            <li>
              <Link to="">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-heart-fill" viewBox="0 0 16 16">
                  <path d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
                </svg>
                <p className="message-texts">Mis compras</p>
            </Link>
            </li>
            <li>
              <Link to="">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.035 2.627a2 2 0 0 1 3.93 0 6.695 6.695 0 0 1 4.56 4.905L21 18.333H3L5.475 7.532a6.695 6.695 0 0 1 4.56-4.905Zm1.921 1.706a4.694 4.694 0 0 0-4.531 3.645L5.51 16.333h12.98l-1.915-8.355a4.694 4.694 0 0 0-4.531-3.645h-.088Z"></path><path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2Z"></path>
                </svg>
                <p className="message-texts">Notificaciones</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <section className="profile-content">
        <div className="tab-bar">
          <button>Todos</button>
          <button>Por enviar</button>
          <button>En camino</button>
          <button>Finalizado</button>
          <button>Cancelado</button>
          <button>Devolución</button>
        </div>
        <div className="no-orders">
          <span class="wt-icon-span ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" aria-hidden="true" focusable="false">
            <path d="M28.048 22.669l-1.682-1.081-5.576 8.676-3.917-2.517-1.08 1.682 5.6 3.599 6.655-10.359zm24.991-4.113l-18.567 4.037.425 1.954 18.567-4.036-.425-1.954zm-6.755 6.586L35.535 27.48l.426 1.955 10.748-2.339-.425-1.954zM32.301 42.211l-1.683-1.081-5.576 8.677-3.917-2.517-1.082 1.682 5.601 3.599 6.657-10.36zm24.989-4.112l-18.566 4.04.425 1.954 18.566-4.04-.425-1.954zm-6.754 6.585l-10.748 2.339.425 1.954 10.748-2.338-.425-1.955zM29.294 69.35l-3.918-2.517-1.08 1.682 5.6 3.599 6.657-10.36-1.683-1.081-5.576 8.677zm32.249-11.707l-18.567 4.036.425 1.954 18.567-4.036-.425-1.954zm-6.755 6.585L44.04 66.565l.424 1.954 10.75-2.336-.425-1.955z"></path>
            <path d="M90.922 29.5a5.08 5.08 0 00-3.642-2.22l-2.03-.235a5.106 5.106 0 00-5.428 3.492l-.51 1.563-7.62 23.584L60.04 3.728 3.372 16.057l16.6 76.292 45.544-13.5.5 3.3-.016-.002.052.2 1.4 9.222 10.98-11.183.06-.211.035.012 13.07-46.477a5.083 5.083 0 00-.675-4.21zm-4.288 14.428l-8.186-2.645 2.152-6.661 7.935 2.564-1.9 6.742zM21.467 89.819L5.751 17.586 58.523 6.1l11.96 53.324-5.315 16.451-.068.225.115.758-43.748 12.961zM72 84.087l-3.854-1.245-.962-6.315 9.292 3L72 84.087z"></path>
            </svg>
          </span>
          <p className="no-orders-p">Aún no hay nada por aquí</p>
          <p className="no-orders-ps">Descubre artesanías únicas y textiles tradicionales en MisakGuambShop, creados por manos indígenas. Marca tus favoritos, compáralos y apoya a nuestras comunidades con cada compra. Empieza a explorar y contribuye a la preservación cultural.</p>
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
