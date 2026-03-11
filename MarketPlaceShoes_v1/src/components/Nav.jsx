import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Nav = () => {
    const { cartData } = useContext(CartContext);
    const { isAuthenticated, user, login, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <nav className="navbar bg-white px-4 md:px-12 py-4 border-b border-gray-100">
            <div className="navbar-start">
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => navigate('/')}>
                    <svg width="40" height="30" viewBox="0 0 24 24" fill="none" className="text-gray-300" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 12h4m-4 4h2m15-4l-3-1h-4l-4 5H4v2h16c1.1 0 2-.9 2-2v-3l-2-1z" />
                        <path d="M11 11l1-3h3l1 3" />
                    </svg>
                </div>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-8">
                    <li>
                        <a onClick={() => navigate('/')} className="text-[#D1D5DB] hover:text-gray-500 font-bold text-lg uppercase tracking-wider transition-colors cursor-pointer">
                            Home
                        </a>
                    </li>
                    <li>
                        <a onClick={() => navigate('/shopping-cart')} className="text-[#D1D5DB] hover:text-gray-500 font-bold text-lg uppercase tracking-wider transition-colors cursor-pointer">
                            Tienda
                        </a>
                    </li>
                    {isAuthenticated ? (
                        <>
                            <li>
                                <a onClick={() => navigate('/profile')} className="text-[#D1D5DB] hover:text-gray-500 font-bold text-lg uppercase tracking-wider transition-colors cursor-pointer">
                                    Perfil
                                </a>
                            </li>
                            {user?.role === 'admin' && (
                                <li>
                                    <a onClick={() => navigate('/admin')} className="text-[#D1D5DB] hover:text-gray-500 font-bold text-lg uppercase tracking-wider transition-colors cursor-pointer">
                                        Admin
                                    </a>
                                </li>
                            )}
                        </>
                    ) : (
                        <li>
                            <a onClick={login} className="text-[#D1D5DB] hover:text-gray-500 font-bold text-lg uppercase tracking-wider transition-colors cursor-pointer">
                                Iniciar Sesión
                            </a>
                        </li>
                    )}
                </ul>
            </div>

            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle indicator hover:cursor-pointer"
                        onClick={() => navigate('/shopping-cart')}
                    >
                        {cartData.items.length > 0 && (
                            <span className="indicator-item badge badge-sm bg-orange-500 border-none text-white h-5 w-5 p-0">
                                {cartData.items.length}
                            </span>
                        )}

                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Nav;