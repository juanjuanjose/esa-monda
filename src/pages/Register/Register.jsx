import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import isotipoblack from '../../assets/images/isotipoblack.png';
import { registerUser, loginUser } from '../../services/auth';
import './Register.css';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

    const validateForm = () => {
        let tempErrors = {};
        if (!form.username.trim()) {
            tempErrors.username = "El nombre de usuario es requerido";
        } else if (form.username.length < 3 || form.username.length > 20) {
            tempErrors.username = "El nombre de usuario debe tener entre 3 y 20 caracteres";
        } else if (!/^[a-zA-Z0-9 ]+$/.test(form.username)) {
            tempErrors.username = "El nombre de usuario solo puede contener letras y números";
        }

        if (!form.email.trim()) {
            tempErrors.email = "El correo electrónico es requerido";
        } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(form.email)) {
            tempErrors.email = "El correo electrónico debe estar en minúsculas y tener un formato válido";
        }

        if (!form.password) {
            tempErrors.password = "La contraseña es requerida";
        } else if (form.password.length < 8 || form.password.length > 20) {
            tempErrors.password = "La contraseña debe tener entre 8 y 20 caracteres";
        } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(form.password)) {
            tempErrors.password = "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial";
        }

        if (form.password !== form.confirmPassword) {
            tempErrors.confirmPassword = "Las contraseñas no coinciden";
        }

        if (!form.phone.trim()) {
            tempErrors.phone = "El número de teléfono es requerido";
        } else if (!/^\d{10}$/.test(form.phone)) {
            tempErrors.phone = "El número de teléfono debe tener exactamente 10 dígitos";
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccess('');
        if (validateForm()) {
            try {
                const registerResponse = await registerUser({
                    username: form.username,
                    email: form.email,
                    password: form.password,
                    confirmPassword: form.confirmPassword,
                    phone: form.phone,
                });

                setSuccess(registerResponse.message || 'Registro exitoso');

                try {
                    const loginResponse = await loginUser({
                        email: form.email,
                        password: form.password
                    });
                    if (loginResponse && loginResponse.accessToken) {
                        login({
                            ...loginResponse.user,
                            username: form.username,
                            email: form.email,
                            phone: form.phone
                        });
                        navigate('/');
                    } else {
                        throw new Error('Login failed: No access token received');
                    }
                } catch (loginError) {
                    console.error('Error logging in automatically:', loginError);
                    setErrors({ submit: 'Registration successful, but there was a problem logging in. Please try logging in manually.' });
                    navigate('/login');
                }
            } catch (error) {
                if (error.message.includes('nombre de usuario')) {
                    setErrors(prevErrors => ({ ...prevErrors, username: 'El nombre de usuario ya está en uso' }));
                } else if (error.message.includes('correo electrónico')) {
                    setErrors(prevErrors => ({ ...prevErrors, email: 'El correo electrónico ya está en uso' }));
                } else {
                    setErrors({ submit: error.message || 'Ocurrió un error inesperado. Por favor, intenta de nuevo.' });
                }
            }
        }
    };
    return (
        <>
        <div className="register-container">
            <div className="welcome-container">
                    <h2 className='welcome__h2'>¡Bienvenido a MisakGuambShop!</h2>
                <p className='welcome-p'>Regístrate con tus datos personales para usar todas las funciones del sitio.</p>
                <img src={isotipoblack} alt="Isotipo Black" />
            </div>

            <div className="register-box">
                <h2 className="register-title">Regístrate</h2>
                {errors.submit && <p className="error-message">{errors.submit}</p>}
                {success && <p className="success-message">{success}</p>}

                <form onSubmit={handleSubmit} className="register-form" noValidate>
                    <div className="form-row">
                        <input
                            type="text"
                            name="username"
                            placeholder="Nombre Completo"
                            value={form.username}
                            onChange={handleChange}
                            className={`form-input ${errors.username ? 'error' : ''}`}
                        />
                        {errors.username && <p className="error-message">{errors.username}</p>}
                    </div>
                    <div className="form-row">
                        <input
                            type="email"
                            name="email"
                            placeholder="Correo Electrónico"
                            value={form.email}
                            onChange={handleChange}
                            className={`form-input ${errors.email ? 'error' : ''}`}
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>
                    <div className="form-row">
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Número de Teléfono"
                            value={form.phone}
                            onChange={handleChange}
                            className={`form-input ${errors.phone ? 'error' : ''}`}
                        />
                        {errors.phone && <p className="error-message">{errors.phone}</p>}
                    </div>
                    <div className="form-row">
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={form.password}
                            onChange={handleChange}
                            className={`form-input ${errors.password ? 'error' : ''}`}
                        />
                        {errors.password && <p className="error-message">{errors.password}</p>}
                    </div>
                    <div className="form-row">
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirmar Contraseña"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                        />
                        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                    </div>
                    <button type="submit" className="register-button">
                        Regístrate
                    </button>

                    <p className="register-footer">
                        Al registrarte, aceptas nuestras <Link to="/terms" className="custom-link">Condiciones de uso</Link> y <Link to="/privacy" className="custom-link">Política de privacidad</Link>.
                    </p>
                </form>

                {errors.submit && errors.submit.includes('ya está en uso') && (
                    <div>
                        <p>{errors.submit}</p>
                        <Link to="/login" className="btn btn-primary">
                            Ir a Iniciar Sesión
                        </Link>
                    </div>
                )}

                <p className="register-footer">
                    ¿Ya tienes una cuenta? <Link to="/login" className='custom-link'>Iniciar sesión</Link>
                </p>
            </div>
            </div>
        </>
    );
};

export default Register;