import React, { FunctionComponent, useState } from "react";
import { useDispatch } from "../../app/store/core";
import { getListBasedType } from "../../app/features/userSlice";

const SideNavBar: FunctionComponent<SideBarProps> = ({ navTypes }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const openNav = () => {
    setIsOpen(true);
  };

  const closeNav = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <div
        className={`fixed inset-0 bg-black opacity-50 z-40 transition-opacity ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={closeNav}
      ></div>
      <div
        className={`sidenav bg-gray-900 h-full w-64 text-gray-300 fixed top-0 left-0 z-50 transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-0 right-0 mt-4 mr-4 text-2xl"
          onClick={closeNav}
        >
          &times;
        </button>
        <ul>
          {navTypes?.map((menuType) => (
            <li
              className={`px-4 py-2 hover:bg-gray-200 hover:text-black-700 cursor-pointer text-transform: capitalize`}
              key={menuType.name}
              onClick={() => dispatch(getListBasedType(menuType.name))}
            >
              {menuType.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center items-center">
        <button className="text-2xl" onClick={openNav}>
          &#9776; Menu
        </button>
      </div>
    </div>
  );
};

export default React.memo(SideNavBar);

type SideBarProps = {
  navTypes?: {
    name: string;
    url: string;
  }[];
};
