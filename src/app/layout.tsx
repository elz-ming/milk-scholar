"use client";

import { usePathname } from "next/navigation";
import HeaderBar from "@/app/components/HeaderBar";
import FooterBar from "@/app/components/FooterBar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showLayout =
    !pathname.startsWith("/settings") && !pathname.startsWith("/admin");

  const getTitle = () => {
    if (pathname === "/") return "Todo List";
    if (pathname === "/you") return "You";
    return "";
  };
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {showLayout && <HeaderBar title={getTitle()} />}
        {children}
        {showLayout && <FooterBar />}
      </body>
    </html>
  );
}
