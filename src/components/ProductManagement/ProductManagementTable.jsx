import React from 'react';
import './ProductManagementTable.css';
import { categories } from '../../utils/categories';
import { formatPrice } from '../../utils/Formatters/formatters';


const ProductManagementTable = ({
    products,
    selectedProducts,
    onProductSelect,
    onBulkAction,
    onAction,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    tableTitle,
    bulkActionButtons,
    actionButtons,
    newProductButton, 
    showVendorColumn = false
}) => {
    const translateStatus = (status) => {
        const statusMap = {
            'PENDING': 'Pendiente',
            'APPROVED': 'Aprobado',
            'REJECTED': 'Rechazado'
        };
        return statusMap[status] || (status.charAt(0).toUpperCase() + status.slice(1).toLowerCase());
    };

    return (
        <section className="product-management-section">
            <h2>{tableTitle}</h2>
            <div className="bulk-actions-container">
                {selectedProducts.length > 0 && (
                    <div className="bulk-actions">
                        <span>{selectedProducts.length} productos seleccionados</span>
                        {bulkActionButtons}
                    </div>
                )}
            </div>
            {newProductButton && (
                <div className="new-product-button-container">
                    {newProductButton}
                </div>
            )}
            <div className="table-actions">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Buscar por nombre, ID o vendedor..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                            <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
                        </svg>
                    </button>
                </div>
                <select
                    className="filter-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Todas las categorías</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div className="table-container">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            onProductSelect(products.map(p => p.id));
                                        } else {
                                            onProductSelect([]);
                                        }
                                    }}
                                    checked={selectedProducts.length === products.length && products.length > 0}
                                    className='input-checkbox'
                                />
                            </th>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Imágenes</th>
                            <th>Precio</th>
                            <th>Categoría</th>
                            {/* {showVendorColumn && <th>Vendedor</th>} */}
                            <th>Estado</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedProducts.includes(product.id)}
                                        onChange={() => onProductSelect(product.id)}
                                        className='input-checkbox'
                                    />
                                </td>
                                <td>{product.id}</td>
                                <td className="product-name">{product.name}</td>
                                <td>
                                    <div className="product-images">
                                        {product.imageUrls.map((url, index) => (
                                            <img
                                                key={index}
                                                src={url || '/api/placeholder/50/50'}
                                                alt={`${product.name} - Imagen ${index + 1}`}
                                                className="product-images"
                                            />
                                        ))}
                                    </div>
                                </td>
                                <td>{formatPrice(product.price)}</td>
                                <td>{categories.find(c => c.id === product.categoryId)?.name || 'N/A'}</td>
                                {/* {showVendorColumn && <td>{product.userId}</td>} */}
                                <td>
                                    <div className={`status-text ${product.status.toLowerCase()}`}>
                                        {translateStatus(product.status)}
                                    </div>
                                </td>
                                <td>
                                    {actionButtons(product)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ProductManagementTable;