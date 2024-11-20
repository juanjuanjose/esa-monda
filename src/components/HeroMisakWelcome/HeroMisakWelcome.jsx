import React, { useState } from 'react';
import './HeroMisakWelcome.css';
import MisakGuambShop from '../../assets/products/WELCOME_26_c4f0b7d4-d30e-43a5-bb78-76d4cb1fff67_1512x.webp';
import { useNavigate } from 'react-router-dom'; // Cambiado a useNavigate

const HeroMisakWelcome = () => {
    const [description, setDescription] = useState('Sumérgete en un mundo de colores y tradiciones milenarias. Cada pieza cuenta una historia, tejida con las manos expertas de nuestros artesanos del Resguardo de Guambia, Cauca.');
    const navigate = useNavigate(); // Cambiado a useNavigate

    const handleFeatureClick = (feature) => {
        switch (feature) {
            case 'autenticidad':
                setDescription('La autenticidad de nuestra artesanía radica en el uso de técnicas y materiales tradicionales, transmitidos de generación en generación. Cada pieza es única, reflejando la identidad cultural de nuestra comunidad. La conexión entre el artesano y su obra es palpable, lo que garantiza un producto genuino y lleno de historia.');
                break;
            case 'tradición':
                setDescription('La tradición de la cultura Misak se remonta a siglos atrás. Nuestros antepasados forjaron un legado que hoy se manifiesta en cada producto que ofrecemos. La celebración de nuestras festividades y rituales se entrelaza con la creación de artesanías, donde cada hilo, cada color, cuenta una historia sobre nuestra cultura y cosmovisión.');
                break;
            case 'arte ancestral':
                setDescription('El arte ancestral de los Misak no solo es un medio de expresión, sino también una forma de preservar nuestra historia y tradiciones. A través de técnicas como el tejido y la cerámica, los artesanos cuentan historias que han sido compartidas a lo largo de los años. Cada pieza es una obra de arte que refleja la espiritualidad y la belleza de nuestra comunidad.');
                break;
            default:
                setDescription('Sumérgete en un mundo de colores y tradiciones milenarias. Cada pieza cuenta una historia, tejida con las manos expertas de nuestros artesanos del Resguardo de Guambia, Cauca.');
        }
    };

    const handleVerMas = () => {
        navigate('/history'); // Usar navigate en lugar de history.push
    };

    return (
        <div className="hero-misak">
            <div className="hero-misak-content">
                <h1>Bienvenidos a MisakGuambShop</h1>
                <h2>El corazón de la artesanía Misak</h2>
                <p>{description}</p>
                <div className="hero-misak-features">
                    <span onClick={() => handleFeatureClick('autenticidad')}>Autenticidad</span>
                    <span onClick={() => handleFeatureClick('tradición')}>Tradición</span>
                    <span onClick={() => handleFeatureClick('arte ancestral')}>Arte Ancestral</span>
                </div>
                <button onClick={handleVerMas}>Ver más</button>
            </div>
            <div className="hero-misak-image">
                <img src={MisakGuambShop} alt="Artesanía Misak" />
            </div>
        </div>
    );
};

export default HeroMisakWelcome;
