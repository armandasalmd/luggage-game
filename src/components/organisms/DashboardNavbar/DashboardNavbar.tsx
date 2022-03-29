import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@redux/store";
import { logoutUser } from "@redux/actions";
import { PillButton } from "@components/atoms";
import { Navbar, Notifications } from "@components/molecules";
import { SettingsModal } from "@components/templates";
import GlobalUtils from "@utils/Global";
import PersonIcon from "@material-ui/icons/Person";
import LogoutIcon from "@material-ui/icons/ExitToApp";

interface DashboardNavbarProps {
  onLogout?(): void;
}

const DashboardNavbar: FC<DashboardNavbarProps> = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  function onLogout() {
    dispatch(logoutUser());
    GlobalUtils.callIfFunction(props.onLogout);
  }

  function onOpenSettings() {
    setNotificationsOpen(false);
    setSettingsOpen(true);
  }

  return (
    <Navbar sticky>
      <Notifications open={notificationsOpen} setOpen={setNotificationsOpen} />
      <PillButton
        onClick={onOpenSettings}
        onSuffixClick={onLogout}
        prefix={<PersonIcon />}
        suffix={<LogoutIcon />}
        colorType="secondary"
        textEllipsis
      >
        {user.username}
      </PillButton>
      <SettingsModal
        isOpen={settingsOpen}
        onClose={setSettingsOpen.bind(null, false)}
      />
    </Navbar>
  );
};

export default DashboardNavbar;
