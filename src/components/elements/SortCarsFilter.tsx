"use client";
import { Link } from "@/src/i18n/navigation";
import { useTranslations } from "next-intl";

export default function SortCarsFilter({
  sortCriteria,
  handleSortChange,
  itemsPerPage,
  handleItemsPerPageChange,
  handleClearFilters,
  startItemIndex,
  endItemIndex,
  sortedCars,
}: any) {
  const t = useTranslations("booking.sort_filter");

  return (
    <>
      <div className="row align-items-center">
        <div className="col-xl-4 col-md-4 mb-10 text-lg-start text-center">
          <div className="box-view-type">
            <span className="text-sm-bold neutral-500 number-found">
              {startItemIndex} - {endItemIndex} of {sortedCars.length}{" "}
              {t("results.found")}
            </span>
          </div>
        </div>
        <div className="col-xl-8 col-md-8 mb-10 text-lg-end text-center">
          <div className="box-item-sort">
            <button
              className="btn btn-clear text-xs-medium"
              onClick={handleClearFilters}
            >
              {t("filters.clear")}
            </button>
            <div className="item-sort border-1">
              <span className="text-xs-medium neutral-500 mr-5">
                {t("filters.show")}
              </span>
              <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
            <div className="item-sort border-1">
              <span className="text-xs-medium neutral-500 mr-5 d-block m-w-50px">
                {t("filters.sort_by")}
              </span>
              <select value={sortCriteria} onChange={handleSortChange}>
                <option value="brand">{t("sort_options.brand")}</option>
                <option value="price">{t("sort_options.price")}</option>
                <option value="location">{t("sort_options.location")}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
