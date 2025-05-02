"use client";
import { ChangeEvent, useMemo, useState, useEffect } from "react";
import { Car } from "../types/car";
import { useRouter, useSearchParams } from "next/navigation";

export interface Filter {
  brand: string[];
  locations: string[];
  price_per_day: [number, number];
}

type SortCriteria = "price" | "brand" | "location";

const useCarFilter = (carsData: Car[]) => {
  const [filter, setFilter] = useState<Filter>({
    brand: [],
    locations: [],
    price_per_day: [0, 500],
  });
  const [sortCriteria, setSortCriteria] = useState<SortCriteria>("brand");
  const [itemsPerPage, setItemsPerPage] = useState<number>(6);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const pickUpLocationId = searchParams.get("pickUpLocation");
    const dropOffLocationId = searchParams.get("dropOffLocation");

    const locationNames: string[] = [];

    if (pickUpLocationId) {
      const pickUpLoc = carsData.find(
        (car) => car.location.id.toString() === pickUpLocationId
      )?.location.name;
      if (pickUpLoc && !locationNames.includes(pickUpLoc)) {
        locationNames.push(pickUpLoc);
      }
    }

    if (dropOffLocationId) {
      const dropOffLoc = carsData.find(
        (car) => car.location.id.toString() === dropOffLocationId
      )?.location.name;
      if (dropOffLoc && !locationNames.includes(dropOffLoc)) {
        locationNames.push(dropOffLoc);
      }
    }

    if (locationNames.length > 0) {
      setFilter((prevFilter) => ({
        ...prevFilter,
        locations: locationNames,
      }));
    }
  }, [searchParams, carsData]);

  const uniqueBrands = useMemo(
    () => [...new Set(carsData.map((car) => car.brand))],
    [carsData]
  );

  const uniqueLocations = useMemo(() => {
    return Array.from(
      new Map(carsData.map((car) => [car.location.name, car.location])).values()
    );
  }, [carsData]);

  const filteredCars = useMemo(() => {
    return carsData.filter((car) => {
      return (
        (filter.brand.length === 0 || filter.brand.includes(car.brand)) &&
        (filter.locations.length === 0 ||
          filter.locations.includes(car.location.name)) &&
        car.price_per_day >= filter.price_per_day[0] &&
        car.price_per_day <= filter.price_per_day[1]
      );
    });
  }, [carsData, filter]);

  const sortedCars = useMemo(() => {
    return [...filteredCars].sort((a, b) => {
      if (sortCriteria === "price") return a.price_per_day - b.price_per_day;
      if (sortCriteria === "brand") return a.brand.localeCompare(b.brand);
      if (sortCriteria === "location")
        return a.location.name.localeCompare(b.location.name);
      return 0;
    });
  }, [filteredCars, sortCriteria]);

  const totalPages = Math.ceil(sortedCars.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCars = sortedCars.slice(startIndex, endIndex);

  const handleCheckboxChange =
    (field: keyof Filter, value: string | number) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      setFilter((prevFilter) => {
        const currentValues = prevFilter[field];
        if (!Array.isArray(currentValues)) return prevFilter;

        const updatedValues = checked
          ? [...currentValues, value]
          : currentValues.filter((item) => item !== value);

        return { ...prevFilter, [field]: updatedValues };
      });
    };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(e.target.value as SortCriteria);
  };

  const handlePriceRangeChange = (values: [number, number]) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      price_per_day: values,
    }));
  };

  const handleItemsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleClearFilters = () => {
    setFilter({
      brand: [],
      locations: [],
      price_per_day: [0, 500],
    });
    setSortCriteria("brand");
    setItemsPerPage(4);
    setCurrentPage(1);

    const current = new URLSearchParams(searchParams.toString());

    current.delete("pickUpLocation");
    current.delete("dropOffLocation");
    current.delete("pickupDate");
    current.delete("dropoffDate");

    router.replace(`?${current.toString()}`, { scroll: false });
  };

  const startItemIndex = (currentPage - 1) * itemsPerPage + 1;
  const endItemIndex = Math.min(
    startItemIndex + itemsPerPage - 1,
    sortedCars.length
  );

  return {
    filter,
    setFilter,
    sortCriteria,
    setSortCriteria,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    uniqueBrands,
    uniqueLocations,
    filteredCars,
    sortedCars,
    totalPages,
    startIndex,
    endIndex,
    paginatedCars,
    handleCheckboxChange,
    handleSortChange,
    handlePriceRangeChange,
    handleItemsPerPageChange,
    handlePageChange,
    handlePreviousPage,
    handleNextPage,
    handleClearFilters,
    startItemIndex,
    endItemIndex,
  };
};

export default useCarFilter;
