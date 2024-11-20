import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Visa from '../../../assets/icons/visa-credit-card-2-512.webp'
import Mastercard from '../../../assets/icons/mastercard-full.svg'
import Amex from '../../../assets/icons/amex.svg'
import Discover from '../../../assets/icons/discover.svg'
import Jcb from '../../../assets/icons/jcb.svg'
import Unionpay from '../../../assets/icons/unionpay.png'


import './CreditCardForm.css';

const CreditCardForm = ({ onBack }) => {
    const [cardData, setCardData] = useState({
        number: '',
        cardholderName: '',
        expiry: '',
        cvv: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCardData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Procesando pago con tarjeta...', cardData);
    };

    return (
        <div className="credit-card-form">
            <div className="credit-card-form-container">
                <div className='form-section'>
                    <div onClick={onBack} className='payment-method-selector-back-link'>
                        <Link to="/payment/method/selector" className="back-link-a">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M2.7 11.3L2 12l.7.7 4 4c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4L5.8 13H15c.6 0 1-.4 1-1s-.4-1-1-1H5.8l2.3-2.3c.2-.2.3-.4.3-.7 0-.6-.4-1-1-1-.3 0-.5.1-.7.3l-4 4z"></path><path d="M22 19H10v-2h10V7H10V5h12z"></path></svg>
                            <p className='back-link-p'>Volver</p>
                        </Link>
                    </div>
                    <h2>Información de la tarjeta</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Número de tarjeta</label>
                        <input
                            type="text"
                            name="number"
                            value={cardData.number}
                            onChange={handleChange}
                            placeholder="1234 5678 9012 3456"
                            maxLength="16"
                        />
                        <label>Nombre en la tarjeta</label>
                        <input
                            type="text"
                            name="cardholderName"
                            value={cardData.cardholderName}
                            onChange={handleChange}
                            placeholder="Como aparece en la tarjeta"
                        />
                        <div className="expiration-cvv">
                            <div>
                                <label>Fecha de vencimiento</label>
                                <input
                                    type="text"
                                    name="expiry"
                                    value={cardData.expiry}
                                    onChange={handleChange}
                                    placeholder="MM/AAAA"
                                    maxLength="7"
                                />
                            </div>
                            <div>
                                <label>Código de seguridad (CVV)</label>
                                <input
                                    type="password"
                                    name="cvv"
                                    value={cardData.cvv}
                                    onChange={handleChange}
                                    placeholder="123"
                                    maxLength="4"
                                />
                            </div>
                        </div>
                        <div className='credit-card-submit-button'>
                            <button type="submit">Continuar</button>
                        </div>
                    </form>
                </div>

                <div className="accepted-cards">
                    <p>MisakGuambShop acepta la mayoría de tarjetas de crédito y débito:</p>
                    <div className="card-logos">
                        <img src={Visa} alt="Visa" />
                        <img src={Mastercard} alt="MasterCard" />
                        <img src={Amex} alt="American Express" />
                        <img src={Discover} alt="Discover" />
                        <img src={Jcb} alt="JCB" />
                        <img src={Unionpay} alt="UnionPay" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreditCardForm;

