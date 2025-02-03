import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/header";
import Footer from "./_components/footer";
import Script from "next/script";


export const metadata: Metadata = {
  title: "Malve Studios",
  description: "",
  keywords: ["pro dm", "pro gm", "Professional Dungeon Master"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-11546391891" />
        <Script src="gtag.js" />
        <link rel="stylesheet" href="https://use.typekit.net/cix6ttg.css" />
      </head>
      <body>
        <Header />
        <div className="main">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
