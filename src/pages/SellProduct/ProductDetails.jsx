import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { categories } from '../../utils/categories';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './ProductDetails.css';

const ProductDetails = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const isEditing = !!id;
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [productData, setProductData] = useState({
        name: '',
        price: '',
        description: '',
        stock: '',
        category: '',
        images: []
    });
    

    const [errors, setErrors] = useState({});
    const [submissionMessage, setSubmissionMessage] = useState('');
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    
    const containsProfanity = (text) => {
        const profanityList = ['palabra1', 'palabra2', 'palabra3']; // Añade tu lista de palabras prohibidas
        return profanityList.some(word => text.toLowerCase().includes(word));
    };

    const validateForm = () => {
        let newErrors = {};
        if (!productData.name.trim()) {
            newErrors.name = "El nombre es obligatorio";
        } else if (productData.name.length > 100) {
            newErrors.name = "El nombre debe tener menos de 100 caracteres";
        } else if (containsProfanity(productData.name)) {
            newErrors.name = "El nombre contiene lenguaje inapropiado";
        }

        if (productData.description.length > 500) {
            newErrors.description = "La descripción debe tener menos de 500 caracteres";
        } else if (containsProfanity(productData.description)) {
            newErrors.description = "La descripción contiene lenguaje inapropiado";
        }

        if (!productData.price) {
            newErrors.price = "El precio es obligatorio";
        } else {
            const numericPrice = parseFloat(productData.price.replace(/[^\d]/g, ''));
            if (isNaN(numericPrice) || numericPrice <= 0) {
                newErrors.price = "El precio debe ser un número mayor que cero";
            } else if (numericPrice > 999999999) { 
                newErrors.price = "El precio excede el límite permitido";
            }
        }

        if (!productData.stock) {
            newErrors.stock = "El stock es obligatorio";
        } else if (isNaN(productData.stock) || parseInt(productData.stock) < 0) {
            newErrors.stock = "El stock debe ser un número no negativo";
        }

        if (!productData.category) {
            newErrors.category = "La categoría es obligatoria";
        }

        if (productData.images.length === 0) {
            newErrors.images = "Debe subir al menos una imagen";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData(prevData => ({
            ...prevData,
            [name]: value
        }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: null }));
    };


    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const totalImages = productData.images.length + files.length;

        if (totalImages > 3) {
            setErrors({ ...errors, images: "Solo puedes subir un máximo de 3 imágenes." });
            return;
        }

        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        setProductData({
            ...productData,
            images: [...productData.images, ...newImages]
        });
        setErrors({ ...errors, images: null });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const files = Array.from(e.dataTransfer.files);
        handleImageUpload({ target: { files } });
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        if (isEditing && id) {
            fetchProductDetails();
        }
    }, [isEditing, id]);

    const handleRemoveImage = (index) => {
        const newImages = [...productData.images];
        URL.revokeObjectURL(newImages[index].preview);
        newImages.splice(index, 1);
        setProductData({
            ...productData,
            images: newImages
        });
    };

    const fetchProductDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await api.get(`/api/products/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Añade estos logs para debugging
            console.log('Respuesta completa del servidor:', response);
            console.log('Categoría en la respuesta:', response.categoryId);

            // Mapear los datos recibidos
            const mappedData = {
                name: response.name,
                price: response.price.toString(),
                description: response.description,
                stock: response.stock.toString(),
                // Verifica si la categoría está en otro campo
                category: response.categoryId?.toString() || response.category?.toString() || '',
                images: response.images.map(image => ({
                    file: null,
                    preview: image.imageUrl
                }))
            };

            console.log('Datos mapeados:', mappedData);

            setProductData(mappedData);

        } catch (error) {
            console.error('Error al cargar los detalles del producto:', error);
            setErrors(prev => ({
                ...prev,
                fetch: 'Error al cargar los detalles del producto: ' + error.message
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            try {
                const formData = new FormData();
                formData.append('name', productData.name);
                formData.append('description', productData.description);
                formData.append('price', parseFloat(productData.price.replace(/[^\d]/g, '')) || 0);
                formData.append('stock', parseInt(productData.stock) || 0);
                formData.append('categoryId', parseInt(productData.category) || 0);
                formData.append('userId', user.id);

                const existingImages = productData.images
                    .filter(image => !image.file)
                    .map(image => image.preview);

                if (existingImages.length > 0) {
                    formData.append('existingImages', JSON.stringify(existingImages));
                }

                productData.images
                    .filter(image => image.file)
                    .forEach((image) => {
                        formData.append('image', image.file);
                    });

                let response;
                let successMessage;
                if (isEditing) {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        throw new Error('No hay token de autenticación');
                    }

                    response = await api.put(`/api/products/${id}`, formData, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    successMessage = 'Producto actualizado con éxito.';
                } else {
                    formData.append('status', 'PENDING');
                    response = await api.post('/api/products', formData);
                    successMessage = 'Su producto se publicó con éxito.\nEspere la aprobación del administrador.';
                }

                setShowModal(true);
                setSubmissionMessage(successMessage);
                setTimeout(() => {
                    setShowModal(false);
                    navigate('/my/publications', { state: { refresh: true, newProductId: response.id } });
                }, 2000);
            } catch (error) {
                console.error('Error:', error);
                let errorMessage = isEditing ? "Error al actualizar el producto" : "Error al crear el producto";
                errorMessage += ". Por favor, inténtalo de nuevo.";
                if (error.response) {
                    errorMessage = error.response.data?.message || error.response.statusText;
                } else if (error.request) {
                    errorMessage = "No se recibió respuesta del servidor";
                } else {
                    errorMessage = error.message;
                }
                setErrors({ ...errors, submit: errorMessage });
            } finally {
                setIsLoading(false);
            }
        }
    };


    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className="product-details__container">
            <div className='product-details__container-div'>
                <button onClick={handleBackClick} className="product-details__back-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M2.7 11.3L2 12l.7.7 4 4c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4L5.8 13H15c.6 0 1-.4 1-1s-.4-1-1-1H5.8l2.3-2.3c.2-.2.3-.4.3-.7 0-.6-.4-1-1-1-.3 0-.5.1-.7.3l-4 4z"></path><path d="M22 19H10v-2h10V7H10V5h12z"></path></svg>
                    <p>Volver</p>
                </button>
                <h1 className="product-details__title">{isEditing ? 'Editar Producto' : 'Añadir Nuevo Producto'}</h1>
                <p className="product-details__introduction">
                    Completa los detalles del producto para añadirlo a <strong>nuestra tienda MisakGuambShop</strong>. Proporciona información precisa para ayudar a los clientes a tomar decisiones informadas y valorar el trabajo artesanal único de la comunidad Misak.
                </p>
                <form onSubmit={handleSubmit} className="product-details__form" noValidate>
                    <div className="product-details__form-group">
                        <label htmlFor="name" className="product-details__label">Nombre del Producto</label>
                        <div className={`product-details__input-wrapper ${errors.name ? 'error' : ''}`}>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={productData.name}
                                onChange={handleInputChange}
                                placeholder="Ingresa el nombre del producto"
                                required
                                className="product-details__input"
                            />
                        </div>
                        {errors.name && <p className="product-details__error">{errors.name}</p>}
                    </div>
                    <div className="product-details__form-group">
                        <label htmlFor="price" className="product-details__label">Precio</label>
                        <div className={`product-details__input-wrapper ${errors.price ? 'error' : ''}`}>
                            <input
                                id="price"
                                type="text" // Cambiar de 'number' a 'text'
                                name="price"
                                value={productData.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^\d]/g, '');
                                    handleInputChange({
                                        target: {
                                            name: 'price',
                                            value: value
                                        }
                                    });
                                }}
                                placeholder="Ingresa el precio"
                                required
                                className="product-details__input"
                            />
                        </div>
                        {errors.price && <p className="product-details__error">{errors.price}</p>}
                    </div>
                    <div className="product-details__form-group">
                        <label htmlFor="stock" className="product-details__label">Cantidad en Inventario</label>
                        <div className={`product-details__input-wrapper ${errors.stock ? 'error' : ''}`}>
                            <input
                                id="stock"
                                type="number"
                                name="stock"
                                value={productData.stock}
                                onChange={handleInputChange}
                                placeholder="Ingresa la cantidad disponible"
                                required
                                min="0"
                                className="product-details__input"
                            />
                        </div>
                        {errors.stock && <p className="product-details__error">{errors.stock}</p>}
                    </div>
                    <div className="product-details__form-group">
                        <label htmlFor="category" className="product-details__label">Categoría</label>
                        <select
                            id="category"
                            name="category"
                            value={productData.category}
                            onChange={handleInputChange}
                            required
                            className={`product-details__select ${errors.category ? 'error' : ''}`}
                        >
                            <option value="">Selecciona una categoría</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id.toString()}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category && <p className="product-details__error">{errors.category}</p>}
                    </div>
                    <div className="product-details__form-group">
                        <label htmlFor="description" className="product-details__label">Descripción</label>
                        <textarea
                            id="description"
                            name="description"
                            value={productData.description}
                            onChange={handleInputChange}
                            placeholder="Describe tu producto detalladamente..."
                            required
                            maxLength="500"
                            className={`product-details__textarea ${errors.description ? 'error' : ''}`}
                        />
                        {errors.description && <p className="product-details__error">{errors.description}</p>}
                    </div>
                    <div className="product-details__form-group">
                        <label htmlFor="images" className="product-details__label">Imágenes del Producto</label>
                        <div
                            className={`product-details__image-upload-area ${errors.images ? 'error' : ''}`}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            {productData.images.length > 0 ? (
                                <div className="product-details__image-preview-container">
                                    {productData.images.map((image, index) => (
                                        <div key={index} className="product-details__image-preview">
                                            <img src={image.preview} alt={`Preview ${index}`} />
                                            <div className="product-details__image-actions">
                                                <button type="button" onClick={() => handleRemoveImage(index)}>Eliminar</button>
                                            </div>
                                        </div>
                                    ))}
                                    {productData.images.length < 3 && (
                                        <div
                                            className="product-details__image-upload"
                                            onClick={handleUploadClick}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                <polyline points="17 8 12 3 7 8" />
                                                <line x1="12" y1="3" x2="12" y2="15" />
                                            </svg>
                                            <p>Seleccionar</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className={`product-details__image-upload-b ${errors.images ? 'error' : ''}`}
                                    onClick={handleUploadClick}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="17 8 12 3 7 8" />
                                        <line x1="12" y1="3" x2="12" y2="15" />
                                    </svg>
                                    <p>Seleccionar o arrastrar los archivos aquí</p>
                                    <span>Sube tu imagen en JPG, JPEG, PNG o WEBP con una resolución mínima de 500 píxeles en ambos lados y hasta 20MB de peso.</span>
                                </div>
                            )}
                            <input
                                ref={fileInputRef}
                                id="images"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                className="product-details__file-input"
                                style={{ display: 'none' }}
                            />
                        </div>
                        {errors.images && <p className="product-details__error">{errors.images}</p>}
                    </div>
                    {submissionMessage && (
                        <div className="product-details__submission-message">
                            {submissionMessage}
                        </div>
                    )}
                    {errors.submit && <p className="product-details__error">{errors.submit}</p>}
                    <button type="submit" className="product-details__submit-button">
                        {isEditing ? 'Guardar cambios' : 'Publicar producto'}
                    </button>
                </form>
                {isLoading && (
                    <div className="loading-overlay-background">
                        <div className="loading-spinner-container">
                            <div className="loading-spinner">
                                <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" className="loading-animation">
                                    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                )}
                {showModal && (
                    <div className="success-modal-overlay">
                        <div className="success-modal-content">
                            <svg class="success-popup__icon" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><g transform="translate(1 1)" fill="none" fill-rule="evenodd"><circle stroke="#6C0" stroke-width="2" cx="26" cy="26" r="26"></circle><path d="M25.8 35.098l13.563-13.835c.91-.91.836-2.46-.165-3.46-1-1.002-2.55-1.076-3.46-.166L23.77 29.84l-7.51-6.763c-.91-.91-2.46-.836-3.46.165-1 1-1.075 2.55-.165 3.46l9.61 8.657c.91.91 2.46.835 3.46-.166.03-.03.062-.063.092-.096z" fill="#6C0"></path></g></svg>
                            <p className="success-modal-message">{submissionMessage} </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;