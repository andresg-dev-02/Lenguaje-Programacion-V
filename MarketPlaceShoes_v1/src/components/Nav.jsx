import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Nav = () => {
    const { totalItems } = useContext(CartContext);
    const { isAuthenticated, user, logout } = useContext(AuthContext);
    const userRole = (user?.role || user?.rol || '').toLowerCase();
    const isAdmin = userRole === 'admin';
    const navigate = useNavigate();

    return (
        <nav className="bg-white border-b border-gray-100 px-6 md:px-16 py-5 sticky top-0 z-50 backdrop-blur-md bg-white/90">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-12">
                    <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/')}>
                        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-orange-500 transition-transform group-hover:rotate-12">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M3 12h4m-4 4h2m15-4l-3-1h-4l-4 5H4v2h16c1.1 0 2-.9 2-2v-3l-2-1z" />
                                <path d="M11 11l1-3h3l1 3" />
                            </svg>
                        </div>
                        <span className="text-xl font-black italic uppercase tracking-tighter">Market<span className="text-orange-500">Shoes</span></span>
                    </div>

                    <ul className="hidden md:flex items-center gap-8">
                        <li>
                            <button onClick={() => navigate('/')} className="text-gray-400 hover:text-black font-bold text-xs uppercase tracking-widest transition-colors">Inicio</button>
                        </li>
                        {isAdmin && (
                            <li>
                                <button onClick={() => navigate('/admin')} className="text-gray-400 hover:text-black font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
                                    Dashboard
                                </button>
                            </li>
                        )}
                    </ul>
                </div>

                {/* Actions Section */}
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate('/shopping-cart')}
                        className="relative p-2 text-gray-400 hover:text-black transition-colors group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {totalItems > 0 && (
                            <span className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center shadow-lg shadow-orange-200 animate-in fade-in zoom-in">
                                {totalItems}
                            </span>
                        )}
                    </button>

                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <button onClick={() => navigate('/profile')} className="text-gray-400 hover:text-black font-bold text-xs uppercase tracking-widest transition-colors">Perfil</button>
                            <button onClick={logout} className="bg-gray-100 hover:bg-black hover:text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all">
                                Salir
                            </button>
                        </div>
                    ) : (
                        <button onClick={() => navigate('/login')} className="bg-black hover:bg-orange-500 text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-gray-200">
                            Iniciar Sesión
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Nav;