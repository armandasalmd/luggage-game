import { FC } from "react";
import classNames from "classnames";
import "./Navbar.scss";
import { Logo } from "@components/atoms";

interface NavbarProps {
  sticky?: boolean;
}

const Navbar: FC<NavbarProps> = (props) => {
  const classes = classNames("navbar", {
    "navbar--sticky": props.sticky
  });

  return (
    <div className={classes}>
      <span className="navbar__logo">
        <Logo noTextSmallScreen />
      </span>
      <span className="navbar__actions">{props.children}</span>
    </div>
  );
};

export default Navbar;
