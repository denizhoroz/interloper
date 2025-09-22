import "../globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { shared } from "../../lib/metadata";


// Using shared metadata

export const metadata = {
  title: shared.title,
  description: shared.description,
};

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}
