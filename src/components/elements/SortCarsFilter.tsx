"use client";
import { Link } from "@/src/i18n/navigation";

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
  return (
    <>
      <div className="row align-items-center">
        <div className="col-xl-4 col-md-4 mb-10 text-lg-start text-center">
          <div className="box-view-type">
            <span className="text-sm-bold neutral-500 number-found">
              {startItemIndex} - {endItemIndex} of {sortedCars.length} tours
              found
            </span>
          </div>
        </div>
        <div className="col-xl-8 col-md-8 mb-10 text-lg-end text-center">
          <div className="box-item-sort">
            <button
              className="btn btn-clear text-xs-medium"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
            <div className="item-sort border-1">
              <span className="text-xs-medium neutral-500 mr-5">Show</span>
              <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
            <div className="item-sort border-1">
              <span className="text-xs-medium neutral-500 mr-5 d-block m-w-50px">
                Sort by:
              </span>
              <select value={sortCriteria} onChange={handleSortChange}>
                <option value="name">Model</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
