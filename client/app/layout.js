import "./globals.css";

export const metadata = {
  title: "Interloper",
  description: "Learn by living.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}