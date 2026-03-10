import React from 'react';
import CardsShoes from '../components/CardsShoes';

const shoes = [
    { id: 1, name: 'Calzado 1', size: 6, price: 100000, image: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/2b4f4ed5dbf54f0a9258be5a0bdbda71_9366/TENIS_RESPONSE_RUNNER_2_Beige_KJ1741_HM1.jpg' },
    { id: 2, name: 'Calzado 2', size: 6, price: 100000, image: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/2b4f4ed5dbf54f0a9258be5a0bdbda71_9366/TENIS_RESPONSE_RUNNER_2_Beige_KJ1741_HM1.jpg' },
    { id: 3, name: 'Calzado 3', size: 6, price: 100000, image: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/23eef2bb054a4c73a37211d217e30d71_9366/TENIS_RESPONSE_RUNNER_2_Morado_KJ1746_00_plp_standard.jpg' }
];

const Shop = () => {
    return (
        <main className="p-8 max-w-7xl mx-auto bg-white min-h-screen">
            <h1 className="text-6xl font-black italic text-orange-500 mb-10 uppercase tracking-tighter">
                Tienda
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {shoes.map((item) => (
                    <CardsShoes key={item.id} shoe={item} />
                ))}
            </div>
        </main>
    );
};

export default Shop;