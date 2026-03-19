import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
    const { user, logout } = useContext(AuthContext);

    const mockOrders = [
        { id: 'ORD-001', date: '2023-10-15', total: 450000, status: 'Entregado' },
        { id: 'ORD-002', date: '2023-11-02', total: 620000, status: 'En camino' },
    ];




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
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Orden</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Fecha</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Estado</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {mockOrders.map(order => (
                            <tr key={order.id}>
                                <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                                <td className="px-6 py-4 text-gray-500">{order.date}</td>
                                <td className="px-6 py-4 font-bold text-gray-900">${order.total.toLocaleString('de-DE')}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Entregado' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                        }`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProfilePage;
