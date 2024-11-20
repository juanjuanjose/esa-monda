import React, { useState, useRef, useEffect } from 'react';

import chumbe from '../../assets/products/chumbes/chumbe.png';
import manilla from '../../assets/products/manillas/manilla.png';
import aretes from '../../assets/products/aretes/aretemisak.png';
import collar from '../../assets/products/collar/collar.png';
import camisas from '../../assets/products/camisas/camisa.png';
import pantalones from '../../assets/products/pantalones/pantalones.png';
import zapatos from '../../assets/products/zapatos/zapatos.png';
import joyas from '../../assets/products/joyas/joya.png';
import decoracion from '../../assets/products/decoracion/manteles.png';
import mochilas from '../../assets/products/mochilas/bolso1.png';
import lamparas from '../../assets/products/lamparas/lamparas.png';
import juegos from '../../assets/products/juegos/trompo.png';
import vajilla from '../../assets/products/vajilla/vajilla.png';
import capador from '../../assets/products/instrumentos/capador.png';

import './CategoryCarousel.css';

const categories = [
  { id: 1, name: 'Chumbe', image: chumbe },
  { id: 2, name: 'Manillas', image: manilla },
  { id: 3, name: 'Aretes', image: aretes },
  { id: 4, name: 'Collar', image: collar },
  { id: 6, name: 'Instrumentos', image: capador },
  { id: 7, name: 'Camisas', image: camisas },
  { id: 8, name: 'Pantalones', image: pantalones },
  { id: 9, name: 'Zapatos', image: zapatos },
  { id: 10, name: 'Joyas', image: joyas },
  { id: 11, name: 'Decoración', image: decoracion },
  { id: 12, name: 'Mochilas', image: mochilas },
  { id: 13, name: 'Lámparas', image: lamparas },
  { id: 14, name: 'Juegos', image: juegos },
  { id: 15, name: 'Vajilla', image: vajilla },
];


const CategoryCarousel = () => {

    const carouselRef = useRef(null);

  return (
    <div className="carousel-categories">
      <h2 className="carousel-title">Descubre Artesanías por Categoría</h2>
      <div className="carousel-wrapper">
        
        
   
        <div ref={carouselRef} className="carousel-items-container">
          {categories.map((category) => (
            <div key={category.id} className="carousel-item">
              <div className="carousel-image-wrapper">
                <img
                  src={category.image}
                  alt={category.name}
                  className="carousel-image"
                />
              </div>
              <p className="carousel-item-text">{category.name}</p>
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
};

export default CategoryCarousel;
