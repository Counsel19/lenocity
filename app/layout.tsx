import type { Metadata } from "next";
import { Montserrat_Alternates } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/components/shared/StoreProvider";
import Link from "next/link";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster";

const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["100", "200", "400", "300", "500", "800", "700"],
});

export const metadata: Metadata = {
  title: "Lenocity",
  description:
    "Lenocity is a learning platform that provides simplified training in technology, Engineering ,Arts and Design for young people.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserratAlternates.className}>
        <StoreProvider>
          {children}
          <Link
            href="https://wa.me/+2348182556227"
            className="fixed w-[50px] h-[50px] flex border-2 border-green-500 overflow-hidden  bottom-4 right-8 bg-slate-50 text-white rounded-full shadow-lg z-50"
          >
            <Image
              src="/images/whatsapp.svg"
              alt="Whatsapp logo"
              className="w-full h-full"
              height={50}
              width={50}
            />
          </Link>
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
