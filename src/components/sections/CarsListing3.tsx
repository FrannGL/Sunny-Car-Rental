"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "@/src/i18n/navigation";
import { swiperGroup2 } from "@/src/util/swiperOptions";
import { useCarStore } from "@/src/store/useCarStore";
import { CarCard } from "../CarCard";

export default function CarsListing3() {
  const { cars } = useCarStore();

  const filterCars = Array.isArray(cars) ? cars.slice(0, 3) : [];

  return (
    <>
      <section className="section-box box-flights background-body">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-6 mb-30 text-center text-lg-start">
              <h2 className="neutral-1000">Popular Vehicles</h2>
              <p className="text-xl-medium neutral-500">
                Favorite vehicles based on customer reviews
              </p>
            </div>
          </div>
          <div className="block-flights wow fadeInUp">
            <div className="box-swiper mt-30">
              <Swiper
                {...swiperGroup2}
                className="swiper-container swiper-group-2 swiper-group-journey"
              >
                <div className="swiper-wrapper">
                  {filterCars.length > 0 && (
                    <SwiperSlide>
                      <div className="d-flex justify-content-center align-items-center gap-3">
                        {filterCars.map((car) => (
                          <CarCard key={car.id} car={car} />
                        ))}
                      </div>
                    </SwiperSlide>
                  )}
                </div>
              </Swiper>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <Link
              className="btn btn-brand-2 text-nowrap wow fadeInUp"
              href="/cars-list-1"
            >
              <svg
                className="me-2"
                xmlns="http://www.w3.org/2000/svg"
                width={19}
                height={18}
                viewBox="0 0 19 18"
                fill="none"
              >
                <g clipPath="url(#clip0_117_4717)">
                  <path
                    d="M4.4024 14.0977C1.60418 11.2899 1.60418 6.71576 4.4024 3.90794L5.89511 5.40064V0.90332H1.39779L3.13528 2.64081C-0.378102 6.1494 -0.378102 11.8562 3.13528 15.3696C5.35275 17.5823 8.43896 18.403 11.2996 17.8175V15.9648C8.91413 16.584 6.26949 15.9648 4.4024 14.0977Z"
                    fill="#101010"
                  />
                  <path
                    d="M15.864 2.64036C13.6465 0.418093 10.5603 -0.402657 7.69971 0.182907V2.03559C10.0852 1.41643 12.7346 2.04519 14.5969 3.90748C17.4047 6.71531 17.4047 11.2894 14.5969 14.0973L13.1042 12.6045V17.1067H17.6063L15.8688 15.3692C19.3774 11.8558 19.3774 6.14894 15.864 2.64036Z"
                    fill="#101010"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_117_4717">
                    <rect
                      width={18}
                      height={18}
                      fill="white"
                      transform="translate(0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
              Load More Cars
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
