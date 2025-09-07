import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

// ✅ Load Google Font without variable
const jost = Jost({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "My E-commerce App",
  description: "An e-commerce app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}