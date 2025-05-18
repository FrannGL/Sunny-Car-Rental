"use client";
import { swiperGroup1 } from "@/src/util/swiperOptions";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Review2() {
  const t = useTranslations("review");

  return (
    <>
      <section className="background-body pt-80 pb-50">
        <div className="container">
          <div className="box-swiper">
            <Swiper
              {...swiperGroup1}
              className="swiper-container swiper-group-1 position-relative"
            >
              <div className="swiper-wrapper">
                <SwiperSlide>
                  <div className="item-banner-slide-review d-flex align-items-center rounded-12">
                    <div className="ps-md-5 ps-2 position-relative z-1">
                      <span className="text-primary text-md-bold">
                        {t("company_name")}
                      </span>
                      <h3 className="mt-20 mb-20 color-white">
                        {t("title")}
                        <br className="d-none d-md-block" />
                        {t("subtitle")}
                      </h3>
                    </div>
                  </div>
                </SwiperSlide>
              </div>
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}
