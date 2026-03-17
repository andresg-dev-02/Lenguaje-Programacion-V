import React, { useContext, useState } from 'react';
import { ProductsContext } from '../context/ProductsContext';

const AdminPage = () => {
    const { shoes, addShoe, updateShoe, deleteShoe, loading } = useContext(ProductsContext);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        imagenUrl: '',
        categoriaNombre: '',
        activo: true
    });

    const resetForm = () => {
        setFormData({
            nombre: '',
            descripcion: '',
            precio: '',
            stock: '',
            imagenUrl: '',
            categoriaNombre: '',
            activo: true
        });
        setIsEditing(false);
        setCurrentId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            precio: Number(formData.precio),
            stock: Number(formData.stock)
        };

        if (isEditing) {
            const result = await updateShoe(currentId, payload);
            if (result.success) resetForm();
            else alert(result.message);
        } else {
            const result = await addShoe(payload);
            if (result.success) resetForm();
            else alert(result.message);
        }
    };

    const handleEdit = (shoe) => {
        setIsEditing(true);
        setCurrentId(shoe.id);
        setFormData({
            nombre: shoe.nombre,
            descripcion: shoe.descripcion,
            precio: shoe.precio,
            stock: shoe.stock,
            imagenUrl: shoe.imagenUrl,
            categoriaNombre: shoe.categoriaNombre,
            activo: shoe.activo
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            const result = await deleteShoe(id);
            if (!result.success) alert(result.message);
        }
    };


    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-screen bg-gray-50">
            <h1 className="text-5xl font-black text-black mb-12 uppercase italic tracking-tighter">
                Panel de <span className="text-orange-500">Gestión</span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100 sticky top-8">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-black text-black uppercase italic tracking-tight">
                                {isEditing ? 'Editar' : 'Nuevo'} <span className="text-orange-500">Producto</span>
                            </h2>
                            {isEditing && (
                                <button onClick={resetForm} className="text-xs font-bold text-gray-400 uppercase hover:text-black">
                                    Cancelar
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="group">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Nombre</label>
                                <input
                                    type="text"
                                    value={formData.nombre}
                                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-5 py-3 focus:bg-white focus:border-orange-500 outline-none transition-all font-medium"
                                    placeholder="Ej. Nike Air Max"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Descripción</label>
                                <textarea
                                    value={formData.descripcion}
                                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-5 py-3 focus:bg-white focus:border-orange-500 outline-none transition-all font-medium resize-none h-24"
                                    placeholder="Detalles del producto..."
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Precio</label>
                                    <input
                                        type="number"
                                        value={formData.precio}
                                        onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                                        className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-5 py-3 focus:bg-white focus:border-orange-500 outline-none transition-all font-medium"
                                        placeholder="0"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Stock</label>
                                    <input
                                        type="number"
                                        value={formData.stock}
                                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                        className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-5 py-3 focus:bg-white focus:border-orange-500 outline-none transition-all font-medium"
                                        placeholder="0"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Categoría</label>
                                <input
                                    type="text"
                                    value={formData.categoriaNombre}
                                    onChange={(e) => setFormData({ ...formData, categoriaNombre: e.target.value })}
                                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-5 py-3 focus:bg-white focus:border-orange-500 outline-none transition-all font-medium"
                                    placeholder="Deportivo, Casual..."
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">URL Imagen</label>
                                <input
                                    type="text"
                                    value={formData.imagenUrl}
                                    onChange={(e) => setFormData({ ...formData, imagenUrl: e.target.value })}
                                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-5 py-3 focus:bg-white focus:border-orange-500 outline-none transition-all font-medium"
                                    placeholder="img/zapatilla.jpg"
                                    required
                                />
                            </div>

                            <button type="submit" className="w-full bg-black hover:bg-orange-500 text-white font-black py-4 rounded-2xl transition-all mt-6 uppercase tracking-widest shadow-lg shadow-gray-200">
                                {isEditing ? 'Actualizar Producto' : 'Guardar Producto'}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                            <h2 className="text-xl font-black text-black uppercase tracking-tight">Inventario <span className="text-gray-400 text-sm font-medium lowercase">({shoes.length} total)</span></h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-white border-b border-gray-50">
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Producto</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Detalles</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Precio</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {loading ? (
                                        <tr><td colSpan="4" className="p-20 text-center text-gray-400 animate-pulse font-bold">Cargando catálogo...</td></tr>
                                    ) : shoes.map(shoe => (
                                        <tr key={shoe.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden p-2 flex-shrink-0">
                                                        <img src={`${shoe.imagenUrl}`} alt={shoe.nombre} className="object-contain w-full h-full mix-blend-multiply" />
                                                    </div>
                                                    <div>
                                                        <span className="font-black text-black block uppercase tracking-tight text-sm">{shoe.nombre}</span>
                                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{shoe.categoriaNombre}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className={`text-[11px] font-bold uppercase ${shoe.stock < 10 ? 'text-orange-500' : 'text-gray-400'}`}>Stock: {shoe.stock}</span>
                                                    <span className="text-[10px] text-gray-400 italic line-clamp-1 max-w-[150px]">{shoe.descripcion}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 font-black text-black">
                                                ${shoe.precio.toLocaleString('de-DE')}
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex justify-end gap-3">
                                                    <button onClick={() => handleEdit(shoe)} className="bg-gray-100 hover:bg-black hover:text-white text-gray-600 p-2 rounded-lg transition-all" title="Editar">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                        </svg>
                                                    </button>
                                                    <button onClick={() => handleDelete(shoe.id)} className="bg-red-50 hover:bg-red-500 hover:text-white text-red-400 p-2 rounded-lg transition-all" title="Eliminar">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {shoes.length === 0 && !loading && (
                                <div className="p-20 text-center text-gray-400 font-bold uppercase tracking-widest">No hay productos en bodega.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
