import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import AppThemeProvider from "@/components/AppThemeProvider";
import { inter } from "./fonts";
import MobileNav from "@/components/MobileNav";

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
        <body className={inter.className}>
          <AppThemeProvider>
            <Navbar />
            <MobileNav />
            <main className="root-container">{children}</main>
          </AppThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
