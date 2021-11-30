import { FC } from "react";
import { Size } from "@utils/Types";
import "./Logo.scss";

interface LogoProps {
  noText?: boolean;
  size?: Size;
}

const Logo:FC<LogoProps> = (props) => {
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
    <div style={{display: "flex", alignItems:"center"}}>
      <img width={imgSize} height={imgSize} src="/images/logo.png" alt="logo" />
      <p style={{marginLeft: 8, fontWeight: 600, fontSize: fontSize, color: "#3D3635"}}>Luggage game</p>
    </div>
  )
};

export default Logo;