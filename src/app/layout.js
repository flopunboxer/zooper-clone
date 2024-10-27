"use client";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import { usePathname } from "next/navigation";
import Image from "next/image";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {pathname === "/waiver-form" && <Header />}
        <div className="flex justify-center items-center  sm:-mt-12">
          <Image
            src="/zooperlogo.png" 
            alt="Zooper Logo"
            width={280} 
            height={280}
            priority
          />
        </div>
        {children}
      </body>
    </html>
  );
}
