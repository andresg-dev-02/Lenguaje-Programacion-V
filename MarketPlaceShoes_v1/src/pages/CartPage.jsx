import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartPage = () => {
    const { cartData } = useContext(CartContext);
    const subtotal = cartData.items.reduce((acc, item) => acc + item.price, 0);

    return (
        <div className="max-w-7xl mx-auto p-6 md:p-12 bg-white min-h-screen">
            <div className="flex flex-col lg:flex-row gap-16">

                <div className="flex-grow">
                    <h1 className="text-5xl font-black text-orange-500 mb-2">
                        Tu Carrito <span className="text-gray-300 text-xl font-medium not-italic ml-2">({cartData.items.length}) items</span>
                    </h1>

                    <div className="mt-10 flex flex-col gap-8">
                        {cartData.items.length > 0 ? (
                            cartData.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-6 border-b border-gray-100 pb-8">
                                    <div className=" w-60 h-50 rounded-3xl flex items-center justify-center p-4">
                                        <img src={item.image} alt={item.name} className="object-contain mix-blend-multiply" />
                                    </div>

                                    <div className="flex-grow">
                                        <h2 className="text-xl font-bold text-black uppercase tracking-tight">{item.name}</h2>
                                        <p className="text-gray-400 text-sm font-medium mt-1">Talla {item.size}</p>

                                        <div className="mt-4 flex items-center border border-orange-300 rounded-md w-fit">
                                            <button className="px-3 py-1 text-orange-500" onClick={() => clearCart(shoe)} >-</button>
                                            <input type="text" readOnly value="1" className="w-8 text-center text-sm font-bold text-gray-600 outline-none" />
                                            <button className="px-3 py-1 text-orange-500">+</button>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <span className="text-lg font-bold text-black">
                                            {item.price.toLocaleString('de-DE')}.000 COP
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400 italic">Tu carrito está vacío...</p>
                        )}
                    </div>
                </div>

                <div className="w-full lg:w-96">
                    <div className="bg-white p-2">
                        <h2 className="text-3xl font-black text-orange-500 mb-8">
                            Resumen de la compra
                        </h2>

                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold text-black"># Productos</span>
                                <span className="text-gray-500 font-medium">{cartData.items.length}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 font-medium">Subtotal</span>
                                <span className="text-gray-400 font-medium">${subtotal.toLocaleString('de-DE')}</span>
                            </div>

                            <div className="pt-10 flex justify-between items-center">
                                <span className="text-xl font-bold text-black">Total</span>
                                <span className="text-black font-bold text-lg">${subtotal.toLocaleString('de-DE')}</span>
                            </div>

                            <button className="w-full bg-[#FFD7B5] hover:bg-orange-200 text-white font-bold py-4 rounded-full mt-10 transition-colors uppercase tracking-widest text-lg">
                                Finalizar compra
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CartPage;