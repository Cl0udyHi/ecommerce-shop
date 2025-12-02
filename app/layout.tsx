import "./globals.css";
import Providers from "@/app/components/providers";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/navbar/Navbar";
import Cart from "@/components/cart/cart-panel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wavin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="scroll-smooth">
      <body className="antialiased">
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Cart />
        </Providers>
      </body>
    </html>
  );
}
