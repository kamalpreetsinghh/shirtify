import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { inter } from "./fonts";
import Navbar from "@/components/Navbar";
import AppThemeProvider from "@/components/AppThemeProvider";
import MobileNav from "@/components/MobileNav";
import "./globals.css";

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
      <html lang="en" suppressHydrationWarning>
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
