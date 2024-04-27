import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import AppThemeProvider from "@/components/AppThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shirtify",
  description: "Customize your tshirts with your personality and creativity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ variables: { colorPrimary: "#F50056" } }}>
      <html lang="en">
        <AppThemeProvider>
          <body className={inter.className}>
            <Navbar />
            <main>{children}</main>
          </body>
        </AppThemeProvider>
      </html>
    </ClerkProvider>
  );
}
