import { shared } from "../lib/metadata";

export const metadata = {
    title: `Sayfa Bulunamadı | ${shared.title}`,
    description: "Aradığınız sayfa mevcut değil veya taşınmış olabilir.",
};

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#AED6CF]">
            <h1 className="text-6xl font-extrabold text-[#647FBC] mb-8 drop-shadow-lg">404</h1>
            <div className="bg-[#FAFDD6] rounded-full p-6 shadow-2xl mb-8 flex items-center justify-center">
                <img
                    src="/annoying-dog-undertale.gif"
                    alt="Annoying Dog"
                    className="w-64 h-64 object-contain"
                />
            </div>
            <h2 className="text-3xl font-bold text-[#647FBC] mb-4">Sayfa Bulunamadı</h2>
            <p className="text-2xl text-[#647FBC] mb-10 text-center bg-[#FAFDD6]/80 px-8 py-4 rounded-xl shadow">
                Aradığınız sayfa mevcut değil veya taşınmış olabilir.
            </p>
            <a
                href="/"
                className="bg-[#647FBC] text-[#FAFDD6] font-bold py-4 px-10 rounded-xl text-xl shadow-lg hover:bg-[#91ADC8] transition"
            >
                Ana Sayfa'ya Dön
            </a>
        </div>
    );
}