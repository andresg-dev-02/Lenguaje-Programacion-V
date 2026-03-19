import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartData, setCartData] = useState(() => {
        const savedCart = localStorage.getItem('cart_shoes');
        return savedCart ? JSON.parse(savedCart) : { items: [] };
    });

    useEffect(() => {
        localStorage.setItem('cart_shoes', JSON.stringify(cartData));
    }, [cartData]);

    const addToCart = (product) => {
        setCartData((prev) => {
            const existingItem = prev.items.find((item) => item.id === product.id);
            if (existingItem) {
                return {
                    ...prev,
                    items: prev.items.map((item) =>
                        item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
                    ),
                };
            }
            return {
                ...prev,
                items: [...prev.items, { ...product, precio: product.precio || product.price, quantity: 1 }],
            };
        });
    };

    const updateQuantity = (id, delta) => {
        setCartData((prev) => ({
            ...prev,
            items: prev.items.map((item) => {
                if (item.id === id) {
                    const newQty = (item.quantity || 1) + delta;
                    return { ...item, quantity: Math.max(1, newQty) };
                }
                return item;
            }),
        }));
    };

    const removeFromCart = (id) => {
        setCartData((prev) => ({
            ...prev,
            items: prev.items.filter((item) => item.id !== id),
        }));
    };

    const clearCart = () => setCartData({ items: [] });

    const totalItems = cartData.items.reduce((acc, item) => acc + (item.quantity || 1), 0);
    const totalPrice = cartData.items.reduce((acc, item) => {
        const p = item.precio || item.price || 0;
        return acc + (p * (item.quantity || 1));
    }, 0);

    return (
        <CartContext.Provider value={{
            cartData,
            addToCart,
            updateQuantity,
            removeFromCart,
            clearCart,
            totalItems,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
};