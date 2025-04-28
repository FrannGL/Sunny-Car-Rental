import Marquee from "react-fast-marquee";
import { Car } from "../types/car";

interface Props {
  carsData: Car[];
}

export default function BrandsMarquee({ carsData }: Props) {
  return (
    <div className="background-100 pt-55 pb-55">
      <div className="container">
        <Marquee
          direction="left"
          pauseOnHover={true}
          className="carouselTicker carouselTicker-left box-list-brand-car justify-content-center wow fadeIn"
        >
          <ul className="carouselTicker__list">
            {carsData.map((car) => (
              <li className="carouselTicker__item" key={car.id}>
                <div className="item-brand">
                  <img
                    className="light-mode"
                    src={`/assets/imgs/page/homepage2/${car.brand.toLowerCase()}.png`}
                    alt={car.brand}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Marquee>
      </div>
    </div>
  );
}
