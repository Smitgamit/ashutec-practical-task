import React, { ReactNode, useState } from "react";
import { useDispatch } from "../../app/store/core";
import { getUsers } from "../../app/features/userSlice";

interface TabProps {
  tabs: string[];
  children: ReactNode[];
  defaultTab?: number;
}

const Tabs: React.FC<TabProps> = ({ tabs, defaultTab = 0, children }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const handleTabSwitch = (index: number) => {
    if (index === 0) {
      dispatch(getUsers("limit=10&offset=0"));
    }
  };
  return (
    <div>
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${
              activeTab === index ? "bg-gray-100" : "bg-white"
            } px-4 py-p0: stringp0?: stringp0?: stringp0: string2 border-b-2 border-transparent`}
            onClick={() => {
              handleTabSwitch(index);
              setActiveTab(index);
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>{children[activeTab]}</div>
    </div>
  );
};

export default Tabs;
