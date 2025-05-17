import React from "react";
import { Filter } from "@/src/util/useCarFilter";

interface ByCategoryProps {
  uniqueCategories: string[];
  filter: Filter;
  handleCheckboxChange: (
    field: keyof Filter,
    value: string | number
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ByCategory: React.FC<ByCategoryProps> = ({
  uniqueCategories,
  filter,
  handleCheckboxChange,
}) => {
  return (
    <div className="box-collapse scrollFilter">
      <ul className="list-filter-checkbox">
        {uniqueCategories
          .filter(
            (category): category is string => typeof category === "string"
          )
          .map((category) => (
            <li key={category}>
              <label className="cb-container">
                <input
                  type="checkbox"
                  checked={filter.category.includes(category)}
                  onChange={handleCheckboxChange("category", category)}
                />
                <span className="text-sm-medium">
                  Gama {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
                <span className="checkmark" />
              </label>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ByCategory;
