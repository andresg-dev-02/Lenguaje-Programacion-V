import React, { useContext, useState } from 'react';
import { ProductsContext } from '../context/ProductsContext';

const AdminPage = () => {
    const { shoes, addShoe, deleteShoe } = useContext(ProductsContext);
    const [newShoe, setNewShoe] = useState({ name: '', price: '', size: '', image: '' });

    const handleAdd = (e) => {
        e.preventDefault();
        if (newShoe.name && newShoe.price && newShoe.image) {
            addShoe({ ...newShoe, price: Number(newShoe.price) });
            setNewShoe({ name: '', price: '', size: '', image: '' });
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-8 min-h-screen">
            <h1 className="text-4xl font-black text-orange-500 mb-8 uppercase">Panel de Administración</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Añadir Producto</h2>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                <input type="text" value={newShoe.name} onChange={(e) => setNewShoe({ ...newShoe, name: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                                <input type="number" value={newShoe.price} onChange={(e) => setNewShoe({ ...newShoe, price: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Talla</label>
                                <input type="text" value={newShoe.size} onChange={(e) => setNewShoe({ ...newShoe, size: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">URL de Imagen</label>
                                <input type="url" value={newShoe.image} onChange={(e) => setNewShoe({ ...newShoe, image: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none" required />
                            </div>
                            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors mt-4">
                                Guardar Producto
                            </button>
                        </form>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Producto</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Precio</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Talla</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {shoes.map(shoe => (
                                    <tr key={shoe.id}>
                                        <td className="px-6 py-4 flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                                <img src={shoe.image} alt={shoe.name} className="object-cover w-full h-full mix-blend-multiply" />
                                            </div>
                                            <span className="font-medium text-gray-900">{shoe.name}</span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-900">${shoe.price.toLocaleString('de-DE')}</td>
                                        <td className="px-6 py-4 text-gray-500">{shoe.size}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button onClick={() => deleteShoe(shoe.id)} className="text-red-500 hover:text-red-700 font-medium">
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {shoes.length === 0 && (
                            <div className="p-8 text-center text-gray-500">No hay productos registrados.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
