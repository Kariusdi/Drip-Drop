import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const kanit = Kanit({
  subsets: ["latin", "latin-ext", "thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-kanit",
});

export const metadata: Metadata = {
  title: "Drip Drop",
  description: "For Drip Drop prototype only",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body
        className={`${kanit.className} antialiased flex justify-center items-center h-dvh w-full bg-orange-50 text-center`}
      >
        <main className="h-full w-dvh flex justify-center items-center overflow-hidden p-2 relative bg-gradient-to-b from-primary-light from-45% to-primary">
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </main>
      </body>
    </html>
  );
}
