import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../services/auth';
import Footer from '../../components/Footer/Footer'
import "./ResetPassword.css";

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword(email);
            setIsEmailSent(true);
            setError('');
        } catch (error) {
            setError('Error al enviar el correo. Por favor, inténtalo de nuevo.');
            console.error('Error al enviar el correo:', error);
        }
    };

    const handleBackToLogin = () => {
        navigate('/login');
    };

    return (
        <>
        <div className="reset-password-container">
            <div className='reset-password-container-v'>
            <div className="reset-password-header">
                <button onClick={handleBackToLogin} className="back-button">
                    Atrás
                </button>
                <h2 className="reset-password-title">Restablecer la contraseña</h2>
            </div>

            {!isEmailSent ? (
                <form onSubmit={handleSubmit} className="reset-password-form">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            placeholder="Ingresa tu correo electrónico"
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button
                        type="submit"
                        className="submit-button"
                    >
                        Enviar
                    </button>
                </form>
            ) : (
                <div className="success-message">
                    <p className="success-text">
                        Se envió un correo electrónico con instrucciones para restablecer tu contraseña a:
                    </p>
                    <p className="success-email">{email}</p>
                    <p className="success-subtext">Por favor, revisa tu bandeja de entrada y sigue las instrucciones.</p>
                    <button
                        onClick={handleBackToLogin}
                        className="ok-button"
                    >
                        VOLVER AL INICIO
                    </button>
                </div>
                )}
            </div>
            </div>
            <Footer/>
        </>
    );
};

export default ResetPassword;