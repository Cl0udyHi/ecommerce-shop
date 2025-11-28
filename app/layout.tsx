import "./globals.css";
import BodyContent from "@/components/cart/cart-context";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import Cart from "@/components/cart/Cart";
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
        <BodyContent>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Cart />
        </BodyContent>
      </body>
    </html>
  );
}
