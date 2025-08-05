import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter", // ¡Clave para usarla con Tailwind!
});

export const metadata: Metadata = {
  title: "Optiven Catalogos",
  description: "Catalogos de Optiven",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased bg-gradient-to-br from-slate-50 to-slate-100`}
      >
        {children}
      </body>
    </html>
  );
}
