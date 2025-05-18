"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import { Car } from "../types/car";

interface CarCardProps {
  car: Car;
}

export const CarCard = ({ car }: CarCardProps) => {
  const t = useTranslations("featured_cars.car_card");

  return (
    <div className="col-lg-3 col-md-4 col-sm-6">
      <div className="card-journey-small background-card hover-up">
        <div className="card-image">
          <Link href={`/cars-details/${car.id}`}>
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
                  (672 {t("reviews")})
                </span>
              </span>
            </div>
          </div>
          <div className="card-title">
            <Link
              className="text-lg-bold neutral-1000 text-nowrap"
              href={`/cars-details/${car.id}`}
            >
              {car.brand} {car.model}
            </Link>
          </div>
          <div className="card-program">
            <div className="card-location">
              <p className="text-location text-sm-medium neutral-500">
                {car.location.name || t("location.unknown")}
              </p>
            </div>
            <div className="card-facitlities">
              <p className="card-miles text-sm-medium">
                {t("details.model")} {car.year}
              </p>
              <p className="card-gear text-sm-medium">
                {car.transmission === "automatic"
                  ? t("details.transmission.automatic")
                  : t("details.transmission.manual")}
              </p>
              <p className="card-seat text-sm-medium">
                {car.passenger_capacity} {t("details.seating")}
              </p>
              <p className="card-miles text-sm-medium">
                {car.gama === "alta"
                  ? t("details.range.high")
                  : car.gama === "economica"
                  ? t("details.range.economy")
                  : t("details.range.medium")}
              </p>
            </div>
            <div className="endtime">
              <div className="card-price">
                <h6 className="text-lg-bold neutral-1000">
                  USD {car.price_per_day.toFixed(2)}
                </h6>
                <p className="text-md-medium neutral-500">
                  {t("price.per_day")}
                </p>
              </div>
              <div className="card-button">
                <Link className="btn btn-gray" href={`/cars-details/${car.id}`}>
                  {t("button.book")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
