export default function Footer() {
  return (
    <footer className="w-full py-4 px-2 md:px-12 bg-[#FAFDD6] text-center text-[#91ADC8] text-lg font-semibold border-t border-[#AED6CF]">
      © {new Date().getFullYear()} Interloper. Tüm hakları saklıdır.
    </footer>
  );
}