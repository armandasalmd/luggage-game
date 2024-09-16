import { FC, useState } from "react";
import usePWA from "react-pwa-install-prompt";
import { message } from "@components/atoms";
import "./InstallBanner.scss";

const InstallBanner: FC = () => {
  const { isStandalone, isInstallPromptSupported, promptInstall } = usePWA();
  const [show, setShow] = useState(true);

  const onClickInstall = async () => {
    const didInstall = await promptInstall();
    if (didInstall) {
      message.success("App installed, close browser and open app from phone menu");
    } else {
      window.location.reload();
    }
  };

  if (!show || !isStandalone || !isInstallPromptSupported) return null;

  return (
    <div className="installBanner">
      <p className="installBanner__text">Install this site as an app to improve in-game experience</p>
      <div className="installBanner__actions">
        <span
          className="installBanner__button installBanner__button--ghost"
          onClick={() => setShow(false)}>
          Not now
        </span>
        <span className="installBanner__button" onClick={onClickInstall}>
          Install
        </span>
      </div>
    </div>
  );
};

export default InstallBanner;