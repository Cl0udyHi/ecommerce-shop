import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./Elements/Navbar/Navbar";
import Footer from "./Footer";

export const metadata: Metadata = {
  title: "Wavin",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
