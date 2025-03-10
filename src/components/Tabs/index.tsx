import { FC, useState } from "react";
import { TabsProps } from "./types";

const Tabs: FC<TabsProps> = ({ tabs }) => {
  const [setslectedTab, setSetslectedTab] = useState(0);
  return (
    <div>
      {tabs.map((tab, index) => (
        <span
          onClick={() => setSetslectedTab(index)}
          key={index}
          className="tab-title"
        >
          {tab.title}
        </span>
      ))}
      <div>{tabs[setslectedTab]?.children}</div>
    </div>
  );
};

export default Tabs;
