import React from "react";

const ShimmerCard = () => {
  return (
    <div className="w-full rounded-lg overflow-hidden shadow-lg animate-pulse">
      <div className="relative bg-gray-500 min-h-72 max-h-72 w-full"></div>

      <div className="bg-white text-black p-2">
        <div className="h-4 bg-gray-500 rounded w-3/4 mx-2 my-2"></div>

        <div className="h-4 bg-gray-500 rounded w-1/2 mx-2 my-2"></div>

        <div className="grid grid-cols-2 grid-rows-3 gap-1 px-2 text-sm">
          <div className="h-4 bg-gray-500 rounded w-full"></div>
          <div className="h-4 bg-gray-500 rounded w-full"></div>

          <div className="h-4 bg-gray-500 rounded w-full"></div>
          <div className="h-4 bg-gray-500 rounded w-full"></div>

          <div className="h-4 bg-gray-500 rounded w-full"></div>
          <div className="h-4 bg-gray-500 rounded w-full"></div>
        </div>

        <div className="px-2 m-2 mt-4 py-2 bg-gray-500 rounded-sm w-20"></div>
      </div>
    </div>
  );
};

export default ShimmerCard;
