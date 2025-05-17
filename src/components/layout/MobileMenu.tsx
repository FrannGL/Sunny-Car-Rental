"use client";
import { Link } from "@/src/i18n/navigation";
import Image from "next/image";
import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useAuth } from "@/src/context/AuthContext";

export default function MobileMenu({ isMobileMenu, handleMobileMenu }: any) {
  const [isAccordion, setIsAccordion] = useState(0);
  const { user } = useAuth();

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
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li>
                      <Link href="/about-us">About Us</Link>
                    </li>
                    <li>
                      <Link href="/booking">Booking</Link>
                    </li>
                    <li>
                      <Link href="/contact">Contact</Link>
                    </li>
                    <li>
                      <Link href="/rentals">Rentals</Link>
                    </li>
                    {user?.role?.id === 2 && (
                      <li
                        className={`has-children ${
                          isAccordion === 3 ? "active" : ""
                        }`}
                        onClick={() => handleAccordion(3)}
                      >
                        <div className="d-flex align-items-center justify-content-between">
                          <Link href="#" onClick={(e) => e.preventDefault()}>
                            Backoffice
                          </Link>
                          <span className="menu-expand">
                            <i className="arrow-small-down"></i>
                          </span>
                        </div>
                        <ul
                          className={`sub-menu ${
                            isAccordion === 3 ? "d-block" : "d-none"
                          }`}
                        >
                          <li>
                            <Link href="/backoffice/cars">Cars</Link>
                          </li>
                          <li>
                            <Link href="/backoffice/rentals">Rentals</Link>
                          </li>
                          <li>
                            <Link href="/backoffice/locations">Locations</Link>
                          </li>
                          <li>
                            <Link href="/backoffice/seasons">Seasons</Link>
                          </li>
                          <li>
                            <Link href="/backoffice/coupons">Coupons</Link>
                          </li>
                        </ul>
                      </li>
                    )}
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
