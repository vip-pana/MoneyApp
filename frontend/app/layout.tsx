import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./ui/globals.css";
import { Providers } from "@/components/base/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MoneyApp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
