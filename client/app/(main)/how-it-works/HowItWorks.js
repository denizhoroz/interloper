import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
export default function HowItWorks() {
    return (
        <div className="flex flex-col w-screen items-center justify-center px-4 py-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#E3F6F5] drop-shadow-lg mb-8 text-center">
                Nasıl Çalışır?
            </h1>
            <ol className="rounded-2xl shadow-lg p-8 max-w-2xl w-full border-2 border-[#647FBC] text-[#91ADC8] text-lg sm:text-xl md:text-2xl font-semibold space-y-6 list-decimal list-inside">
                <li>
                    <span className="text-[#AED6CF] font-bold">Dili seç:</span> Öğrenmek istediğin dili seçerek başlayabilirsin.
                </li>
                <li>
                    <span className="text-[#AED6CF] font-bold">Senaryoyu seç:</span> Gerçek hayattan bir senaryo seç.
                </li>
                <li>
                    <span className="text-[#AED6CF] font-bold">Senaryoda konuşma gerçekleştir:</span> Yapay zekayla senaryoya uygun bir diyalog kur.
                </li>
                <li>
                    <span className="text-[#AED6CF] font-bold">Kendini değerlendir:</span> Konuşmanın sonunda performansını ve geri bildirimi incele.
                </li>
            </ol>
            <StarsBackground starDensity={0.0004} />
            <ShootingStars />
        </div>
    );
}