import { FC } from "react";
import "./Navbar.scss";
import { Logo } from "@components/atoms";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = (props) => {
  return (
    <div className="navbar">
      <span className="navbar__logo">
        <Logo noTextSmallScreen />
      </span>
      <span className="navbar__actions">{props.children}</span>
    </div>
  );
};

export default Navbar;
