import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import isotipoblack from '../../assets/images/isotipoblack.png';

import { loginUser, reactivateAccount, forgotPassword } from '../../services/auth';
import { useAuth } from '../../context/AuthContext';
import './Login.css';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';

const Login = () => {
    const { login } = useAuth();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [showReactivate, setShowReactivate] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: name === 'email' ? value.toLowerCase() : value
        }));
        if (errors[name]) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
        }
    };

    const validateForm = () => {
        let tempErrors = {};

        if (!form.email.trim()) {
            tempErrors.email = "El correo electrónico es obligatorio.";
        } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(form.email)) {
            tempErrors.email = "El correo electrónico debe estar en minúsculas y tener un formato válido.";
        }

        if (!form.password) {
            tempErrors.password = "La contraseña es obligatoria.";
        } else if (form.password.length < 8 || form.password.length > 20) {
            tempErrors.password = "La contraseña debe tener entre 8 y 20 caracteres.";
        } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(form.password)) {
            tempErrors.password = "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setShowReactivate(false);

        if (validateForm()) {
            try {
                const response = await loginUser(form);
                const userWithRole = {
                    ...response.user,
                    email: form.email,
                    isAdmin: response.user.isAdmin,
                };
                login(userWithRole);
                navigate('/');
            } catch (error) {
                if (error.message.includes('desactivada')) {
                    setError('Tu cuenta está desactivada. Para reactivarla, haz clic en el botón "Activar mi cuenta".');
                    setShowReactivate(true);
                } else {
                    setError(error.message || 'Hubo un error al iniciar sesión. Por favor, intenta de nuevo.');
                }
            }
        }
    };

    const handleReactivate = async () => {
        try {
            const response = await reactivateAccount(form.email);
            if (response && response.success) {
                setMessage(response.message || 'Tu cuenta ha sido reactivada exitosamente. Por favor, inicia sesión.');
                setTimeout(() => {
                    navigate('/');
                }, 2000);
                setShowReactivate(false);
            } else {
                setError('No se pudo reactivar la cuenta. Por favor, contacta al soporte.');
            }
        } catch (error) {
            setError(error.message || 'Error al reactivar la cuenta. Por favor, intenta de nuevo o contacta al soporte.');
        }
    };

    const handleForgotPassword = async (email) => {
        try {
            await forgotPassword(email);
            setMessage('Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.');
            setShowResetPassword(false);
        } catch (error) {
            setError(error.message || 'Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div>
            <main>
                <div className="login-container">
                    <div className="welcome-container">
                        <h2 className='welcome-h2'>¡Bienvenido a MisakGuambShop!</h2>
                        <p className='welcome-p'>Inicia sesión para acceder a todas las funciones del sitio.</p>
                        <img src={isotipoblack} alt="Logo MisakGuambShop" />
                    </div>

                    <div className="login-box">
                        <h2 className="login-title">Iniciar Sesión</h2>
                        {message && <p className="success-message">{message}</p>}
                        <form onSubmit={handleSubmit} className="login-form" noValidate autoComplete="off">
                            <div className="form-row">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Correo Electrónico"
                                    value={form.email}
                                    onChange={handleChange}
                                    className={`form-input ${errors.email ? 'error' : ''}`}
                                    autoComplete="new-email"
                                />
                                {errors.email && <p className="error-message">{errors.email}</p>}
                            </div>
                            <div className="form-row">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Contraseña"
                                    value={form.password}
                                    onChange={handleChange}
                                    className={`form-input ${errors.password ? 'error' : ''}`}
                                    autoComplete="new-password"
                                />
                                {errors.password && <p className="error-message">{errors.password}</p>}
                            </div>
                            {error && <p className="error-message">{error}</p>}
                            <button type="submit" className="login-button">
                                Iniciar Sesión
                            </button>
                            <div className='button-olvide-contrasena'>
                                <button type="button">
                                    <Link to="/forgot-password">
                                        Olvidé mi contraseña
                                    </Link>
                                </button>
                            </div>

                            {showReactivate && (
                                <button type="button" onClick={handleReactivate} className="reactivate-button">
                                    Reactivar mi cuenta
                                </button>
                            )}

                            <p className="login-footer">
                                Al iniciar sesión, aceptas nuestras <Link to="/terms" className="custom-link">Condiciones de uso</Link> y <Link to="/privacy" className="custom-link">Política de privacidad</Link>.
                            </p>
                        </form>

                        <p className="login-footer">
                            ¿No tienes una cuenta? <Link to="/register" className='custom-link'>Regístrate</Link>
                        </p>
                    </div>
                </div>
            </main>
            
            {showResetPassword && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <ResetPassword
                            onBack={() => setShowResetPassword(false)}
                            onSubmit={handleForgotPassword}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;