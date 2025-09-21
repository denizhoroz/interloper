import Link from "next/link";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

export default function Home() {
  return (
    <div className="flex flex-col w-screen">
      {/* Header */}
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-2 py-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 md:mb-16 text-[#E3F6F5] drop-shadow-lg text-center mt-10">
          Interloper dil öğrenme platformuna hoş geldin!
        </h1>
        <div className="bg-[#232526]/90 rounded-2xl shadow-lg p-6 mb-10 max-w-2xl w-full flex flex-col items-center border-2 border-[#647FBC]">
          <p className="text-base sm:text-lg md:text-xl text-[#91ADC8] font-semibold text-center leading-relaxed">
            Gerçek hayat senaryolarında konuşma pratiği yaparak yeni bir dil öğren!
            <br className="hidden sm:block" />
            <span className="block mt-4 text-[#AED6CF] font-bold text-base sm:text-lg bg-[#647FBC]/30 px-4 py-2 rounded-lg shadow border border-[#AED6CF]">
              Bir dil seç, oturuma başla, yapay zekanın kurguladığı diyaloglara katıl ve sonunda geri bildirim al.
            </span>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl justify-center">
          <Link
            href="/lang-select"
            className="flex-1 bg-gradient-to-r from-[#647FBC] via-[#91ADC8] to-[#AED6CF] text-white font-bold py-4 rounded-xl text-xl shadow-lg border-2 border-[#91ADC8] text-center
              transition-all duration-300 ease-in-out
               hover:text-[#232526] hover:scale-105 hover:shadow-2xl"
          >
            Hemen Başla
          </Link>
          <Link
            href="/how-it-works"
            className="flex-1 bg-gradient-to-r from-[#AED6CF] via-[#91ADC8] to-[#647FBC] text-white font-bold py-4 rounded-xl text-xl shadow-lg border-2 border-[#647FBC] text-center
              transition-all duration-300 ease-in-out
              hover:text-black hover:scale-105 hover:shadow-2xl"
          >
            Nasıl Çalışır?
          </Link>
        </div>
      </main>

      {/* Footer */}
      <ShootingStars />
      <StarsBackground starDensity={0.00025} />
    </div>
  );
}