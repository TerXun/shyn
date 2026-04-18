import "./globals.css";
import { ReactNode } from "react";
import Nav from "@/components/Nav";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main className="px-10 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
