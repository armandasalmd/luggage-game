import React, { FC, ReactElement, useState } from "react";
import classNames from "classnames";
import "./Tabs.scss";
import { TabItemProps } from "@components/atoms/TabItem/TabItem";
import { ID } from "@utils/Types";

interface TabContainerProps {
  id: ID;
  container: any;
}

interface ReactTabItemProps extends TabItemProps {
  children: any;
}

interface TabsProps {
  children: ReactElement<TabItemProps>[];
  defaultActiveTab: ID;
}

const Tabs: FC<TabsProps> = (props) => {
  const classes = classNames("tabs");
  const tabContainers: TabContainerProps[] = [];

  const [activeTabId, setActiveTabId] = useState(props.defaultActiveTab);

  function onTabItemClick(id: ID) {
    setActiveTabId(id);
  }

  const tabItemsWithClick: ReactElement[] = [];

  React.Children.forEach(props.children, element => {
    if (!React.isValidElement(element)) return;
  
    const tabProps: ReactTabItemProps  = element.props;

    tabContainers.push({
      id: tabProps.id,
      container: tabProps.children
    });

    tabItemsWithClick.push(React.cloneElement(element, {
      onClick: onTabItemClick,
      key: tabProps.id,
      active: activeTabId === tabProps.id,
      ...tabProps
    }));
  });
  
  const activeContainer = tabContainers.find(function (tab: TabContainerProps) {
    return tab.id === activeTabId;
  })?.container;

  return <div className={classes}>
    <div className="tabs__heading">
      {tabItemsWithClick}
    </div>
    <div className="tabs__content">
      {activeContainer}
    </div>
  </div>;
};

export default Tabs;
