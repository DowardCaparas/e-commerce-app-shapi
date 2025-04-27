import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import NavBar from "./ui/navbar";

const montserrart = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shapi E-commerce",
  description: "Shapi is an E-commerce website built by Dounhuward Caparas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="max-w-[1440px] mx-auto">
      <body className={`${montserrart.className} antialiased`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
