import React, { FC } from "react";

interface CustomPaginationProps {
  currentPage?: number;
  maxPageCount?: number;
  pageSize?: number;
  onNextPage?: () => void;
  onPreviousPage?: () => void;
  onPageChange?: (pageNumber: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

const CustomPagination: FC<CustomPaginationProps> = ({
  currentPage,
  maxPageCount,
  pageSize,
  onNextPage,
  onPageChange,
  onPageSizeChange,
  onPreviousPage,
}) => {
  return (
    <div className="flex items-center mt-4 justify-center py-3 border border-black-300">
      {onPageSizeChange && onPageChange && pageSize && (
        <div className="flex items-center pr-sm-4 mr-2">
          <select
            className="pgInput p-1 rounded-lg"
            onChange={(e) => {
              if (onPageSizeChange) onPageSizeChange(Number(e.target.value));
            }}
            value={pageSize}
            name="pagination"
          >
            {[10, 25, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>{" "}
          <span className="ml-2 font-bold">Per Page</span>
        </div>
      )}

      <div className="flex items-center page-mobile-view">
        {onPreviousPage && (
          <button
            className="border border-white-800 bg-blue-500 text-white font-bold py-2 px-4 rounded-md mr-2"
            onClick={() => {
              if (onPreviousPage) onPreviousPage();
            }}
            disabled={Boolean(currentPage && currentPage <= 0)}
          >
            Previous
          </button>
        )}
        {maxPageCount && onPageChange && (
          <input
            type="number"
            className="w-full px-1 py-1 text-center rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            onChange={(e) => {
              if (onPageChange) {
                const pageNumber =
                  Number(e.target.value) > maxPageCount
                    ? maxPageCount
                    : Number(e.target.value) < 0
                    ? 0
                    : Number(e.target.value);
                onPageChange(pageNumber);
              }
            }}
            min={1}
            value={currentPage && currentPage > maxPageCount ? 1 : currentPage}
            max={maxPageCount}
            name="inputPagination"
          />
        )}{" "}
        <span className="text-nowrap mx-2 font-bold">of {maxPageCount}</span>
        {onNextPage && (
          <button
            onClick={() => {
              if (onNextPage) onNextPage();
            }}
            className="border border-white-800 bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};
export default CustomPagination;
