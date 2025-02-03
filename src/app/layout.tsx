import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/header";
import Footer from "./_components/footer";
import Script from "next/script";


export const metadata: Metadata = {
  title: "Malve Studios",
  description: "",
  keywords: ["pro dm", "pro gm", "Professional Dungeon Master", "dungeon master", "dm", "game master"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-6D0539ZP2P" strategy="beforeInteractive" />
        <Script src="gtag.js" strategy="beforeInteractive"/>
        <link rel="stylesheet" href="https://use.typekit.net/cix6ttg.css" />
        <Script src="pro_dm_fb_tag.js" strategy="beforeInteractive" />
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
