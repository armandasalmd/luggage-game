import { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import usePWA from "react-pwa-install-prompt";
import { Button, Logo } from "@components/atoms";
import RouteVariables from "@utils/RouteVariables";
import "./InstallPage.scss";

const InstallPage: FC = () => {
  const history = useHistory();
  const { isStandalone, isInstallPromptSupported, promptInstall } = usePWA();

  const goToMain = () => history.replace(RouteVariables.app.main.dashboard.path);
  const onClickInstall = async () => {
    const didInstall = await promptInstall();
    if (didInstall) {
      goToMain();
    } else {
      window.location.reload();
    }
  };

  useEffect(() => {
    if (!isStandalone || !isInstallPromptSupported) {
      goToMain();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStandalone, isInstallPromptSupported]);

  return (
    <div className="install">
      <img
        className="install__background"
        alt="login-background"
        src="/images/login-background.svg"
      />
      <div className="install__container">
        <div className="install__logo">
          <Logo size="L" />
        </div>
        <div className="install__card">
          <h1 className="install__cardTitle">Install this website as mobile app</h1>
          <p className="install__cardNote">Install is optional</p>
          <div className="install__cardBody">
            <p>To improve your in-game experience we suggest installing this website as an app on your phone. This can be done in seconds.</p>
            <p>Installing it will remove navigation bar and other unnecessary browser features. After installation app will appear in your phone menu.</p>
            <p>You can also continue using this app in the browser by dismissing this prompt. Later install can be done through browser “more options” button.</p>
          </div>
          <div className="install__cardFooter">
            <Button type="accent" centerText onClick={onClickInstall}>Single click install</Button>
            <Button type="minimal" centerText onClick={goToMain}>Dismiss and continue</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallPage;