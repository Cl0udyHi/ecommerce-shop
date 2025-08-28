import "./globals.css";
import BodyContent from "./Elements/BodyContent";
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
        <BodyContent>{children}</BodyContent>
      </body>
    </html>
  );
}
