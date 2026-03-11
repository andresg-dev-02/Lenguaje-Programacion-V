import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CardsShoes = ({ shoe }) => {
    const { addToCart } = useContext(CartContext);

    if (!shoe) return null;
    return (
        <div className="flex flex-col group cursor-pointer bg-white w-full h-full">
            <div className="relative bg-[#EBEDEE] aspect-3/4 flex items-center justify-center overflow-hidden transition-all group-hover:bg-[#E2E4E5]">
                <img
                    src={shoe.image}
                    alt={shoe.name}
                    className="object-cover w-full h-full mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                />
                <button
                    onClick={() => addToCart(shoe)}
                    className="absolute bottom-4 right-4 bg-black text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>

                <button className="absolute top-4 right-4 text-black p-1 hover:scale-110 transition-transform">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.2}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                </button>
            </div>

            <div className="flex flex-col pt-4 pb-2 px-1">
                <h2 className="text-[13px] leading-tight text-black mt-1.5 uppercase font-normal tracking-wide">
                    {shoe.name}
                </h2>
                <span className="text-black font-bold text-sm tracking-tight">
                    ${shoe.price.toLocaleString('de-DE')}
                </span>

                <p className="text-gray-400 text-[12px] mt-1.5 font-medium">
                    Performance
                </p>
            </div>
        </div >
    );
};

export default CardsShoes;