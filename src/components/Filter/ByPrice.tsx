export default function ByPrice({ handlePriceRangeChange, filter }: any) {
  return (
    <>
      <div className="box-collapse scrollFilter">
        <input
          type="range"
          min="0"
          max="500"
          value={filter.price_per_day[0]}
          onChange={(e) =>
            handlePriceRangeChange([
              parseInt(e.target.value),
              filter.price_per_day[1],
            ])
          }
        />
        <input
          type="range"
          min="0"
          max="500"
          value={filter.price_per_day[1]}
          onChange={(e) =>
            handlePriceRangeChange([
              filter.price_per_day[0],
              parseInt(e.target.value),
            ])
          }
        />
        <div>
          <span>${filter.price_per_day[0]}</span> -{" "}
          <span>${filter.price_per_day[1]}</span>
        </div>
      </div>
    </>
  );
}
