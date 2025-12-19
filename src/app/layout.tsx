import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { AntdProvider } from "@/components/AntdProvider";
import { AuthProvider } from "@/app/context/AuthContext";
import FloatingNav from "@/components/FloatingNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gennie - Indexador de Materiais",
  description: "Use para indexar materiais que vão ser usados pela IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased`}
      >
        <AuthProvider>
          <AntdProvider>
            <FloatingNav />
            {children}
          </AntdProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
