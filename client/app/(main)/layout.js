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
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
