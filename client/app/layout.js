import "./globals.css";

export const metadata = {
  title: "Interloper",
  description: "Learn by living.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">{children}</body>
    </html>
  );
}