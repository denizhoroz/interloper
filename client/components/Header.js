import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full py-6 px-4 md:px-12 bg-gradient-to-r from-[#232526] via-[#181A1B] to-[#1a2540] flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 shadow-md border-b border-[#647FBC]">
      <span className="text-3xl font-bold text-[#AED6CF] tracking-wide drop-shadow-lg">Interloper</span>
      <nav className="flex gap-6 md:gap-10">
        <Link
          href="/"
          className="text-[#E3F6F5] font-semibold text-lg hover:text-[#91ADC8] transition-colors duration-300"
        >
          Ana Sayfa
        </Link>
        <Link
          href="/about"
          className="text-[#E3F6F5] font-semibold text-lg hover:text-[#AED6CF] transition-colors duration-300"
        >
          Hakkında
        </Link>
        <Link
          href="/contact"
          className="text-[#E3F6F5] font-semibold text-lg hover:text-[#647FBC] transition-colors duration-300"
        >
          İletişim
        </Link>
      </nav>
    </header>
  );
}