import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getPurchaseHistory } from '../services/orderServices';

const ProfilePage = () => {
    const { user, logout } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            if (user?.id) {
                try {
                    setLoading(true);
                    const response = await getPurchaseHistory(user.id);
                    // Assuming response.data contains the list of orders
                    // and response.isSuccess is true
                    if (response.isSuccess) {
                        setOrders(response.data || []);
                    } else {
                        setError(response.message || "Error al cargar el historial");
                    }
                } catch (err) {
                    setError("No se pudo conectar con el servidor.");
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchHistory();
    }, [user?.id]);




    return (
        <div className="max-w-4xl mx-auto p-8 min-h-screen">
            <h1 className="text-4xl font-black text-orange-500 mb-8 uppercase">Mi Perfil</h1>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 flex items-center gap-6">
                <img src={user?.avatar || 'https://ui-avatars.com/api/?name=User'} alt={user?.name || 'User'} className="w-24 h-24 rounded-full" />
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{user?.name || 'Usuario'}</h2>
                    <p className="text-gray-500">{user?.email || 'user@example.com'}</p>
                    <span className="inline-block mt-2 bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {user?.role || 'User'}
                    </span>
                </div>
                <button onClick={logout} className="ml-auto bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-full transition-colors text-sm">
                    Cerrar Sesión
                </button>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">Historial de Compras</h2>
            <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
                <table className="table w-full bg-gray-200">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="text-sm font-bold text-base-content/70 uppercase">Orden</th>
                            <th className="text-sm font-bold text-base-content/70 uppercase">Producto</th>
                            <th className="text-sm font-bold text-base-content/70 uppercase">Fecha</th>
                            <th className="text-sm font-bold text-base-content/70 uppercase">Total</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-base-200">
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="py-12 text-center">
                                    <span className="loading loading-spinner loading-md text-primary"></span>
                                    <p className="mt-2 text-base-content/50 italic">Cargando historial...</p>
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan="5" className="py-10 text-center">
                                    <div className="alert alert-error inline-flex w-auto py-2">
                                        <span>{error}</span>
                                    </div>
                                </td>
                            </tr>
                        ) : orders.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="py-20 text-center text-base-content/40">
                                    <div className="flex flex-col items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                        <p>No tienes compras registradas aún.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            orders.map(order => (
                                <tr key={order.id} className="hover:bg-base-200/30 transition-colors">
                                    <td className="font-mono text-sm font-bold text-primary">
                                        #{order.id.toString().padStart(5, '0')}
                                    </td>

                                    <td>
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-16 h-16 shadow-md">
                                                    <img src={order.imagenproducto} alt={order.nombreproducto} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-base leading-tight">{order.nombreproducto}</div>
                                                <div className="text-xs opacity-50 uppercase tracking-tighter mt-1">Ref: {order.id}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="text-base-content/70">
                                        {new Date(order.fecha).toLocaleDateString('es-CO', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </td>

                                    <td className="font-bold text-base">
                                        <span className="text-success">$</span>
                                        {order.total.toLocaleString('de-DE')}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default ProfilePage;
