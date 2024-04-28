import React from "react";
import Search from "../search";
import SideNavBar from "../nav-bar";
import { useSelector } from "../../app/store/core";

const Header = () => {
  const { usersTypes } = useSelector((state) => state.user);
  return (
    <div className={"flex items-center justify-between p-4"}>
      <SideNavBar navTypes={usersTypes?.results} />
      <Search />
    </div>
  );
};

export default Header;
