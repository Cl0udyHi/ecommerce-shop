import "./globals.css";
import Providers from "@/app/components/providers";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/navbar/Navbar";
import { Metadata } from "next";
import Cart from "./components/cart/cart";
import { Toaster } from "@/components/shadcn/ui/sonner";
import { Suspense } from "react";
import CartDetails, { CartSkeleton } from "./components/cart/cart-details";
import { getCart } from "@/lib/shopify/api";
import { TEMP_CARTID } from "@/utils/data";

export const metadata: Metadata = {
  title: "Wavin",
  description:
    "Premium fashion for the modern lifestyle. Quality craftsmanship meets contemporary design.",
};

export default async function RootLayout({
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
        <Toaster className="z-100" />
      </body>
    </html>
  );
}
