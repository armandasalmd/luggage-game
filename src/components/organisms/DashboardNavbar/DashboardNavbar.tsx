import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@redux/store";
import { Navbar } from "@components/molecules";
import { PillButton } from "@components/atoms";

import PersonIcon from "@material-ui/icons/Person";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import TollIcon from "@material-ui/icons/Toll";

import { logoutUser } from "@redux/actions";

interface DashboardNavbarProps {
  name: string;
  coins: string;
}

const DashboardNavbar: FC<DashboardNavbarProps> = (props) => {
  const dispatch = useDispatch();
  const { user, coins } = useSelector((state: RootState) => state.user);

  function onLogout() {
    dispatch(logoutUser());
  }

  return (
    <Navbar>
      <PillButton
        prefix={<TollIcon />}
        colorType="secondary"
        hideSuffixSmallScreen
      >
        {coins}
      </PillButton>
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
