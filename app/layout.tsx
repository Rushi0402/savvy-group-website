import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ContactModal from "@/components/ContactModal";
import { ContactProvider } from "../context/ContactContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Savvy Group | Security, Housekeeping & Facility Management",
  description:
    "Savvy Group provides professional security services, housekeeping, manpower, facility management, banquet services, and business support across India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <ContactProvider>
        
        {children}

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#ffffff",
              color: "#1e293b",
              borderRadius: "12px",
              padding: "16px",
              fontWeight: "500",
            },
          }}
        />
        <ContactModal />
        </ContactProvider>
      </body>
    </html>
  );
}
