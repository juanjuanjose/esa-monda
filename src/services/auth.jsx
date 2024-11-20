import api from './api';


const API_URL = '/api/auth';


export const registerUser = async (userData) => {
    try {
        const response = await api.post(`${API_URL}/signup`, userData);

        if (response && response.user) {
            const userToStore = {
                ...response.user,
                username: userData.username,
                email: userData.email,
                phone: userData.phone
            };
            localStorage.setItem('user', JSON.stringify(userToStore));
            if (response.accessToken) {
                localStorage.setItem('token', response.accessToken);
            }
        }

        return response;
    } catch (error) {
        console.error("Error de registro:", error);
        throw error;
    }
};




export const loginUser = async (loginData) => {
    try {
        const response = await api.post(`${API_URL}/login`, loginData);

        if (response && response.user) {
            const userToStore = {
                ...response.user,
                id: response.user.id,
                email: loginData.email,
                username: response.user.username,
                phone: response.user.phone,
                isAdmin: response.user.is_admin || response.user.roles?.includes('ADMIN') || false,
                isSeller: response.user.is_seller || response.user.roles?.includes('SELLER') || false,
                is_active: response.user.is_active,
                profileImageUrl: response.user.profileImageUrl,
                roles: response.user.roles || [],
            };
            localStorage.setItem('user', JSON.stringify(userToStore));
            localStorage.setItem('token', response.accessToken);
            console.log('Usuario almacenado:', userToStore);
            return { ...response, user: userToStore };
        }
        return response;
    } catch (error) {
        console.error("Error de inicio de sesión:", error);
        throw error;
    }
};

export const forgotPassword = async (email) => {
    try {
        const response = await api.post(`/api/users/forgot-password`, { email });
        return response;
    } catch (error) {
        console.error("Error al solicitar restablecimiento de contraseña:", error);
        throw error;
    }
};

export const resetPassword = async (token, newPassword) => {
    try {
        const response = await api.put(`/api/users/reset-password`, { token, newPassword });
        return response;
    } catch (error) {
        console.error("Error al restablecer la contraseña:", error);
        if (error.response) {
            const errorMessage = await handleError(error);
            throw new Error(errorMessage);
        }
        throw error;
    }
};

export const validateResetToken = async (token) => {
    try {
        console.log("Validando token:", token);
        const response = await api.get(`/api/users/reset-password?token=${token}`, { headers: {} }); // Sin encabezado Authorization
        return response;
    } catch (error) {
        console.error("Error al validar el token de restablecimiento:", error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    const tokenStr = localStorage.getItem('token');
    if (userStr && tokenStr) {
        const user = JSON.parse(userStr);
        if (!user.id) {
            console.warn('ID de usuario no encontrado en localStorage');
            return null;
        }
        return user;
    }
    return null;
};

export const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
};

export const updateUserProfile = async (userId, profileData) => {
    try {
        const response = await api.put(`/api/users/${userId}`, profileData);

        console.log("Respuesta del servidor:", response);

        if (response && typeof response === 'object' && !Array.isArray(response)) {
            console.log("Datos actualizados:", response);

            const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
            const updatedUser = { ...currentUser, ...response };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            return updatedUser;
        } else {
            console.error("Estructura de respuesta inesperada:", response);
            throw new Error('La respuesta del servidor no tiene la estructura esperada');
        }
    } catch (error) {
        console.error("Error al actualizar el perfil de usuario:", error);
        throw error;
    }
};

export const uploadProfileImage = async (userId, imageFile) => {
    try {
        const formData = new FormData();
        formData.append('image', imageFile);

        const response = await api.post(`/api/users/${userId}/profile-image`, formData, {
            headers: {
            }
        });

        if (response && response.profileImageUrl) {
            const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
            const updatedUser = { ...currentUser, profileImageUrl: response.profileImageUrl };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            return updatedUser;
        }
        throw new Error('La respuesta del servidor no incluyó la URL de la imagen de perfil');
    } catch (error) {
        console.error("Error uploading profile image:", error);
        throw error;
    }
};

export const deleteProfileImage = async (userId) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No se encontró el token de autenticación');
        }

        const response = await api.delete(`/api/users/${userId}/profile-image`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response && response.success) {
            const updatedUser = response.user;
            localStorage.setItem('user', JSON.stringify(updatedUser));
            return {
                user: updatedUser,
                message: response.message
            };
        }
        throw new Error(response.message || 'Error desconocido al eliminar la imagen de perfil');
    } catch (error) {
        console.error("Error en deleteProfileImage:", error);
        throw error;
    }
};

export const deactivateUserAccount = async (id) => {
    try {
        const response = await api.patch(`/api/users/${id}/deactivate`);
        console.log("Respuesta del servidor:", response);

        if (response && response.success) {
            return {
                success: true,
                message: response.message || 'Cuenta desactivada exitosamente'
            };
        }

        throw new Error(response.message || 'No se pudo desactivar la cuenta');
    } catch (error) {
        console.error("Error al desactivar la cuenta:", error);
        throw error;
    }
};

export const reactivateAccount = async (email) => {
    try {
        console.log("Intentando reactivar cuenta para el email:", email);
        const response = await api.post(`/api/users/reactivate`, { email });
        console.log("Respuesta del servidor (reactivación):", response);

        if (response && response.success) {
            return {
                success: true,
                message: response.message || 'Cuenta reactivada exitosamente'
            };
        } else {
            throw new Error(response.message || 'No se pudo reactivar la cuenta');
        }
    } catch (error) {
        console.error("Error al reactivar la cuenta:", error);
        throw error;
    }
};

export const refreshAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No hay token de autenticación');
    }
    try {
        const response = await api.post(`${API_URL}/refresh-token`, { token });
        if (response && response.accessToken) {
            localStorage.setItem('token', response.accessToken);
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error al refrescar la autenticación:", error);
        return false;
    }
};


const handleResponse = async (response) => {
    if (response && response.headers) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return await response.json();
        } else {
            return await response.text();
        }
    } else {
        return "Operación exitosa"; 
    }
};

const handleError = async (error) => {
    if (error.response) {
        const contentType = error.response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const errorData = await error.response.json();
            return errorData.message || "Ocurrió un error inesperado";
        } else {
            const errorText = await error.response.text();
            return errorText || "Ocurrió un error inesperado";
        }
    }
    return "Ocurrió un error inesperado";
};