import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartData, setCartData] = useState(() => {
        const savedCart = localStorage.getItem('cart_shoes');
        return savedCart ? JSON.parse(savedCart) : { items: [] };
    });

    // Guardar en LocalStorage automáticamente
    useEffect(() => {
        localStorage.setItem('cart_shoes', JSON.stringify(cartData));
    }, [cartData]);

    const addToCart = (product) => {
        console.log(product);
        setCartData((prev) => ({
            ...prev,
            items: [...prev.items, product]
        }));
    };

    const clearCart = () => setCartData({ items: [] });

    return (
        <CartContext.Provider value={{ cartData, addToCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};