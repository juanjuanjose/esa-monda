import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './PaymentMethodSelector.css';
import TargetaCredito from '../../../assets/icons/tarjeta-credito-visa.svg';
import Efecty from '../../../assets/icons/efecty.svg';
import CreditCardForm from '../../../components/Payment/CreditCardForm/CreditCardForm';
import CashPaymentForm from '../../../components/Payment/CashPaymentForm/CashPaymentForm';

const PaymentMethodSelector = () => {
    const [selectedMethod, setSelectedMethod] = useState('');
    const [showForm, setShowForm] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.state?.fromShipment) {
            console.log('Llegando desde el formulario de envío', location.state.shipmentData);
        }
    }, []);

    const handleMethodSelect = (method) => {
        setSelectedMethod(method);
        setShowForm(true);
    };

    const handleBackToMethods = () => {
        setShowForm(false);
        setSelectedMethod('');
    };

    return (
        <div className="payment-method-selector-div">
            {!showForm ? (
                <div className='payment-method-selector'>
                    <div className='payment-method-selector-back-link'>
                        <Link to="/*" className="back-link-a">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M2.7 11.3L2 12l.7.7 4 4c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4L5.8 13H15c.6 0 1-.4 1-1s-.4-1-1-1H5.8l2.3-2.3c.2-.2.3-.4.3-.7 0-.6-.4-1-1-1-.3 0-.5.1-.7.3l-4 4z"></path><path d="M22 19H10v-2h10V7H10V5h12z"></path></svg>
                            <p className='back-link-p'>Volver</p>
                        </Link>
                    </div>
                    <h2>Seleccionar método de pago</h2>
                    <div className="method-option" onClick={() => handleMethodSelect('credit_card')}>
                        <img src={TargetaCredito} alt="" className='targeta-credito' />
                        <div>
                            <h3>Tarjeta de Crédito/Débito</h3>
                            <p>Aceptamos tarjetas Visa, Mastercard y American Express.</p>
                            <p>Realiza tus pagos de manera rápida y segura.</p>
                        </div>
                    </div>

                    <h2>Otros Métodos de Pago</h2>

                    <div className="method-option" onClick={() => handleMethodSelect('cash')}>
                        <img src={Efecty} alt="" className='efecty' />
                        <div className='method-option-div'>
                            <h3>Pago en Efectivo</h3>
                            <p>Puedes realizar tu pago a través de Efecty, Baloto y otros puntos de pago.</p>
                            <p>Ideal si prefieres no utilizar tarjeta de crédito.</p>
                        </div>
                    </div>

                    <div className="info-message">
                        <p>
                            ¡Gracias por apoyar a nuestra comunidad! Al elegir nuestros productos artesanales y textiles, contribuyes al desarrollo y bienestar de nuestros artesanos.
                            Tu compra no solo es una transacción, sino una forma de ayudar a mantener vivas nuestras tradiciones y costumbres.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="payment-form-container">
                    {selectedMethod === 'credit_card' ? (
                        <CreditCardForm onBack={handleBackToMethods} />
                    ) : (
                        <CashPaymentForm onBack={handleBackToMethods} />
                    )}
                </div>
            )}
        </div>
    );
};

export default PaymentMethodSelector;
