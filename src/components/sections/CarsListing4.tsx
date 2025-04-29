"use client";

import { Link } from "@/src/i18n/navigation";
import { useCarStore } from "@/src/store/useCarStore";
import { CarCard } from "../CarCard";
import { useState } from "react";
import { FaCarSide } from "react-icons/fa";

export default function CarsListing4() {
  const { cars } = useCarStore();
  const [visibleCars, setVisibleCars] = useState(4);

  const loadMoreCars = () => {
    setVisibleCars((prevVisibleCars) => prevVisibleCars + 4);
  };

  if (!cars.length) {
    return <></>;
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
              <h3 className="neutral-1000">Vehículos Destacados</h3>
              <p className="text-lg-medium neutral-500">
                Encuentra el vehículo perfecto para cualquier ocasión.
              </p>
            </div>
            <div className="col-md-4 mt-md-0 mt-4">
              <div className="d-flex justify-content-end">
                <Link className="btn btn-primary" href="/cars-list-1">
                  Ver Todos
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
                <FaCarSide className="mr-2" style={{ marginTop: 1 }} /> Cargar
                más vehículos
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
