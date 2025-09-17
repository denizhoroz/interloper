import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full py-6 px-4 md:px-12 bg-[#FAFDD6] flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 shadow-md border-b border-[#AED6CF]">
      <span className="text-3xl font-bold text-[#647FBC] tracking-wide">Interloper</span>
      <nav className="flex gap-6 md:gap-10">
        <Link
          href="/"
          className="text-[#647FBC] font-semibold text-lg hover:text-[#91ADC8] transition"
        >
          Ana Sayfa
        </Link>
        <Link
          href="/about"
          className="text-[#647FBC] font-semibold text-lg hover:text-[#91ADC8] transition"
        >
          Hakkında
        </Link>
        <Link
          href="/contact"
          className="text-[#647FBC] font-semibold text-lg hover:text-[#91ADC8] transition"
        >
          İletişim
        </Link>
      </nav>
    </header>
  );
}