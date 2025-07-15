import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/authContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chapa test",
  description: "Created by Betelhem Kirub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body
        className={ `${geistSans.variable} ${geistMono.variable} antialiased` }
      >
        <AuthProvider>
          <Toaster />
          <Navigation />
          { children }
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
