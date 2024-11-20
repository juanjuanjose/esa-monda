import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DefaultProfileIcon from '../../assets/icons/no-user-avatar.svg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MobileTopBar from '../../components/MobileTopBar/MobileTopBar';
import api from '../../services/api';
import mochilas from '../../assets/products/mochilas/03_900x.webp';
import manillas from '../../assets/products/manillas/manilla.png';
import aretes from '../../assets/products/aretes/aretemisak.png';
import collar from '../../assets/products/collar/collar.png';
import instrumentos from '../../assets/products/instrumentos/capador.png';
import camisas from '../../assets/products/camisas/camisa.png';
import pantalones from '../../assets/products/pantalones/pantalones.png';
import zapatos from '../../assets/products/zapatos/zapatos.png';
import joyas from '../../assets/products/joyas/joya.png';
import decoracion from '../../assets/products/decoracion/manteles.png';
import lamparas from '../../assets/products/lamparas/lamparas.png';
import juegos from '../../assets/products/juegos/trompo.png';
import vajilla from '../../assets/products/vajilla/vajilla.png';
import './Header.css';

export const Header = () => {
  const { user, logout, updateUser } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleCategoryMenu = () => {
    setIsCategoryMenuOpen(!isCategoryMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-profile')) {
        setIsDropdownOpen(false);
      }
      if (!event.target.closest('.menu-categories') && !event.target.closest('.category-menu')) {
        setIsCategoryMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    navigate('/user-profile');
    setIsDropdownOpen(false);
  };

  const getProfileImage = () => {
    if (user && user.profileImageUrl) {
      return user.profileImageUrl;
    }
    return DefaultProfileIcon;
  };

  const cartPageClick = () => {
    navigate('/cart');
    setIsDropdownOpen(false);
  }

  useEffect(() => {
    console.log('useEffect ejecutado');
    console.log('Estado del usuario:', user);
  }, [user]);
  const handleLogout = () => {
    logout();
    setTimeout(() => {
      navigate('/');
    }, 1000); 
  };

  const handleAdminModeration = () => {
    navigate('/admin/dashboard');
  };

  const handleSellerClick = async () => {
  if (user) {
    if (user.roles.includes('SELLER')) {
      navigate('/product/search');
    } else {
      try {
        const response = await api.patch(`/api/users/${user.id}/become-seller`);
        if (response.success) {
          const updatedUser = {
            ...user,
            roles: response.user.roles,
            isSeller: response.user.roles.includes('SELLER')
          };
          updateUser(updatedUser);
          navigate('/product/search');
        } else {
          console.error('Error al convertirse en vendedor:', response.message);
        }
      } catch (error) {
        console.error('Error al convertirse en vendedor:', error.message);
      }
    }
  } else {
    navigate('/login');
  }
};
  
  const categories = [
    { name: 'Bolsos', image: mochilas },
    { name: 'Manillas', image: manillas },
    { name: 'Aretes', image: aretes },
    { name: 'Collar', image: collar },
    { name: 'Instrumentos', image: instrumentos },
    { name: 'Camisas', image: camisas },
    { name: 'Pantalones', image: pantalones },
    { name: 'Zapatos', image: zapatos },
    { name: 'Joyas', image: joyas },
    { name: 'Decoración', image: decoracion },
    { name: 'Lámparas', image: lamparas },
    { name: 'Juegos', image: juegos },
    { name: 'Vajilla', image: vajilla },
  ];

  

  return (
    <>
      {isDropdownOpen && <div className="backdrop"></div>}
    <header className="header">
      <div className="header-content">
          <div className="menu-categories">
            <button className="menu-button" onClick={toggleCategoryMenu}>
              {isCategoryMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" aria-hidden="true" focusable="false">
                  <rect x="2" y="8" width="14" height="2"></rect>
                  <rect x="2" y="13" width="14" height="2"></rect>
                  <rect x="2" y="3" width="14" height="2"></rect>
                </svg>
              )}
            </button>
            <span className="categories-text">Categorías</span>
            {isCategoryMenuOpen && (
              <div className="category-menu">
                {categories.map((category, index) => (
                  <div key={index} className="category-item">
                    <img src={category.image} alt={category.name} />
                    <span>{category.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        <div className="logo">
          <Link to="/">
            <span className="logo-text">
              <span className="logo-m">M</span>isak
              <span className="logo-g">G</span>uamb
              <span className="logo-s">S</span>hop
            </span>
          </Link> 
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Buscar artesanías tradicionales..." />
          <button type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
            </svg>
          </button>
        </div>

        <nav className="nav-links">
          {user ? (
              <div className="user-profile-wrapper">
                <div className={`user-profile ${isDropdownOpen ? 'open' : ''}`} onClick={toggleDropdown}>
                  <img
                    src={getProfileImage()}
                    alt="Profile"
                    className="profile-icon"
                  />
                  <span className="wt-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <polygon points="16.5 10 12 16 7.5 10 16.5 10"></polygon>
                    </svg>
                  </span>
                  <div className="user-info">
                    <span>Tu Perfil</span>
                  </div>
                </div>

                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <div className="dropdown-header">
                      <img
                        src={getProfileImage()}
                        alt="Profile"
                        className="profile-icon"
                      />
                      <div>
                        <span className="user-name">{user.username || 'Usuario'}</span>
                        <button onClick={handleProfileClick} className="view-profile-btn">Ver tu perfil</button>
                      </div>
                    </div>
                    <ul>
                      {user && (user.isAdmin || user.roles?.includes('ADMIN')) ? (
                        <>
                          <li>
                            <button onClick={handleAdminModeration}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                              </svg>
                              <p className="message-text">Revisión de Productos</p>
                            </button>
                          </li>
                          <li>
                            <button onClick={handleAdminModeration}>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                <path d="M19 12.3v-.6l.9-.9c.3-.3.5-.7.6-1.2.1-.4 0-.9-.2-1.3l-1-1.7c-.2-.4-.6-.7-1-.9-.4-.2-.9-.2-1.3-.1l-1.2.3c-.2-.1-.4-.2-.5-.3L15 4.4c-.1-.4-.4-.8-.7-1.1-.4-.1-.9-.3-1.3-.3h-2c-.4 0-.9.2-1.2.4-.4.3-.6.7-.7 1.1l-.4 1.2c-.1.1-.3.2-.5.4L7 5.7c-.4-.1-.9-.1-1.3.1s-.8.5-1 .9l-1 1.7c-.2.4-.3.8-.2 1.2.1.4.3.9.6 1.2l.9.9v.6l-1 .9c-.3.3-.5.7-.6 1.2s0 .9.2 1.3l1 1.7c.2.3.4.6.7.7.5.3 1 .3 1.6.2l1.2-.3c.2.1.4.2.5.3l.4 1.2c.1.4.4.8.7 1.1.4.3.8.4 1.2.4h2c.4 0 .9-.2 1.2-.4.4-.3.6-.7.7-1.1l.3-1.2c.2-.1.4-.2.5-.3l1.2.3c.2 0 .4.1.5.1.4 0 .7-.1 1-.3.3-.2.6-.4.7-.7l1-1.7c.2-.4.3-.8.3-1.3-.1-.4-.3-.8-.6-1.2l-.7-.9zm-2-1.4l.1.5v1.1l-.1.6 1.6 1.6-1 1.7-2.2-.6-.4.2c-.3.2-.7.4-1 .6l-.5.2L13 19h-2l-.5-2.2-.5-.2c-.4-.2-.7-.4-1-.6l-.4-.3-2.2.6-1-1.7L7 13.1v-.5V10.9L5.4 9.4l1-1.7 2.2.6L9 8c.3-.2.7-.4 1-.6l.5-.2L11 5h2l.5 2.2.5.2c.4.2.7.4 1 .6l.4.3 2.2-.6 1 1.7-1.6 1.5z"></path><path d="M12 9c-1.7 0-3 1.4-3 3s1.4 3 3 3 3-1.4 3-3-1.3-3-3-3zm0 4c-.6 0-1-.5-1-1s.5-1 1-1 1 .5 1 1-.4 1-1 1z"></path>
                              </svg>
                              <p className="message-text">Gestión de Productos</p>
                            </button>
                          </li> 
                        </>
                      ) : (
                        <>
                      <li>
                        <Link to="/messages ">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M21 3H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8.65l4.73 3.78a1 1 0 0 0 1.4-.15A1 1 0 0 0 18 20v-3h3a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 12.05h-4V18l-3.38-2.71a.92.92 0 0 0-.62-.22H4V5h16zM8 11a1 1 0 1 0-1-1 1 1 0 0 0 1 1zm4 0a1 1 0 1 0-1-1 1 1 0 0 0 1 1zm4 0a1 1 0 1 0-1-1 1 1 0 0 0 1 1z"></path></svg>
                          <p className="message-text">Mensajes</p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/help-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                            <path d="M12 22a10 10 0 1110-10 10.013 10.013 0 01-10 10zm0-18a8 8 0 108 8 8.009 8.009 0 00-8-8z"></path>
                            <path d="M12 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm1-4h-2a3.043 3.043 0 011.7-2.379c.8-.566 1.3-.947 1.3-1.621a2 2 0 10-4 0H8a4 4 0 018 0 4 4 0 01-2.152 3.259c-.33.186-.62.438-.848.741z"></path>
                          </svg>
                          <p className="message-text">Centro de ayuda</p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/account-settings">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M19 12.3v-.6l.9-.9c.3-.3.5-.7.6-1.2.1-.4 0-.9-.2-1.3l-1-1.7c-.2-.4-.6-.7-1-.9-.4-.2-.9-.2-1.3-.1l-1.2.3c-.2-.1-.4-.2-.5-.3L15 4.4c-.1-.4-.4-.8-.7-1.1-.4-.1-.9-.3-1.3-.3h-2c-.4 0-.9.2-1.2.4-.4.3-.6.7-.7 1.1l-.4 1.2c-.1.1-.3.2-.5.4L7 5.7c-.4-.1-.9-.1-1.3.1s-.8.5-1 .9l-1 1.7c-.2.4-.3.8-.2 1.2.1.4.3.9.6 1.2l.9.9v.6l-1 .9c-.3.3-.5.7-.6 1.2s0 .9.2 1.3l1 1.7c.2.3.4.6.7.7.5.3 1 .3 1.6.2l1.2-.3c.2.1.4.2.5.3l.4 1.2c.1.4.4.8.7 1.1.4.3.8.4 1.2.4h2c.4 0 .9-.2 1.2-.4.4-.3.6-.7.7-1.1l.3-1.2c.2-.1.4-.2.5-.3l1.2.3c.2 0 .4.1.5.1.4 0 .7-.1 1-.3.3-.2.6-.4.7-.7l1-1.7c.2-.4.3-.8.3-1.3-.1-.4-.3-.8-.6-1.2l-.7-.9zm-2-1.4l.1.5v1.1l-.1.6 1.6 1.6-1 1.7-2.2-.6-.4.2c-.3.2-.7.4-1 .6l-.5.2L13 19h-2l-.5-2.2-.5-.2c-.4-.2-.7-.4-1-.6l-.4-.3-2.2.6-1-1.7L7 13.1v-.5V10.9L5.4 9.4l1-1.7 2.2.6L9 8c.3-.2.7-.4 1-.6l.5-.2L11 5h2l.5 2.2.5.2c.4.2.7.4 1 .6l.4.3 2.2-.6 1 1.7-1.6 1.5z"></path><path d="M12 9c-1.7 0-3 1.4-3 3s1.4 3 3 3 3-1.4 3-3-1.3-3-3-3zm0 4c-.6 0-1-.5-1-1s.5-1 1-1 1 .5 1 1-.4 1-1 1z"></path></svg>
                          <p className="message-text">Configuración de la cuenta</p>
                        </Link>
                      </li>
                      <li>
                        <button onClick={handleSellerClick}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                            <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
                          </svg>
                          <p className="message-text">Vender</p>
                        </button>
                      </li>
                      <li>
                        <Link to="/my/publications">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16">
                                  <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                                  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                                </svg>
                                <p className="message-text">Mis publicaciones</p>
                        </Link>
                      </li>
                        </>
                      )}
                      <li>
                        <button onClick={handleLogout}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M2.7 11.3L2 12l.7.7 4 4c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4L5.8 13H15c.6 0 1-.4 1-1s-.4-1-1-1H5.8l2.3-2.3c.2-.2.3-.4.3-.7 0-.6-.4-1-1-1-.3 0-.5.1-.7.3l-4 4z"></path><path d="M22 19H10v-2h10V7H10V5h12z"></path>
                          </svg>
                          <p className='message-text'>Cerrar Sesión</p>
                        </button>
                      </li> 
                    </ul>
                  </div>
                )} 
              </div>
          ) : (
            <>
              <Link to="/register" className="nav-link">Registrar</Link>
              <Link to="/login" className="nav-link">Iniciar Sesión</Link>
            </>
            )}
           
          
         
            <button className="icon-button corazon">
            <Link to="/cart ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path fill-rule="evenodd" clip-rule="evenodd" d="m5.766 5-.618-3H1v2h2.518l2.17 10.535L6.18 17h14.306l2.4-12H5.767ZM7.82 15l-1.6-8h14.227l-1.6 8H7.82Z"></path>
              <path d="M10.666 20.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm8.334 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"></path>
            </svg>
            </Link>
          </button>
        </nav>
      </div>
      </header>
      <MobileTopBar />
    </>
  );
};

export default Header;