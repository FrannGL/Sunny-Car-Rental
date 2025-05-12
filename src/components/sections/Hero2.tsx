"use client";
import { Link } from "@/src/i18n/navigation";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Icon } from "@iconify/react";
import HeroSearch from "../elements/HeroSearch";

export default function Hero2() {
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
              {/*         <span className="btn background-brand-2 px-3 py-3 rounded-12 text-sm-bold text-dark">
                        +3600 cars for you
                      </span> */}
                      <h1
                        className="mt-20 color-black"
                        style={{ fontSize: "3.2rem" }}
                      >
                        Alquiler de Autos en Valencia
                      </h1>
                      <h6 className="color-black">
                        Te garantizamos la mejor experiencia de alquiler de
                        auto, y por sobre todo los mejores precios.
                      </h6>
                    </div>
                  </div>
                </SwiperSlide>
                {/*       <SwiperSlide>
                  <div className="item-banner-slide banner-2">
                    <div className="container">
                      <span className="btn background-brand-2 px-3 py-3 rounded-12 text-sm-bold text-dark">
                        Best car rental system
                      </span>
                      <h1
                        className="mt-20 color-white"
                        style={{ fontSize: "3.2rem" }}
                      >
                        Calidad, servicio y precios que te van a sorprender.
                      </h1>
                      <h6 className="color-white heading-6-medium">
                        Encuentra vehículos de calidad con atención
                        personalizada y tarifas que se adaptan a ti. Tu próxima
                        aventura comienza aquí, sin complicaciones.
                      </h6>
                    </div>
                  </div>
                </SwiperSlide> */}
              </div>
            </Swiper>
          </div>
        </div>
        <div className="container-search-advance">
          <div className="container">
            <div className="box-search-advance background-card wow fadeInUp mb-5">
              <div className="box-top-search">
                <div className="left-top-search">
                  <Link
                    className="text-sm-bold btn-click active"
                    href="/booking"
                  >
                    All cars
                  </Link>
                </div>
                <div className="right-top-search d-none d-md-flex">
                  <Link
                    className="text-sm-medium d-flex align-items-center gap-2"
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon
                      icon="mdi:whatsapp"
                      width="22"
                      height="22"
                      color="#25D366"
                    />
                    <span className="d-none d-lg-inline">Need Help?</span>
                  </Link>
                </div>
              </div>
              <HeroSearch />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
