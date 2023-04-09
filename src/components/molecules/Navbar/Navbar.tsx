import { FC, useState, useLayoutEffect } from "react";
import classNames from "classnames";

import "./Navbar.scss";
import { Logo } from "@components/atoms";
import MenuIcon from "@material-ui/icons/MenuOpen";
import GlobalUtils from "@utils/Global";

interface NavbarProps {
  sticky?: boolean;
  withLock?: boolean;
  onCollapse?(): void;
}

const Navbar: FC<NavbarProps> = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const classes = classNames("navbar", {
    "navbar--sticky": props.sticky,
    "navbar--collapsed": props.withLock && collapsed,
  });

  useLayoutEffect(() => {
    setTimeout(() => {
      if (window.innerWidth < 992) {
        setCollapsed(true);
      }
    });
  }, []);

  return (
    <div className={classes}>
      <span className="navbar__logo">
        <Logo
          noTextSmallScreen
          onClick={() =>
            document.dispatchEvent(new CustomEvent("navbarLogoClick"))
          }
        />
      </span>
      <span className="navbar__actions">{props.children}</span>
      {props.withLock && (
        <div
          className="navbar__lock"
          onClick={() => {
            setCollapsed(!collapsed);
            if (!collapsed)
              GlobalUtils.callIfFunction(props.onCollapse, !collapsed);
          }}
        >
          <MenuIcon />
        </div>
      )}
    </div>
  );
};

export default Navbar;
