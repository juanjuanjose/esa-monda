import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CashPaymentForm.css';

const CashPaymentForm = ({ onBack }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        documentId: '',
        birthDate: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'El nombre completo es requerido';
        }
        if (!formData.documentId.trim()) {
            newErrors.documentId = 'El documento de identidad es requerido';
        }
        if (!formData.birthDate) {
            newErrors.birthDate = 'La fecha de nacimiento es requerida';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            console.log('Procesando pago en efectivo...', formData);
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="cash-payment-form-container">
            <div onClick={onBack} className="cash-payment-back-link">
                <Link to="/payment/method/selector" className="cash-payment-back-link-a">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M2.7 11.3L2 12l.7.7 4 4c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4L5.8 13H15c.6 0 1-.4 1-1s-.4-1-1-1H5.8l2.3-2.3c.2-.2.3-.4.3-.7 0-.6-.4-1-1-1-.3 0-.5.1-.7.3l-4 4z"></path><path d="M22 19H10v-2h10V7H10V5h12z"></path></svg>
                    <p className="cash-payment-back-link-p">Volver</p>
                </Link>
            </div>
            <h2>Información del Comprador</h2>
            <form onSubmit={handleSubmit}>
                <div className="cash-payment-form-group">
                    <label htmlFor="fullName">Nombre completo</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={errors.fullName ? 'cash-payment-input-error' : 'cash-payment-input'}
                    />
                    {errors.fullName && <span className="cash-payment-error-message">{errors.fullName}</span>}
                </div>

                <div className="cash-payment-form-group">
                    <label htmlFor="documentId">Documento de identidad</label>
                    <input
                        type="text"
                        id="documentId"
                        name="documentId"
                        value={formData.documentId}
                        onChange={handleChange}
                        className={errors.documentId ? 'cash-payment-input-error' : 'cash-payment-input'}
                    />
                    {errors.documentId && <span className="cash-payment-error-message">{errors.documentId}</span>}
                </div>

                <div className="cash-payment-form-group">
                    <label htmlFor="birthDate">Fecha de nacimiento</label>
                    <input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        className={errors.birthDate ? 'cash-payment-input-error' : 'cash-payment-input'}
                    />
                    {errors.birthDate && <span className="cash-payment-error-message">{errors.birthDate}</span>}
                </div>

                <button type="submit" className="cash-payment-submit-button">
                    Continuar
                </button>
            </form>
        </div>
    );
};

export default CashPaymentForm;

