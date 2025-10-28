import type { Metadata } from "next";
import { UnifrakturCook as UnifrakturCookLoader } from "next/font/google"; 
import "./globals.css";
import { MonstrosProvider } from "@/contexts/MonstrosContext";

const unifra = UnifrakturCookLoader({
  weight: "700", 
  subsets: ["latin"],
  variable: "--font-unifrakturcook",
});

export const metadata: Metadata = {
  title: "Andrey Duelos",
  description: "Duelos de D&D do Andrey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.4.2/css/all.css" />
      </head>
      <body
        className={`${unifra.variable} antialiased`}
      >
        <MonstrosProvider>
          {children}
        </MonstrosProvider>
      </body>
    </html>
  );
}
