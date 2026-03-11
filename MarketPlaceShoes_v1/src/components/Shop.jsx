import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CardsShoes from '../components/CardsShoes';
import { ProductsContext } from '../context/ProductsContext';

const Shop = () => {
    const { shoes } = useContext(ProductsContext);
    const navigate = useNavigate();

    return (
        <main className="bg-white min-h-screen">
            <section className="relative w-full h-[600px] bg-black overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1974&auto=format&fit=crop"
                    alt="Latest Sneaker Collection"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-black italic text-white mb-6 uppercase tracking-tighter drop-shadow-lg">
                        Step Into <span className="text-orange-500">Greatness</span>
                    </h1>
                    <p className="text-gray-200 text-lg md:text-xl font-medium max-w-2xl mb-10 drop-shadow-md">
                        Discover the most exclusive sneakers from leading brands. Elevate your style and performance with our premium collection.
                    </p>
                    <button
                        onClick={() => document.getElementById('featured-products').scrollIntoView({ behavior: 'smooth' })}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full font-bold uppercase tracking-wider transition-all transform hover:scale-105 shadow-xl"
                    >
                        Comprar Ahora
                    </button>
                </div>
            </section>

            <section className="bg-gray-50 border-y border-gray-100 py-10">
                <div className="max-w-7xl mx-auto px-8">
                    <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Marcas Destacadas</p>
                    <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 md:h-12 w-auto text-gray-400 hover:text-black transition-colors cursor-pointer">
                            <path d="M24 8.11c-2.3.94-6.39 2.1-10.43 2.1-5.18 0-9.68-1.78-13.57-5.32-.08.61.05 1.54.34 2.5 1.25 4.15 4.6 7.42 9.04 8.84 2.12.67 4.29.83 6.37.54-3.15-.35-5.99-1.99-8.08-4.52.88 1.1 2.05 1.96 3.42 2.47 4.54 1.7 9.87.17 12.91-4.08.38-.54.38-1.55 0-2.53z" />
                        </svg>
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 md:h-12 w-auto text-gray-400 hover:text-black transition-colors cursor-pointer">
                            <path d="M19.14 17.58L10.74 3.03H5.06l8.39 14.55h5.69zM15.11 17.58L8.29 5.75H2.62l6.81 11.83h5.68zM11.08 17.58l-5.1-8.83H.3l5.09 8.83h5.69z" />
                        </svg>

                        <div className="flex items-center text-2xl font-black italic text-gray-400 hover:text-black transition-colors cursor-pointer tracking-tighter">
                            PUMA
                        </div>
                        <div className="flex items-center text-2xl font-black text-gray-400 hover:text-black transition-colors cursor-pointer pt-1">
                            New Balance
                        </div>
                    </div>
                </div>
            </section>

            <section id="featured-products" className="py-20 max-w-7xl mx-auto px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-black italic text-gray-900 uppercase tracking-tighter">
                            Lanzamientos <span className="text-orange-500">Recientes</span>
                        </h2>
                        <p className="text-gray-500 mt-2 font-medium">No te pierdas de las últimas tendencias del mercado.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {shoes.map((item) => (
                        <div key={item.id} className="h-full">
                            <CardsShoes shoe={item} />
                        </div>
                    ))}
                </div>

                {shoes.length === 0 && (
                    <div className="text-center py-20 text-gray-400 bg-gray-50 rounded-2xl">
                        Aún no hay productos en la tienda. Visita el panel de administración para añadir algunos.
                    </div>
                )}
            </section>

            <section className="bg-black text-white py-20">
                <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center border-t border-gray-800 pt-16">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-6 text-orange-500">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3 uppercase tracking-wider">Envío Gratis</h3>
                        <p className="text-gray-400 font-medium">Por compras superiores a $200.000 COP a nivel nacional.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-6 text-orange-500">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4L19 7m-9 5l-2 2-4-4m9 5v5m0-12V3" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3 uppercase tracking-wider">Originalidad Garantizada</h3>
                        <p className="text-gray-400 font-medium">Todos nuestros productos pasan por un riguroso proceso de autenticación.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-6 text-orange-500">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3 uppercase tracking-wider">Pagos Seguros</h3>
                        <p className="text-gray-400 font-medium">Transacciones encriptadas de extremo a extremo para tu tranquilidad.</p>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="bg-orange-500 py-24 px-8 relative overflow-hidden">
                <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black italic text-white uppercase tracking-tighter mb-4">
                        Únete a nuestra lista VIP
                    </h2>
                    <p className="text-orange-100 text-lg md:text-xl font-medium mb-10 max-w-2xl">
                        Recibe acceso anticipado a los lanzamientos más exclusivos y ofertas especiales que no verás en ningún otro lado.
                    </p>
                    <div className="flex w-full max-w-md flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Tu correo electrónico"
                            className="flex-grow px-6 py-4 rounded-full text-black font-medium focus:outline-none focus:ring-4 focus:ring-orange-300"
                        />
                        <button className="bg-black hover:bg-gray-900 text-white font-bold py-4 px-8 rounded-full transition-colors uppercase tracking-widest whitespace-nowrap">
                            Suscribirme
                        </button>
                    </div>
                </div>
                {/* Decorative background elements */}
                <div className="absolute top-[-50%] left-[-10%] w-[80%] h-[200%] bg-orange-400 opacity-50 rounded-full mix-blend-multiply blur-3xl transform -rotate-12 pointer-events-none"></div>
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[150%] bg-orange-600 opacity-50 rounded-full mix-blend-multiply blur-3xl transform rotate-45 pointer-events-none"></div>
            </section>
        </main>
    );
};

export default Shop;