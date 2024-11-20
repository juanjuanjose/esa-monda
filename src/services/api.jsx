//   const baseURL = 'http://localhost:8080';
 const baseURL = 'https://misakguambshop-rest-api.up.railway.app'

const getAuthToken = () => localStorage.getItem('token');

const parseResponse = async (response) => {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
    } else {
        const text = await response.text();
        try {
            return JSON.parse(text);
        } catch (e) {
            return text; status
        }
    }
};

const api = {
    get: async (url, options = {}) => {
        const token = getAuthToken();
        const headers = {
            'Content-Type': 'application/json',
            ...(url.includes('/reset-password') || url.includes('/forgot-password') ? {} : { 'Authorization': `Bearer ${token}` }), // No agregar Auth header para reset-password y forgot-password
            ...options.headers,
        };
        const response = await fetch(`${baseURL}${url}`, {
            ...options,
            method: 'GET',
            headers: headers,
        });
        if (!response.ok) {
            const errorBody = await parseResponse(response);
            throw new Error(typeof errorBody === 'string' ? errorBody : JSON.stringify(errorBody));
        }
        return parseResponse(response);
    },
    post: async (url, data, options = {}) => {
        let headers = {
            ...options.headers,
        };

        if (!url.includes('/reset-password') && !url.includes('/forgot-password')) {
            const token = getAuthToken();
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
        }

        let body;
        if (data instanceof FormData) {
            body = data;
        } else {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(data);
        }

        const response = await fetch(`${baseURL}${url}`, {
            ...options,
            method: 'POST',
            headers: headers,
            body: body,
        });

        const responseData = await parseResponse(response);

        if (!response.ok) {
            throw new Error(typeof responseData === 'string' ? responseData : JSON.stringify(responseData));
        }
        return responseData;
    },
    put: async (url, data, options = {}) => {
        const token = getAuthToken();
        try {
            let headers = {
                'Authorization': `Bearer ${token}`,
                ...options.headers,
            };

            if (!(data instanceof FormData)) {
                headers['Content-Type'] = 'application/json';
                data = JSON.stringify(data);
            }

            const response = await fetch(`${baseURL}${url}`, {
                ...options,
                method: 'PUT',
                headers: headers,
                body: data,
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);

            if (!response.ok) {
                const errorBody = await parseResponse(response);
                console.error('Error body:', errorBody);
                throw new Error(typeof errorBody === 'string' ? errorBody : JSON.stringify(errorBody));
            }
            return parseResponse(response);
        } catch (error) {
            console.error('Error in PUT request:', error);
            console.error('Request URL:', `${baseURL}${url}`);
            console.error('Request data:', data);
            throw error;
        }
    },
    patch: async (url, data, options = {}) => {
        const token = getAuthToken();
        try {
            const response = await fetch(`${baseURL}${url}`, {
                ...options,
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    ...options.headers,
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                const errorBody = await parseResponse(response);
                throw new Error(typeof errorBody === 'string' ? errorBody : JSON.stringify(errorBody));
            }
            return parseResponse(response);
        } catch (error) {
            console.error('Error in PATCH request:', error);
            throw error;
        }
    },
    delete: async (url, options = {}) => {
        const token = getAuthToken();
        try {
            const response = await fetch(`${baseURL}${url}`, {
                ...options,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    ...options.headers,
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Error en la solicitud al servidor');
            }
            try {
                return await response.json();
            } catch (e) {
                return {};
            }
        } catch (error) {
            console.error('Error en delete request:', error);
            throw error;
        }
    },
};
export default api;