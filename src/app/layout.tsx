import type { Metadata } from "next";
import "./globals.css";
import CommonHeader from "./_components/common-header";
import CommonFooter from "./_components/common-footer";


export const metadata: Metadata = {
  title: "TTRPG",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/cix6ttg.css"/>  
      </head>
      <body>
          <CommonHeader/>
          <div className="main">
            {children}
            <CommonFooter/>
          </div>
      </body>
    </html>
  );
}
