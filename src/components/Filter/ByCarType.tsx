import { Filter } from "@/src/hooks/useCarFilter";
import React from "react";

interface ByCarTypeProps {
  uniqueBrands: string[];
  filter: Filter;
  handleCheckboxChange: (
    field: keyof Filter,
    value: string | number
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ByCarType: React.FC<ByCarTypeProps> = ({
  uniqueBrands,
  filter,
  handleCheckboxChange,
}) => {
  return (
    <div className="box-collapse scrollFilter">
      <ul className="list-filter-checkbox">
        {uniqueBrands.map((car) => (
          <li key={car}>
            <label className="cb-container">
              <input
                type="checkbox"
                checked={filter.brand.includes(car)}
                onChange={handleCheckboxChange("brand", car)}
              />
              <span className="text-sm-medium">{car} </span>
              <span className="checkmark" />
            </label>
            {/* <span className="number-item">{car?.length}</span> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ByCarType;
