import { FC, useEffect, useState, useRef } from "react";
import "./PopMenu.scss";
import VerticalMenu, { VerticalMenuProps } from "../VerticalMenu/VerticalMenu";
import GlobalUtils from "@utils/Global";

function useOutsideClick(ref: any, callback: () => any) {
  useEffect(() => {
    document.addEventListener("mousedown", callback);
    return () => {
      document.removeEventListener("mousedown", callback);
    };
  }, [ref, callback]);
}

interface PopMenuProps extends VerticalMenuProps {
  isOpen?: boolean;
  onOutsideClick?(): void;
}

const PopMenu: FC<PopMenuProps> = ({ isOpen, onOutsideClick, ...rest }) => {
  const wrapperRef = useRef(null);
  const [mQuery, setMQuery] = useState({
    matches: window.innerWidth > 768 ? true : false,
  });

  useOutsideClick(wrapperRef, () => {
    GlobalUtils.callIfFunction(onOutsideClick);
  });

  useEffect(() => {
    let mediaQuery = window.matchMedia("(min-width: 768px)");
    mediaQuery.addListener(setMQuery);

    return () => mediaQuery.removeListener(setMQuery);
  }, []);

  if (!isOpen || mQuery.matches) {
    return null;
  }

  return (
    <div ref={wrapperRef} className="popMenu">
      <VerticalMenu {...rest} />
    </div>
  );
};

export default PopMenu;
