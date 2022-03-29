import { FC, useState } from "react";
import "./SettingsModal.scss";

import { Modal } from "@components/atoms";
import { Tabs } from "@components/molecules";
import { ID } from "@utils/Types";

const DEFAULT_ACTIVE_TAB = 1;
const TABS= [
  {
    id: 1,
    text: "Public profile",
  },
  {
    id: 2,
    text: "Preferences",
  },
  {
    id: 3,
    text: "Security settings",
  }
];

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: FC<SettingsModalProps> = (props) => {
  const [tabId, setTabId] = useState<ID>(DEFAULT_ACTIVE_TAB);

  return <Modal isOpen={props.isOpen} onClose={props.onClose} title="Account settings" fullScreen>
    <div className="settings">
      <Tabs
        defaultActiveTab={DEFAULT_ACTIVE_TAB}
        mobileFriendlyMenu
        mobileMenuItems={TABS}
        onTabChange={setTabId}
        >

      </Tabs>
    </div>
  </Modal>
};

export default SettingsModal;