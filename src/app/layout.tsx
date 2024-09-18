import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased h-screen dark:bg-neutral-950/50 bg-neutral-400`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <main className="h-full">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
