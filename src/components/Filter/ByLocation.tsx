import { useCars } from "@/src/hooks/useCars";
import { Location } from "@/src/types/locations";
import { Filter } from "@/src/hooks/useCarFilter";

interface ByLocationProps {
  uniqueLocations: Location[];
  filter: Filter;
  handleCheckboxChange: (
    field: keyof Filter,
    value: string | number
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ByLocation({
  uniqueLocations,
  filter,
  handleCheckboxChange,
}: ByLocationProps) {
  const { cars } = useCars();

  return (
    <>
      <div className="box-collapse scrollFilter">
        <ul className="list-filter-checkbox">
          {uniqueLocations.map((location: Location) => {
            // Contamos cuántas veces se repite location.name en cars
            const count = cars.filter(
              (car) => car.location?.name === location.name
            ).length;

            return (
              <li key={location.id}>
                <label className="cb-container">
                  <input
                    type="checkbox"
                    checked={filter.locations.includes(location.name)}
                    onChange={handleCheckboxChange("locations", location.name)}
                  />
                  <span className="text-sm-medium">{location.name}</span>
                  <span className="checkmark" />
                </label>
                <span className="number-item">{count}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
