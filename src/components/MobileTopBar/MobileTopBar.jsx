import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import DefaultProfileIcon from '../../assets/icons/no-user-avatar.svg';
import UserProfileAccess from '../../components/UserProfile/UserProfileAccess/UserProfileAccess';
import './MobileTopBar.css';

const MobileTopBar = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedIcon, setSelectedIcon] = useState(null);

    const handleIconClick = (icon) => {
        setSelectedIcon(icon);
    };

    const handleProfileClick = (e) => {
        e.preventDefault();
        if (user) {
            navigate('/user/profile/edit');
            handleIconClick('profile');
        } else {
            navigate('/user/profile/access');
            handleIconClick('profile');
        }
    };

    const getProfileImage = () => {
        if (user && user.profileImageUrl) {
            return user.profileImageUrl;
        }
        return DefaultProfileIcon;
    };

    return (
        <nav className="mobile-top-bar-container">
            <div className="mobile-top-bar-icons-container">
                <ul className="mobile-top-bar-list">
                    <li className="mobile-top-bar-item">
                        <Link
                            to="/"
                            className={`mobile-top-bar-icon ${selectedIcon === 'home' ? 'active' : ''}`}
                            onClick={() => handleIconClick('home')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </Link>
                    </li>

                    <li className="mobile-top-bar-item">
                        <Link
                            to="/category"
                            className={`mobile-top-bar-icon ${selectedIcon === 'menu' ? 'active' : ''}`}
                            onClick={() => handleIconClick('menu')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-menu-button" viewBox="0 0 16 16">
                                <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h8A1.5 1.5 0 0 1 11 1.5v2A1.5 1.5 0 0 1 9.5 5h-8A1.5 1.5 0 0 1 0 3.5zM1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5z" />
                                <path d="m7.823 2.823-.396-.396A.25.25 0 0 1 7.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0M0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" />
                            </svg>
                        </Link>
                    </li>

                    <li className="mobile-top-bar-item">
                        <Link
                            to="/"
                            className={`mobile-top-bar-icon ${selectedIcon === 'notifications' ? 'active' : ''}`}
                            onClick={() => handleIconClick('notifications')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.035 2.627a2 2 0 0 1 3.93 0 6.7 6.7 0 0 1 4.56 4.905L21 18.333H3L5.475 7.532a6.7 6.7 0 0 1 4.56-4.905m1.921 1.706a4.694 4.694 0 0 0-4.531 3.645L5.51 16.333h12.98l-1.915-8.355a4.694 4.694 0 0 0-4.531-3.645z"></path>
                                <path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2"></path>
                            </svg>
                        </Link>
                    </li>

                    <li className="mobile-top-bar-item">
                        <Link
                            to="/cart"
                            className={`mobile-top-bar-icon ${selectedIcon === 'cart' ? 'active' : ''}`}
                            onClick={() => handleIconClick('cart')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fillRule="evenodd" clipRule="evenodd" d="M5.766 5l-.618-3H1v2h2.518l2.17 10.535L6.18 17h14.306l2.4-12H5.767ZM7.82 15l-1.6-8h14.227l-1.6 8H7.82Z"></path>
                                <path d="M10.666 20.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm8.334 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"></path>
                            </svg>
                        </Link>
                    </li>

                    <li className="mobile-top-bar-item">
                        <Link
                            to="#"
                            className={`mobile-top-bar-icon ${selectedIcon === 'profile' ? 'active' : ''}`}
                            onClick={handleProfileClick}
                        >
                            <img
                                src={getProfileImage()}
                                alt="Profile"
                                className="mobile-top-bar-profile-image"
                            />
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default MobileTopBar;