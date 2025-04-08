import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const montserrart = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrart.className} antialiased`}>
        <nav
          className="bg-orange-600 text-white flex justify-between items-center 
        lg:px-16 md:px-8 px-4 py-1"
        >
          <Link href="/" className="font-bold text-2xl my-2">Shapi</Link>
          {/* <Link href="/cart">
            <Image src="/shopping-cart.svg" alt="shopping cart" width={30} height={30}/>
          </Link> */}
          <Link href="/login">
            <span className="text-white font-medium hover:text-gray-200 active:text-white">
              Log In
            </span>
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
