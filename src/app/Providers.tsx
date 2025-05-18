"use client";

import { NextIntlClientProvider, hasLocale } from "next-intl";
import { AuthProvider } from "@/src/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routing } from "@/src/i18n/routing";
import { Toaster } from "sonner";

const Providers = ({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) => {
  const queryClient = new QueryClient();

  if (!hasLocale(routing.locales, locale)) {
    return null;
  }

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        {children}
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default Providers;
