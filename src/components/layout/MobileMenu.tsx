"use client";
import { Link } from "@/src/i18n/navigation";
import Image from "next/image";
import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

export default function MobileMenu({ isMobileMenu, handleMobileMenu }: any) {
  const [isAccordion, setIsAccordion] = useState(0);

  const handleAccordion = (key: any) => {
    setIsAccordion((prevState) => (prevState === key ? null : key));
  };
  return (
    <>
      <div
        className={`mobile-header-active mobile-header-wrapper-style perfect-scrollbar button-bg-2 ${
          isMobileMenu ? "sidebar-visible" : ""
        }`}
      >
        <PerfectScrollbar className="mobile-header-wrapper-inner">
          <div className="mobile-header-logo">
            <Link className="d-flex" href="/">
              <Image
                className="light-mode"
                alt="Sunny Car Rental"
                src="/assets/imgs/app/app-1/logo.svg"
                width={150}
                height={150}
              />
            </Link>
            <div
              className="burger-icon burger-icon-white"
              onClick={handleMobileMenu}
            />
          </div>
          <div className="mobile-header-content-area">
            <div className="perfect-scroll">
              <div className="mobile-menu-wrap mobile-header-border">
                <nav>
                  <ul className="mobile-menu font-heading">
                    <li
                      className={`has-children ${
                        isAccordion === 1 ? "active" : ""
                      }`}
                    >
                      <span onClick={() => handleAccordion(1)}>
                        <i className="arrow-small-down"></i>
                      </span>
                      <Link href="/">Home</Link>
                    </li>
                    <li
                      className={`has-children ${
                        isAccordion === 1 ? "active" : ""
                      }`}
                    >
                      <span onClick={() => handleAccordion(1)}>
                        <i className="arrow-small-down"></i>
                      </span>
                      <Link href="/about-us">About Us</Link>
                    </li>
                    <li
                      className={`has-children ${
                        isAccordion === 2 ? "active" : ""
                      }`}
                    >
                      <span onClick={() => handleAccordion(2)}>
                        <i className="arrow-small-down"></i>
                      </span>
                      <Link href="/booking">Booking</Link>
                    </li>
                    <li>
                      <Link href="/contact">Contact</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </PerfectScrollbar>
      </div>
      {isMobileMenu && (
        <div className="body-overlay-1" onClick={handleMobileMenu} />
      )}
    </>
  );
}
