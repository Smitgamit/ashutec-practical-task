import React, { useEffect } from "react";
import { useDispatch, useSelector } from "./app/store/core";
import {
  getUserTypes,
  getUsers,
  updateCurrentPage,
  updatePageLimit,
} from "./app/features/userSlice";
import Tabs from "./components/tabs";
import ListView from "./components/list-view";
import GridView from "./components/grid-view";
import CustomPagination from "./components/pagination";
import Header from "./components/header";
import AllView from "./components/all-view";

function App() {
  const dispatch = useDispatch();
  const { usersListData, filteredUsersListData, pageLimit, currentPage } =
    useSelector((state) => state.user);
  const defaultPage = "limit=10&offset=0";
  useEffect(() => {
    dispatch(getUsers("limit=10&offset=0"));
    dispatch(getUserTypes());
  }, []);

  const onNextPage = () => {
    dispatch(getUsers(usersListData?.next ?? defaultPage));
    dispatch(updateCurrentPage(currentPage + 1));
  };
  const onPreviousPage = () => {
    dispatch(getUsers(usersListData?.previous ?? defaultPage));
    dispatch(updateCurrentPage(currentPage === 0 ? 0 : currentPage - 1));
  };
  const onPageChange = (currentPage: number) => {
    dispatch(updateCurrentPage(currentPage));
    // dispatch(updatePageLimit(currentPage ));
    dispatch(getUsers(`limit=${pageLimit}&offset=${currentPage * 10}`));
  };
  const onPageSizeChange = (pageSize: number) => {
    dispatch(updatePageLimit(pageSize));
    dispatch(getUsers(`limit=${pageSize}&offset=0`));
  };

  return (
    <div className="">
      <Header />
      <div className="w-100 bg-gray-300">
        <Tabs tabs={["All View", "Grid View", "List View"]}>
          <AllView usersListData={filteredUsersListData} />
          <GridView usersListData={filteredUsersListData} />
          <ListView usersListData={filteredUsersListData} />
        </Tabs>
        <CustomPagination
          currentPage={currentPage}
          maxPageCount={
            usersListData?.count ? Math.ceil(usersListData?.count / 10) : 0
          }
          pageSize={pageLimit}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </div>
  );
}

export default App;
