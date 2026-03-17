import React, { createContext, useState, useEffect } from 'react';
import api from '../api/axiosInstance';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [shoes, setShoes] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await api.get('Product/GetAllProducts', { useAuth: false });
            if (response.data.isSuccess) {
                setShoes(response.data.data);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addShoe = async (newShoe) => {
        try {
            const response = await api.post('Product', newShoe, { useAuth: true });
            if (response.data.isSuccess) {
                await fetchProducts();
                return { success: true };
            }
            return { success: false, message: response.data.message };
        } catch (err) {
            return { success: false, message: err.message };
        }
    };

    const updateShoe = async (id, updatedData) => {
        try {
            const response = await api.put(`Product/${id}`, updatedData, { useAuth: true });
            if (response.data.isSuccess) {
                await fetchProducts();
                return { success: true };
            }
            return { success: false, message: response.data.message };
        } catch (err) {
            return { success: false, message: err.message };
        }
    };

    const deleteShoe = async (id) => {
        try {
            const response = await api.delete(`Product/${id}`, { useAuth: true });
            if (response.data.isSuccess) {
                setShoes(shoes.filter(shoe => shoe.id !== id));
                return { success: true };
            }
            return { success: false, message: response.data.message };
        } catch (err) {
            return { success: false, message: err.message };
        }
    };

    return (
        <ProductsContext.Provider value={{ shoes, loading, error, addShoe, updateShoe, deleteShoe, fetchProducts }}>
            {children}
        </ProductsContext.Provider>
    );
};
