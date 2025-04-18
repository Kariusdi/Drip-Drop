import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

const noto_sans = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Oil Collector",
  description: "For oil collector prototype only",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${noto_sans.className} antialiased flex justify-center items-center h-dvh w-full bg-orange-50 text-center`}
      >
        <main className="h-full w-xl flex justify-center items-center overflow-hidden p-2 border-2">
          {children}
        </main>
      </body>
    </html>
  );
}
