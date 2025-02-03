import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/header";
import Footer from "./_components/footer";


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
