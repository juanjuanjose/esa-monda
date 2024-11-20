import React from 'react';
import './Contact.css'; 

const Contact = () => {
    return (
        <div className="contact-container">
            <h2>Contacto</h2>
            <form className="contact-form">
                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input type="text" id="name" name="name" placeholder="Tu nombre" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input type="email" id="email" name="email" placeholder="Tu correo electrónico" required />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Mensaje</label>
                    <textarea id="message" name="message" placeholder="Tu mensaje" required></textarea>
                </div>
                <button type="submit" className="contact-button">Enviar</button>
            </form>
        </div>
    );
};

export default Contact;