"use client";
import { Link } from "@/src/i18n/navigation";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Icon } from "@iconify/react";
import HeroSearch from "../elements/HeroSearch";
import Image from "next/image";

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
                      <div className="container d-flex justify-content-center">
                        <Link className="d-flex" href="/">
                          <img
                            alt="Sunny Rental Cars"
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
                        Alquilá tu auto en Valencia o Alicante, Low Cost
                      </h1>
                      <h6
                        style={{
                          color: "white",
                          textShadow:
                            "1px 1px 2px rgba(0, 0, 0, 0.5), 0 0 2px #FFD700",
                        }}
                        className="subtitle-padding"
                      >
                        Reserva online tu coche al mejor precio. Sin cargos
                        ocultos, sin complicaciones.
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
            <div
              className="box-search-advance wow fadeInUp mb-5"
              style={{ backgroundColor: "rgba(0, 0, 0, 0)", border: "none" }}
            >
              <div
                className="box-top-search"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  color: "white",
                }}
              >
                {/*       <div className="left-top-search">
                  <Link
                    className="text-sm-bold btn-click active"
                    href="/booking"
                  >
                    All cars
                  </Link>
                </div> */}
                {/*           <div className="right-top-search d-none d-md-flex">
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
                </div> */}
              </div>
              <HeroSearch />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
