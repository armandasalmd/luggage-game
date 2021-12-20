import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@redux/store";
import { logoutUser } from "@redux/actions";
import { Navbar } from "@components/molecules";
import { PillButton } from "@components/atoms";
import GlobalUtils from "@utils/Global";
import PersonIcon from "@material-ui/icons/Person";
import LogoutIcon from "@material-ui/icons/ExitToApp";

interface DashboardNavbarProps {
  onLogout?(): void;
}

const DashboardNavbar: FC<DashboardNavbarProps> = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  function onLogout() {
    dispatch(logoutUser());
    GlobalUtils.callIfFunction(props.onLogout);
  }

  return (
    <Navbar>
      <PillButton
        onSuffixClick={onLogout}
        prefix={<PersonIcon />}
        suffix={<LogoutIcon />}
        colorType="secondary"
        textEllipsis
      >
        {user.username}
      </PillButton>
    </Navbar>
  );
};

export default DashboardNavbar;
