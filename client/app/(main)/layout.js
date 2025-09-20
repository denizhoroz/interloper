// import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { shared } from "../../lib/metadata";

// Using shared metadata


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: shared.title,
  description: shared.description,
};

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#91ADC8] via-[#647FBC] to-[#AED6CF]">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}
