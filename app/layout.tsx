import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import AppThemeProvider from "@/components/AppThemeProvider";
import { inter } from "./fonts";

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
            <main>{children}</main>
          </AppThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
