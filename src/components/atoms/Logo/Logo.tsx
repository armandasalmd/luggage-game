import { FC } from "react";
import classNames from "classnames";
import { Size } from "@utils/Types";
import "./Logo.scss";

interface LogoProps {
  noText?: boolean;
  noTextSmallScreen?: boolean;
  size?: Size;
  onClick?(): void;
}

const Logo:FC<LogoProps> = (props) => {
  const classes = classNames("logo", {
    "logo--noText": props.noText,
    "logo--noTextSmallScreen": props.noTextSmallScreen,
    "logo--selectable": props.onClick !== undefined
  });

  let imgSize = 40;
  let fontSize = 18;
  
  if (props.size === "S") {
    imgSize = 32;
    fontSize = 16;
  } else if (props.size === "L") {
    imgSize = 54;
    fontSize = 28;
  }

  return (
    <div className={classes} style={{display: "flex", alignItems:"center"}} onClick={props.onClick}>
      <img width={imgSize} height={imgSize} src="/images/logo.png" alt="logo" />
      <p className="logo__text" style={{fontSize: fontSize}}>Luggage game</p>
    </div>
  )
};

export default Logo;