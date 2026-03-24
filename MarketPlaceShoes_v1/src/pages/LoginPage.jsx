import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import heroImage from '../assets/login-hero.png';

const LoginPage = () => {
    const { login, loading, error } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Andres, Aqui debes de llamar la funcion que valida.
        const result = await login(email, password);

        if (result.success) {
            navigate('/');
        } else {
            alert(result.message || 'Credenciales inválidas');
        }
    };

    return (
        <div className="flex min-h-screen bg-white font-sans">
            {/* Left Side - Hero Image */}
            <div className="hidden lg:flex lg:w-1/2 bg-white items-center justify-center p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent"></div>
                <div className="relative z-10 w-full max-w-lg transform hover:scale-105 transition-transform duration-700 ease-out">
                    <img
                        src={heroImage}
                        alt="Premium Sneaker"
                        className="w-full h-auto drop-shadow-[0_20px_50px_rgba(255,145,0,0.2)]"
                    />
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-white relative">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-8 left-8 p-3 text-gray-400 hover:text-black transition-colors bg-gray-50 rounded-2xl group"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <div className="max-w-md w-full mx-auto space-y-12">
                    <header>
                        <h1 className="text-5xl font-black text-orange-500 italic uppercase tracking-tighter mb-2">Log In</h1>
                        <p className="text-gray-400 font-medium">Bienvenido de nuevo a Market Shoes</p>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2 group">
                            <label className="block text-[10px] font-black text-orange-500/50 uppercase tracking-[0.2em] ml-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-orange-50/30 border-2 border-transparent focus:border-orange-500/20 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-medium text-gray-700 placeholder:text-orange-200"
                                placeholder="tu@email.com"
                                required
                            />
                        </div>

                        <div className="space-y-2 group">
                            <label className="block text-[10px] font-black text-orange-500/50 uppercase tracking-[0.2em] ml-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-orange-50/30 border-2 border-transparent focus:border-orange-500/20 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-medium text-gray-700 placeholder:text-orange-200"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        {error && (
                            <div className="bg-red-50 text-red-500 text-[10px] font-bold p-3 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-1">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-orange-500 hover:bg-black text-white font-black py-5 rounded-2xl transition-all duration-300 uppercase tracking-widest shadow-[0_10px_30px_rgba(255,145,0,0.3)] hover:shadow-none active:scale-95 ${loading ? 'opacity-70 cursor-wait' : ''}`}
                        >
                            {loading ? 'Validando...' : 'Continue'}
                        </button>
                    </form>

                    <footer className="text-center pt-8 border-t border-gray-50">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            ¿No tienes una cuenta? <button className="text-orange-500 hover:underline" onClick={() => navigate('/register')}>Regístrate</button>
                        </p>
                    </footer>
                </div>
            </div>
        </div>  
    );
};

export default LoginPage;
