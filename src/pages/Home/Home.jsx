import React from 'react';
import { useState, useEffect } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import HeroMisakWelcome from '../../components/HeroMisakWelcome/HeroMisakWelcome';
import TrendingProducts from '../../components/TrendingProducts/TrendingProducts';
import CategoryCarousel from '../../components/CategoryCarousel/CategoryCarousel';
import api from '../../services/api';
<<<<<<< HEAD


=======
import './Home.css';
>>>>>>> develop

const Home = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

<<<<<<< HEAD
  const fetchProducts = async () => {
    try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No hay token de autenticación');
        }

        const response = await api.get('/api/products/my-approved', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response || !Array.isArray(response)) {
            throw new Error('Respuesta inválida de la API');
        }

        setTopProducts(response);
    } catch (err) {
        console.error('Error detallado:', err);
        let errorMessage = 'Error al cargar sus productos. ';
        errorMessage += err.message;
        setError(errorMessage);
        setTopProducts([]);
    } finally {
        setLoading(false);
    }
};

    useEffect(() => {
        fetchProducts();
    }, []);
=======
  const validateProduct = (product) => {
    return (
      product &&
      typeof product === 'object' &&
      product.id &&
      product.name &&
      product.imageUrls &&
      typeof product.price === 'number' &&
      product.price >= 0
    );
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get('/api/products/approved');
      console.log('Productos recibidos (raw):', response);
      
      if (!response || !Array.isArray(response)) {
        throw new Error('Respuesta inválida de la API');
      }

      
      const validProducts = response.filter(product => {
        const isValid = validateProduct(product);
        if (!isValid) {
          console.warn('Producto inválido encontrado:', product);
        }
        return isValid;
      });

      console.log('Productos válidos filtrados:', validProducts);
      setTopProducts(validProducts);
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError('Error al cargar los productos. Por favor, intente nuevamente.');
      setTopProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleError = (error) => {
    console.error('Error en componente Home:', error);
    setError('Ha ocurrido un error. Por favor, intente nuevamente.');
  };

>>>>>>> develop
  return (
    <div className="home-page">
      <main className="main-content">
        <HeroMisakWelcome />
<<<<<<< HEAD
        <ProductList products={topProducts} title="Ofertas Top" />
=======
        {loading ? (
          <div className="loading">Cargando productos...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <ProductList 
            products={topProducts} 
            title="Productos Disponibles" 
            onError={handleError}
          />
        )}
>>>>>>> develop
        <div className="banner">
          <CategoryCarousel />
        </div>
        <TrendingProducts />
      </main>
    </div>
  );
};

export default Home;