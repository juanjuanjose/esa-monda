import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultProfileIcon from '../../assets/icons/no-user-avatar.svg';
import { useAuth } from '../../context/AuthContext';
import { Settings } from 'lucide-react';
import { updateUserProfile, deleteProfileImage, uploadProfileImage, deactivateUserAccount } from '../../services/auth';
import './UserProfileEdit.css';



const UserProfileEdit = () => {
    const navigate = useNavigate();
    const { user, updateUser, logout } = useAuth();
    const [profileData, setProfileData] = useState({
        username: '',
        email: '',
        phone: '',
        is_active: true,
        
    });
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);

    useEffect(() => {
        if (user) {
            setProfileData({
                username: user.username || '',
                email: user.email || '',
                phone: user.phone || '',
                is_active: user.is_active || true,
            });
            setImagePreview(user.profileImageUrl || '');
        }
    }, [user]);

    const handleSettingsClick = () => {
        setShowSettingsMenu(!showSettingsMenu);
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            setError("No se pudo cerrar sesión. Por favor, intenta de nuevo.");
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'is_active' && value === 'false') {
            setShowConfirmDialog(true);
        } else {
            setProfileData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const getProfileImage = () => {
        if (imagePreview) {
            return imagePreview;
        }
        return DefaultProfileIcon;
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 1024 * 1024) {
                setError('El archivo es demasiado grande. El tamaño máximo es 1MB.');
                return;
            }
            try {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result);
                };
                reader.readAsDataURL(file);

                console.log('User ID:', user.id);
                const updatedUser = await uploadProfileImage(user.id, file);
                console.log('Updated user:', updatedUser);
                if (updatedUser && updatedUser.profileImageUrl) {
                    updateUser(updatedUser);
                    setImagePreview(updatedUser.profileImageUrl);
                } else {
                    throw new Error('No se recibió la URL de la imagen actualizada');
                }
            } catch (error) {
                console.error('Error al subir la imagen de perfil:', error);
                if (error.message.includes('401') || error.message.includes('Unauthorized')) {
                    setError('Tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
                } else {
                    setError(`No se pudo subir la imagen de perfil: ${error.message}`);
                }
            }
        }
    };
    
    const handleDeleteImage = async () => {
        try {
            if (!user || !user.id) {
                throw new Error('No se pudo obtener el ID del usuario');
            }
            const result = await deleteProfileImage(user.id);
            updateUser(result.user);
            setImagePreview('');
            setSuccessMessage(result.message);
        } catch (error) {
            console.error("Error al eliminar la imagen de perfil:", error);
            if (error.message.includes('401') || error.message.includes('Unauthorized')) {
                setError('Tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
            } else {
                setError(`No se pudo completar la operación: ${error.message}`);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const updatedUser = await updateUserProfile(user.id, profileData);
            updateUser(updatedUser);
            setSubmissionMessage('Perfil actualizado con éxito');
            setShowSuccessModal(true);
            setTimeout(() => setShowSuccessModal(false), 2000);
        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
            setError(error.message || "Hubo un error al actualizar el perfil. Por favor, intenta de nuevo.");
        }
    };

    const handleDeactivateAccount = async () => {
        try {
            if (!user || !user.id) {
                throw new Error('ID de usuario no disponible');
            }
            await deactivateUserAccount(user.id);
            setSuccessMessage("¡Cuenta desactivada con éxito!");
            logout();
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error("Error al desactivar la cuenta:", error);
            setError(error.message || "Hubo un error al desactivar la cuenta. Por favor, intenta de nuevo.");
        }
    };




    return (
        <div className="edit-profile-container-fe">
            <div className='edit-profile-container'>
                <h1 className="edit-profile-title">Mi Perfil</h1>
                <p className="edit-profile-subtitle">Administra y protege tu cuenta</p>
                <form onSubmit={handleSubmit} className="edit-profile-form">
                    <div className="form-layout">
                        <div className="form-fields">
                            <div className="form-group">
                                <label htmlFor="username">Nombre de usuario</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={profileData.username}
                                    onChange={handleChange}
                                />
                                <small>El nombre de usuario solo se puede cambiar una vez.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Correo electrónico</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={profileData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Número de Teléfono</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={profileData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="is_active">Estado de la cuenta</label>
                                <select
                                    id="is_active"
                                    name="is_active"
                                    value={profileData.is_active}
                                    onChange={handleChange}
                                >   
                                    <option value={true}>Activa</option>
                                    <option value={false}>Inactiva</option>
                                </select>
                            </div>
                        </div>
                        <div className="profile-image-section">
                            <div className="mobile-settings-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" onClick={handleSettingsClick} viewBox="0 0 24 24" aria-hidden="true" className='settings-icon' focusable="false"><path d="M19 12.3v-.6l.9-.9c.3-.3.5-.7.6-1.2.1-.4 0-.9-.2-1.3l-1-1.7c-.2-.4-.6-.7-1-.9-.4-.2-.9-.2-1.3-.1l-1.2.3c-.2-.1-.4-.2-.5-.3L15 4.4c-.1-.4-.4-.8-.7-1.1-.4-.1-.9-.3-1.3-.3h-2c-.4 0-.9.2-1.2.4-.4.3-.6.7-.7 1.1l-.4 1.2c-.1.1-.3.2-.5.4L7 5.7c-.4-.1-.9-.1-1.3.1s-.8.5-1 .9l-1 1.7c-.2.4-.3.8-.2 1.2.1.4.3.9.6 1.2l.9.9v.6l-1 .9c-.3.3-.5.7-.6 1.2s0 .9.2 1.3l1 1.7c.2.3.4.6.7.7.5.3 1 .3 1.6.2l1.2-.3c.2.1.4.2.5.3l.4 1.2c.1.4.4.8.7 1.1.4.3.8.4 1.2.4h2c.4 0 .9-.2 1.2-.4.4-.3.6-.7.7-1.1l.3-1.2c.2-.1.4-.2.5-.3l1.2.3c.2 0 .4.1.5.1.4 0 .7-.1 1-.3.3-.2.6-.4.7-.7l1-1.7c.2-.4.3-.8.3-1.3-.1-.4-.3-.8-.6-1.2l-.7-.9zm-2-1.4l.1.5v1.1l-.1.6 1.6 1.6-1 1.7-2.2-.6-.4.2c-.3.2-.7.4-1 .6l-.5.2L13 19h-2l-.5-2.2-.5-.2c-.4-.2-.7-.4-1-.6l-.4-.3-2.2.6-1-1.7L7 13.1v-.5V10.9L5.4 9.4l1-1.7 2.2.6L9 8c.3-.2.7-.4 1-.6l.5-.2L11 5h2l.5 2.2.5.2c.4.2.7.4 1 .6l.4.3 2.2-.6 1 1.7-1.6 1.5z"></path><path d="M12 9c-1.7 0-3 1.4-3 3s1.4 3 3 3 3-1.4 3-3-1.3-3-3-3zm0 4c-.6 0-1-.5-1-1s.5-1 1-1 1 .5 1 1-.4 1-1 1z"></path></svg>
                                {showSettingsMenu && (
                                    <div className="settings-menu">
                                        <button
                                            onClick={handleLogout}
                                            className="settings-menu-item"
                                        >
                                            Cerrar sesión
                                        </button>
                                        <button
                                            onClick={() => setShowConfirmDialog(true)}
                                            className="settings-menu-item delete-account"
                                        >
                                            Eliminar cuenta
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="profile-image-container">
                                <div className="image-wrapper">
                                    <img
                                        src={getProfileImage()}
                                        alt="Perfil"
                                        className="profile-image"
                                    />
                                    {imagePreview && (
                                        <button type="button" onClick={handleDeleteImage} className="delete-image-button">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                            <input
                                type="file"
                                id="profileImage"
                                name="profileImage"
                                onChange={handleImageChange}
                                accept="image/jpeg, image/png"
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="profileImage" className="select-image-button">
                                Seleccionar Imagen
                            </label>
                            <small>Tamaño de archivo: máximo 1 MB</small>
                            <small>Extensión de archivo: .JPEG, .PNG</small>
                        </div>
                    </div>
                    {successMessage && <div className="success-message">{successMessage}</div>}
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="save-button">Guardar</button>
                </form>
            </div>
            {showConfirmDialog && (
                <div className="confirm-dialog">
                    <p>¿Estás seguro de que deseas desactivar tu cuenta?</p>
                    <button onClick={handleDeactivateAccount}>Sí, desactivar</button>
                    <button onClick={() => setShowConfirmDialog(false)}>Cancelar</button>
                </div>
            )}
            {showSuccessModal && (
                <div className="success-modal-overlay">
                    <div className="success-modal-content">
                        <svg className="success-popup__icon" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg">
                            <g transform="translate(1 1)" fill="none" fillRule="evenodd">
                                <circle stroke="#6C0" strokeWidth="2" cx="26" cy="26" r="26"></circle>
                                <path d="M25.8 35.098l13.563-13.835c.91-.91.836-2.46-.165-3.46-1-1.002-2.55-1.076-3.46-.166L23.77 29.84l-7.51-6.763c-.91-.91-2.46-.836-3.46.165-1 1-1.075 2.55-.165 3.46l9.61 8.657c.91.91 2.46.835 3.46-.166.03-.03.062-.063.092-.096z" fill="#6C0"></path>
                            </g>
                        </svg>
                        <p className="success-modal-message">{submissionMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfileEdit;