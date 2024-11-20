import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import ProductManagementTable from '../../components/ProductManagement/ProductManagementTable';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './MyPublicacion.css'

const MyPublications = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [action, setAction] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (user) {
            fetchUserProducts();
        }
    }, [user]);

    useEffect(() => {
        if (location.state?.refresh) {
            fetchUserProducts();
        }
    }, [location.state]);

    const fetchUserProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await api.get('/api/products/my-products', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response || !Array.isArray(response)) {
                throw new Error('Respuesta inválida de la API');
            }

            setProducts(response);
        } catch (err) {
            console.error('Error detallado:', err);
            let errorMessage = 'Error al cargar sus productos. ';
            errorMessage += err.message;
            setError(errorMessage);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product) => {
        navigate(`/products/${product.id}`);
    };

    const handleDelete = (product) => {
        setCurrentProduct(product);
        setAction('delete');
        setShowModal(true);
    };

    const actionButtons = (product) => (
        <div className="action-buttons">
            <button onClick={() => handleEdit(product)} className="action-btn primary">Editar</button>
            <button onClick={() => handleDelete(product)} className="action-btn secondary">Eliminar</button>
        </div>
    );

    const confirmAction = async () => {
        try {
            if (action === 'delete') {
                await api.delete(`/api/products/${currentProduct.id}`);
                setProducts(products.filter(p => p.id !== currentProduct.id));
                setShowModal(false);
            }
        } catch (err) {
            console.error('Error en confirmAction:', err);
            setError(`Error al eliminar el producto. Por favor, intente nuevamente.`);
        }
    };

    const handleProductSelect = (productId) => {
        setSelectedProducts(prev =>
            Array.isArray(productId)
                ? productId
                : prev.includes(productId)
                    ? prev.filter(id => id !== productId)
                    : [...prev, productId]
        );
    };

    const handleBulkDelete = async () => {
        try {
            for (const productId of selectedProducts) {
                await api.delete(`/api/products/${productId}`);
            }
            setProducts(products.filter(p => !selectedProducts.includes(p.id)));
            setSelectedProducts([]);
        } catch (err) {
            console.error('Error en eliminación masiva:', err);
            setError(`Error al eliminar los productos seleccionados: ${err.message}`);
        }
    };

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const idMatch = product.id.toString().includes(searchTerm);
            const categoryMatch = selectedCategory ? product.categoryId === parseInt(selectedCategory) : true;

            return (nameMatch || idMatch) && categoryMatch;
        });
    }, [products, searchTerm, selectedCategory]);

    const newProductButton = (
        <Link to="/product-details" className="create-product-button">
            Nuevo producto
        </Link>
    );

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="my-publications-container">
            <main className="my-publications-main-content">
                {error ? (
                    <div className="error-message">
                        <p>{error}</p>
                        <button onClick={fetchUserProducts} className="retry-button mt-3">
                            Intentar de nuevo
                        </button>
                    </div>
                ) : (
                    <>
                        {products.length > 0 ? (
                            <ProductManagementTable
                                products={filteredProducts}
                                selectedProducts={selectedProducts}
                                onProductSelect={handleProductSelect}
                                onBulkAction={handleBulkDelete}
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                                tableTitle="Mis Publicaciones"
                                bulkActionButtons={
                                    <button onClick={handleBulkDelete} className="bulk-delete-btn">
                                        Eliminar Seleccionados ({selectedProducts.length})
                                    </button>
                                }
                                actionButtons={actionButtons}
                                newProductButton={newProductButton}
                            />
                        ) : (
                            <div className="no-products-message">
                                <div className='no-products-message-icons'>
                                  <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="w-full h-full text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    >
                                    <path
                                    d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5V3C9 2.44772 9.44772 2 10 2H14C14.5523 2 15 2.44772 15 3V5M9 5H15M12 11H15M12 15H15M9 11H9.01M9 15H9.01"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    />
                                 </svg>  
                                </div>
                                <h3 className='no-orders-p'>Aún no hay publicaciones</h3>
                                <p className='no-products-message-p'>
                                    Es el momento de mostrar el arte y tradición de nuestra comunidad. Comparte tus productos artesanales y textiles únicos en MisakGuambShop. Sube tus creaciones, personaliza cada detalle y gestiona tu catálogo de manera sencilla.
                                    Tu trabajo merece ser visto: conecta con compradores interesados en preservar la riqueza cultural y disfruta de una plataforma diseñada para hacer crecer tu negocio.
                                    ¡Empieza a publicar hoy y marca la diferencia!
                                </p>
                            </div>
                        )}

                        {showModal && (
                            <div className="modal">
                                <div className="modal-content">
                                    <h2>{action === 'delete' ? 'Eliminar Producto' : 'Editar Producto'}</h2>
                                    <p>
                                        {action === 'delete'
                                            ? '¿Está seguro que desea eliminar este producto?'
                                            : '¿Desea editar este producto?'}
                                    </p>
                                    <div className="modal-buttons">
                                        <button onClick={confirmAction} className="confirm-btn">
                                            {action === 'delete' ? 'Eliminar' : 'Editar'}
                                        </button>
                                        <button onClick={() => setShowModal(false)} className="cancel-btn">
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default MyPublications;
