import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 ">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-14 md:mb-30 text-[#FAFDD6] drop-shadow-lg text-center mt-30">
          Interloper dil öğrenme platformuna hoş geldin!
        </h1>
        <div className="bg-[#FAFDD6]/90 rounded-2xl shadow-lg p-10 mb-16 max-w-3xl w-full flex flex-col items-center">
          <p className="text-xl sm:text-2xl md:text-3xl text-[#647FBC] font-semibold text-center leading-relaxed">
            Gerçek hayat senaryolarında konuşma pratiği yaparak yeni bir dil öğren!
            <br className="hidden sm:block" />
            <span className="block mt-6 text-[#647FBC] font-bold text-xl sm:text-2xl bg-[#AED6CF]/60 px-6 py-4 rounded-lg shadow">
              Bir dil seç, oturuma başla, yapay zekanın kurguladığı diyaloglara katıl ve sonunda geri bildirim al.
            </span>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-10 w-full max-w-3xl justify-center">
          <Link href="/lang-select" className="flex-1 bg-[#647FBC] text-[#FAFDD6] font-bold py-6 rounded-xl text-3xl shadow-lg hover:bg-[#91ADC8] hover:text-[#647FBC] transition text-center">
            Hemen Başla
          </Link>
          <Link href="/how-it-works" className="flex-1 bg-[#AED6CF] text-[#647FBC] font-bold py-6 rounded-xl text-3xl shadow-lg hover:bg-[#91ADC8] hover:text-[#FAFDD6] transition text-center">
            Nasıl Çalışır?
          </Link>
        </div>
      </main>

      {/* Footer */}
    </div>
  );
}