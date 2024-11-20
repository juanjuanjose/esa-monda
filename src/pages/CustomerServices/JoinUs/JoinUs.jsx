import React from 'react';
import './JoinUs.css';
import isotipoblack from '../../../assets/images/isotipoblack.png'
import NuestraHistoria from '../../../assets/images/NuestraHistoria.jpg';
import NuestraMision from '../../../assets/images/NuestraMision2.jpg';
import NuestroCompromiso from '../../../assets/images/NuestroCompromiso.jpg'
import UneteNosotros from '../../../assets/images/UneneteNosotros.jpg'



const JoinUs = () => {
  return (
    <div className="join-us">
      <div className='join-us-v'>
        <div className='join-us-container'>
          <div className='join-us-text'>
            <h1>Conocámonos para Crecer juntos</h1>
            <p>
              MisakGuambShop es una plataforma pensada para que todas las comunidades indígenas vendan sus productos de forma rápida, segura y justa, tanto para el vendedor como para el comprador. Unimos a todas las comunidades en un solo lugar, ofreciendo artesanías auténticas y textiles únicos que celebran sus tradiciones. ¡Todo lo que deseas está aquí en MisakGuambShop, donde la cultura se encuentra con la oportunidad de crecimiento!
            </p>
          </div>
          <img src={isotipoblack} alt="Historia de MisakGuambShop" />
        </div>

        <div className='join-us-container'>
          <img src={NuestraHistoria} alt="Historia de MisakGuambShop" />
          <div className='join-us-text'>
        <h1>
          Conoce Nuestra Historia
        </h1>

        <p>
              Somos un equipo de programadores comprometidos con una causa: ayudar a las comunidades indígenas a obtener un precio justo por sus productos. A raíz de una experiencia personal, vimos cómo sus artesanías se venden mucho más barato por falta de espacios de comercialización y conocimientos adecuados. Así, creamos MisakGuambShop para que puedan vender directamente a precios justos, beneficiando a vendedores y compradores, empoderando a cada comunidad.
        </p>
        </div>
        </div>

        <div className='join-us-container'>
        <div className='join-us-text'>
        <h1>Nuestra Misión</h1>
        <p>
              En MisakGuambShop, trabajamos para preservar la herencia cultural de las comunidades indígenas. Nuestra misión es ofrecer productos auténticos que representan el arte, la historia y la tradición de los pueblos originarios, promoviendo su desarrollo económico. Queremos que cada artículo vendido refleje el esfuerzo, el talento y la cultura de los artesanos que lo crearon, garantizando un comercio justo para todos.
        </p>
        </div>
          <img src={NuestraMision} alt="Misión de MisakGuambShop" />
        </div>

        <div className='join-us-container'>
          <img src={NuestroCompromiso} alt="Compromiso de MisakGuambShop" />
          <div className='join-us-text'>

        <h1>Nuestro Compromiso</h1>
        <p>
         Cada compra en MisakGuambShop es un paso hacia un impacto social positivo. Nos comprometemos a apoyar el desarrollo sostenible de las comunidades indígenas, ofreciendo productos únicos que cuentan historias a través de sus colores y texturas. Queremos ser la voz de aquellos cuyas tradiciones merecen ser reconocidas y preservadas. Juntos, podemos construir un puente entre culturas y mercados, generando un cambio significativo.
            </p>
        </div>
        </div>

        <div className='join-us-container'>
          <div>
        <h1>Únete a Nosotros</h1>
        <p>
          Te invitamos a explorar nuestra tienda y sumergirte en la riqueza cultural de los pueblos indígenas a través de nuestras colecciones. Al elegir MisakGuambShop, estás apoyando la preservación de tradiciones ancestrales y fomentando un comercio justo que beneficia directamente a los artesanos. Únete a nosotros para celebrar la diversidad, la creatividad y la autenticidad en cada producto.
        </p>
          </div>
          <img src={UneteNosotros} alt="Compromiso de MisakGuambShop" />
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
