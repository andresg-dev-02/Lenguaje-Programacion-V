import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartPage = () => {
    const { cartData, updateQuantity, removeFromCart, totalPrice, totalItems } = useContext(CartContext);

    return (
        <div className="max-w-7xl mx-auto p-6 md:p-12 bg-white min-h-screen">
            <div className="flex flex-col lg:flex-row gap-16">

                <div className="flex-grow">
                    <h1 className="text-5xl font-black text-orange-500 mb-2 uppercase italic tracking-tighter">
                        Tu Carrito <span className="text-gray-300 text-xl font-medium not-italic ml-2 lowercase">({totalItems} items)</span>
                    </h1>

                    <div className="mt-10 flex flex-col gap-8">
                        {cartData.items.length > 0 ? (
                            cartData.items.map((item) => (
                                <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 border-b border-gray-100 pb-8 relative group">
                                    <div className="w-full sm:w-48 aspect-square bg-gray-50 rounded-2xl flex items-center justify-center p-4">
                                        <img
                                            src={`${item.imagenUrl}`}
                                            alt={item.nombre}
                                            className="object-contain mix-blend-multiply w-full h-full"
                                        />
                                    </div>

                                    <div className="flex-grow text-center sm:text-left">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h2 className="text-xl font-bold text-black uppercase tracking-tight">{item.nombre}</h2>
                                                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">{item.categoriaNombre}</p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-300 hover:text-red-500 transition-colors p-2"
                                                title="Eliminar del carrito"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>

                                        <p className="text-gray-500 text-sm mt-3 line-clamp-2 max-w-md">
                                            {item.descripcion}
                                        </p>

                                        <div className="mt-6 flex items-center justify-center sm:justify-start gap-4">
                                            <div className="flex items-center border-2 border-orange-100 rounded-full overflow-hidden bg-white">
                                                <button
                                                    className="px-4 py-2 text-orange-500 hover:bg-orange-50 transition-colors font-bold text-xl"
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                >-</button>
                                                <span className="w-10 text-center text-sm font-black text-black">{item.quantity}</span>
                                                <button
                                                    className="px-4 py-2 text-orange-500 hover:bg-orange-50 transition-colors font-bold text-xl"
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                >+</button>
                                            </div>

                                            <div className="text-right ml-auto">
                                                <p className="text-xs text-gray-400 font-bold uppercase mb-1">Precio Unitario</p>
                                                <span className="text-lg font-black text-black">
                                                    ${((item.precio || item.price || 0) * item.quantity).toLocaleString('de-DE')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-gray-50 rounded-3xl">
                                <p className="text-gray-400 italic text-lg mb-6">Tu carrito está vacío...</p>
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="bg-black text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-orange-500 transition-colors"
                                >
                                    Ir a la tienda
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-full lg:w-96">
                    <div className="bg-gray-50 rounded-3xl p-8 sticky top-8">
                        <h2 className="text-3xl font-black text-black mb-8 uppercase italic tracking-tighter">
                            Resumen de <span className="text-orange-500">Compra</span>
                        </h2>

                        <div className="space-y-6">
                            <div className="flex justify-between items-center text-sm font-bold uppercase tracking-wider">
                                <span className="text-gray-400">Productos ({totalItems})</span>
                                <span className="text-black">${totalPrice.toLocaleString('de-DE')}</span>
                            </div>

                            <div className="flex justify-between items-center text-sm font-bold uppercase tracking-wider">
                                <span className="text-gray-400">Envío</span>
                                <span className="text-orange-500">{totalPrice > 200000 ? 'Gratis' : '$15.000'}</span>
                            </div>

                            <div className="border-t-2 border-dashed border-gray-200 pt-6 mt-6 flex justify-between items-center">
                                <span className="text-xl font-black text-black uppercase italic tracking-tight">Total</span>
                                <span className="text-orange-500 font-black text-2xl">
                                    ${(totalPrice + (totalPrice > 200000 ? 0 : 15000)).toLocaleString('de-DE')}
                                </span>
                            </div>

                            <button
                                disabled={cartData.items.length === 0}
                                className={`w-full font-black py-5 rounded-2xl mt-10 transition-all uppercase tracking-widest text-lg shadow-xl shadow-orange-100 ${cartData.items.length > 0 ? 'bg-orange-500 hover:bg-orange-600 text-white transform hover:-translate-y-1' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                            >
                                Finalizar Pedido
                            </button>

                            <p className="text-[10px] text-gray-400 font-medium text-center mt-4">
                                * Impuestos incluidos. Envío gratuito en compras superiores a $200.000 COP.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CartPage;