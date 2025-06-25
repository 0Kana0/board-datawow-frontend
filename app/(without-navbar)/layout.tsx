import type { Metadata } from "next";
import "../globals.css";
import Providers from "../provider";

export const metadata: Metadata = {
  title: "Board Website",
  description: "Board Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>      
      </body>
    </html>
  );
}
