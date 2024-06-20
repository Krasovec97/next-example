import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import "bootstrap/scss/bootstrap.scss"
import {getLocale, getMessages} from "next-intl/server";
import {NextIntlClientProvider} from "next-intl";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Audibook",
  description: "Audio books for everywhone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();


  return (
    <html lang={locale}>
      <body className={inter.className}>
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
      </body>
    </html>
  );
}
