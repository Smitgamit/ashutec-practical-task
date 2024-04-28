import React from "react";
import Card from "../card";
import { ItemViewProps } from "../types";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "../../app/store/core";

const AllView: React.FC<ItemViewProps> = ({ usersListData }) => {
  const { isUserLoading } = useSelector((state) => state.user);
  return (
    <ul>
      {isUserLoading
        ? [...Array(6)].map((elementInArray) => (
            <Skeleton
              key={elementInArray}
              count={1}
              className="m-4 text-center"
              width={"98%"}
              height={120}
            />
          ))
        : usersListData?.results?.map((pokemon) => (
            <Card key={pokemon.id} cardInfo={pokemon} />
          ))}
    </ul>
  );
};

export default AllView;
