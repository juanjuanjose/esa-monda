import React, { useState, useEffect } from 'react';
import api from '../.././../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './ShipmentForm.css';

const ShipmentForm = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
    const [formData, setFormData] = useState({
        address: '',
        recipientName: '',
        phoneNumber: '',
        email: '',
        department: '',
        city: '',
        neighborhood: '',
        postalCode: '',
        shippingNotes: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/'); 
        }
    }, [user, navigate]);

    const validateField = (name, value) => {
        const validations = {
            address: {
                required: 'La dirección es obligatoria.',
                pattern: {
                    value: /^.{5,}$/,
                    message: 'La dirección debe tener al menos 5 caracteres.'
                }
            },
            recipientName: {
                required: 'El nombre del destinatario es obligatorio',
                pattern: {
                    value: /^[a-zA-Z0-9\s]+$/,
                    message: 'El nombre del destinatario solo puede contener letras, números y espacios.'
                }
            },
            phoneNumber: {
                required: 'El número de teléfono es obligatorio.',
                pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'El número de teléfono debe tener 10 dígitos exactos.'
                }
            },
            email: {
                required: 'El correo electrónico es obligatorio.',
                pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Por favor, ingrese un correo electrónico válido.'
                }
            },
            department: {
                required: 'El departamento es obligatorio.',
                pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: 'El departamento solo puede contener letras y espacios.'
                }
            },
            city: {
                required: 'La ciudad es obligatoria.',
                pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: 'La ciudad solo puede contener letras y espacios.'
                }
            },
            neighborhood: {
                pattern: {
                    value: /^[a-zA-Z\s]*$/,
                    message: 'El barrio solo puede contener letras y espacios.'
                }
            },
            postalCode: {
                required: 'El código postal es obligatorio.',
                pattern: {
                    value: /^[0-9]{4,}$/,
                    message: 'El código postal debe contener al menos 4 dígitos.'
                }
            },
            shippingNotes: {
                maxLength: {
                    value: 500,
                    message: 'Las notas de envío no pueden superar los 500 caracteres.'
                }
            }
        };

        const fieldValidation = validations[name];
        if (!fieldValidation) return '';

        if (fieldValidation.required && !value) {
            return fieldValidation.required;
        }

        if (fieldValidation.pattern && !fieldValidation.pattern.value.test(value)) {
            return fieldValidation.pattern.message;
        }

        if (fieldValidation.maxLength && value.length > fieldValidation.maxLength.value) {
            return fieldValidation.maxLength.message;
        }

        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        setErrors(prev => ({ ...prev, [name]: '' }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Iniciando envío del formulario');

        if (!user) {
            console.log('Usuario no autenticado, redirigiendo a login');
            navigate('/login');
            return;
        }

        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            console.log('Errores de validación encontrados:', newErrors);
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        console.log('Enviando datos al servidor...');

        try {
            const response = await api.post('/api/shipments', formData);
            console.log('Respuesta del servidor:', response.data);

            if (response.data) {
                console.log('Envío creado exitosamente');
                setIsSubmitSuccessful(true);
                alert('Dirección guardada exitosamente');

                // Intentar la navegación después de un breve delay
                setTimeout(() => {
                    navigate('/payment/method/selector', {
                        state: {
                            fromShipment: true,
                            shipmentData: response.data
                        }
                    });
                }, 100);
            }
        } catch (error) {
            console.error('Error completo:', error);
            let errorMessage = 'Ocurrió un error al guardar la dirección.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="shipment-form-container-div">
            <div className='shipment-form-container'>
            <h2>Agregar una nueva dirección</h2>
            <form onSubmit={handleSubmit} className="shipment-form">
                <div className="input-row">
                    <div className="form-group">
                        <label htmlFor="recipientName">Nombre completo</label>
                        <input
                            type="text"
                            id="recipientName"
                            name="recipientName"
                            placeholder="Ingresa el nombre completo"
                            value={formData.recipientName}
                            onChange={handleChange}
                        />
                        {errors.recipientName && <span className="error-message">{errors.recipientName}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Ingresa el correo electrónico"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                </div>

                <div className="input-row">
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Número de Teléfono</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="Ingresa el número de teléfono"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                        {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Dirección</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Ingresa la dirección completa"
                            value={formData.address}
                            onChange={handleChange}
                        />
                        {errors.address && <span className="error-message">{errors.address}</span>}
                    </div>
                </div>

                <div className="input-row">
                    <div className="form-group">
                        <label htmlFor="department">Departamento</label>
                        <input
                            type="text"
                            id="department"
                            name="department"
                            placeholder="Ingresa el departamento"
                            value={formData.department}
                            onChange={handleChange}
                        />
                        {errors.department && <span className="error-message">{errors.department}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">Ciudad/Municipio</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            placeholder="Ingresa la ciudad o municipio"
                            value={formData.city}
                            onChange={handleChange}
                        />
                        {errors.city && <span className="error-message">{errors.city}</span>}
                    </div>
                </div>

                <div className="input-row">
                    <div className="form-group">
                        <label htmlFor="neighborhood">Barrio</label>
                        <input
                            type="text"
                            id="neighborhood"
                            name="neighborhood"
                            placeholder="Ingresa el barrio"
                            value={formData.neighborhood}
                            onChange={handleChange}
                        />
                        {errors.neighborhood && <span className="error-message">{errors.neighborhood}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="postalCode">Código Postal</label>
                        <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            placeholder="Ingresa el código postal"
                            value={formData.postalCode}
                            onChange={handleChange}
                        />
                        {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="shippingNotes">Notas de Envío</label>
                    <textarea
                        id="shippingNotes"
                        name="shippingNotes"
                        placeholder="Ingresa notas adicionales para el envío"
                        value={formData.shippingNotes}
                        onChange={handleChange}
                        maxLength={500}
                    />
                    {errors.shippingNotes && <span className="error-message">{errors.shippingNotes}</span>}
                </div>
                <div className='submit-button-div'>
                <button type="submit" className="submit-button-shipment" disabled={loading}>
                    {loading ? 'Guardando...' : 'Enviar a esta dirección'}
                    </button>
                    </div>
                    {isSubmitSuccessful && (
                        <Link
                            to="/payment/method/selector"
                            className="continue-to-payment-button"
                        >
                            Continuar al método de pago
                        </Link>
                    )}
            </form>
            </div>
        </div>
    );
};
export default ShipmentForm;