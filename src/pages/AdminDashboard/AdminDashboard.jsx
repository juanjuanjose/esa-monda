import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import ProductManagementTable from '../../components/ProductManagement/ProductManagementTable';
import DefaultProfileIcon from '../../assets/icons/no-user-avatar.svg';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
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

    useEffect(() => {
        fetchPendingProducts();
    }, []);

    const fetchPendingProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.get('/api/products/pending');
            if (Array.isArray(response)) {
                setProducts(response);
            } else {
                throw new Error('Invalid response format: not an array');
            }
        } catch (err) {
            console.error('Error fetching pending products:', err);
            setError('Error al cargar los productos pendientes. Por favor, intente de nuevo más tarde.');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = (product, newStatus) => {
        setCurrentProduct({ ...product, status: newStatus });
        setAction(newStatus);
        setShowModal(true);
    };

    const confirmAction = async () => {
        try {
            if (action === 'approved') {
                await api.post(`/api/products/approve/${currentProduct.id}`);
            } else if (action === 'rejected') {
                const reason = "Razón del rechazo"; 
                await api.post(`/api/products/reject/${currentProduct.id}`, { reason });
            }
            setProducts(products.filter(p => p.id !== currentProduct.id));
            setSelectedProducts(selectedProducts.filter(id => id !== currentProduct.id));
            setShowModal(false);
        } catch (err) {
            console.error(`Error al ${action === 'approved' ? 'aprobar' : 'rechazar'} el producto:`, err);
            setError(`Error al ${action === 'approved' ? 'aprobar' : 'rechazar'} el producto. Por favor, intente de nuevo.`);
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

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const idMatch = product.id.toString().includes(searchTerm);
            const userIdMatch = product.userId && product.userId.toString().toLowerCase().includes(searchTerm.toLowerCase());
            const categoryMatch = selectedCategory ? product.categoryId === parseInt(selectedCategory) : true;

            return (nameMatch || idMatch || userIdMatch) && categoryMatch;
        });
    }, [products, searchTerm, selectedCategory]);

    const handleBulkAction = async (bulkAction) => {
        try {
            for (const productId of selectedProducts) {
                if (bulkAction === 'approve') {
                    await api.post(`/api/products/approve/${productId}`);
                } else if (bulkAction === 'reject') {
                    await api.post(`/api/products/reject/${productId}`);
                }
            }
            setProducts(products.filter(p => !selectedProducts.includes(p.id)));
            setSelectedProducts([]);
        } catch (err) {
            setError(`Error al realizar la acción masiva. Por favor, intente de nuevo.`);
        }
    };

    const getProfileImage = () => {
        return user && user.profileImageUrl ? user.profileImageUrl : DefaultProfileIcon;
    };

    if (loading) return <div className="admin-dashboard-loading">Cargando...</div>;

    return (
        <div className="admin-dashboard-container">
            <div className="admin-dashboard-profile-header">
                <div className="admin-dashboard-user-profile-icons">
                    <img src={getProfileImage()} alt={`Perfil de ${user ? user.name : 'Usuario'}`} className="admin-dashboard-profile-icon" />
                    <span className="admin-dashboard-user-name">{user ? user.name : ''}</span>
                    <span><Link to="/user/profile/edit" className="admin-dashboard-edit-profile">Editar perfil</Link></span>
                </div>
                <div className="admin-dashboard-profile-nav">
                    <ul>
                        <li>
                            <Link to="/user/profile/edit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                </svg>
                                <p>Mi cuenta</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/dashboard">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                </svg>
                                <p>Revisión de Productos</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                </svg>
                                <p>Gestión de Productos</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <main className="admin-dashboard-main-content">
                <ProductManagementTable
                    products={filteredProducts}
                    selectedProducts={selectedProducts}
                    onProductSelect={handleProductSelect}
                    onBulkAction={handleBulkAction}
                    onAction={handleStatusChange}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    tableTitle="Panel de Revisión de Productos"
                    bulkActionButtons={
                        <>
                            <button onClick={() => handleBulkAction('approve')} className="action-btn primary">Aprobar todo</button>
                            <button onClick={() => handleBulkAction('reject')} className="action-btn secondary">Rechazar todo</button>
                        </>
                    }
                    actionButtons={(product) => (
                        <>
                            <div className="action-buttons">
                                <button onClick={() => handleStatusChange(product, 'approved')} className="action-btn primary">Aprobar</button>
                                <button onClick={() => handleStatusChange(product, 'rejected')} className="action-btn secondary">Rechazar</button>
                            </div>

                        </>
                    )}
                    showVendorColumn={true}
                />
            </main>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{action === 'approved' ? 'Aprobar Producto' : 'Rechazar Producto'}</h2>
                        <p>¿Está seguro que desea {action === 'approved' ? 'aprobar' : 'rechazar'} este producto?</p>
                        <div className="modal-buttons">
                            <button onClick={confirmAction} className="confirm-btn">Aceptar</button>
                            <button onClick={() => setShowModal(false)} className="cancel-btn">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;