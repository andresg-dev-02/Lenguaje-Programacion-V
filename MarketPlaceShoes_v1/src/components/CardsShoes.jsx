import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CardsShoes = ({ shoe }) => {
    console.log(shoe);
    const { addToCart } = useContext(CartContext);

    if (!shoe) return null;


    return (
        <div className="flex flex-col group cursor-pointer bg-white w-full h-full border border-gray-100 rounded-sm hover:shadow-lg transition-shadow">
            <div className="relative bg-[#EBEDEE] aspect-square flex items-center justify-center overflow-hidden transition-all group-hover:bg-[#E2E4E5]">
                <img
                    src={`${shoe.imagenUrl}`}
                    alt={shoe.nombre}
                    className="object-cover w-full h-full mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                />

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        addToCart(shoe);
                    }}
                    disabled={shoe.stock <= 0}
                    className={`absolute bottom-4 right-4 text-white p-3 shadow-lg transition-all transform active:scale-95 ${shoe.stock > 0 ? 'bg-orange-500 hover:bg-orange-600 opacity-0 group-hover:opacity-100' : 'bg-gray-400 cursor-not-allowed opacity-100'}`}
                >
                    {shoe.stock > 0 ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    ) : (
                        <span className="text-xs font-bold uppercase">Agotado</span>
                    )}
                </button>

                <div className="absolute top-4 left-4">
                    <span className="bg-white/80 backdrop-blur-md text-black px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded">
                        {shoe.categoriaNombre}
                    </span>
                </div>
            </div>

            <div className="flex flex-col pt-4 pb-4 px-3">
                <div className="flex justify-between items-start">
                    <h2 className="text-[14px] leading-tight text-black font-bold uppercase tracking-tight line-clamp-1">
                        {shoe.nombre}
                    </h2>
                </div>

                <p className="text-gray-500 text-[12px] mt-1 line-clamp-2 min-h-[2rem]">
                    {shoe.descripcion}
                </p>

                <div className="flex justify-between items-center mt-4">
                    <span className="text-black font-black text-lg">
                        ${shoe.precio.toLocaleString('de-DE')}
                    </span>
                    <span className={`text-[11px] font-bold ${shoe.stock < 10 ? 'text-orange-600' : 'text-gray-400'}`}>
                        {shoe.stock > 0 ? `${shoe.stock} disponibles` : 'Sin stock'}
                    </span>
                </div>
            </div>
        </div >
    );
};

export default CardsShoes;