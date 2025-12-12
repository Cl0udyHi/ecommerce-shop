import "./globals.css";
import Providers from "@/app/components/providers";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/navbar/Navbar";
import { Metadata } from "next";
import Cart from "./components/cart/cart";
import { Toaster } from "@/components/shadcn/ui/sonner";
import { cookies } from "next/headers";
import { startTransition, Suspense } from "react";
import { createCartCookie } from "./actions/cart-actions";
import { CartSkeleton } from "./components/cart/cart-details";

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

          <Suspense fallback={<CartSkeleton />}>
            <Cart />
          </Suspense>
        </Providers>
        <Toaster className="z-100" />
      </body>
    </html>
  );
}
