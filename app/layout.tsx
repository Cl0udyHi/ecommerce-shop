import "./globals.css";
import BodyContent from "./bodyContent";
import { Metadata } from "next";

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
        <BodyContent children={children} />
      </body>
    </html>
  );
}
