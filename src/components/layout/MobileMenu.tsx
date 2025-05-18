"use client";
import { Link } from "@/src/i18n/navigation";
import Image from "next/image";
import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useAuth } from "@/src/context/AuthContext";
import { useTranslations } from "next-intl";

export default function MobileMenu({ isMobileMenu, handleMobileMenu }: any) {
  const [isAccordion, setIsAccordion] = useState(0);
  const { user } = useAuth();

  const t = useTranslations("navbar");

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
                      <Link href="/">{t("home")}</Link>
                    </li>
                    <li>
                      <Link href="/about-us">{t("about")}</Link>
                    </li>
                    <li>
                      <Link href="/booking">{t("booking")}</Link>
                    </li>
                    <li>
                      <Link href="/contact">{t("contact")}</Link>
                    </li>
                    {user && (
                      <li>
                        <Link href="/rentals">{t("rentals")}</Link>
                      </li>
                    )}
                    {user?.role?.id === 2 && (
                      <li
                        className={`has-children ${
                          isAccordion === 3 ? "active" : ""
                        }`}
                        onClick={() => handleAccordion(3)}
                      >
                        <div className="d-flex align-items-center justify-content-between">
                          <Link href="#" onClick={(e) => e.preventDefault()}>
                            {t("backoffice.title")}
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
                            <Link href="/backoffice/cars">
                              {t("backoffice.cars")}
                            </Link>
                          </li>
                          <li>
                            <Link href="/backoffice/rentals">
                              {t("backoffice.rentals")}
                            </Link>
                          </li>
                          <li>
                            <Link href="/backoffice/locations">
                              {t("backoffice.locations")}
                            </Link>
                          </li>
                          <li>
                            <Link href="/backoffice/seasons">
                              {t("backoffice.seasons")}
                            </Link>
                          </li>
                          <li>
                            <Link href="/backoffice/coupons">
                              {t("backoffice.coupons")}
                            </Link>
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
