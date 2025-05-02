import Marquee from "react-fast-marquee";

interface Props {
  brands: string[];
}

export default function BrandsMarquee({ brands }: Props) {
  return (
    <div className="background-100 pt-55 pb-55">
      <div className="container">
        <Marquee
          direction="left"
          pauseOnHover={true}
          className="carouselTicker carouselTicker-left box-list-brand-car justify-content-center wow fadeIn"
        >
          <ul className="carouselTicker__list">
            {brands.map((brand) => (
              <li className="carouselTicker__item" key={brand}>
                <div className="item-brand">
                  <img
                    className="light-mode"
                    src={`/assets/imgs/page/homepage2/${brand.toLowerCase()}.png`}
                    alt={brand}
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
