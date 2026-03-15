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

    const addShoe = (newShoe) => {
        // Placeholder for future API integration
        setShoes([...shoes, { ...newShoe, id: Date.now() }]);
    };

    const updateShoe = (id, updatedData) => {
        setShoes(shoes.map(shoe => shoe.id === id ? { ...shoe, ...updatedData } : shoe));
    };

    const deleteShoe = (id) => {
        setShoes(shoes.filter(shoe => shoe.id !== id));
    };

    return (
        <ProductsContext.Provider value={{ shoes, loading, error, addShoe, updateShoe, deleteShoe, fetchProducts }}>
            {children}
        </ProductsContext.Provider>
    );
};
