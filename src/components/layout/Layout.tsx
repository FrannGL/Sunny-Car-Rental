"use client";
import { useEffect, useState } from "react";
import BackToTop from "../elements/BackToTop";
import Breadcrumb from "./Breadcrumb";
import MobileMenu from "./MobileMenu";
import Offcanvas from "./Offcanvas";
import Footer1 from "./footer/Footer1";
import Footer2 from "./footer/Footer2";
import Header1 from "./header/Header1";
import Header2 from "./header/Header2";
import Header3 from "./header/Header3";
import useCustomQuery from "@/src/hooks/useCustomQuery";
import { useCarStore } from "@/src/store/useCarStore";

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
  const { data, error } = useCustomQuery("cars");
  const { setCars } = useCarStore();

  useEffect(() => {
    const WOW: any = require("wowjs");
    (window as any).wow = new WOW.WOW({
      live: false,
    });

    // Initialize WOW.js
    (window as any).wow.init();

    const handleScroll = (): void => {
      const scrollCheck: boolean = window.scrollY > 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scroll]);

  useEffect(() => {
    if (data) {
      setCars(data);
    }
  }, [data, setCars]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
