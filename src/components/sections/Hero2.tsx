"use client";
import useCustomQuery from "@/src/hooks/useCustomQuery";
import { Link } from "@/src/i18n/navigation";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import HeroSearch from "../elements/HeroSearch";
import { useCarStore } from "@/src/store/useCarStore";
import { useEffect } from "react";

export default function Hero2() {
  const { data, error } = useCustomQuery("cars");
  const { setCars } = useCarStore();

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
                      <span className="btn background-brand-2 px-3 py-3 rounded-12 text-sm-bold text-dark">
                        +3600 cars for you
                      </span>
                      <h1 className="mt-20 mb-20 color-white">
                        Find your next vehicle today
                      </h1>
                      <h6 className="color-white heading-6-medium pb-lg-0 pb-4">
                        Browse our diverse inventory and enjoy a seamless buying
                        experience <br />
                        with expert support every step of the way
                      </h6>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="item-banner-slide banner-2">
                    <div className="container">
                      <span className="btn background-brand-2 px-3 py-3 rounded-12 text-sm-bold text-dark">
                        Best car rental system
                      </span>
                      <h1 className="mt-20 mb-20 color-white">
                        Discover your next ride today
                      </h1>
                      <h6 className="color-white heading-6-medium">
                        Explore our wide selection and enjoy a smooth purchasing
                        journey, <br />
                        with expert assistance at every turn
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
            <div className="box-search-advance background-card wow fadeInUp mb-5">
              <div className="box-top-search">
                <div className="left-top-search">
                  <Link
                    className="category-link text-sm-bold btn-click active"
                    href="#"
                  >
                    All cars
                  </Link>
                </div>
                <div className="right-top-search d-none d-md-flex">
                  <Link
                    className="text-sm-medium need-some-help"
                    href="/contact"
                  >
                    Need help?
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
