import React from "react";
import { ItemViewProps } from "../types";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "../../app/store/core";

const GridView: React.FC<ItemViewProps> = ({ usersListData }) => {
  const { isUserLoading } = useSelector((state) => state.user);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-100% p-4 ">
      {isUserLoading
        ? [...Array(12)].map((elementInArray) => (
            <Skeleton
              key={elementInArray}
              count={1}
              className="m-4 text-center"
              width={"98%"}
              height={180}
            />
          ))
        : usersListData?.results?.map((item) => (
            <div
              key={item?.id}
              className="grid-item rounded-lg overflow-hidden shadow-md bg-white"
            >
              {item.imagePath && (
                <img
                  src={item.imagePath}
                  alt={item.name}
                  className="w-full h-40"
                />
              )}

              {/* Content */}
              <div className="p-4 text-center">
                <h3 className="text-lg font-medium mb-2">{item.name}</h3>
                {/* Description (if available) */}
                {item.name && <p className="text-gray-700">{item.name}</p>}
              </div>
            </div>
          ))}
    </div>
  );
};

export default GridView;
