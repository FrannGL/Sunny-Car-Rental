"use client";
import { useState } from "react";
import BackToTop from "../elements/BackToTop";
import Breadcrumb from "./Breadcrumb";
import MobileMenu from "./MobileMenu";
import Footer1 from "./footer/Footer1";
import Header2 from "./header/Header2";

interface LayoutProps {
  footerStyle?: Number;
  children?: React.ReactNode;
  breadcrumbTitle?: string;
}

export default function Layout({
  footerStyle,
  breadcrumbTitle,
  children,
}: LayoutProps) {
  const [scroll, setScroll] = useState<boolean>(false);
  // MobileMenu
  const [isMobileMenu, setMobileMenu] = useState<boolean>(false);
  const handleMobileMenu = (): void => {
    setMobileMenu(!isMobileMenu);
    !isMobileMenu
      ? document.body.classList.add("mobile-menu-active")
      : document.body.classList.remove("mobile-menu-active");
  };

  return (
    <>
      <div id="top" />

      <Header2
        scroll={scroll}
        isMobileMenu={isMobileMenu}
        handleMobileMenu={handleMobileMenu}
      />

      <MobileMenu
        isMobileMenu={isMobileMenu}
        handleMobileMenu={handleMobileMenu}
      />

      <main className="main">
        {breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} />}

        {children}
      </main>

      <Footer1 />

      <BackToTop target="#top" />
    </>
  );
}
