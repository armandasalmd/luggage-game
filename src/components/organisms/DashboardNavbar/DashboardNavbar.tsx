import { FC } from "react";
import { useDispatch } from "react-redux";
import { Navbar } from "@components/molecules";
import { PillButton } from "@components/atoms";

import PersonIcon from "@material-ui/icons/Person";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import TollIcon from "@material-ui/icons/Toll";
import AddIcon from "@material-ui/icons/Add";

import { logoutUser } from "@redux/actions";

interface DashboardNavbarProps {
  name: string;
  coins: string;
}

const DashboardNavbar: FC<DashboardNavbarProps> = (props) => {
  const dispatch = useDispatch();

  function onLogout() {
    dispatch(logoutUser());
  }

  return (
    <Navbar>
      <PillButton
        prefix={<TollIcon />}
        suffix={<AddIcon />}
        colorType="secondary"
        hideSuffixSmallScreen
      >
        {props.coins}
      </PillButton>
      <PillButton
        onSuffixClick={onLogout}
        prefix={<PersonIcon />}
        suffix={<LogoutIcon />}
        colorType="secondary"
        textEllipsis
      >
        {props.name}
      </PillButton>
    </Navbar>
  );
};

export default DashboardNavbar;
