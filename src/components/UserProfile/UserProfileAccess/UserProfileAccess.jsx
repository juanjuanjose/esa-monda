import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../components/Logo/Logo';
import './UserProfileAccess.css';

const UserProfileAccess = ({ onClose }) => {
    return (
        <div className="user-profile-access">
            <Logo />
            <div className="user-profile-access__content">
                <h2 className="user-profile-access__title">
                    Inicia sesión para obtener la mejor experiencia
                </h2>
                
                <Link
                    to="/login"
                    className="user-profile-access__button user-profile-access__button--primary"
                >
                    Iniciar sesión
                </Link>
                <Link
                    to="/register"
                    className="user-profile-access__button user-profile-access__button--secondary"
                >
                    Crear cuenta
                </Link>
            </div>
        </div>
    );
};

export default UserProfileAccess;
