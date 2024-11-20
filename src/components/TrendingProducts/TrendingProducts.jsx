import React, { useEffect, useState } from 'react';
import './TrendingProducts.css';

const TrendingProducts = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('URL_DE_TU_API'); // Reemplaza con la URL de tu API
            const data = await response.json();
            const approvedProducts = data.filter(product => product.approved);
            setProducts(approvedProducts);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
        const intervalId = setInterval(fetchProducts, 60000); // Llama a la API cada 60 segundos

        return () => clearInterval(intervalId);
    }, []);

    const renderStars = (rating) => {
        const validRating = Math.max(0, Math.min(5, Number(rating) || 0));
        const fullStars = Math.floor(validRating);
        const hasHalfStar = validRating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <div className="trending-star-rating">
                {[...Array(5)].map((_, i) => (
                    <span
                        key={`star_${i}`}
                        className={`trending-star ${i < fullStars ? 'trending-filled' : ''} ${i >= 3 ? 'trending-opaque' : ''}`}
                    >
                        ★
                    </span>
                ))}
            </div>
        );
    };

    return (
        <>
        <div className="trending-products-container">
            <h2 className="trending-products-title">Productos de tendencia</h2>
            <div className="trending-products-grid">
                {products.length > 0 && (
                    <div className="trending-product-card-special-wrapper">
                        <div className="trending-product-card-special">
                            <div className="trending-offer-timer">
                                <h3 className='trending-offer-timer-h3'>LA OFERTA TERMINA EN</h3>
                                <div className="trending-timer-boxes">
                                    <div className="trending-timer-box">0 0</div>
                                    <div className="trending-timer-box">0 0</div>
                                    <div className="trending-timer-box">0 0</div>
                                </div>
                            </div>
                            <div className="trending-product-content-special">
                                <div className="trending-product-content">
                                    <div className="trending-product-image-container">
                                        <img
                                            src={products[0]?.image || ''}
                                            alt={products[0]?.name || 'Producto'}
                                            className="trending-product-image"
                                        />
                                        <span className="trending-discount">{products[0]?.discount || 0}%</span>
                                        <button className="trending-favorite-btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M20.877 12.52c.054-.076.103-.157.147-.239A6 6 0 0 0 12 4.528a6 6 0 0 0-9.024 7.753c.044.082.093.162.147.24l.673.961a6 6 0 0 0 .789.915L12 21.422l7.415-7.025c.293-.278.557-.584.789-.915l.673-.961Zm-14.916.425L12 18.667l6.04-5.722c.195-.185.371-.39.525-.61l.673-.961a.335.335 0 0 0 .044-.087 4 4 0 1 0-7.268-2.619v.003L12 8.667l-.013.004v-.002a3.975 3.975 0 0 0-1.237-2.574 4 4 0 0 0-6.031 5.193c.009.03.023.058.043.086l.673.961a4 4 0 0 0 .526.61Z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="trending-product-infos">
                                        <h3 className="trending-products-title">{products[0]?.name || 'Producto'}</h3>
                                        <div className="product-rating-container">
                                            {renderStars(products[0]?.rating)}
                                            <span className="product-rating-value">({products[0]?.rating?.toFixed(1) || '0.0'})</span>
                                        </div>
                                        <div className="product-price-container ">
                                            <p className="product-price">
                                                ${products[0]?.price?.toFixed(2) || '0.00'}
                                            </p>
                                            <p className="product-discount">
                                                ${products[0]?.discount ? (products[0].price + (products[0].price * products[0].discount / 100)).toFixed(2) : '0.00'}
                                            </p>
                                        </div>
                                        <div className="product-price-container-b ">
                                            <span className="title-ventas">Cantidad: {products[0]?.quantity || 0}</span>
                                            <span className="trending-sold">Vendido: {products[0]?.sold || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="trending-product-card-wrapper">
                    {products.slice(1).map((product) => (
                        <div key={product.id} className="trending-product-card">
                            <div className="trending-product-content">
                                <div className="trending-product-image-container">
                                    <img
                                        src={product.image || ''}
                                        alt={product.name || 'Producto'}
                                        className="trending-product-image-div"
                                    />
                                    <span className="trending-discount">{product.discount || 0}%</span>
                                    <button className="trending-favorite-btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M20.877 12.52c.054-.076.103-.157.147-.239A6 6 0 0 0 12 4.528a6 6 0 0 0-9.024 7.753c.044.082.093.162.147.24l.673.961a6 6 0 0 0 .789.915L12 21.422l7.415-7.025c.293-.278.557-.584.789-.915l.673-.961Zm-14.916.425L12 18.667l6.04-5.722c.195-.185.371-.39.525-.61l.673-.961a.335.335 0 0 0 .044-.087 4 4 0 1 0-7.268-2.619v.003L12 8.667l-.013.004v-.002a3.975 3.975 0 0 0-1.237-2.574 4 4 0 0 0-6.031 5.193c.009.03.023.058.043.086l.673.961a4 4 0 0 0 .526.61Z"></path>
                                        </svg>
                                    </button>
                                </div>
                                <div className="trending-product-info">
                                    <h3 className="trending-product-name">{product.name || 'Producto'}</h3>
                                    <div className="trending-rating">
                                        {renderStars(product.rating)}
                                        <span className="trending-rating-count">({product.rating?.toFixed(1) || '0.0'})</span>
                                    </div>
                                    <div className="trending-price-info">
                                        <p className="trending-price">
                                            ${product.price?.toFixed(2) || '0.00'}
                                        </p>
                                        <p className="trending-discount-info">${product.discount ? (product.price + (product.price * product.discount / 100)).toFixed(2) : '0.00'}</p>
                                    </div>
                                    <div className='trending-container'>
                                        <p className='trending-ventas'>Vendidos</p>
                                        <p className="trending-sold">{product.totalSales}</p>
                                    </div>
                                    <p className="trending-shipping">Envío gratis</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
};

export default TrendingProducts;
