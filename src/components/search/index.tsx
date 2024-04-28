import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "../../app/store/core";
import {
  updateCurrentPage,
  updateFilteredUser,
} from "../../app/features/userSlice";

const Search: FC = () => {
  const dispatch = useDispatch();
  const { usersListData } = useSelector((state) => state.user);
  const [searchText, setSearchText] = useState("");

  const handleSearchUser = () => {
    const filteredUsers = usersListData?.results?.filter((pokemon) =>
      pokemon.name?.toLowerCase()?.includes(searchText?.toLowerCase())
    );
    dispatch(updateFilteredUser(filteredUsers));
    if (searchText === "") {
      dispatch(updateCurrentPage(0));
    }
  };
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto flex">
      <input
        type="text"
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
        className="w-full border rounded-l-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
        placeholder="Search..."
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-md"
        onClick={() => handleSearchUser()}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
