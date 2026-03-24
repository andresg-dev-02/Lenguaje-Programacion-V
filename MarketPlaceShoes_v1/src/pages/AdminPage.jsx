import React, { useContext, useState, useEffect, useMemo } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import { getAllHistorySale } from '../services/orderServices';

const AdminPage = () => {
    const { shoes, addShoe, updateShoe, deleteShoe, loading: productsLoading } = useContext(ProductsContext);
    const [sales, setSales] = useState([]);
    const [salesLoading, setSalesLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' or 'dashboard'
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

    // Fetch all sales history
    useEffect(() => {
        const fetchSales = async () => {
            try {
                setSalesLoading(true);
                const response = await getAllHistorySale();
                if (response.isSuccess) {
                    setSales(response.data || []);
                }
            } catch (error) {
                console.error("Error fetching sales history:", error);
            } finally {
                setSalesLoading(false);
            }
        };
        fetchSales();
    }, []);

    // Calculate Dashboard Stats
    const stats = useMemo(() => {
        const totalRevenue = sales.reduce((acc, sale) => acc + (sale.total || 0), 0);
        const totalSales = sales.length;
        const totalItems = sales.reduce((acc, sale) => acc + (sale.cantidad || 0), 0);
        
        const productStats = {};
        sales.forEach(sale => {
            if (!productStats[sale.nombreproducto]) {
                productStats[sale.nombreproducto] = { count: 0, revenue: 0, img: sale.imagenproducto };
            }
            productStats[sale.nombreproducto].count += sale.cantidad;
            productStats[sale.nombreproducto].revenue += sale.total;
        });

        const topProducts = Object.entries(productStats)
            .map(([name, data]) => ({ name, ...data }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        return { totalRevenue, totalSales, totalItems, topProducts };
    }, [sales]);

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
        setActiveTab('inventory');
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
            {/* Header with Tabs */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                <div>
                    <h1 className="text-5xl font-black text-black uppercase italic tracking-tighter">
                        Panel de <span className="text-orange-500">Gestión</span>
                    </h1>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-2">Administración Central de MarketShoes</p>
                </div>
                
                <div className="flex bg-gray-200 p-1.5 rounded-2xl gap-2 w-full md:w-auto">
                    <button 
                        onClick={() => setActiveTab('inventory')}
                        className={`flex-1 md:flex-none px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'inventory' ? 'bg-white text-black shadow-lg shadow-gray-300/50' : 'text-gray-500 hover:text-black'}`}
                    >
                        Inventario
                    </button>
                    <button 
                        onClick={() => setActiveTab('dashboard')}
                        className={`flex-1 md:flex-none px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'dashboard' ? 'bg-white text-black shadow-lg shadow-gray-300/50' : 'text-gray-500 hover:text-black'}`}
                    >
                        Dashboard
                    </button>
                </div>
            </div>

            {activeTab === 'dashboard' ? (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col justify-between group hover:border-orange-200 transition-colors">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Ingresos Totales</span>
                            <div className="flex items-end gap-2">
                                <span className="text-4xl font-black text-black">${stats.totalRevenue.toLocaleString('de-DE')}</span>
                                <span className="text-orange-500 font-bold text-xs mb-1">COP</span>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 group hover:border-orange-200 transition-colors">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Ventas Realizadas</span>
                            <div className="text-4xl font-black text-black">{stats.totalSales}</div>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 group hover:border-orange-200 transition-colors">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Productos Vendidos</span>
                            <div className="text-4xl font-black text-black">{stats.totalItems}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Top Products Chart */}
                        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-black text-black uppercase italic tracking-tight">Productos <span className="text-orange-500">Estrella</span></h3>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Top 5</span>
                            </div>
                            <div className="space-y-8">
                                {stats.topProducts.map((product, idx) => (
                                    <div key={idx} className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center p-2 shadow-inner">
                                                    <img src={product.img} className="max-w-full max-h-full object-contain" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-black uppercase text-black block">{product.name}</span>
                                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">${product.revenue.toLocaleString()} totales</span>
                                                </div>
                                            </div>
                                            <span className="text-orange-500 font-black text-sm">{product.count}</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-black rounded-full transition-all duration-1000 ease-out"
                                                style={{ width: `${(product.count / stats.topProducts[0].count) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                                {stats.topProducts.length === 0 && (
                                    <div className="py-20 text-center text-gray-400 font-bold uppercase tracking-widest italic opacity-50">
                                        No hay datos de ventas disponibles
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100 flex flex-col">
                            <h3 className="text-xl font-black text-black uppercase italic tracking-tight mb-8">Actividad <span className="text-orange-500">Reciente</span></h3>
                            <div className="overflow-x-auto flex-1">
                                <table className="w-full text-left">
                                    <tbody className="divide-y divide-gray-50">
                                        {sales.slice(0, 6).map(sale => (
                                            <tr key={sale.id} className="group hover:bg-gray-50/50 transition-colors">
                                                <td className="py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center p-1 border border-gray-100">
                                                            <img src={sale.imagenproducto} className="max-w-full max-h-full object-contain" />
                                                        </div>
                                                        <div>
                                                            <div className="text-xs font-black uppercase text-black line-clamp-1">{sale.nombreproducto}</div>
                                                            <div className="text-[10px] text-gray-400 font-bold">{new Date(sale.fecha).toLocaleDateString()}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 text-right">
                                                    <div className="text-xs font-black text-black">${sale.total.toLocaleString()}</div>
                                                    <div className="text-[10px] text-orange-500 uppercase font-black">{sale.cantidad} uni.</div>
                                                </td>
                                            </tr>
                                        ))}
                                        {sales.length === 0 && (
                                            <tr>
                                                <td className="py-20 text-center text-gray-400 font-bold uppercase tracking-widest italic opacity-50">
                                                    Esperando primeras ventas...
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <button className="mt-6 w-full py-3 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black border-t border-gray-50 transition-colors">
                                Ver todo el historial
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Nombre del producto</label>
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
                                        placeholder="Describe las características..."
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
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Stock disponible</label>
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
                                        placeholder="Ej. Deportivo, Urbano"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">URL de Imagen</label>
                                    <input
                                        type="text"
                                        value={formData.imagenUrl}
                                        onChange={(e) => setFormData({ ...formData, imagenUrl: e.target.value })}
                                        className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-5 py-3 focus:bg-white focus:border-orange-500 outline-none transition-all font-medium"
                                        placeholder="https://..."
                                        required
                                    />
                                </div>

                                <button type="submit" className="w-full bg-black hover:bg-orange-500 text-white font-black py-5 rounded-2xl transition-all mt-6 uppercase tracking-widest shadow-xl shadow-gray-200">
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
                                        {productsLoading ? (
                                            <tr><td colSpan="4" className="p-20 text-center text-gray-400 animate-pulse font-bold uppercase tracking-widest">Sincronizando inventario...</td></tr>
                                        ) : shoes.map(shoe => (
                                            <tr key={shoe.id} className="hover:bg-gray-50/50 transition-colors group">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden p-2 flex-shrink-0 shadow-inner group-hover:scale-110 transition-transform">
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
                                                        <span className={`text-[11px] font-black uppercase ${shoe.stock < 10 ? 'text-orange-500' : 'text-gray-400'}`}>Stock: {shoe.stock}</span>
                                                        <span className="text-[10px] text-gray-400 italic line-clamp-1 max-w-[150px]">{shoe.descripcion}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 font-black text-black">
                                                    ${shoe.precio.toLocaleString('de-DE')}
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button onClick={() => handleEdit(shoe)} className="bg-gray-100 hover:bg-black hover:text-white text-gray-600 p-3 rounded-xl transition-all" title="Editar">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                            </svg>
                                                        </button>
                                                        <button onClick={() => handleDelete(shoe.id)} className="bg-red-50 hover:bg-red-500 hover:text-white text-red-400 p-3 rounded-xl transition-all" title="Eliminar">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {shoes.length === 0 && !productsLoading && (
                                    <div className="p-20 text-center text-gray-400 font-bold uppercase tracking-widest italic opacity-50">El almacén está vacío por ahora.</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
