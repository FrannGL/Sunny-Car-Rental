"use client";

import { Link } from "@/src/i18n/navigation";
import { Car } from "../types/car";
import { ProtectedLink } from "./ProtectedLink";

interface CarCardProps {
  car: Car;
}

export const CarCard = ({ car }: CarCardProps) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6">
      <div className="card-journey-small background-card hover-up">
        <div className="card-image">
          <Link href={`/cars-details-2?id=${car.id}`}>
            <img
              src={
                car.image_base64 ||
                "/assets/imgs/cars-listing/cars-listing-2/car-1.png"
              }
              alt={`${car.brand} ${car.model}`}
            />
          </Link>
        </div>
        <div className="card-info p-4 pt-30">
          <div className="card-rating">
            <div className="card-left" />
            <div className="card-right">
              <span className="rating text-xs-medium rounded-pill">
                4.96{" "}
                <span className="text-xs-medium neutral-500">
                  (672 reviews)
                </span>
              </span>
            </div>
          </div>
          <div className="card-title">
            <Link
              className="text-lg-bold neutral-1000 text-nowrap"
              href={`/cars-details-2?id=${car.id}`}
            >
              {car.brand} {car.model}
            </Link>
          </div>
          <div className="card-program">
            <div className="card-location">
              <p className="text-location text-sm-medium neutral-500">
                {car.location.name || "Unknown Location"}
              </p>
            </div>
            <div className="card-facitlities">
              <p className="card-miles text-md-medium">{car.year} Model</p>
              <p className="card-gear text-md-medium">
                {car.gama.charAt(0).toUpperCase() + car.gama.slice(1)} Range
              </p>
              <p className="card-fuel text-md-medium">
                {car.status === "available" ? "Available" : "Unavailable"}
              </p>
              <p className="card-seat text-md-medium">
                Plate: {car.plate_number}
              </p>
            </div>
            <div className="endtime">
              <div className="card-price">
                <h6 className="text-lg-bold neutral-1000">
                  ${car.price_per_day.toFixed(2)}
                </h6>
                <p className="text-md-medium neutral-500">/day</p>
              </div>
              <div className="card-button">
                <ProtectedLink
                  className="btn btn-gray"
                  href={`/cars-details/${car.id}`}
                >
                  Book Now
                </ProtectedLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
