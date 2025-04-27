import { routing } from "@/src/i18n/routing";
import { hasLocale } from "next-intl";
import { Urbanist } from "next/font/google";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import "@/node_modules/react-modal-video/css/modal-video.css";
import Providers from "../Providers";
import "/public/assets/css/main.css";

const urbanist = Urbanist({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sunny Car Rental",
  description: "Cars Rental",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${urbanist.variable}`}>
        <Providers locale={locale}>{children}</Providers>
      </body>
    </html>
  );
}
