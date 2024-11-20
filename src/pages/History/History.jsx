import React from 'react';
import './History.css';
import AutenticidadImage from '../../assets/backgrounds/autenticidad.png'; 
import TradicionImage from '../../assets/backgrounds/tradiciones.png'; 
import ArteAncestralImage from '../../assets/backgrounds/ancestral.png'; 

const History = () => {
    return (
        <div className="historias">
            <h1>Historias de la Cultura Misak</h1>

            <section className="historia">
                <h2>Autenticidad</h2>
                <img src={AutenticidadImage} alt="Autenticidad Artesanal" className="historia-image" />
                <p>
                    La autenticidad de nuestra artesanía radica en el uso de técnicas y materiales tradicionales, transmitidos de generación en generación. Cada pieza es única, reflejando la identidad cultural de nuestra comunidad. La conexión entre el artesano y su obra es palpable, lo que garantiza un producto genuino y lleno de historia. El cuidado en cada detalle asegura que las tradiciones no se pierdan en el tiempo, sino que se mantengan vivas en cada artículo que producimos.
                </p>
                <p>
                    Nuestros artesanos se enorgullecen de preservar las formas de expresión que heredaron de sus ancestros, trabajando con fibras naturales, tintes orgánicos y métodos respetuosos con el entorno. Al adquirir una de nuestras piezas, no solo llevas contigo una artesanía, sino también una historia que ha trascendido generaciones.
                </p>
            </section>

            <section className="historia">
                <h2>Tradición</h2>
                <img src={TradicionImage} alt="Tradición Misak" className="historia-image" />
                <p>
                    La tradición de la cultura Misak se remonta a siglos atrás. Nuestros antepasados forjaron un legado que hoy se manifiesta en cada producto que ofrecemos. La celebración de nuestras festividades y rituales se entrelaza con la creación de artesanías, donde cada hilo, cada color, cuenta una historia sobre nuestra cultura y cosmovisión.
                </p>
                <p>
                    Las tradiciones Misak están profundamente arraigadas en la tierra y en los ciclos de la naturaleza. Desde la recolección de materiales hasta el diseño de patrones simbólicos, cada paso en el proceso artesanal honra nuestras creencias y nuestras historias compartidas. Estas tradiciones son la base de nuestra identidad y nos conectan con nuestras raíces, permitiéndonos compartir nuestra historia con el mundo.
                </p>
            </section>

            <section className="historia">
                <h2>Arte Ancestral</h2>
                <img src={ArteAncestralImage} alt="Arte Ancestral Misak" className="historia-image" />
                <p>
                    El arte ancestral de los Misak no solo es un medio de expresión, sino también una forma de preservar nuestra historia y tradiciones. A través de técnicas como el tejido y la cerámica, los artesanos cuentan historias que han sido compartidas a lo largo de los años. Cada pieza es una obra de arte que refleja la espiritualidad y la belleza de nuestra comunidad.
                </p>
                <p>
                    Cada creación Misak refleja nuestra relación con la naturaleza, el cosmos y nuestros ancestros. Las formas geométricas, los colores vibrantes y los diseños simbólicos tienen significados profundos, relacionados con nuestras creencias sobre el equilibrio y la armonía en el mundo. La creatividad de nuestros artesanos es infinita, y cada obra refleja un profundo respeto por la naturaleza y por nuestros ancestros.
                </p>
            </section>
        </div>
    );
};

export default History;
