"use client";
import { useAuth } from "@/src/context/AuthContext";
import useMediaQuery from "@/src/hooks/useMediaQuery";
import { Link, usePathname, useRouter } from "@/src/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { LiaGlobeAmericasSolid } from "react-icons/lia";
import { ClipLoader } from "react-spinners";

const ThemeSwitch = dynamic(
  () => import("@/src/components/elements/ThemeSwitch"),
  {
    ssr: false,
  }
);

const languages = [
  {
    value: "en",
    label: "English",
    countryCode: "US",
    flagIcon: "/assets/imgs/flags/uk.png",
  },
  {
    value: "es",
    label: "Español",
    countryCode: "ES",
    flagIcon: "/assets/imgs/flags/es.png",
  },
];

export default function Header2({
  scroll,
  isMobileMenu,
  handleMobileMenu,
  isOffcanvas,
}: any) {
  const { user, isLoading, logout } = useAuth();

  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 1400px)");
  const t = useTranslations("navbar");

  const currentLang = languages.find((lang) => lang.value === locale);

  const handleChangeLang = useCallback(
    (newLang: "es" | "en") => {
      router.replace(pathname, {
        locale: newLang,
      });
    },
    [router, pathname]
  );

  const handleLogout = async () => {
    const success = await logout();
    if (success) router.push(`/login`);
  };

  return (
    <>
      <header
        className={`header sticky-bar header-home-2 ${scroll ? "stick" : ""}`}
      >
        <div className="top-bar top-bar-2 top-bar-3 @@bg">
          <div className="container-fluid">
            <div className="text-header-info">
              <Link className="phone-head text-white" href="/tel:123-456-7890">
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.656 2.34229C10.5314 -0.781426 5.46601 -0.780676 2.34229 2.34401C-0.781426 5.4687 -0.780676 10.534 2.34401 13.6577C5.4687 16.7814 10.534 16.7807 13.6577 13.656C15.1579 12.1554 16.0005 10.1202 16 7.99829C15.9996 5.87673 15.1564 3.84223 13.656 2.34229ZM12.1157 11.1439C12.1154 11.1443 12.115 11.1446 12.1147 11.145V11.1423L11.7093 11.545C11.1851 12.0758 10.4216 12.2942 9.69598 12.121C8.96489 11.9253 8.26989 11.6138 7.63732 11.1983C7.04964 10.8227 6.50501 10.3837 6.01332 9.88898C5.56092 9.43989 5.15448 8.94676 4.79998 8.41698C4.41223 7.84692 4.10532 7.22592 3.88798 6.57164C3.63882 5.80301 3.84529 4.95961 4.42132 4.39298L4.89598 3.91832C5.02795 3.78576 5.24239 3.78529 5.37492 3.91726C5.37526 3.91761 5.37564 3.91795 5.37598 3.91832L6.87464 5.41698C7.0072 5.54895 7.00767 5.76339 6.8757 5.89592C6.87536 5.89626 6.87501 5.89661 6.87464 5.89698L5.99464 6.77698C5.74214 7.02673 5.71039 7.42361 5.91998 7.71032C6.23826 8.14714 6.59048 8.55817 6.97332 8.93967C7.40017 9.36835 7.8642 9.75832 8.35998 10.105C8.64645 10.3048 9.03482 10.2711 9.28264 10.025L10.1333 9.16101C10.2653 9.02845 10.4797 9.02798 10.6122 9.15995C10.6126 9.16029 10.6129 9.16064 10.6133 9.16101L12.1146 10.665C12.2472 10.7969 12.2477 11.0114 12.1157 11.1439Z"
                    fill="white"
                  />
                </svg>
                <span className="d-none d-lg-inline-block">
                  +1 222-555-33-99
                </span>
              </Link>
              <Link className="email-head text-white" href="/tel:123-456-7890">
                <svg
                  width={16}
                  height={12}
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.96372 1.07378L6.28622 5.39816C7.22897 6.33909 8.77003 6.33991 9.71356 5.39816L14.0361 1.07378C14.0796 1.03025 14.0732 0.958563 14.0227 0.923344C13.5819 0.615875 13.0455 0.433594 12.4677 0.433594H3.53216C2.95431 0.433594 2.41791 0.615906 1.97703 0.923344C1.92653 0.958563 1.92019 1.03025 1.96372 1.07378ZM0.808594 3.15713C0.808594 2.70275 0.92125 2.27344 1.11969 1.89609C1.15072 1.83706 1.22938 1.82513 1.27653 1.87228L5.54431 6.14006C6.89578 7.4935 9.10322 7.49428 10.4555 6.14006L14.7233 1.87228C14.7704 1.82513 14.8491 1.83706 14.8801 1.89609C15.0785 2.27344 15.1912 2.70278 15.1912 3.15713V8.84266C15.1912 10.3456 13.9687 11.5662 12.4677 11.5662H3.53216C2.03116 11.5662 0.808594 10.3456 0.808594 8.84266V3.15713Z"
                    fill="white"
                  />
                </svg>
                <span className="d-none d-lg-inline-block">
                  sale@Sunny Car Rental.com
                </span>
              </Link>
            </div>

            <div className="top-right-header">
              <Dropdown className="d-inline-block ms-3">
                <Dropdown.Toggle variant="dark" id="language-selector">
                  <Image
                    src={currentLang?.flagIcon || "/assets/icons/us.png"}
                    alt={currentLang?.label || "Language"}
                    width={20}
                    height={20}
                    className="me-2"
                  />
                  {currentLang?.label || "Language"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {languages.map((lang) => (
                    <Dropdown.Item
                      key={lang.value}
                      active={lang.value === locale}
                      onClick={() => {
                        if (lang.value === "en" || lang.value === "es") {
                          handleChangeLang(lang.value);
                        }
                      }}
                    >
                      <Image
                        src={lang.flagIcon}
                        alt={lang.label}
                        width={20}
                        height={20}
                        className="me-2"
                      />
                      {lang.label}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="container-fluid background-body">
          <div className="main-header">
            <div className="header-left">
              {pathname !== "/" && (
                <div className="header-logo">
                  <Link className="d-flex" href="/">
                    <Image
                      alt="Sunny Rental Cars"
                      src="/assets/imgs/logo.png"
                      width={120}
                      height={100}
                    />
                  </Link>
                </div>
              )}
              <div className="header-nav">
                <nav
                  className={`nav-main-menu ${
                    pathname === "/" ? "justify-content-start" : ""
                  }`}
                >
                  <ul className="main-menu">
                    <li className="mega-li-small">
                      <Link href="/">{t("home")}</Link>
                    </li>
                    <li className="mega-li-small">
                      <Link href="/about-us">{t("about")}</Link>
                    </li>
                    <li className="mega-li-small">
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
                      <li className="menu-item-has-children">
                        <Link href="#">{t("backoffice.title")}</Link>
                        <ul className="sub-menu">
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

              <div
                className="header-right"
                style={{ paddingRight: isMobile ? 70 : 0 }}
              >
                {isLoading ? (
                  <div style={{ paddingRight: 50 }}>
                    <ClipLoader color="#70f46d" loading size={50} />
                  </div>
                ) : user ? (
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      variant="outline-dark"
                      id="dropdown-user"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        borderRadius: "0.5rem",
                        padding: "9px 25px",
                      }}
                    >
                      <FaUserCircle size={20} />
                      {user.username}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={handleLogout}
                        className="logout-item"
                      >
                        <FaSignOutAlt />
                        {t("auth.sign_out")}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <div className="d-xxl-inline-block align-middle mr-1">
                    <Link
                      className="btn btn-signin neutral-1000"
                      href="/login"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={12}
                        height={12}
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M1 12C1 12 0 12 0 11C0 10 1 7 6 7C11 7 12 10 12 11C12 12 11 12 11 12H1ZM6 6C6.79565 6 7.55871 5.68393 8.12132 5.12132C8.68393 4.55871 9 3.79565 9 3C9 2.20435 8.68393 1.44129 8.12132 0.87868C7.55871 0.316071 6.79565 0 6 0C5.20435 0 4.44129 0.316071 3.87868 0.87868C3.31607 1.44129 3 2.20435 3 3C3 3.79565 3.31607 4.55871 3.87868 5.12132C4.44129 5.68393 5.20435 6 6 6Z"
                          fill="#101010"
                        />
                      </svg>
                      {t("auth.sign_in")}
                    </Link>
                  </div>
                )}

                <div
                  className="burger-icon burger-icon-white"
                  onClick={handleMobileMenu}
                >
                  <span className="burger-icon-top" />
                  <span className="burger-icon-mid"> </span>
                  <span className="burger-icon-bottom"> </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
