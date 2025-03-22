import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Manrope } from "next/font/google";
import "./globals.css";

const manropeSans = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const geistMono = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CBT Genie",
  description: "AI Powered Computer Based Test System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manropeSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-center" className="!rounded-3xl" />
        {children}
      </body>
    </html>
  );
}
