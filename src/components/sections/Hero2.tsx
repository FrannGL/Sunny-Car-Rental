"use client";
import { Link } from "@/src/i18n/navigation";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import HeroSearch from "../elements/HeroSearch";
import { useTranslations } from "next-intl";

export default function Hero2() {
  const t = useTranslations("hero");

  return (
    <>
      <section className="section-box box-banner-home7 background-body">
        <div className="container-banner-home7 position-relative">
          <div className="box-swiper">
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={true}
              className="swiper-container swiper-group-1"
            >
              <div className="swiper-wrapper">
                <SwiperSlide>
                  <div className="item-banner-slide banner-1">
                    <div className="container">
                      <div className="container d-flex justify-content-center">
                        <Link className="d-flex" href="/">
                          <img
                            alt={t("alt_logo")}
                            src="/assets/imgs/logo.png"
                            width="220px"
                            height="auto"
                          />
                        </Link>
                      </div>
                      <h1
                        className="mt-20 subtitle-padding"
                        style={{
                          fontSize: "3.2rem",
                          color: "white",
                          textShadow:
                            "2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 3px #FFD700, 0 0 5px #FFD700",
                        }}
                      >
                        {t("title")}
                      </h1>
                      <h6
                        style={{
                          color: "white",
                          textShadow:
                            "1px 1px 2px rgba(0, 0, 0, 0.5), 0 0 2px #FFD700",
                        }}
                        className="subtitle-padding"
                      >
                        {t("subtitle")}
                      </h6>
                    </div>
                  </div>
                </SwiperSlide>
              </div>
            </Swiper>
          </div>
        </div>
        <div className="container-search-advance">
          <div className="container">
            <div
              className="box-search-advance wow fadeInUp mb-5"
              style={{ backgroundColor: "rgba(0, 0, 0, 0)", border: "none" }}
            >
              <HeroSearch />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
