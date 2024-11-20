import React from 'react';
import { X, Minus, Plus } from 'lucide-react';

const ProductModal = ({ product, onClose, onUpdateQuantity }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      onUpdateQuantity(product.id, newQuantity);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{product.name}</h2>
          <button onClick={onClose} className="close-button">
            <X size={24} />
          </button>
        </div>
        <img src={product.image} alt={product.name} />
        <p className="product-description">{product.description}</p>
        <p className="product-price">Precio: COP {product.price.toLocaleString()}</p>
        <div className="quantity-selector">
          <span>Cantidad:</span>
          <div className="quantity-buttons">
            <button 
              onClick={() => handleQuantityChange(product.quantity - 1)}
              disabled={product.quantity <= 1}
              className="quantity-button"
            >
              <Minus size={20} />
            </button>
            <span>{product.quantity}</span>
            <button 
              onClick={() => handleQuantityChange(product.quantity + 1)}
              disabled={product.quantity >= product.stock}
              className="quantity-button"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
        <p className="stock-info">Stock disponible: {product.stock}</p>
      </div>
    </div>
  );
};

export default ProductModal;