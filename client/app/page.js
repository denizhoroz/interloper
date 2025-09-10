export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#647FBC]">
      {/* Header */}
      <header className="w-full py-4 px-4 md:px-8 bg-[#FAFDD6] flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0 shadow-md">
        <span className="text-2xl font-bold text-[#647FBC] tracking-wide">Interloper</span>
        <nav className="flex gap-4 md:gap-6">
          <a
            href="#"
            className="text-[#647FBC] font-semibold hover:text-[#91ADC8] transition"
          >
            Ana Sayfa
          </a>
          <a
            href="#"
            className="text-[#647FBC] font-semibold hover:text-[#91ADC8] transition"
          >
            Hakkında
          </a>
          <a
            href="#"
            className="text-[#647FBC] font-semibold hover:text-[#91ADC8] transition"
          >
            İletişim
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-2">
        <div className="bg-[#FAFDD6] rounded-xl shadow-lg p-5 sm:p-8 md:p-10 text-center w-full max-w-xl border-4 border-[#91ADC8]">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-[#647FBC] drop-shadow">
            Dil Öğrenme Platformuna Hoş Geldin!
          </h1>
          <p className="text-base sm:text-lg text-[#647FBC] mb-6 font-medium">
            Gerçek hayat senaryolarında konuşma pratiği yaparak yeni bir dil öğren!
            <br />
            <span className="font-bold text-[#91ADC8]">
              Bir dil seç, oturuma başla, yapay zekanın kurguladığı diyaloglara katıl
              ve sonunda geri bildirim al.
            </span>
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-6">
            <button className="bg-[#647FBC] text-[#FAFDD6] font-bold py-2 px-6 rounded-lg hover:bg-[#91ADC8] hover:text-[#647FBC] transition">
              Hemen Başla
            </button>
            <button className="bg-[#AED6CF] text-[#647FBC] font-semibold py-2 px-6 rounded-lg hover:bg-[#91ADC8] hover:text-[#FAFDD6] transition">
              Nasıl Çalışır?
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-4 md:px-8 bg-[#FAFDD6] text-center text-[#647FBC] text-sm font-semibold border-t border-[#91ADC8]">
        © {new Date().getFullYear()} Interloper. Tüm hakları saklıdır.
      </footer>
    </div>
  );
}