import { Link } from "@/src/i18n/navigation";
import Image from "next/image";

interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  plate_number: string;
  price_per_day: number;
  status: string;
  image_base64: string | null;
  location?: string | null;
}

export default function CarCard1({ car }: { car: Car }) {
  const fallbackImage =
    "https://img.freepik.com/foto-gratis/jeep-offroader-blanco-estacionamiento_114579-4007.jpg?t=st=1745876771~exp=1745880371~hmac=7374e8b64aefabc23a6ec075a494667d1902d33898c646de2e0ded6f48f7e9c9&w=996";

  const imageSrc = car.image_base64 ? car.image_base64 : fallbackImage;

  return (
    <div className="card-journey-small background-card hover-up">
      <div className="card-image">
        <Link href={`/cars-details/${car.id}`}>
          <Image
            width={300}
            height={200}
            src={imageSrc}
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
              <span className="text-xs-medium neutral-500">(672 reviews)</span>
            </span>
          </div>
        </div>
        <div className="card-title">
          <Link
            className="text-lg-bold neutral-1000 text-nowrap"
            href={`/cars-details/${car.id}`}
          >
            {car.brand} {car.model} {car.year}
          </Link>
        </div>
        <div className="card-program">
          <div className="card-location">
            <p className="text-location text-sm-medium neutral-500">
              {car.location ? car.location : "Unknown location"}
            </p>
          </div>
          <div className="card-facitlities">
            <p className="card-miles text-md-medium">25,100 miles</p>
            <p className="card-gear text-md-medium">Automatic</p>
            <p className="card-fuel text-md-medium">Diesel</p>
            <p className="card-seat text-md-medium">7 seats</p>
          </div>
          <div className="endtime">
            <div className="card-price">
              <h6 className="text-lg-bold neutral-1000">
                ${car.price_per_day}
              </h6>
              <p className="text-md-medium neutral-500">/ day</p>
            </div>
            <div className="card-button">
              <Link className="btn btn-gray" href={`/cars-details/${car.id}`}>
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
