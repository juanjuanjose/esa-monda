import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css'

const Logo = ({ className = '' }) => {
    return (
        <div className={`logom ${className}`}>
            <Link to="/">
                <span className="logo-texts">
                    <span className="logo-misak">M</span>isak{' '}
                    <span className="logo-guamb">G</span>uamb{' '}
                    <span className="logo-shop">S</span>hop
                </span>
            </Link>
        </div>
    );
};

export default Logo;