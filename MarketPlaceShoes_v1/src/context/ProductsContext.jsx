import React, { createContext, useState } from 'react';

export const ProductsContext = createContext();

const initialShoes = [
    { id: 1, name: 'Nike Air Max 270', size: 8, price: 450000, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80' },
    { id: 2, name: 'Adidas Ultraboost', size: 9, price: 620000, image: 'https://images.unsplash.com/photo-1574561066497-75c13b284e3d?w=600&q=80' },
    { id: 3, name: 'Puma RS-X', size: 7, price: 380000, image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80' },
    { id: 4, name: 'Nike Jordan 1', size: 10, price: 850000, image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600&q=80' },
    { id: 5, name: 'New Balance 574', size: 8.5, price: 320000, image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80' }
];

export const ProductsProvider = ({ children }) => {
    const [shoes, setShoes] = useState(initialShoes);

    const addShoe = (newShoe) => {
        setShoes([...shoes, { ...newShoe, id: Date.now() }]);
    };

    const updateShoe = (id, updatedData) => {
        setShoes(shoes.map(shoe => shoe.id === id ? { ...shoe, ...updatedData } : shoe));
    };

    const deleteShoe = (id) => {
        setShoes(shoes.filter(shoe => shoe.id !== id));
    };

    return (
        <ProductsContext.Provider value={{ shoes, addShoe, updateShoe, deleteShoe }}>
            {children}
        </ProductsContext.Provider>
    );
};
