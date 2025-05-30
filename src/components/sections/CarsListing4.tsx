"use client";

import { Link } from "@/src/i18n/navigation";

import { CarCard } from "../CarCard";
import { useState } from "react";
import { FaCarSide } from "react-icons/fa";
import { useCars } from "@/src/hooks/useCars";
import { useTranslations } from "next-intl";

export default function CarsListing4() {
  const { cars } = useCars();
  const [visibleCars, setVisibleCars] = useState(4);

  const t = useTranslations("featured_cars");

  const loadMoreCars = () => {
    setVisibleCars((prevVisibleCars) => prevVisibleCars + 4);
  };

  if (!cars.length) {
    return <div className="text-center">{t("no_cars")}</div>;
  }

  return (
    <>
      <section
        className="section-box box-flights background-body"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div style={{ maxWidth: "1600px", width: "90%" }}>
          <div className="row align-items-end">
            <div className="col-md-8">
              <h3 className="neutral-1000">{t("title")}</h3>
              <p className="text-lg-medium neutral-500">{t("subtitle")}</p>
            </div>
            <div className="col-md-4 mt-md-0 mt-4">
              <div className="d-flex justify-content-end">
                <Link className="btn btn-primary" href="/booking">
                  {t("view_all")}
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 15L15 8L8 1M15 8L1 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="row pt-30 wow fadeInUp">
            <div className="row pt-30 wow fadeInUp">
              {cars.length > 0 &&
                cars
                  .slice(0, visibleCars)
                  .map((car) => <CarCard key={car.id} car={car} />)}
            </div>
          </div>
          {cars.length > visibleCars && (
            <div
              className="d-flex justify-content-center mt-4"
              style={{ flexWrap: "wrap" }}
            >
              <button className="btn btn-primary" onClick={loadMoreCars}>
                <FaCarSide className="mr-2" style={{ marginTop: 1 }} />
                {t("load_more")}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
