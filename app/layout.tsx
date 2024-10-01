import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Appbar } from "./components/Appbar";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <Providers>
          <Appbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
