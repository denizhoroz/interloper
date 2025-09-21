export default function Footer() {
  return (
    <footer className="w-full py-6 px-4 md:px-12 bg-gradient-to-r from-[#232526] via-[#181A1B] to-[#1a2540] text-center text-[#AED6CF] text-lg font-semibold border-t border-[#647FBC] shadow-inner">
      © {new Date().getFullYear()} Interloper. Tüm hakları saklıdır.
    </footer>
  );
}