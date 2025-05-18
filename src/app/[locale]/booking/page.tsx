"use client";
import CarCard1 from "@/src/components/elements/carcard/CarCard1";
import SortCarsFilter from "@/src/components/elements/SortCarsFilter";
import ByCarType from "@/src/components/Filter/ByCarType";
import ByLocation from "@/src/components/Filter/ByLocation";
import ByPagination from "@/src/components/Filter/ByPagination";
import ByPrice from "@/src/components/Filter/ByPrice";
import Layout from "@/src/components/layout/Layout";
import useCarFilter from "@/src/util/useCarFilter";
import BrandsMarquee from "@/src/components/BrandsMarquee";
import ByCategory from "@/src/components/Filter/ByCategory";
import { useCars } from "@/src/hooks/useCars";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function Cars() {
  const { cars } = useCars();

  const {
    filter,
    sortCriteria,
    itemsPerPage,
    currentPage,
    uniqueBrands,
    uniqueLocations,
    filteredCars,
    sortedCars,
    totalPages,
    paginatedCars,
    handleCheckboxChange,
    handleSortChange,
    handlePriceRangeChange,
    handleItemsPerPageChange,
    handlePageChange,
    uniqueCategories,
    handlePreviousPage,
    handleNextPage,
    handleClearFilters,
    startItemIndex,
    endItemIndex,
  } = useCarFilter(cars);

  const searchParams = useSearchParams();

  const t = useTranslations("booking");

  const brands = Array.from(new Set(filteredCars.map((car) => car.brand)));

  useEffect(() => {
    if (searchParams && searchParams.toString()) {
      const element = document.getElementById("our-fleet");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [searchParams]);

  return (
    <>
      <Layout footerStyle={1}>
        <div>
          <div className="page-header-2 pt-30 background-body">
            <div className="custom-container position-relative mx-auto">
              <div className="bg-overlay rounded-12 overflow-hidden">
                <img
                  className="w-100 h-100 img-fluid img-banner"
                  src="/assets/imgs/hero/hero-2/group-of-young-multiethnic-friends-travelling-2024-10-18-03-56-10-utc.jpg"
                  alt="Carento"
                />
              </div>
              <div className="container position-absolute z-1 top-50 start-50 pb-70 translate-middle text-center">
                <h2 className="text-white mt-4">{t("hero.title")}</h2>
              </div>
            </div>
          </div>

          <br />
          <br />
          <section className="box-section block-content-tourlist background-body">
            <div className="container">
              <div className="box-content-main pt-20">
                <div className="content-right">
                  <div className="box-filters mb-25 pb-5 border-bottom border-1">
                    <SortCarsFilter
                      sortCriteria={sortCriteria}
                      handleSortChange={handleSortChange}
                      itemsPerPage={itemsPerPage}
                      handleItemsPerPageChange={handleItemsPerPageChange}
                      handleClearFilters={handleClearFilters}
                      startItemIndex={startItemIndex}
                      endItemIndex={endItemIndex}
                      sortedCars={sortedCars}
                    />
                  </div>
                  <div className="box-grid-tours wow fadeIn">
                    <div className="row">
                      {paginatedCars.map((car) => (
                        <div
                          className="col-lg-4 col-md-6 wow fadeInUp"
                          key={car.id}
                        >
                          <CarCard1 car={car} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <ByPagination
                    handlePreviousPage={handlePreviousPage}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    handleNextPage={handleNextPage}
                    handlePageChange={handlePageChange}
                  />
                </div>
                <div className="content-left order-lg-first">
                  <div className="sidebar-left border-1 background-body">
                    <div className="box-filters-sidebar">
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">
                          {t("filters.price.title")}
                        </h6>
                        <ByPrice
                          filter={filter}
                          handlePriceRangeChange={handlePriceRangeChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sidebar-left border-1 background-body">
                    <div className="box-filters-sidebar">
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">
                          {t("filters.category.title")}
                        </h6>
                        <ByCategory
                          filter={filter}
                          handleCheckboxChange={handleCheckboxChange}
                          uniqueCategories={uniqueCategories}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sidebar-left border-1 background-body">
                    <div className="box-filters-sidebar">
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">
                          {t("filters.brand.title")}
                        </h6>
                        <ByCarType
                          uniqueBrands={uniqueBrands}
                          filter={filter}
                          handleCheckboxChange={handleCheckboxChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sidebar-left border-1 background-body">
                    <div className="box-filters-sidebar">
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">
                          {t("filters.location.title")}
                        </h6>
                        <ByLocation
                          uniqueLocations={uniqueLocations}
                          filter={filter}
                          handleCheckboxChange={handleCheckboxChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <BrandsMarquee brands={brands} />
          </section>
        </div>
      </Layout>
    </>
  );
}
