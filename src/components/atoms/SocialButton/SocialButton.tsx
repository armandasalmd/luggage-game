import { FC } from "react";

import "./SocialButton.scss";
import GoogleIcon from "./google.svg";
import { Button } from "@components/atoms";
import FacebookIcon from "@material-ui/icons/Facebook";
import GlobalUtils from "@utils/Global";
import RouteUtils from "@utils/Route";

type SocialType = "facebook" | "google";

interface SocialButtonProps {
  type: SocialType;
}

const SocialButton: FC<SocialButtonProps> = (props) => {
  const icon =
    props.type === "google" ? (
      <img style={{ marginRight: 8 }} src={GoogleIcon} alt="google" />
    ) : (
      <FacebookIcon color="primary" />
    );

  const onClick = () => {
    const route =
      props.type === "google"
        ? RouteUtils.routes.api.auth.googleLogin
        : RouteUtils.routes.api.auth.facebookLogin;

    window.open(RouteUtils.resolveUrl(route.path), "_self");
  };

  return (
    <Button onClick={onClick} tall className="socialButton" centerText icon={icon}>
      Continue with {GlobalUtils.capitalise(props.type)}
    </Button>
  );
};

export default SocialButton;
