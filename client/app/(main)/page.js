import Link from "next/link";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 ">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-14 md:mb-30 text-[#E3F6F5] drop-shadow-lg text-center mt-30">
          Interloper dil öğrenme platformuna hoş geldin!
        </h1>
        <div className="bg-[#232526]/90 rounded-2xl shadow-lg p-10 mb-16 max-w-3xl w-full flex flex-col items-center border-2 border-[#647FBC]">
          <p className="text-xl sm:text-2xl md:text-3xl text-[#91ADC8] font-semibold text-center leading-relaxed">
            Gerçek hayat senaryolarında konuşma pratiği yaparak yeni bir dil öğren!
            <br className="hidden sm:block" />
            <span className="block mt-6 text-[#AED6CF] font-bold text-xl sm:text-2xl bg-[#647FBC]/30 px-6 py-4 rounded-lg shadow border border-[#AED6CF]">
              Bir dil seç, oturuma başla, yapay zekanın kurguladığı diyaloglara katıl ve sonunda geri bildirim al.
            </span>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-10 w-full max-w-3xl justify-center">
          <Link
            href="/lang-select"
            className="flex-1 bg-gradient-to-r from-[#647FBC] via-[#91ADC8] to-[#AED6CF] text-white font-bold py-6 rounded-xl text-3xl shadow-lg border-2 border-[#91ADC8] text-center
              transition-all duration-300 ease-in-out
               hover:text-[#232526] hover:scale-105 hover:shadow-2xl"
          >
            Hemen Başla
          </Link>
          <Link
            href="/how-it-works"
            className="flex-1 bg-gradient-to-r from-[#AED6CF] via-[#91ADC8] to-[#647FBC] text-white font-bold py-6 rounded-xl text-3xl shadow-lg border-2 border-[#647FBC] text-center
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