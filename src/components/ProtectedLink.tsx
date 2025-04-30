"use client";

import { useClientSession } from "@/src/hooks/useClientSession";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { Link } from "../i18n/navigation";

interface ProtectedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const ProtectedLink = ({
  href,
  children,
  className,
}: ProtectedLinkProps) => {
  const router = useRouter();
  const locale = useLocale();
  const { token } = useClientSession();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (token) {
      router.push(href);
    } else {
      router.push(`${locale}/403`);
    }
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
};
