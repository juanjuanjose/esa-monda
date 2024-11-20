import React from 'react';
import './NotFound.css';
import Footer from '../../components/Footer/Footer';

const NotFound = () => {
  return (
    
    <main>
      <div className='container-all'>
        <div className="not-found-404">404</div>
        <div className="not-found"><p>Pagina no encontrada</p></div>
        <div className="box-of-star1">
          <div className="point point-position1"></div>
          <div className="point point-position2"></div>
          <div className="point point-position3"></div>
          <div className="point point-position4"></div>
          <div className="point point-position5"></div>
          <div className="point point-position6"></div>
          <div className="point point-position7"></div>
        </div>
        <div className="box-of-star2">
          <div className="point point-position1"></div>
          <div className="point point-position2"></div>
          <div className="point point-position3"></div>
          <div className="point point-position4"></div>
          <div className="point point-position5"></div>
          <div className="point point-position6"></div>
          <div className="point point-position7"></div>
        </div>
        <div className="box-of-star3">
          <div className="point point-position1"></div>
          <div className="point point-position2"></div>
          <div className="point point-position3"></div>
          <div className="point point-position4"></div>
          <div className="point point-position5"></div>
          <div className="point point-position6"></div>
          <div className="point point-position7"></div>
        </div>
        <div className="box-of-star4">
          <div className="point point-position1"></div>
          <div className="point point-position2"></div>
          <div className="point point-position3"></div>
          <div className="point point-position4"></div>
          <div className="point point-position5"></div>
          <div className="point point-position6"></div>
          <div className="point point-position7"></div>
        </div>
        <div data-js="astro" className="astronaut">
          <div className="head"></div>
          <div className="arm arm-left"></div>
          <div className="arm arm-right"></div>
          <div className="body">
            <div className="panel"></div>
          </div>
          <div className="leg leg-left"></div>
          <div className="leg leg-right"></div>
          <div className="schoolbag"></div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default NotFound;
