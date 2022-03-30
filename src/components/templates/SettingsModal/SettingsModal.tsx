import React, { FC, useState } from "react";
import "./SettingsModal.scss";

import { Modal, TabItem } from "@components/atoms";
import { Tabs } from "@components/molecules";
import { ID } from "@utils/Types";
import SettingsPrefTab from "../SettingsPrefTab/SettingsPrefTab";
import SettingsProfileTab from "../SettingsProfileTab/SettingsProfileTab";
import SettingsSecurityTab from "../SettingsSecurityTab/SettingsSecurityTab";

const DEFAULT_ACTIVE_TAB = 1;
const TABS = [
  {
    id: 1,
    text: "Public profile",
    component: SettingsProfileTab
  },
  {
    id: 2,
    text: "Preferences",
    component: SettingsPrefTab
  },
  {
    id: 3,
    text: "Security settings",
    component: SettingsSecurityTab
  },
];

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: FC<SettingsModalProps> = (props) => {
  const [, setTabId] = useState<ID>(DEFAULT_ACTIVE_TAB);

  const tabs = TABS.map(({ component, ...rest }) => {
    return (
      <TabItem key={rest.id} {...rest}>
        {React.createElement(component)}
      </TabItem>
    )
  });

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Account settings"
      fullScreen
      noPadding
    >
      <div className="settings">
        <Tabs
          defaultActiveTab={DEFAULT_ACTIVE_TAB}
          mobileFriendlyMenu
          mobileMenuItems={TABS}
          onTabChange={setTabId}
        >
          {tabs}
        </Tabs>
      </div>
    </Modal>
  );
};

export default SettingsModal;
